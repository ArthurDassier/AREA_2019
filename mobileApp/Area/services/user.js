/*----Import Configs----*/
const API = require('../config/api_config.json');

export function logIn(user) {
    const req = API.user.auth;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": user.username,
            "password": user.password
        })
    }).then(response => response.json())
        .catch(error => console.log('error on login:', error));
}

export function register(user) {
    const req = API.user.register;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": user.username,
            "password": user.password,
            "mail": user.mail
        })
    }).then(response => response.json())
        .catch(error => console.log('error on register:', error));
}