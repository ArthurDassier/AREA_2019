import requests
import json
import uuid


class GoogleYoutube():
    
    @staticmethod
    def addVideoToPlaylist(playlist_url, video_url, access_token, change):
        if change:
            address = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet"
            header = {"Authorization": "Bearer "+access_token, "Content-Type": "application/json"}
            datas = json.dumps({
                "snippet": {
                    "playlistId": playlist_url.replace('https://www.youtube.com/playlist?list=', ''),
                    "position": 0,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": video_url.replace('https://www.youtube.com/watch?v=', '')
                    }
                }
            })
            requests.post(address, headers=header, data=datas)