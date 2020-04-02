from flask import Flask, request
import requests

app = Flask(__name__)


@app.route('/uploadUserPrint', methods=['POST'])
def upload_user_print():
    print(request)
    requests.post("http://localhost:5000/test", files=dict(boom=request.files['file']))
    return 'Hello, World!'


@app.route('/test', methods=['POST'])
def test():
    print(request)
    request.files['boom'].save(r"I:\test_output.stl")
    return 'Hello, World!'
