# app.py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello_world():
    return jsonify(message="Hello, Flask!")

if __name__ == '__main__':
    app.run(debug=True)
