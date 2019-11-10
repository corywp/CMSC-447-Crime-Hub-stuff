from app import db

class Crime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    crimedate = db.Column(db.String(64), index=True)
    crimetime = db.Column(db.String(64), index=True)
    crimecode = db.Column(db.String(64), index=True)
    location = db.Column(db.String(64), index=True)
    description = db.Column(db.String(64), index=True)
    inside_outside = db.Column(db.String(64), index=True)
    weapon = db.Column(db.String(64), index=True)
    post = db.Column(db.String(64), index=True)
    district = db.Column(db.String(64), index=True)
    neighborhood = db.Column(db.String(64), index=True)
    longitude = db.Column(db.String(64), index=True)
    latitude = db.Column(db.String(64), index=True)
    premise = db.Column(db.String(64), index=True)
    total_incidents = db.Column(db.String(64), index=True)

    # Initializes object based on json list
    def __init__(self, json_list):
        for att in json_list:
            if (att == "crimedate"):
                json_list[att] = json_list[att][0:-13]
            setattr(self, att, json_list[att])

    # Returns a json serialized version of the object
    @property
    def serialized(self):
        return {
            "crimedate" : self.crimedate,
            "crimetime" : self.crimetime,
            "crimecode" : self.crimecode,
            "location" : self.location,
            "description" : self.description,
            "inside_outside" : self.inside_outside,
            "weapon" : self.weapon,
            "post" : self.post,
            "district" : self.district,
            "neighborhood" : self.neighborhood,
            "longitude" : self.longitude,
            "latitude" : self.latitude,
            "premise" : self.premise,
            "total_incidents" : self.total_incidents
        }
