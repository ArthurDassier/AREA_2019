from pymongo import MongoClient
import requests
import json
from bson.json_util import dumps
from hashlib import sha256


class Mastodon():

    @staticmethod
    def sendPouet(message, visibility, access_token, change):
        if change:
            address = "https://mastodon.social/api/v1/statuses"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/x-www-form-urlencoded"}
            if len(visibility) == 0:
                visibility = "public"
            datas = {"status": message, "visibility": visibility}
            requests.post(address, headers=header, data=datas)

    @staticmethod
    def getPouetSubject(query, access_token):
        query = query.lower()
        address = "https://mastodon.social/api/v1/timelines/public?limit=30"
        header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/x-www-form-urlencoded"}
        r = requests.get(address)
        a = json.loads(r.text)
        if len(a) == 0:
            return {'find': False}
        for item in a:
            if item['content'].lower().find(query) != -1:
                return {'link': item['url'], 'find': True, 'hash': sha256(json.dumps(a, sort_keys=True).encode('utf-8')).hexdigest()}
        return {'find': False}


    @staticmethod
    def getNewPouetSubject(query, applet=None, access_token=None, mongo_client=None):
        pouet = Mastodon.getPouetSubject(query, access_token)
        if pouet['find'] == False:
            return {'url': '', 'change': False}
        pouet['user_id'] = applet['user_id']
        pouet['applet_id'] = applet['_id']
        collec = mongo_client.area.Mastodon.getNewPouetSubject
        prev_pouet = collec.find_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        if prev_pouet == None:
            collec.insert_one(pouet).inserted_id
            return {"link": pouet['link'], "change": False}
        else:
            if pouet['hash'] == prev_pouet['hash']:
                return {"link": pouet['link'], "change": False}
        collec.delete_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        collec.insert_one(pouet).inserted_id
        return {"link": pouet['link'], "change": True}

    @staticmethod
    def getHashtagPouet(hashtag):
        address = "https://mastodon.social/api/v1/timelines/tag/"+hashtag
        r = requests.get(address)
        a = json.loads(r.text)
        if (len(a) <= 0):
            return {'username': '', 'link': '', 'find': False}
        return {'username': a[0]['account']['acct'], 'link': a[0]['url'], 'hash': sha256(json.dumps(a, sort_keys=True).encode('utf-8')).hexdigest(), 'find': True}


    @staticmethod
    def getNewHashtag(hashtag, applet=None, access_token=None, mongo_client=None):
        res = Mastodon.getHashtagPouet(hashtag)
        if res['find'] != True:
            return {'username': '', 'link': '', 'change': False}
        res['user_id'] = applet['user_id']
        res['applet_id'] = applet['_id']
        collec = mongo_client.area.Mastodon.getNewHashtag
        prev_res = collec.find_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        if prev_res == None:
            collec.insert_one(res).inserted_id
            return {'username': res['username'], "link": res['link'], "change": False}
        else:
            if res['hash'] == prev_res['hash']:
                return {'username': res['username'], "link": res['link'], "change": False}
        collec.delete_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        collec.insert_one(res).inserted_id
        return {'username': res['username'], "link": res['link'], "change": True}
