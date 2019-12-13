import unittest
import json
import os
import shutil
from flask_sqlalchemy import SQLAlchemy

import app

basedir = os.path.abspath(os.path.dirname(__file__))

class TestApp(unittest.TestCase):
    def setUp(self):
        if os.path.exists('app/test_app.db'):
            os.remove('app/test_app.db')
        shutil.copyfile('app/app.db', 'app/test_app.db')
        app.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir + '/app/', 'test_app.db')

        self.app = app.app.test_client()

    def test_app_runs(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_get_all_crimes(self):
        response = self.app.get('/api/crimes', follow_redirects=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, 'application/json')

        data = json.loads(response.data)

        self.assertTrue('crimes' in data)
        self.assertNotEqual(len(data['crimes']), 0)

    def test_post(self):
        test_crime = {
            "crimedate" : '1999-4-26T00:00:00.000',
            "crimetime" : 'foo',
            "crimecode" : 'foo',
            "location" : 'foo',
            "description" : 'foo',
            "inside_outside" : 'foo',
            "weapon" : 'foo',
            "post" : 'foo',
            "district" : 'foo',
            "neighborhood" : 'foo',
            "longitude" : 'foo',
            "latitude" : 'foo',
            "premise" : 'foo',
            "total_incidents" : 'foo',
            "weekday" : 'foo',
        }
        response = self.app.post('/api/crimes', follow_redirects=True, json=test_crime)

        self.assertEqual(response.status_code, 200)

        bad_format = {
            "crimedate" : 'foo',
            "crimetime" : 'foo',
            "crimecode" : 'foo',
            "location" : 'foo',
            "description" : 'foo',
            "inside_outside" : 'foo',
            "weapon" : 'foo',
            "post" : 'foo',
            "district" : 'foo',
            "neighborhood" : 'foo',
            "longitude" : 'foo',
            "latitude" : 'foo',
            "premise" : 'foo',
            "total_incidents" : 'foo',
            "weekday" : 'foo',
        }
        response = self.app.post('/api/crimes', follow_redirects=True, json=bad_format)

        self.assertEqual(response.status_code, 500)
