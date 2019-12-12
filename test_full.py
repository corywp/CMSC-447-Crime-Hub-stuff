import unittest
import subprocess
import requests

class TestFull(unittest.TestCase):
    def test(self):
        # run server as a subprocess
        proc = subprocess.Popen(['cd', 'flask_backend', '&', 'C:\\Users\\Keegan\\AppData\\Local\\Programs\\Python\\Python37-32\\python.exe', '-m', 'flask', 'run', '-h', '127.0.0.1', '-p', '3000'], shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
        
        try:
            response = requests.get('http://localhost:3000/api/crimes')
            self.assertEqual(response.status_code, 200)
            
        finally:
            proc.terminate()
            print('== subprocess exited with rc =', proc.returncode)
