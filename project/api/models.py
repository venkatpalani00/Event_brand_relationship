from . import db

class user(db.Model):
    id=db.Column(db.Integer)
    user=db.Column(db.String(50),primary_key=True)
    password=db.Column(db.String(50))
    mode=db.Column(db.String(50))

