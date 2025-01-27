from flask import Flask, render_template, request, make_response, g, jsonify, Response
import os
import socket
import random
import json
import sys
import datetime
import time
import requests
from flask_sqlalchemy import SQLAlchemy
import hashlib
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from services.spotify import *
from services.pushbullet import *
from pymongo import MongoClient
from bson import Binary, Code
from bson.json_util import dumps
from bson.objectid import ObjectId
import base64
from get_ip import *

SERVER_ADDRESS = os.environ['SERVER_ADDRESS']
SERVER_IP = get_ip_address()
JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
DATABASE_URI = 'postgres+psycopg2://postgres:password@db:5432/area'
OAUTH_CLIENT_ID_GOOGLE = os.environ['OAUTH_CLIENT_ID_GOOGLE']
CLIENTS_SECRET = {'google': os.environ['GOOGLE_CLIENT_SECRET'], 'spotify': os.environ['SPOTIFY_CLIENT_SECRET'], 'pushbullet': os.environ['PUSHBULLET_CLIENT_SECRET'], 'github': os.environ['GITHUB_CLIENT_SECRET'], 'mastodon': os.environ['MASTODON_CLIENT_SECRET'], 'outlook': os.environ['OUTLOOK_CLIENT_SECRET']}
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SECRET_KEY'] = JWT_SECRET_KEY
app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(days=1)
cors = CORS(app, resources={"/*": {"origins": "*"}})
with open("static/services.json", "r") as fp:
    SERVICES = json.load(fp)
    fp.close()
db = SQLAlchemy(app)
mongo_client = MongoClient('mongo', 27017, username=os.environ['MONGO_USERNAME'], password=os.environ['MONGO_PASSWORD'])
SERVICES_NAMES = ['google-calendar', 'google-youtube', 'google-drive', 'spotify', 'pushbullet', 'github', 'mastodon', 'outlook']


class OAuthTokens(db.Model):
    __tablename__ = 'oauthtokens'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service = db.Column(db.String(20))
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
    tokens = db.relationship('OAuthTokens', uselist=True, lazy=True)

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


def getServicesStatus(user_id):
    res = {}
    tokens = OAuthTokens.query.filter_by(user_id=user_id).all()
    for service in SERVICES_NAMES:
        found = False
        for token in tokens:
            if service == token.service:
                res[service] = True
                found = True
                break
        if found != True:
            res[service] = False
    return (res)


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


@app.route('/applets', methods=['GET', 'POST'])
@jwt_required()
def applets():
    usr = current_identity
    collec = mongo_client.area.applets
    if request.method == 'POST':
        datas = request.get_json(force=True)
        datas['user_id'] = usr.id
        collec.insert_one(datas).inserted_id
        return {"status": "success", "message": "Applet "+datas['name']+" successfully added."}
    if request.method == 'GET':
        applets = collec.find({'user_id': usr.id})
        resp = {'status': "success", "datas": []}
        for a in applets:
            resp['datas'].append(a)
        for i in range(len(resp['datas'])):
            resp['datas'][i]['_id'] = str(resp['datas'][i]['_id'])
        return dumps(resp)

@app.route('/applets/<string:id>', methods=['DELETE'])
@app.route('/applets/<string:id>/<string:status>', methods=['GET', 'PUT', 'PATCH'])
@jwt_required()
def appletUpdate(id, status=None):
    usr = current_identity
    collec = mongo_client.area.applets
    if len(id) != 24:
        return {'status': 'error', 'message': 'Invalid applet id (too short).'}
    if request.method == 'DELETE':
        collec.delete_one({'user_id': usr.id, '_id': ObjectId(id)})
        return {'status': 'success', 'message': 'Applet successfully deleted.'}
    if request.method == 'GET':
        applet = collec.find_one({'user_id': usr.id, '_id': ObjectId(id)})
        if applet:
            return {'status': 'success', 'datas': dumps(applet)}
    if request.method == 'PUT':
        datas = {'$set': request.get_json(force=True)}
        collec.update_one({'user_id': usr.id, '_id': ObjectId(id)}, datas)
        return {'satus': 'success', 'message': "Applet "+id+" successfully updated."}
    if request.method == 'PATCH':
        status_res = ""
        datas = None
        if status:
            if status == "enable":
                applet = collec.find_one({'user_id': usr.id, '_id': ObjectId(id)})
                datas = {'$set': {'enable': True}}
                status_res = "enabled"
                actionService = applet['action']['name'].split('.')[0].lower()
                reactionService = applet['reaction']['name'].split('.')[0].lower()
                activatedServices = getServicesStatus(usr.id)
                if (activatedServices[actionService] == False):
                    return {'status': 'error', 'message': "Your are not connected to the "+actionService+" service. You have to be connected to the service of the applet to enable it."}
                if (activatedServices[reactionService] == False):
                    return {'status': 'error', 'message': "Your are not connected to the "+reactionService+" service. You have to be connected to the service of the applet to enable it."}
            elif status == "disable":
                datas = {'$set': {'enable': False}}
                status_res = "disabled"
            if datas:
                collec.update_one({'user_id': usr.id, '_id': ObjectId(id)}, datas)
                return {'status': 'success', 'message': "Applet successfully "+status_res+"."}
        return {'status': 'error', 'message': "Status parameter is missing or incorrect ('enable' or 'disable')"}


