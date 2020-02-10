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