from UploadsManager import UploadsManager
import sqlite3
import random
import string
import json
import os
from typing import Any, Callable

from flask import Flask, request, make_response, abort, send_file

from mahaprinting_service import MahaPrintingService
from settings import ALLOW_CORS, ADMIN_USER_ID, DB_PATH, UPLOADS_FOLDER
from Sqlite.SqlitePrintRecordRepository import SqlitePrintRecordRepository
from Sqlite.SqlitePrinterRecordRepository import SqlitePrinterRecordRepository

USER_ID_COOKIE = 'user_id'

# Flask stuff
app = Flask(__name__)

if ALLOW_CORS == 'TRUE':
    from flask_cors import CORS
    CORS(app, supports_credentials=True)

sqlite_db_connection = sqlite3.connect(DB_PATH, check_same_thread=False)
print_record_repository = SqlitePrintRecordRepository(sqlite_db_connection)
printer_record_repository = SqlitePrinterRecordRepository(sqlite_db_connection)
uploads_manager = UploadsManager(UPLOADS_FOLDER)
mahaprinting_service = MahaPrintingService(print_record_repository, printer_record_repository, uploads_manager)


def get_user_id():
    return request.cookies.get(USER_ID_COOKIE)


def get_user_id_throw_if_none():
    user_id = get_user_id()

    if user_id is None:
        raise ValueError("Did not receive a user_id cookie")

    return user_id


def admin_only(routeHandlingFunc: Callable[[], Any]):
    def wrapper():
        user_id = get_user_id()

        if user_id != ADMIN_USER_ID:
            abort(401)  # Unauthorized

        return routeHandlingFunc()

    # This hack is necessary because the custom decorator gets mistaken for "same function" by flask's app.route()
    wrapper.__name__ = routeHandlingFunc.__name__

    return wrapper


def throw_if_not_admin_or_print_owner(print_id: int):
    user_id = get_user_id_throw_if_none()

    if not (user_id == ADMIN_USER_ID or mahaprinting_service.does_print_belongs_to_user(print_id, user_id)):
        abort(401)


def generate_user_id() -> str:
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(40))


@app.route('/initialize')
def initialize():
    current_user_id = get_user_id()

    if current_user_id is None:
        current_user_id = generate_user_id()

    response = make_response()
    month_in_seconds = 60*60*24*31
    response.set_cookie(USER_ID_COOKIE, current_user_id, max_age=month_in_seconds)

    return response


@app.route('/uploadUserPrint', methods=['POST'])
def upload_user_print():
    user_id = get_user_id_throw_if_none()

    user_print = mahaprinting_service.upload_user_print(
        request.form['name'],
        # using .get() for the slicedFor field because it's optional will throw a KeyError if accessed by []
        request.form.get('slicedFor'),
        request.form['contactDetails'],
        request.form['notes'],
        user_id,
        request.files['file'])

    return user_print.__dict__


@app.route('/getUserPrints', methods=['GET'])
def get_user_prints():
    user_id = get_user_id_throw_if_none()
    user_prints = mahaprinting_service.get_user_prints(user_id)

    return json.dumps([p.__dict__ for p in user_prints])


@app.route('/getPrintFile/<int:print_id>', methods=['GET'])
def get_print_file(print_id):
    throw_if_not_admin_or_print_owner(print_id)

    print = print_record_repository.get_print(print_id)

    if print is None:
        raise ValueError("No print matches the given print ID.")

    file_path_in_storage = uploads_manager.get_print_file_path(print)

    if not os.path.isfile(file_path_in_storage):
        abort(404)

    return send_file(file_path_in_storage, as_attachment=True)


@app.route('/getAllPrints', methods=['GET'])
@admin_only
def get_all_prints():
    prints = mahaprinting_service.get_all_prints()

    return json.dumps([p.__dict__ for p in prints])


# @app.route('/cancelPrint', methods=['POST'])
# def cancel_print():
#     data = request.json
#     print_id = data['printId']

#     throw_if_not_admin_or_print_owner(print_id)

#     mahaprinting_service.cancel_print(print_id)

#     response = make_response()
#     response.status_code = 200

#     return response


@app.route('/markPrintAsCompleted', methods=['POST'])
@admin_only
def mark_print_as_completed():
    data = request.json
    print_id = data['printId']

    mahaprinting_service.mark_print_as_completed(print_id)

    response = make_response()
    response.status_code = 200

    return response


@app.route('/addPrinter', methods=['POST'])
@admin_only
def add_printer():
    data = request.json
    # using .get() for the user because it's optional will throw a KeyError if accessed by []
    (result, printer_info) = mahaprinting_service.add_printer(
        data['printerName'], data['url'], data.get('user'))

    return json.dumps({'result': result, 'printerInfo': printer_info})


@app.route('/addPrinterWithApiKey', methods=['POST'])
@admin_only
def add_printer_with_api_key():
    data = request.json
    (result, printer_info) = mahaprinting_service.add_printer_with_api_key(
        data['printerName'], data['url'], data['apiKey'])

    return json.dumps({'result': result, 'printerInfo': printer_info})


@app.route('/getPrinters', methods=['GET'])
@admin_only
def get_printers():
    printers_info = mahaprinting_service.get_printers_info()

    return json.dumps(printers_info)


@app.route('/getPrinterModels', methods=['GET'])
def get_printer_models():
    printer_models = mahaprinting_service.get_printer_models()

    return json.dumps(list(printer_models))

# SENDING PRINT TO PRINTER STUFF
@app.route('/sendToPrinter', methods=['POST'])
@admin_only
def send_to_printer():
    data = request.form
    print_id = int(data['printId'])
    printer_id = int(data['printerId'])
    gcode_file = request.files.get('gcodeFile')

    mahaprinting_service.send_to_printer(print_id, printer_id, gcode_file)

    response = make_response()
    response.status_code = 200

    return response
