from app import app, db
from datetime import datetime
import calendar

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
    weekday = db.Column(db.String(64), index=True)

    # Initializes object based on json list
    def __init__(self, json_list):
        for att in json_list:
            if att == "crimedate":
                json_list[att] = json_list[att][0:-13]
                date = datetime.strptime(json_list[att], "%Y-%m-%d")
                weekday = calendar.day_name[date.weekday()]
                setattr(self, "weekday", weekday)

                if db.session.query(Weekday.id).filter_by(weekday=weekday).scalar():
                    qryresult = db.session.query(Weekday).filter(Weekday.weekday==weekday).one()
                    qryresult.number += 1
                else:
                    object = Weekday(weekday=weekday, number=1)
                    db.session.add(object)

            if att == "description":
                description = json_list[att]
                if db.session.query(Description.id).filter_by(description=description).scalar():
                    qryresult = db.session.query(Description).filter(Description.description==description).one()
                    qryresult.number += 1
                else:
                    object = Description(description=description, number=1)
                    db.session.add(object)

            if att == "weapon":
                weapon = json_list[att]
                if db.session.query(Weapon.id).filter_by(weapon=weapon).scalar():
                    qryresult = db.session.query(Weapon).filter(Weapon.weapon==weapon).one()
                    qryresult.number += 1
                else:
                    object = Weapon(weapon=weapon, number=1)
                    db.session.add(object)

            if att == "district":
                district = json_list[att]
                if db.session.query(District.id).filter_by(district=district).scalar():
                    qryresult = db.session.query(District).filter(District.district==district).one()
                    qryresult.number += 1
                else:
                    object = District(district=district, number=1)
                    db.session.add(object)

            if att == "neighborhood":
                neighborhood = json_list[att]
                if db.session.query(Neighborhood.id).filter_by(neighborhood=neighborhood).scalar():
                    qryresult = db.session.query(Neighborhood).filter(Neighborhood.neighborhood==neighborhood).one()
                    qryresult.number += 1
                else:
                    object = Neighborhood(neighborhood=neighborhood, number=1)
                    db.session.add(object)

            if att == "premise":
                premise = json_list[att]
                if db.session.query(Premise.id).filter_by(premise=premise).scalar():
                    qryresult = db.session.query(Premise).filter(Premise.premise==premise).one()
                    qryresult.number += 1
                else:
                    object = Premise(premise=premise, number=1)
                    db.session.add(object)

            setattr(self, att, json_list[att])

        crimecode = db.Column(db.String(64), index=True)
        location = db.Column(db.String(64), index=True)
        inside_outside = db.Column(db.String(64), index=True)
        post = db.Column(db.String(64), index=True)
        longitude = db.Column(db.String(64), index=True)
        latitude = db.Column(db.String(64), index=True)
        total_incidents = db.Column(db.String(64), index=True)
        weekday = db.Column(db.String(64), index=True)


        # Save all of the changes
        db.session.commit()

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
            "total_incidents" : self.total_incidents,
            "weekday" : self.weekday
        }

class Weekday(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weekday = db.Column(db.String(64), index=True)
    number = db.Column(db.Integer)

    @property
    def serialized(self):
        return { self.weekday : self.number }

class Description(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(64), index=True)
    number = db.Column(db.Integer)

    @property
    def serialized(self):
        return { self.description : self.number }

class Weapon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weapon = db.Column(db.String(64), index=True)
    number = db.Column(db.Integer)

    @property
    def serialized(self):
        return { self.weapon : self.number }

class District(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    district = db.Column(db.String(64), index=True)
    number = db.Column(db.Integer)

    @property
    def serialized(self):
        return { self.district : self.number }

class Neighborhood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    neighborhood = db.Column(db.String(64), index=True)
    number = db.Column(db.Integer)

    @property
    def serialized(self):
        return { self.neighborhood : self.number }

class Premise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    premise = db.Column(db.String(64), index=True)
    number = db.Column(db.Integer)

    @property
    def serialized(self):
        return { self.premise : self.number }
