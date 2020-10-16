from flask import Blueprint,jsonify,request
from . import db
from .models import User
from .models import Farmer,Orders


main=Blueprint('main',__name__)

@main.route('/add_user',methods=['POST','GET'])
def add_user():
    user_data=request.get_json(force=True)
    old_user=User.query.filter_by(user=user_data['user']).first()
    if(old_user is None):
        new_user=User(user=user_data['user'],password=user_data['password'],mode=user_data['mode'])
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
