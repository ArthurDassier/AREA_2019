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
from google.oauth2 import id_token
from google.auth.transport import requests as grequests

SERVER_ADDRESS = os.environ['SERVER_ADDRESS']
JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
DATABASE_URI = 'postgres+psycopg2://postgres:password@db:5432/area'
OAUTH_CLIENT_ID_GOOGLE = os.environ['OAUTH_CLIENT_ID_GOOGLE']
CLIENTS_SECRET = {'google': os.environ['GOOGLE_CLIENT_SECRET']}
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(days=1)
cors = CORS(app, resources={"/*": {"origins": "*"}})
with open("static/services.json", "r") as fp:
    SERVICES = json.load(fp)
db = SQLAlchemy(app)
SERVICES_NAMES = ['google']


class OAuthTokens(db.Model):
    __tablename__ = 'oauthtokens'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer)
    service = db.Column(db.String(3))
    access_token = db.Column(db.String(2048))
    refresh_token = db.Column(db.String(512))
    refresh_time = db.Column(db.Integer)

    def __init__(self, user_id, service, access_token=None, refresh_token=None, refresh_time=None):
        self.user_id = user_id
        self.service = service
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.refresh_time = refresh_time

    def serialize(self):
        return {
            'id': self.id, 
            'user_id': self.user_id,
            'service': self.service,
            'access_token': self.access_token,
            'refresh_token': self.refresh_token,
            'refresh_time': self.refresh_time
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<Id %r User_id: %r Service: %r Access: %r Refresh: %r Time: %r>' % (self.id, self.user_id, self.service, self.access_token, self.refresh_token, self.refresh_time)


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50))
    mail = db.Column(db.String(130))    
    password = db.Column(db.String(100))
    google_id = db.Column(db.String(21))
    google_tokens = db.relationship('OAuthTokens', uselist=True, lazy=True)

    def __init__(self, username, mail, password, google_id=None):
        self.username = username
        self.mail = mail
        if password != None:
            self.password = sha256(password)
        self.google_id = google_id

    def verify_hash(self, password):
        if (safe_str_cmp(self.password, sha256(password))):
            return (True)
        return (False)

    def serialize(self):
        return {
            'id': self.id, 
            'username': self.username,
            'mail': self.mail,
            'google_id': self.google_id
        }
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return '<Id %r Users %r Pass: %r GoogleId: %r>' % (self.id, self.username, self.password, self.google_id)

def sha256(string):
    res = hashlib.sha256(string.encode()).hexdigest()
    return (res)

def authenticate(username, password):
    if (username == "google_token"):
        data = verify_google_token(password)
        if (data != None):
            user = User.query.filter_by(google_id=data['sub']).first()
            if (user):
                return user
    else:
        user = User.query.filter_by(username=username).first()
        if user and user.verify_hash(password):
            return user

def identity(payload):
    user_id = payload['identity']
    return User.query.filter_by(id=user_id).first()

def verify_google_token(token):
    try:
        idinfo = id_token.verify_oauth2_token(token, grequests.Request(), OAUTH_CLIENT_ID_GOOGLE)
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            return None
        return (idinfo)
    except ValueError:
        return None

jwt = JWT(app, authenticate, identity)

db.create_all()
db.session.commit()

@app.route("/", methods=['POST', 'GET'])
def home():
    return {'status': 'success', 'message': 'Welcome on Dashboard API.'}

@app.route("/register", methods=['POST'])
def register():
    if (len(request.json) != 3 and len(request.json) != 1):
        return {'status': 'error', 'message': 'bad parameters'}, 400
    if ('google_token' in request.json):
        user_data = verify_google_token(request.json['google_token'])
        if user_data == None:
            return {'status': 'error', 'message': 'Error during google authentification'}
        if (User.query.filter_by(google_id=user_data['sub']).first() is None and User.query.filter_by(mail=user_data['email']).first() is None):
            new_user = User(user_data['given_name']+" "+user_data['family_name'], user_data['email'], None, user_data['sub'])
            new_user.save()
            return {'status': 'success', 'message': 'Register Success'}
    else:
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
        if ('mail' in request.json == False and 'password' in request.json == False):
            return {'status': 'error', 'message': "Bas parameters"}
        if ('mail' in request.json):
            usr.mail = request.json['mail']
        if ('password' in request.json):
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

def OAuth2GetTokens(service_name, code):
    header = {"content-type": "application/x-www-form-urlencoded"}
    data = {
        'code': code,
        'client_id': SERVICES[service_name]['client_id'],
        'client_secret': CLIENTS_SECRET[service_name],
        'redirect_uri': SERVER_ADDRESS+SERVICES['endpoint_path'],
        'grant_type': 'authorization_code'
    }
    r = requests.post(SERVICES[service_name]['token_uri'], data=data, headers=header)
    a = json.loads(r.text)
    return a

@app.route('/oauth2-endpoint', methods=['GET'])
# @jwt_required()
def OAuth2():
    state = request.args.get('state').split(';')
    code = request.args.get('code')
    service_name = state[0]
    user_id = state[1]
    if (service_name in SERVICES_NAMES):
        #TODO: Sauvegarder les tokens dans la bonne table avec le bon user 
        return OAuth2GetTokens(service_name, code)
    return "salut"


@app.route('/protected')
@jwt_required()
def protected():
    usr = current_identity
    return ({'protected': "user "+usr.username})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)