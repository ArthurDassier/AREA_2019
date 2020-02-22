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
        .catch(error => console.log('error on SericesList', error));
}

export function getRightUrlToLog(access_token, serviceData)
{
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    const client_id = '?' + 'client_id=' + serviceData["client_id"];
    const redirect_url =  '&' + 'redirect_uri=' + header + "/oauth2-endpoint";
    const response_type = '&' + 'response_type=' + "code";
    const scope = '&' + 'scope=' + serviceData["scope"];
    const access_type = '&' + 'access_type=offline';
    const state = '&' + 'state=' + serviceData["id"] + ',' + access_token;

    const url = serviceData["authorization_uri"] + client_id + redirect_url + response_type + scope + access_type + state;
}