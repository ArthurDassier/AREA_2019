from pymongo import MongoClient
import requests
import json
from bson.json_util import dumps
from hashlib import sha256


class Github():

    @staticmethod
    def sampleRequest(end_url, repo_url, access_token):
        repo_url = repo_url.replace('https://github.com/', '')
        if repo_url[-1] == '/':
            repo_url = repo_url[:len(repo_url)-1]
        print(repo_url)
        address = "https://api.github.com/repos/"+repo_url+"/"+end_url
        header = {"Authorization": "Bearer "+access_token}
        r = requests.get(address, headers=header)
        a = json.loads(r.text)
        if 'message' in a:
            if a['message'] == "Not Found":
                return {'title': '', 'body': '', 'link': '', 'success': False}
        hash = sha256(json.dumps(a, sort_keys=True).encode('utf-8')).hexdigest()
        return {'title': a[0]['title'], 'body': a[0]['body'], 'link': a[0]['html_url'], 'hash': hash, 'success': True}

    @staticmethod
    def getIssue(repo_url, access_token):
        return Github.sampleRequest("issues?filter=all", repo_url, access_token)

    @staticmethod
    def getPullRequest(repo_url, access_token):
        return Github.sampleRequest("pulls?direction=desc", repo_url, access_token)

    @staticmethod
    def getNewIssue(repo_url, applet=None, access_token=None, mongo_client=None):
        new_issues = Github.getIssue(repo_url, access_token)
        if new_issues['success'] == False:
            return {'title': '', 'body': '', 'link': '', 'change': False}
        collec = mongo_client.area.Github.getNewIssues
        prev_issue = collec.find_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        if prev_issue == None:
            collec.insert_one(new_issues).inserted_id
            return {'title': new_issues['title'], 'body': new_issues['body'], 'link': new_issues['link'], 'change': False}
        else:
            if new_issues['hash'] == prev_issue['hash']:
                return {'title': new_issues['title'], 'body': new_issues['body'], 'link': new_issues['link'], 'change': False}
        collec.delete_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        collec.insert_one(new_issues).inserted_id
        return {'title': new_issues['title'], 'body': new_issues['body'], 'link': new_issues['link'], 'change': True}

    @staticmethod
    def getNewPullRequest(repo_url, applet=None, access_token=None, mongo_client=None):
        new_pr = Github.getPullRequest(repo_url, access_token)
        if new_pr['success'] == False:
            return {'title': '', 'body': '', 'link': '', 'change': False}
        collec = mongo_client.area.Github.getNewPullRequest
        prev_pr = collec.find_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        if prev_pr == None:
            collec.insert_one(new_pr).inserted_id
            return {'title': new_pr['title'], 'body': new_pr['body'], 'link': new_pr['link'], 'change': False}
        else:
            if new_pr['hash'] == prev_pr['hash']:
                return {'title': new_pr['title'], 'body': new_pr['body'], 'link': new_pr['link'], 'change': False}
        collec.delete_one({'user_id': applet['user_id'], 'applet_id': applet['_id']})
        collec.insert_one(new_pr).inserted_id
        return {'title': new_pr['title'], 'body': new_pr['body'], 'link': new_pr['link'], 'change': True}