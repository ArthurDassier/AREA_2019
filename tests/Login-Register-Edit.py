import requests
import json

ADDRESS = "http://jarvis-app.fr"
PORT = "8090"
JWT_TOKEN = ""

def registerAdmin():
    data = json.dumps({'username': 'admin', 'password': 'IamThePassword', 'mail': 'admin@ad.fr'})
    header = {"content-type": "application/json"}
    r = requests.post(ADDRESS+":"+PORT+"/register", data=data, headers=header)
    a = json.loads(r.text)
    if (r.status_code != 200 or a['status'] != "success"):
        return False
    return True

def registerSameUser():
    data = json.dumps({'username': 'admin', 'password': 'IamThePassword', 'mail': 'admin@ad.fr'})
    header = {"content-type": "application/json"}
    r = requests.post(ADDRESS+":"+PORT+"/register", data=data, headers=header)
    a = json.loads(r.text)
    if (r.status_code != 409 or a['status'] != "error"):
        return False
    return True

def login():
    global JWT_TOKEN
    data = json.dumps({'username': 'admin', 'password': 'IamThePassword'})
    header = {"content-type": "application/json"}
    r = requests.post(ADDRESS+":"+PORT+"/auth", data=data, headers=header)
    JWT_TOKEN = json.loads(r.text)['access_token']
    if (r.status_code != 200):
        return False
    return True

def loginBadPassword():
    data = json.dumps({'username': 'admin', 'password': 'bad'})
    header = {"content-type": "application/json"}
    r = requests.post(ADDRESS+":"+PORT+"/auth", data=data, headers=header)
    if (r.status_code != 401):
        return False
    return True

def loginBadUsername():
    data = json.dumps({'username': 'admin9', 'password': 'IamThePassword'})
    header = {"content-type": "application/json"}
    r = requests.post(ADDRESS+":"+PORT+"/auth", data=data, headers=header)
    if (r.status_code != 401):
        return False
    return True

def getUserDatas():
    global JWT_TOKEN
    header = {"content-type": "application/json", "Authorization": "JWT "+JWT_TOKEN}
    r = requests.get(ADDRESS+":"+PORT+"/user", headers=header)
    a = json.loads(r.text)
    if (r.status_code != 200 or a['mail'] != "admin@ad.fr" or a['username'] != "admin"):
        return False
    return True

def modUserInfos():
    global JWT_TOKEN
    header = {"content-type": "application/json", "Authorization": "JWT "+JWT_TOKEN}
    data = json.dumps({'mail': 'newMail@mail.com', 'password': 'newPass'})
    r = requests.put(ADDRESS+":"+PORT+"/user", data=data, headers=header)
    a = json.loads(r.text)
    if (r.status_code != 200 or a['status'] != "success"):
        return False
    
    header = {"content-type": "application/json", "Authorization": "JWT "+JWT_TOKEN}
    r = requests.get(ADDRESS+":"+PORT+"/user", headers=header)
    a = json.loads(r.text)
    if (r.status_code != 200 or a['mail'] != "newMail@mail.com"):
        return False
    return True

def getAllUsersInfos():
    global JWT_TOKEN
    data = json.dumps({'username': 'jack', 'password': 'my_jack', 'mail': 'jack@ad.fr'})
    header = {"content-type": "application/json"}
    requests.post(ADDRESS+":"+PORT+"/register", data=data, headers=header)

    header = {"content-type": "application/json", "Authorization": "JWT "+JWT_TOKEN}
    r = requests.get(ADDRESS+":"+PORT+"/users", headers=header)
    a = json.loads(r.text)
    if (r.status_code != 200 or len(a['datas']) != 2):
        return False
    return True


def testRegisterAdmin():
    assert registerAdmin() == True

def testUsernameAlreadyUse():
    assert registerSameUser() == True

def testLogin():
    assert login() == True

def testLoginBadPassword():
    assert loginBadPassword() == True

def testLoginBadUsername():
    assert loginBadUsername() == True

def testGetUserDatas():
    assert getUserDatas() == True

def testModUserInfos():
    assert modUserInfos() == True

def testGetAllUsersInfos():
    assert getAllUsersInfos() == True