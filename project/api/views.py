from flask import Blueprint,jsonify,request
from . import db
from .models import user
#import json

main=Blueprint('main',__name__)

@main.route('/add_user',methods=['POST','GET'])
def add_user():
    user_data=request.get_json(force=True)
    old_user=user.query.filter_by(user=user_data['user']).first()
    if(old_user is None):
        new_user=user(user=user_data['user'],password=user_data['password'],mode=user_data['mode'])
        db.session.add(new_user)
        db.session.commit()
        return 'Done',201

    else:
        return 'error',404

@main.route('/login',methods=['POST','GET'])
def login():
    user_data=request.get_json(force=True)
    old_user=user.query.filter_by(user=user_data['loguser'],password=user_data['logpass']).first()
    if(old_user is None):
        return 'not_found',404
    else:
        return 'farmer',201

@main.route('/users')
def movies():
	users_list=user.query.all()
	users={}
	for use in users_list:
		users[use.user]=use.mode

	return jsonify(users)
