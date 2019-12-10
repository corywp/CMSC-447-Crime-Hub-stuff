import requests as req
import json
from datetime import datetime
from datetime import timedelta

base_url = "http://52.206.59.30:3000/"
api_url = base_url + "api/crimes/"
data_url = "https://data.baltimorecity.gov/resource/wsfq-mvij.json"

date = datetime.now()		# Current date
END_DATE = "2013-12-31"		# Cutoff date for retrieving data
ONE_DAY = timedelta(days=1)	# Unit of one day
run = True

# Loop until the end date is reached
while (date.strftime("%Y-%m-%d") != END_DATE) and run:
     # Query OpenBaltimore at current date
     date_url = data_url + "?crimedate=" + date.strftime("%Y-%m-%d")
     resp = req.get(date_url)

     # If the request was unsuccessful, display the error and break
     if not resp:
         print(date_url)
         print(resp)
         run = False
         pass

     # Add each crime to our database
     for crime in resp.json():
     	  resp2 = req.post(api_url, json=crime)
	      # If the request was unsuccessful, display the error and break
          if not resp2:
              print(date_url)
              print(resp2)
              run = False
	          pass

     # Decrement by a day
     date -= ONE_DAY
