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

export function getUserInfo(access_token) {
    const req = API.user.userInfo;
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
        .catch(error => console.log('error on getting user info:', error));
}

export function getUserServices(access_token) {
    const req = API.user.userServices;
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
        .catch(error => console.log('error on getting user services:', error));
}

export function getUsers(access_token) {
    const req = API.user.getUsers;
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
        .catch(error => console.log('error on getting user list:', error));
}

export function delUser(access_token, id) {
    const req = API.user.delUser;
    const header = API.config.header + API.config.servAddr + ":" + API.config.port;
    return fetch(header + req.url + id, {
        method: req.method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + access_token
        }
    }).then(response => response.json())
        .then(responseJson => responseJson)
        .catch(error => console.log('error on deleting user: ', error));
}