# Return client secret of a service. But if this service
# is an under service like google calendar for google service
# it return the client secret from google
def getClientSecret(service_name):
    if ('-' in service_name):
        return CLIENTS_SECRET[service_name[:service_name.index('-')]]
    return CLIENTS_SECRET[service_name]    


def OAuth2GetTokens(service_name, user_id, code):
    header = {"content-type": "application/x-www-form-urlencoded", "Accept": "application/json"}
    redirect_uri = "https://area.ngrok.io" if service_name == "outlook" else SERVER_ADDRESS
    data = {
        'code': code,
        'client_id': SERVICES[service_name]['client_id'],
        'client_secret': getClientSecret(service_name),
        'redirect_uri': redirect_uri+SERVICES['endpoint_path'],
        'grant_type': 'authorization_code'
    }
    r = requests.post(SERVICES[service_name]['token_uri'], data=data, headers=header)
    a = json.loads(r.text)
    if ('error' in a):
        return {'status': 'error', 'message': 'Bad request'}
    token = OAuthTokens.query.filter_by(service=service_name, user_id=user_id).first()
    if token == None:
        refresh_token = a['refresh_token'] if 'refresh_token' in a else None
        refresh_time = int(datetime.datetime.now().timestamp()) if 'expires_in' in a else -1
        token = OAuthTokens(user_id, service_name, a['access_token'], refresh_token, refresh_time)
    else:
        token.access_token = a['access_token']
        if 'refresh_token' in a:
            token.refresh_token = a['refresh_token']
        if 'expires_in' in a:
            token.refresh_time = int(datetime.datetime.now().timestamp())
        else:
            token.refresh_time = -1
    token.save()
    return {'status': 'success', 'message': service_name+' service successfuly added.'}


@app.route('/oauth2-endpoint', methods=['GET'])
def OAuth2():
    if ('state' in request.args and 'code' in request.args):
        if (',' in request.args.get('state') == False):
            return {'satus': 'error', 'message': "',' separator is missing in state parameters"}
        state = request.args.get('state').split(',')
        code = request.args.get('code')
        service_name = state[0]
        token = state[1]
        first = token[token.find('.')+1:]
        second = first[:first.find('.')]+"="
        user_id = json.loads(base64.b64decode(second))['identity']
        if (service_name in SERVICES_NAMES):
            return OAuth2GetTokens(service_name, user_id, code)
    return {'satus': 'error', 'message': 'Code or state parameters is missing.'}


@app.route('/services', methods=['GET', 'DELETE'])
@app.route('/services/<string:service_name>', methods=['GET', 'DELETE'])
@jwt_required()
def getActiveServices(service_name=None):
    usr = current_identity    
    if request.method == 'GET':
        return getServicesStatus(usr.id)
    if request.method == 'DELETE':
        if service_name not in SERVICES_NAMES :
            return {'status': 'error', 'message': "This service doesn't exist."}
        if service_name != None:
            tokens = OAuthTokens.query.filter_by(service=service_name).all()
            for tok in tokens:
                if usr.id == tok.user_id:
                    tok.delete()
                    collec = mongo_client.area.applets
                    applets = collec.find({'user_id': usr.id})
                    for appl in applets:
                        if appl['action']['name'].split('.')[0].lower() == service_name or appl['reaction']['name'].split('.')[0].lower() == service_name:
                            datas = {'$set': {'enable': False}}
                            collec.update_one({'user_id': usr.id, '_id': ObjectId(appl['_id'])}, datas)
                    return {'status': 'success', 'message': 'Service successfully deleted.'}
            return {'status': 'error', 'message': "This service wasn't activated."}
        return {'status': 'error', 'message': "Undefined service"}

@app.route('/about.json', methods=['GET'])
def about():
    with open("static/about.json", "r") as fp:
        datas = json.load(fp)
        fp.close()
    datas['client']['host'] = SERVER_IP
    datas['server']['current_time'] = int(time.time())
    return make_response(json.dumps(datas), 200, {'Content-Type':'application/json'})

@app.route('/protected')
@jwt_required()
def protected():
    usr = current_identity
    return ({'protected': "user "+usr.username})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True, threaded=True)