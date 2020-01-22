from flask import Flask, render_template, request, make_response, g, jsonify
import os
import socket
import random
import json
import sys
import datetime
import requests
from flask_sqlalchemy import SQLAlchemy
import hashlib
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from flask_cors import CORS

JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY'] 
DATABASE_URI = 'postgres+psycopg2://postgres:password@db:5432/area'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(days=1)
cors = CORS(app, resources={"/*": {"origins": "*"}})

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50))
    mail = db.Column(db.String(130))    
    password = db.Column(db.String(100))

    def __init__(self, username, mail, password):
        self.username = username
        self.mail = mail
        self.password = sha256(password)

    def verify_hash(self, password):
        if (safe_str_cmp(self.password, sha256(password))):
            return (True)
        return (False)

    def serialize(self):
        return {
            'id': self.id, 
            'username': self.username,
            'mail': self.mail,
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<Id %r Users %r Pass: %r>' % (self.id, self.username, self.password)


def sha256(string):
    res = hashlib.sha256(string.encode()).hexdigest()
    return (res)

def authenticate(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.verify_hash(password):
        return user

def identity(payload):
    user_id = payload['identity']
    return User.query.filter_by(id=user_id).first()

jwt = JWT(app, authenticate, identity)

db.create_all()
db.session.commit()

@app.route("/", methods=['POST', 'GET'])
def home():
    return {'status': 'success', 'message': 'Welcome on Dashboard API.'}

@app.route("/register", methods=['POST'])
def register():
    if (len(request.json) != 3):
        return {'status': 'error', 'message': 'bad parameters'}, 400
    username = request.json['username']
    password = request.json['password']
    mail = request.json['mail']
    if (User.query.filter_by(username=username).first() is None and User.query.filter_by(mail=mail).first() is None):
        new_user = User(username, mail, password)
        new_user.save()
        return {'status': 'success', 'message': 'Register Success'}
    return {'status': 'error', 'message': 'This user already exist'}, 409

@app.route('/user', defaults={'id': -1}, methods=['GET', 'PUT', 'DELETE'])
@app.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def user(id):
    usr = current_identity
    if (request.method == 'GET'):
        return {'username': usr.username, 'mail': usr.mail}
    if (request.method == 'PUT'):
        if (len(request.json) == 1):
            usr.mail = request.json['mail']
        if (len(request.json) == 2):
            usr.password = request.json['password']
        usr.save()
        return {'status': 'success', 'message': "User information successfully modified"}
    if (request.method == 'DELETE'):
        if (usr.username != "admin"):
            return {'status': 'success', 'message': 'Your are not allowed to execute this action'}, 403
        if ((User.query.filter_by(id=id).first() is None) != True):
            victim = User.query.filter_by(id=id).first()
            name = victim.username
            victim.delete()
            return {'status': 'success', 'message': "User '"+name+"' successfully deleted"}
        return {'status': 'error', 'message': "This user doesn't exist"}, 404
    return {'status': 'error', 'message': 'Bad parameters'}, 400

@app.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    usr = current_identity
    if (usr.username != "admin"):
        return {'status': 'error', 'message': 'Your are not allowed to execute this action'}, 403
    res = [user.serialize() for user in User.query.all()]
    return {'status': 'success', 'datas': res}

@app.route('/protected')
@jwt_required()
def protected():
    usr = current_identity
    return ({'protected': "user "+usr.username})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)