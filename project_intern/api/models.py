from . import db

class Events(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    eve=db.Column(db.String(50))
    date=db.Column(db.String(50))
    brand=db.relationship('Brands',backref='event')

class Brands(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(50))
    event_id=db.Column(db.Integer,db.ForeignKey('events.id'))