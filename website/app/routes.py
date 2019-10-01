from flask import render_template
from app import app

@app.route('/')
@app.route('/index/')
def index():
    members = [
        {'first_name': 'Chloe', 'last_name': 'Jew'},        
        {'first_name': 'Kendall', 'last_name': 'Kempton'},
        {'first_name': 'Tj', 'last_name': 'Ngo'},
        {'first_name': 'Cory', 'last_name': 'Powell'},
        {'first_name': 'Scott', 'last_name': 'Keegan'}
    ]
    return render_template('index.html', title='Home', members=members)
