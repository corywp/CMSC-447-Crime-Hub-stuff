import requests
import json

data_url = "https://data.baltimorecity.gov/resource/wsfq-mvij.json" # Open Balitmore’s API

base_url = "http://127.0.0.1:3000/" # Our base website

api_url = base_url + "api/crimes/"

resp = requests.delete(api_url)

resp = requests.get(data_url)
crimes = resp.json()
for crime in crimes:
    resp = requests.post(api_url, json=crime)
    if not resp:
        print(resp)
        break