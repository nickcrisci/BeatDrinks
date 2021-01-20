'use strict';

const express = require('express'); //express will be used temporary here | there is no need for the request module

const app = express();

let client_id = '785df100c7994a0da2abeb60862fba8f';
let client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

const setSpotifyClientInfo = (userApiKey = undefined, callback) => { //default value isn't helping
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

// INSERT NEW CODE HERE

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


/* ### ERROR CASES ### 
setSpotifyClientInfo((err, data) => {
    if (err) { return console.log(err.message); };
    
    console.log('Spotify API Key: Key was set to:\n', `client_id: ${data.client_id}\n`, `client_secret: ${data.client_secret}`);
    
});

setSpotifyClientInfo();

setSpotifyClientInfo({id: 'adawawfafaw121a', secret: '21dib2l23hjawddadeggtjkr'});
*/
