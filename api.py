#!/usr/bin/env python3
# -*- coding: utf-8 -*-


# usar ajax jquery pra fazer a conexao entre flask e js

import random as rd
import datetime
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

def generate_random():
    return rd.randint(0, 9)

@app.route("/")

@app.route("/main", methods=["GET", "POST"])
def index():
    data = request.args.get("key")
    print(data)
    
    random_value = generate_random()
    print(random_value)
    
    if request.method == "GET":
        return render_template("index.html", random_value=random_value)
    elif request.method == "POST":
        return jsonify({"status": "OK", "random": random_value})

if __name__ == "__main__":
    app.run(debug=True, port=5000)