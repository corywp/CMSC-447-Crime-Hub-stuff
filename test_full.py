import unittest
import subprocess
import signal
import os
import json
import requests

class TestFull(unittest.TestCase):
    def test(self):
        # run server as a subprocess
        proc = subprocess.Popen(['cd', 'flask_backend', '&', 'python', '-m', 'flask', 'run', '-h', '127.0.0.1', '-p', '3000'], shell=True, stdout=subprocess.PIPE)

        response = requests.get('http://localhost:3000/api/crimes')
        self.assertEqual(response.status_code, 200)

        data = json.loads(response.content)

        self.assertTrue('crimes' in data)
        self.assertNotEqual(len(data['crimes']), 0)

        proc.kill()
        proc.terminate()