import requests as req
import json
from datetime import datetime
from datetime import timedelta

base_url = "http://52.206.59.30:3000/"
api_url = base_url + "api/crimes/"

data_url = "https://data.baltimorecity.gov/resource/wsfq-mvij.json"
date = datetime.strptime("2019-11-02", "%Y-%m-%d")
date_url = data_url + "?crimedate=" + date.strftime("%Y-%m-%d")

one_day = timedelta(days=1)
run = True

while run == True:
     resp = req.get(date_url)
     if len(resp.json()) == 0:
          run = False
     else:
          for crime in resp.json():
               resp2 = req.post(api_url, json=crime)
               if not resp2:
                    print(resp2)
                    run = False
     date -= one_day
     date_url = data_url + "?crimedate=" + date.strftime("%Y-%m-%d")
