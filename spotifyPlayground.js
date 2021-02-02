'use strict';

/* I will stick with request since it's related to python request which is easier to overlook for Nick 
   Nevertheless, express should still be used for our own server. - Paul                               */
const request = require('request');

/* developer key should be set to undefined and will only be change due to setSpotifyClientInfo */
let client_id = '785df100c7994a0da2abeb60862fba8f';
let client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

/* creates object for spotify token-request */
class AuthForToken {
    constructor(current_id = client_id, current_secret = client_secret, grantType = 'client_credentials', json = true) {
        this.url = 'https://accounts.spotify.com/api/token';
        this.headers = { Authorization: 'Basic ' + (new Buffer.from(current_id + ':' + current_secret).toString('base64')) };
        this.form = { grant_type: grantType }
        this.json = json;
    };
};

/* sets local parameters for further operations => somehow replaced with class AuthForToken*/
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

function alpha_getRecommendationBasedOnValues(authOptions) {
    console.log('\x1b[35m\nalpha_getRecommendationBasedOnValues was invoked.\x1b[0m')
    // ISSUE: request.post isn't telling, that API Key is wrong => simply skips action
    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            var token = body.access_token;
            var options = {
            // ISSUE: must be abstract
            url: 'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&target_acousticness=1.0&min_energy=0.2&target_loudness=0.2&min_popularity=50&min_valence=0.5&max_valence=1.0&target_valence=0.8&market=AU',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            json: true
            };
            request.get(options, (error, response, body) => {
                console.log(body.tracks[0]);
            });
        };
    });
};

// INSERT NEW CODE ABOVE HERE

module.exports = {
    // interfaces for other project parts
}

/********************************************************
 *              TESTING BELOW THIS BOX                  *
 *******************************************************/

/*
setSpotifyClientInfo({id: 'adawawfafaw121a', secret: '21dib2l23hjawddadeggtjkr'}, (err, data) => {
    if (err) { console.log(err.message); };
    
    console.log(
        'Notification: Spotify API Key was set to:\n',
        `\x1b[1m client_id: ${data.client_id}\n`,
        ` client_secret: ${data.client_secret}\x1b[0m`);
});
*/

console.log(`\n\x1b[35mBuffer-Tests:\x1b[0m`)
let myBufferToBase64 = new Buffer.from(client_id + ':' + client_secret).toString('base64');
let myBufferedOII = new Buffer.alloc(3);
myBufferedOII.write('OII, das ist aber ein langer String!')
console.log(myBufferToBase64);
console.log(myBufferedOII);
console.log(myBufferedOII.toString())
console.log(myBufferedOII.toString('base64'));

console.log(`\n\x1b[35mAuthOptions-Tests:\x1b[0m`);
let defaultUserAuth = new AuthForToken();
let someChangedUserAuth = new AuthForToken(client_id, client_secret, 'client_credentials', true);
someChangedUserAuth.headers.Authorization = 'I can finally change every aspect of the AuthOptions for Spotify';
console.log(defaultUserAuth);
console.log(someChangedUserAuth);

alpha_getRecommendationBasedOnValues(new AuthForToken()); // works
alpha_getRecommendationBasedOnValues(defaultUserAuth); // works
alpha_getRecommendationBasedOnValues(someChangedUserAuth); // no feedback !!!
alpha_getRecommendationBasedOnValues(); // no feedback !!!
