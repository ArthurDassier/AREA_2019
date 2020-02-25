import requests
import json
import uuid


class GoogleYoutube():
    
    @staticmethod
    def addVideoToPlaylist(playlist_url, video_url, access_token, change):
        if change:
            video_id = video_url.replace('https://www.youtube.com/watch?v=', '')
            if len(video_id) > 11:
                return
            address = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            datas = json.dumps({
                "snippet": {
                    "playlistId": playlist_url.replace('https://www.youtube.com/playlist?list=', ''),
                    "position": 0,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_id
                    }
                }
            })
            requests.post(address, headers=header, data=datas)

    @staticmethod
    def likeVideo(video_url, access_token, change):
        if change:
            video_id = video_url.replace('https://www.youtube.com/watch?v=', '')
            if len(video_id) > 11:
                return
            address = "https://www.googleapis.com/youtube/v3/videos/rate?id="+video_id+"&rating=like"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            requests.post(address, headers=header)

    @staticmethod
    def commentVideo(video_url, message, access_token, change):
        if change:
            video_id = video_url.replace('https://www.youtube.com/watch?v=', '')
            if len(video_id) > 11:
                return
            address = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            datas = json.dumps({
                "snippet": {
                    "videoId": video_id,
                    "topLevelComment": {
                        "snippet": {
                            "textOriginal": message
                        }
                    }
                }
            })
            requests.post(address, headers=header, data=datas)