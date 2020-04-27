import sqlite3
import random
import string
import json
from typing import Any, Callable

from flask import Flask, request, make_response, abort

from mahaprinting_service import MahaPrintingService
from settings import ALLOW_CORS, ADMIN_USER_ID, DB_PATH
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
mahaprinting_service = MahaPrintingService(print_record_repository, printer_record_repository)


def get_user_id():
    return request.cookies.get(USER_ID_COOKIE)


def admin_only(routeHandlingFunc: Callable[[], Any]):
    def wrapper():
        user_id = get_user_id()

        if user_id != ADMIN_USER_ID:
            abort(401)  # Unauthorized

        return routeHandlingFunc()

    # This hack is necessary because the custom decorator gets mistaken for "same function" by flask's app.route()
    wrapper.__name__ = routeHandlingFunc.__name__

    return wrapper


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
    user_id = get_user_id()
    user_print = mahaprinting_service.upload_user_print(
        request.form['name'],
        request.form['contactDetails'],
        user_id,
        request.files['file'])

    return user_print.__dict__


@app.route('/getUserPrints', methods=['GET'])
def get_user_prints():
    user_id = get_user_id()
    user_prints = mahaprinting_service.get_user_prints(user_id)

    return json.dumps([p.__dict__ for p in user_prints])


@app.route('/getAllPrints', methods=['GET'])
@admin_only
def get_all_prints():
    prints = mahaprinting_service.get_all_prints()

    return json.dumps([p.__dict__ for p in prints])


@app.route('/cancelPrint', methods=['POST'])
def cancel_print():
    user_id = get_user_id()
    data = request.json
    print_id = data['printId']

    if not (user_id == ADMIN_USER_ID or mahaprinting_service.does_print_belongs_to_user(print_id, user_id)):
        abort(401)

    mahaprinting_service.cancel_print(print_id)

    response = make_response()
    response.status_code = 200

    return response


@app.route('/addPrinter', methods=['POST'])
@admin_only
def add_printer():
    data = request.json
    printer_info = mahaprinting_service.add_printer(data['printerName'], data['url'], data['apiKey'])

    return json.dumps(printer_info)


@app.route('/getPrinters', methods=['GET'])
@admin_only
def get_printers():
    printers_info = mahaprinting_service.get_printers_info()

    return json.dumps(printers_info)

# @app.route('/test', methods=['POST'])
# def test():
#     print(request)
#     request.files['boom'].save(r"I:\test_output.stl")
#     return 'Hello, World!'
