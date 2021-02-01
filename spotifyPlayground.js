'use strict';

// I will try to code the cases with express instead of request - Paul
const express = require('express');

const app = express();

/* developer key should be set to undefined and will only be change due to setSpotifyClientInfo */
let client_id = '785df100c7994a0da2abeb60862fba8f';
let client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

/* sets local parameters for further operations */
const setSpotifyClientInfo = (userApiKey = null, callback) => {
    if (!userApiKey) {
        return callback(new Error('Spotify API Key: Key is missing'), null);
    };
    if (!userApiKey.id) {
        return callback(new Error('Spotify API Key: client_id is missing.'), null);
    };
    if (!userApiKey.secret) {
        return callback(new Error('Spotify API Key: client_secret is missing.'), null);
    };
    
    client_id = userApiKey.id;
    client_secret = userApiKey.secret;
    
    return callback(null, {client_id, client_secret});
};

/* checks for set client data */
const checkSpotifyClientInfo = (callback) => {
    if (typeof client_id === null || typeof client_secret === null) {
        return callback(new Error('Some client data is missing.'), false);
    } else {
        return callback(null, true)
    };
};

/* deprecated version */
let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        /* should be dynamic */
        Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};

/* creates object for spotify token-request */
class AuthForToken {
    constructor(current_id = client_id, current_secret = client_secret, grantType = 'client_credentials', json = true) {
        this.url = 'https://accounts.spotify.com/api/token';
        this.headers = { Authorization: 'Basic ' + (new Buffer.from(current_id + ':' + current_secret).toString('base64')) };
        this.form = { grant_type: grantType }
        this.json = json;
    };
};

// INSERT NEW CODE ABOVE HERE

module.exports = {
    // interfaces for other project parts
}

/********************************************************
 *              TESTING BELOW THIS BOX                  *
 *******************************************************/


setSpotifyClientInfo({id: 'adawawfafaw121a', secret: '21dib2l23hjawddadeggtjkr'}, (err, data) => {
    if (err) { console.log(err.message); };
    
    console.log(
        'Spotify API Key: Key was set to:\n',
        `\x1b[1m client_id: ${data.client_id}\n`,
        ` client_secret: ${data.client_secret}\x1b[0m`);
});

console.log(`\n\x1b[35mBuffer-Tests:\x1b[0m`)
let myBufferToBase64 = new Buffer.from(client_id + ':' + client_secret).toString('base64');
let myBufferedOII = new Buffer.alloc(3);
myBufferedOII.write('OII, das ist aber ein langer String!')
console.log(myBufferToBase64);
console.log(myBufferedOII);
console.log(myBufferedOII.toString())
console.log(myBufferedOII.toString('base64'));

console.log(`\n\x1b[35mAuthOptions-Tests:\x1b[0m`);
console.log(authOptions);
let currentUserAuth = new AuthForToken(client_id, client_secret, 'client_credentials', true);
console.log(currentUserAuth);
currentUserAuth.headers.Authorization = 'I can finally change every aspect of the AuthOptions for Spotify';
console.log(currentUserAuth);
let defaultUserAuth = new AuthForToken();
console.log(defaultUserAuth);
