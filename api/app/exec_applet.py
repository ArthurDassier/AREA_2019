from pymongo import MongoClient
from services.spotify import *
from services.pushbullet import *
from services.GoogleCalendar import *
from services.github import *
from services.GoogleYoutube import *
import psycopg2
import os
import datetime
import time

from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Table, Column, Integer, String, ForeignKey, create_engine
from sqlalchemy.orm import relationship
from bson.objectid import ObjectId

CLIENTS_SECRET = {'google': os.environ['GOOGLE_CLIENT_SECRET'], 'spotify': os.environ['SPOTIFY_CLIENT_SECRET'], 'pushbullet': os.environ['PUSHBULLET_CLIENT_SECRET'], 'github': os.environ['GITHUB_CLIENT_SECRET']}
SERVICES_NAMES = ['google-calendar', 'google-youtube', 'google-drive', 'spotify', 'pushbullet', 'github']
MONGO_USERNAME = os.environ['MONGO_USERNAME']
MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
with open("static/services.json", "r") as fp:
    SERVICES = json.load(fp)
with open("static/actions.json", "r") as fp:
    ACTIONS = json.load(fp)
with open("static/reactions.json", "r") as fp:
    REACTIONS = json.load(fp)
engine = create_engine("postgres://postgres:password@db:5432/area")
Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

class OAuthTokens(Base):
    __tablename__ = 'oauthtokens'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    service = Column(String)
    access_token = Column(String)
    refresh_token = Column(String)
    refresh_time = Column(Integer)

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
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    def __repr__(self):
        return '<Id %r User_id: %r Service: %r Access: %r Refresh: %r Time: %r>' % (self.id, self.user_id, self.service, self.access_token, self.refresh_token, self.refresh_time)


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    mail = Column(String)    
    password = Column(String)
    google_id = Column(String)
    tokens = relationship('OAuthTokens')

    def __init__(self, username, mail, password, google_id=None):
        self.username = username
        self.mail = mail
        self.password = password
        self.google_id = google_id

    def serialize(self):
        return {
            'id': self.id, 
            'username': self.username,
            'mail': self.mail,
            'google_id': self.google_id
        }
    
    def save(self):
        session.add(self)
        session.commit()

    def delete(self):
        session.delete(self)
        session.commit()

    def __repr__(self):
        return '<Id %r Users %r Pass: %r GoogleId: %r>' % (self.id, self.username, self.password, self.google_id)

def getClientSecret(service_name):
    if ('-' in service_name):
        return CLIENTS_SECRET[service_name[:service_name.index('-')]]
    return CLIENTS_SECRET[service_name]    

def refreshAccessToken(service_name, user_id):
    token = session.query(OAuthTokens).filter_by(service=service_name, user_id=user_id).first()
    if token != None:
        header = {"content-type": "application/x-www-form-urlencoded"}
        data = {
            'client_id': SERVICES[service_name]['client_id'],
            'client_secret': getClientSecret(service_name),
            'refresh_token': session.query(OAuthTokens).filter_by(service=service_name, user_id=user_id).first().refresh_token,
            'grant_type': 'refresh_token'
        }
        r = requests.post(SERVICES[service_name]['token_uri'], data=data, headers=header)
        a = json.loads(r.text)
        token.access_token = a['access_token']
        token.refresh_time = int(datetime.datetime.now().timestamp())
        token.save()

def replaceInReaction(applet, resAction):
    action_name = applet['action']['name']
    reaction_name = applet['reaction']['name']
    params_name = REACTIONS[reaction_name]['params']
    for param in params_name:
        for data in ACTIONS[action_name]['datas']:
            applet['reaction']['params'][param] = applet['reaction']['params'][param].replace("$"+data, resAction[data])
    return applet

def exec(mongo_client, applet):
    myFc = {
        "Spotify.getNewFav": Spotify.getNewFav,
        "Spotify.playSong": Spotify.playSong,
        "Spotify.playNextSong": Spotify.playNextSong,
        "Spotify.playPreviousSong": Spotify.playPreviousSong,
        "Spotify.getArtistNewRelease": Spotify.getArtistNewRelease,
        "Pushbullet.sendSms": Pushbullet.sendSms,
        "Pushbullet.sendPush": Pushbullet.sendPush,
        "GoogleCalendar.addEvent": GoogleCalendar.addEvent,
        "Github.getNewIssue": Github.getNewIssue,
        "Github.getNewPullRequest": Github.getNewPullRequest,
        "GoogleYoutube.addVideoToPlaylist": GoogleYoutube.addVideoToPlaylist
    }
    
    action = session.query(OAuthTokens).filter_by(service=ACTIONS[applet['action']['name']]['service'], user_id=applet['user_id']).first()
    reaction = session.query(OAuthTokens).filter_by(service=REACTIONS[applet['reaction']['name']]['service'], user_id=applet['user_id']).first()
    if action.refresh_token != None:
        refreshAccessToken(ACTIONS[applet['action']['name']]['service'], applet['user_id'])
        action = session.query(OAuthTokens).filter_by(service=ACTIONS[applet['action']['name']]['service'], user_id=applet['user_id']).first()
    if reaction.refresh_token != None:
        refreshAccessToken(REACTIONS[applet['reaction']['name']]['service'], applet['user_id'])
        reaction = session.query(OAuthTokens).filter_by(service=REACTIONS[applet['reaction']['name']]['service'], user_id=applet['user_id']).first()
    datas = myFc[applet['action']['name']](**applet['action']['params'], applet=applet, access_token=action.access_token, mongo_client=mongo_client)
    applet = replaceInReaction(applet, datas)
    myFc[applet['reaction']['name']](**applet['reaction']['params'], access_token=reaction.access_token, change=datas['change'])

def main():
    client = MongoClient("mongo", 27017, username=MONGO_USERNAME, password=MONGO_PASSWORD)
    collec = client.area.applets
    while True:
        applets = collec.find()
        for applet in applets:
            if applet['enable'] == True and int(time.time()) - applet['last_refresh'] > applet['refresh_time'] * 60:
                exec(client, applet)
                collec.update_one({'_id': applet['_id']}, {'$set': {'last_refresh': int(time.time())}})
                applet['last_refresh'] = int(time.time())

if __name__ == "__main__":
    main()