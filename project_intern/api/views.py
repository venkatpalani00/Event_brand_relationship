from flask import Blueprint,jsonify,request
from . import db
from .models import Events,Brands
import json

main=Blueprint('main',__name__)

@main.route('/add_event',methods=['POST','GET'])
def add_event():
    event_data=request.get_json(force=True)

    new_event=Events(eve=event_data['event'],date=event_data['date'])

    db.session.add(new_event)
    db.session.commit()

    return 'Done',201

@main.route('/copy',methods=['POST','GET'])
def copy():
    copy_data=request.get_json(force=True)
    event=[]

    allbrand_this=Brands.query.filter_by(event_id=copy_data['event2']).all()
    for brand in allbrand_this:
        #event.append({'name':brand.name,'event_id':brand.event_id})
        new_event=Brands(name=brand.name,event_id=copy_data['event1'])
        db.session.add(new_event)
        db.session.commit()

    return 'Copied'

@main.route('/events')
def events():
    events_list=Events.query.all()
    events = []
    i=0
    for event in events_list:
        events.append({'eve':event.eve,'date':event.date})
       # brands_list=Brands.query.filter_by(event_id=i+1).all()
        uni_brand=[]
        for brand in event.brand:
            uni_brand.append(brand.name)
        events[i]['brand']=uni_brand
        i=i+1

    return jsonify(events)
    #return jsonify({'events':[{'eve':'ven','date':'20','brand':['dog','cat']},{'eve':'shan','date':'20','brand':['duck','kit']}]})

@main.route('/add_brand',methods=['POST','GET'])
def add_brand():
    brand_data=request.get_json(force=True)

    new_brand=Brands(name=brand_data['brand'],event_id=brand_data['index'])

    db.session.add(new_brand)
    db.session.commit()

    return 'Done',202

@main.route('/delete_brand',methods=['POST','GET'])
def delete_brand():
    del_data=request.get_json(force=True)

    delete_this=Brands.query.filter_by(name=del_data['brand'],event_id=del_data['index']).first()
    db.session.delete(delete_this)
    db.session.commit()

    return 'Done',203