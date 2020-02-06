import requests
import json

class Spotify():
    access_token = ""

    def __init__(self, access_token):
        self.access_token = access_token

    def getSavedTracks(self, access_token=None):
        if (access_token != None):
            self.access_token = access_token
        address = "https://api.spotify.com/v1/me/tracks"
        header = {"Authorization": "Bearer "+self.access_token}
        r = requests.get(address, headers=header)
        a = json.loads(r.text)
        return a

    def saveTrack(self, track_id, access_token=None):
        if (access_token != None):
            self.access_token = access_token
        address = "https://api.spotify.com/v1/me/tracks"
        header = {"Authorization": "Bearer "+self.access_token, "Content-Type": "application/json"}
        datas = json.dumps({"ids": [track_id]})
        requests.put(address, headers=header, data=datas)