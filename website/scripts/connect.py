import requests
import json


# Base url for accessing API
base_url = "https://data.baltimorecity.gov/resource/wsfq-mvij.json?"
# Date to retrieve crimes from
date = "2019-09-14"
# Url for retrieving crimes committed on the defined date
date_url = base_url + "crimedate=" + date

# Attempt to access the data
resp = requests.get(date_url)

# If the request was unsuccessful, display the error
if not resp:
    print("ERROR")
    print(resp.status_code)
else:
    # Convert the retrieved data to json format
    data = resp.json()
    # Print info about the first 5 crimes retrieved
    size = 0
    for crime in data:
        for point in crime:
            print(point + ": " + crime[point])
        size += 1
        if size >= 5:
            break
        print()
