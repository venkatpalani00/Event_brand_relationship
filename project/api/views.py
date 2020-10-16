from flask import Blueprint,jsonify,request
from . import db
from .models import User
from .models import Farmer,Orders

import pandas as pd
import seaborn as sns
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import LabelEncoder
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import make_regression

main=Blueprint('main',__name__)

@main.route('/add_user',methods=['POST','GET'])
def add_user():
    user_data=request.get_json(force=True)
    old_user=User.query.filter_by(user=user_data['user']).first()
    if(old_user is None):
        new_user=User(user=user_data['user'],password=user_data['password'],mode=user_data['mode'],phone=user_data['phone'],mail=user_data['mail'])
        db.session.add(new_user)
        db.session.commit()
        return 'Done',201

    else:
        return 'error',404

@main.route('/login',methods=['POST','GET'])
def login():
    user_data=request.get_json(force=True)
    old_user=User.query.filter_by(user=user_data['loguser'],password=user_data['logpass']).first()
    if(old_user is None):
        return 'not_found',404
    else:
        return 'farmer',201

@main.route('/users')
def users():
	users_list=User.query.all()
	users={}
	for use in users_list:
		users[use.user]=use.mode

	return jsonify(users)

@main.route('/add_farmer',methods=['POST','GET'])
def add_farmer():
    farmer_data=request.get_json(force=True)

    new_farmer=Farmer(cname=farmer_data['crop'],cost=farmer_data['cost'],quantity=farmer_data['quantity'],farm=farmer_data['farm'])

    db.session.add(new_farmer)
    db.session.commit()

    return 'Done',201

@main.route('/farmer')
def farmer():
	farmers_list=Farmer.query.all()
	farmers=[]
	for farm in farmers_list:
		farmers.append({'crop':farm.cname,'cost':farm.cost,'quantity':farm.quantity,'farm':farm.farm,'id':farm.id})
	return jsonify(farmers)

@main.route('/add_order',methods=['POST','GET'])
def add_order():
    order_data=request.get_json(force=True)

    new_order=Orders(cname=order_data['cname'],fname=order_data['fname'],cost=order_data['cost'],quantity=order_data['quant'],c_id=order_data['id'],cus_name=order_data['cus_name'])

    db.session.add(new_order)
    db.session.commit()

    return 'Done',201

@main.route('/order')
def order():
    #order_data=request.get_json(force=True)

    newd=Orders.query.all()
    farmers=[]
    for farm in newd:
        farmers.append({'cus_name':farm.cus_name,'fname':farm.fname,'cname':farm.cname,'id':farm.id,'c_id':farm.c_id,'quantity':farm.quantity,'cost':farm.cost})

    return jsonify(farmers)


@main.route('/ml',methods=['POST','GET'])
def ml():
    order_data=request.get_json(force=True)

    S_name=order_data['State_name']
    dist=order_data['District']
    crop=order_data['Crop_sown']
    season=order_data['Season']
    area=order_data['Area']

    data = pd.read_csv(r"./src/components/crop_production_modified.csv")
    x=data.iloc[:,[0,1,2,3,4,5]].values
    y=data.iloc[:,[6]].values

    x_train,x_test,y_train,y_test = train_test_split(x,y,test_size=.20)

    rfr = RandomForestRegressor()
    rfr.fit(x_train,y_train)
    y_predicted = rfr.predict([[S_name,dist,2020,crop,Season,Area]])
    newn=[]
    newn.append({'ans':y_predicted})

    return jsonify(newn)