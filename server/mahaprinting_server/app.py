from flask import Flask
app = Flask(__name__)


@app.route('/uploadFile')
def hello_world():
    return 'Hello, World!'
