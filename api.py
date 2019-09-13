#!/usr/bin/env python3
# -*- coding: utf-8 -*-


# usar ajax jquery pra fazer a conexao entre flask e js

import random as rd
import datetime
from flask import Flask, render_template, request
app = Flask(__name__)

def generate_random():
    return rd.randint(0, 9)

@app.route("/")
def index():
    return render_template("index.html", random_value=0)

def result():
    random_value = generate_random()
    return render_template("index.html", random_value=random_value)

if __name__ == "__main__":
    app.run(debug=True, port=5000)