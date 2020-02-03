/*----Import Configs----*/
const API = require('../config/api_config.json');

export function logIn(user) {
    const req = API.user.auth;
    return fetch(req.url, {
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
        .catch(error => console.log('error:', error));
}

export function register(user) {
    const req = API.user.register;
    return fetch(req.url, {
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
        .catch(error => console.log('error:', error));
}