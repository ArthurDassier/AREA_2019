from pymongo import MongoClient
import requests
import json
from bson.json_util import dumps
from hashlib import sha256

class GoogleCalendar():
    
    @staticmethod
    def addEvent(title, description, location, start, end, access_token, change):
        if change:
            if ' ' in start and ' ' in end:
                address = "https://www.googleapis.com/calendar/v3/calendars/primary/events"
                header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
                datas = json.dumps({
                    "summary": title,
                    "description": description,
                    "location": location,
                    "start": {
                        "dateTime": start.replace(' ', 'T')+".000Z"
                    },
                    "end": {
                        "dateTime": end.replace(' ', 'T')+".000Z"
                    }}
                )
                requests.post(address, headers=header, data=datas)