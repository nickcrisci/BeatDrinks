'use strict';

// I will try to code the cases with express instead of request
const express = require('express');

const app = express();

/* developer key should be set to undefined and will only be change due to setSpotifyClientInfo */
let client_id = '785df100c7994a0da2abeb60862fba8f';
let client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

/* sets local parameters for further operations */
const setSpotifyClientInfo = (userApiKey = undefined, callback) => {
    if (!userApiKey) {
        return callback(Error('Spotify API Key: Key is missing'), null);
    };
    if (!userApiKey.id) {
        return callback(Error('Spotify API Key: client_id is missing.'), null);
    };
    if (!userApiKey.secret) {
        return callback(Error('Spotify API Key: client_secret is missing.'), null);
    };
    
    client_id = userApiKey.id;
    client_secret = userApiKey.secret;
    
    return callback(null, {client_id, client_secret});
};

/* checks for set client data */
const checkSpotifyClientInfo = (callback) => {
    if (client_id != undefined && client_secret != undefined) {
        return callback(Error('Some client data is missing.'), false);
    } else {
        return callback(null, true)
    };
};

/* json object to receive token for actual requests */
let authOptions = { // should be set dynamically since client data might be changed !!!
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};

// INSERT NEW CODE ABOVE HERE

module.exports = {
    setSpotifyClientInfo
    // interfaces for other project parts
}

/********************************************************
 *              TESTING BELOW THIS BOX                  *
 *******************************************************/

/*
setSpotifyClientInfo({id: 'adawawfafaw121a', secret: '21dib2l23hjawddadeggtjkr'}, (err, data) => {
    if (err) { console.log(err.message); };
    
    console.log('Spotify API Key: Key was set to:\n', `client_id: ${data.client_id}\n`, `client_secret: ${data.client_secret}`);
});

setSpotifyClientInfo(null, (err, data) => {
    if (err) { return console.log(err.message); };
    
    console.log('Spotify API Key: Key was set to:\n', `client_id: ${data.client_id}\n`, `client_secret: ${data.client_secret}`);
});

setSpotifyClientInfo({wrongName: 'OI', secret: 'oi1234'}, (err, data) => {
    if (err) { return console.log(err.message); };
    
    console.log('Spotify API Key: Key was set to:\n', `client_id: ${data.client_id}\n`, `client_secret: ${data.client_secret}`);
});

setSpotifyClientInfo({id: 'OI'}, (err, data) => {
    if (err) { return console.log(err.message); };
    
    console.log('Spotify API Key: Key was set to:\n', `client_id: ${data.client_id}\n`, `client_secret: ${data.client_secret}`);
});
*/

/*
### ERROR CASES ### 
setSpotifyClientInfo((err, data) => {
    if (err) { return console.log(err.message); };
    
    console.log('Spotify API Key: Key was set to:\n', `client_id: ${data.client_id}\n`, `client_secret: ${data.client_secret}`);
    
});

setSpotifyClientInfo();

setSpotifyClientInfo({id: 'adawawfafaw121a', secret: '21dib2l23hjawddadeggtjkr'});
*/
