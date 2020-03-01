const API = require('../config/api_config.json');


export function getApplets(access_token) {
    const req = API.applet.getApplet;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
        }
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error on getting user applets:', error));
}

export function createApplet(applet, access_token) {
    const req = API.applet.createApplet;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
        },
        body: JSON.stringify(applet)
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error while creating the applet:', error));
}
export function deletApplet(applet_id, access_token) {
    const req = API.applet.deletApplet;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url + applet_id, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
        }
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error while deleting the applet:', error));
}
export function changeStateApplet(applet_id, access_token, state) {
    if (state) {
        state = "enable";
    } else {
        state = "disable";
    }
    const req = API.applet.changeStateApplet;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url + applet_id + "/" + state, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
        }
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error while deleting the applet:', error));
}