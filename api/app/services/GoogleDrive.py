import requests
import json
import uuid


class GoogleDrive():
    
    @staticmethod
    def uploadTextFile(name, text, description, access_token, change):
        if change:
            address = "https://www.googleapis.com/upload/drive/v3/files?uploadType=media"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "text/plain"}
            datas = text
            r = requests.post(address, headers=header, data=datas)
            recv = json.loads(r.text)
            if 'error' in recv:
                return
            address = "https://www.googleapis.com/drive/v3/files/"+recv['id']
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            datas = json.dumps({
                "name": name,
                "description": description
            })
            requests.patch(address, headers=header, data=datas)