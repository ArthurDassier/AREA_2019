import requests
import json
import uuid

class Pushbullet():

    @staticmethod
    def getIdenActiveSms(access_token):
        address = "https://api.pushbullet.com/v2/devices"
        header = {"Authorization": "Bearer "+access_token}
        r = requests.get(address, headers=header)
        s = json.loads(r.text)
        for device in s['devices']:
            if "has_sms" in device:
                return device['iden']
        return None

    @staticmethod
    def sendPush(title, body, access_token):
        address = "https://api.pushbullet.com/v2/pushes"
        header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
        datas = json.dumps({"title": title, "body": body, "type": "note"})
        requests.post(address, headers=header, data=datas)

    @staticmethod
    def sendSms(numbers, msg, access_token, change):
        if change != True:
            return
        iden = Pushbullet.getIdenActiveSms(access_token)
        address = "https://api.pushbullet.com/v2/texts"
        header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
        datas = json.dumps({
            "data": {
                "target_device_iden": iden,
                "addresses": numbers.split(" "),
                "message": msg+" "+str(change),
                "guid": uuid.uuid4().hex.upper()[0:20],
                "status": "queued"
            }
        })
        requests.post(address, headers=header, data=datas)