/*----Import Configs----*/
const API = require('../config/api_config.json');

export function getServicesList() {
    const req = API.service.serviceList;
    return fetch(req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(responseJson => responseJson.services)
        .catch(error => console.log('error:', error));
}