from pymongo import MongoClient
import requests
import json
from bson.json_util import dumps
from hashlib import sha256


class Outlook():

    @staticmethod
    def sendMail(mail, subject, content, access_token, change):
        if change:
            address = "https://outlook.office.com/api/v2.0/me/sendmail"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            datas = json.dumps({
                "Message": {
                    "Subject": subject,
                    "Body": {
                        "ContentType": "Text",
                        "Content": content
                    },
                    "ToRecipients": [
                    {
                        "EmailAddress": {
                            "Address": mail
                        }
                    }
                    ]
                }
            })
            requests.post(address, headers=header, data=datas)