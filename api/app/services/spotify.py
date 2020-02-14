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

    @staticmethod
    def findTrackId(track_name, access_token):
        address = "https://api.spotify.com/v1/search?q="+track_name+"&type=track"
        header = {"Authorization": "Bearer "+access_token}
        r = requests.get(address, headers=header)
        a = json.loads(r.text)
        if 'tracks' in a:
            if 'items' in a['tracks']:
                return a['tracks']['items'][0]['id']
        return ""

    @staticmethod
    def playSong(track_name, track_id, access_token, change):
        if change:
            address = "https://api.spotify.com/v1/me/player/play"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            if len(track_name) != 0:
                track_id = Spotify.findTrackId(track_name, access_token)
            if len(track_id) != 0:
                datas = json.dumps({"uris": ["spotify:track:"+track_id]})
                r = requests.put(address, headers=header, data=datas)
                print(r.text)

    @staticmethod
    def playNextSong(access_token, change):
        if change:
            address = "https://api.spotify.com/v1/me/player/next"
            header = {"Authorization": "Bearer "+access_token}
            requests.post(address, headers=header)

    @staticmethod
    def playPreviousSong(access_token, change):
        if change:
            address = "https://api.spotify.com/v1/me/player/previous"
            header = {"Authorization": "Bearer "+access_token}
            requests.post(address, headers=header)

    @staticmethod
    def getArtistId(artist_name, access_token):
        address = "https://api.spotify.com/v1/search?q="+artist_name+"&type=artist"
        header = {"Authorization": "Bearer "+access_token}
        r = requests.get(address, headers=header)
        a = json.loads(r.text)
        if 'artists' in a:
            if 'items' in a['artists']:
                return a['artists']['items'][0]['id']
        return ""

    @staticmethod
    def getNewAlbum(artist_id, access_token):
        address = "https://api.spotify.com/v1/artists/"+artist_id+"/albums"
        header = {"Authorization": "Bearer "+access_token}
        r = requests.get(address, headers=header)
        a = json.loads(r.text)
        datas = {}
        if 'items' in a and len(a['items']) != 0:
            item = a['items'][0]
            datas['name'] = item['name']
            datas['release_date'] = item['release_date']
            datas['total_tracks'] = str(item['total_tracks'])
            datas['link'] = item['external_urls']['spotify']
            datas['hash'] = sha256(json.dumps(a['items'], sort_keys=True).encode('utf-8')).hexdigest()
        return datas
    
    @staticmethod
    def getArtistNewRelease(artist_name, applet=None, access_token=None, mongo_client=None):
        artist_id = Spotify.getArtistId(artist_name, access_token)
        if len(artist_id) == 0:
            return {'name': None, 'artist': None, 'release_date': None, 'total_tracks': None, 'link': None, "change": False}
        new_album = Spotify.getNewAlbum(artist_id, access_token)
        new_album['user_id'] = applet['user_id']
        new_album['applet_id'] = applet['_id']
        collec = mongo_client.area.Spotify.getArtistNewRelease
        prev_album = collec.find_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        if prev_album == None:
            collec.insert_one(new_album).inserted_id
            return {'name': new_album['name'], 'artist': artist_name, 'release_date': new_album['release_date'], 'total_tracks': new_album['total_tracks'], 'link': new_album['link'], 'change': False}
        else:
            if new_album['hash'] == prev_album['hash']:
                return {'name': new_album['name'], 'artist': artist_name, 'release_date': new_album['release_date'], 'total_tracks': new_album['total_tracks'], 'link': new_album['link'], "change": False}
        collec.delete_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        collec.insert_one(new_album).inserted_id
        return {'name': new_album['name'], 'artist': artist_name, 'release_date': new_album['release_date'], 'total_tracks': new_album['total_tracks'], 'link': new_album['link'], "change": True}
