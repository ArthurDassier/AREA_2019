ACTIONS = {
    "TwitterMention": {
        "service": "twitter",
        "params": [],
        "datas": [
            "user",
            "message",
            "link"
        ]
    },
    "SpotifyNewInPlaylist": {
        "service": "spotify",
        "params": [
            "playlist_id"
        ],
        "datas": [
            "song_id"
        ]
    }
}

REACTIONS = {
    "TwitterMp": {
        "service": "twitter",
        "params": [
            "user",
            "msg",
        ]
    }
}

APPLETS = [
    {
        "id": 43,
        "user_id": 1,
        "action": {
            "name": "TwitterMention",
            "params": {}
        },
        "reaction": {
            "name": "TwitterMp",
            "params": {
                "user": "$user",
                "msg": "Wesh mon gas bien ou bien ? J'ai vu ton message: $message"
            } 
        }
    },
    {
        "id": 44,
        "user_id": 1,
        "action": {
            "name": "SpotifyNewInPlaylist",
            "params": {
                "playlist_id": "PL_233FEZF3D2F"
            }
        },
        "reaction": {
            "name": "TwitterMp",
            "params": {
                "user": "Paul",
                "msg": "Ecoute ce nouveau son $song_id !"
            } 
        }
    }
]

def TwitterMention():
    #regarde dans sa memooire les derniers tweet av mention
    return({"user": "Paulo76", "message": "Ca va Poto ?", "link": "https://"})

def getFavArtists():
    return("linking-park guizmo sia booba".split(' '))

def getLastRelease(c):
    return("booba kaaris rhianna sefyu eminem".split(' '))

def tweet(msg):
    print(msg+" tweeté !")

def SpotifyNewInPlaylist(playlist_id):
    return {"song_id": "SO_234523"}

def TwitterMp(user, msg):
    # user, msg = params
    print("msg '"+msg+"' envoyé à "+user)

def replaceInReaction(applet, resAction):
    action_name = applet['action']['name']
    reaction_name = applet['reaction']['name']
    params_name = REACTIONS[reaction_name]['params']
    for param in params_name:
        for data in ACTIONS[action_name]['datas']:
            applet['reaction']['params'][param] = applet['reaction']['params'][param].replace("$"+data, resAction[data])
    return applet

def exec(applet):
    myFc = {
        "TwitterMention": TwitterMention,
        "getLastRelease": getLastRelease,
        "tweet": tweet,
        "SpotifyNewInPlaylist": SpotifyNewInPlaylist,
        "TwitterMp": TwitterMp
    }
    datas = myFc[applet['action']['name']](**applet['action']['params'])
    applet = replaceInReaction(applet, datas)
    myFc[applet['reaction']['name']](**applet['reaction']['params'])

def main():
    exec(APPLETS[1])

if __name__ == "__main__":
    main()