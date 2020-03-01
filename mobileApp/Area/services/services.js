/*----Import Configs----*/
const API = require('../config/api_config.json');

export function getServicesList() {
    const req = API.service.serviceList;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error on ServicesList', error));
}

export function getActionList() {
    const req = API.service.actionList;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error on ActionList', error));
}

export function getReactionList() {
    const req = API.service.reactionList;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error on ActionList', error));
}

export function getRightUrlToLog(access_token, serviceData)
{
    let header = API.config.header + API.config.servAddr + ":" + API.config.port;

    let scopeTxt = "scope=";
    serviceData["id"] == "mastodon" ? scopeTxt = "scopes=" : scopeTxt = "scope=";
    serviceData["id"] == "outlook" ? header = API.config.https : header = header;

    const client_id = '?' + 'client_id=' + serviceData["client_id"];
    const redirect_url =  '&' + 'redirect_uri=' + header + "/oauth2-endpoint";
    const response_type = '&' + 'response_type=' + "code";
    const scope = '&' + scopeTxt + serviceData["scope"];
    const access_type = '&' + 'access_type=offline';
    const state = '&' + 'state=' + serviceData["id"] + ',' + access_token;

    const url = serviceData["authorization_uri"] + client_id + redirect_url + response_type + scope + access_type + state;
    console.log(url);
    return url;
}

export function disconnectService(name, access_token) {
    const req = API.service.disconnectService;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url + name, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
        },
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('Error on disconnecting from ' + name, error));
}