from flask import render_template
from app import app
import requests
import json

url = "https://data.baltimorecity.gov/resource/wsfq-mvij.json?crimedate=2019-09-14"

@app.route('/')
@app.route('/index/')
def index():
    resp = requests.get(url)
    data = resp.json()
    #data = list(data)[0:10]
    return render_template('index.html', title='Home', data=data)
