from pymongo import MongoClient
import requests
import json
from bson.json_util import dumps
from hashlib import sha256

class Spotify():
    
    @staticmethod
    def getSavedTracks(applet=None, access_token=None, mongo_client=None):
        address = "https://api.spotify.com/v1/me/tracks"
        header = {"Authorization": "Bearer "+access_token}
        r = requests.get(address, headers=header)
        a = json.loads(r.text)
        res = {'user_id': applet['user_id'], 'applet_id': applet['_id'], 'tracks': []}
        for i in range(len(a['items'])):
            inter = {}
            inter['id'] = a['items'][i]['track']['id']
            inter['name'] = a['items'][i]['track']['name']
            inter['link'] = a['items'][i]['track']['external_urls']['spotify']
            res['tracks'].append(inter)
        res['hash'] = sha256(json.dumps(res['tracks'], sort_keys=True).encode('utf-8')).hexdigest()
        return res

    @staticmethod
    def getNewFav(applet=None, access_token=None, mongo_client=None):
        new_tracks = Spotify.getSavedTracks(applet, access_token, mongo_client)
        collec = mongo_client.area.Spotify.getSavedTracks
        prev_tracks = collec.find_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        if prev_tracks == None:
            collec.insert_one(new_tracks).inserted_id
            return {'title': new_tracks['tracks'][0]['name'], "id": new_tracks['tracks'][0]['id'], "link": new_tracks['tracks'][0]['link'], "change": False}
        else:
            if new_tracks['hash'] == prev_tracks['hash']:
                return {'title': new_tracks['tracks'][0]['name'], "id": new_tracks['tracks'][0]['id'], "link": new_tracks['tracks'][0]['link'], "change": False}
        collec.delete_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        collec.insert_one(new_tracks).inserted_id
        return {'title': new_tracks['tracks'][0]['name'], "id": new_tracks['tracks'][0]['id'], "link": new_tracks['tracks'][0]['link'], "change": True}

    @staticmethod
    def saveTrack(track_id, access_token, change):
        address = "https://api.spotify.com/v1/me/tracks"
        header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
        datas = json.dumps({"ids": [track_id]})
        requests.put(address, headers=header, data=datas)