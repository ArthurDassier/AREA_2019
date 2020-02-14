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
            r = requests.post(address, headers=header, data=datas)
            print(r.text)