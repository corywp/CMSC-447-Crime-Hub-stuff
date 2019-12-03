from flask import render_template, jsonify, request
from app import app, db
from app.models import Crime
import json


@app.route('/')
@app.route('/index')
@app.route('/index/')
def index():
    members = [
        {'first_name': 'Chloe', 'last_name': 'Jew'},
        {'first_name': 'Kendall', 'last_name': 'Kempton'},
        {'first_name': 'Tj', 'last_name': 'Ngo'},
        {'first_name': 'Cory', 'last_name': 'Powell'},
        {'first_name': 'Scott', 'last_name': 'Keegan'}
    ]

    return render_template('index.html', title='Home', members=members, token="My Token")


# Handles calls to entire database
@app.route('/api/crimes', methods=['GET', 'POST', 'DELETE'])
@app.route('/api/crimes/', methods=['GET', 'POST', 'DELETE'])
def all_crimes():

    # Retrieve all Crime objects in database
    if request.method == 'GET':
        qryresult = db.session.query(Crime).all()

        # Return list of retrieved objects in addition to metadata for filtering
        neighborhood_names = []
        unique_crime_types = []
        overall_crime_count_by_district = {}
        crimes = []

        for result in qryresult:
            crime = result.__dict__
            crime.pop('_sa_instance_state', None)
            if None in crime:
                print("bad")
            crimes.append(crime)

            if 'description' in crime and crime['description'] not in unique_crime_types and crime['description']:
                unique_crime_types.append(crime['description'])

            if 'neighborhood' in crime and crime['neighborhood']:
                if crime['neighborhood'] not in neighborhood_names:
                    neighborhood_names.append(crime['neighborhood'])

                if crime['neighborhood'] not in overall_crime_count_by_district.keys():
                    overall_crime_count_by_district[crime['neighborhood']] = 1
                else:
                    overall_crime_count_by_district[crime['neighborhood']] = overall_crime_count_by_district[crime['neighborhood']] + 1

        data = {}
        data['crimes'] = crimes
        data['neighborhood_names'] = neighborhood_names
        data['unique_crime_types'] = unique_crime_types
        data['overall_crime_count_by_district'] = overall_crime_count_by_district

        return jsonify(data)

    # Add new crime object to database
    if request.method == 'POST':
        crime = Crime(request.json)
        db.session.add(crime)
        db.session.commit()
        # Return the added object
        return jsonify(crime.serialized)

    # Delete all Crime objects
    if request.method == 'DELETE':
        qryresult = db.session.query(Crime).all()
        for crime in qryresult:
            db.session.delete(crime)
        db.session.commit()
        return jsonify([i.serialized for i in qryresult])


# Handles references to Crime object based on crimedate
@app.route('/api/crimedate=<date>', methods=['GET'])
@app.route('/api/crimedate=<date>/', methods=['GET'])
def get_crime_crimedate(date):

    # Retrieve a Crime object based on its crimedate
    if request.method == 'GET':
        qryresult = db.session.query(Crime).filter(Crime.crimedate==date)
        # Return the object
        return jsonify([i.serialized for i in qryresult.all()])
