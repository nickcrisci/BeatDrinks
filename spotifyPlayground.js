'use strict';

/* I will stick with request since it's related to python request which is easier to overlook for Nick 
   Nevertheless, express should still be used for our own server. - Paul                               */
const request = require('request'),
      generateUrl = require('./lib/modules/urlGenerator');

/* developer key should be set to undefined and will only be change due to setSpotifyClientInfo */
let client_id = '785df100c7994a0da2abeb60862fba8f';
let client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

/* object for spotify token-request */
class AuthForToken {
    constructor(current_id = client_id, current_secret = client_secret, grantType = 'client_credentials', json = true) {
        this.url = 'https://accounts.spotify.com/api/token';
        this.headers = { Authorization: 'Basic ' + (new Buffer.from(current_id + ':' + current_secret).toString('base64')) };
        this.form = { grant_type: grantType }
        this.json = json;
    };
};

/* replaces/sets entire client data ; undefined userApiKey will possess default have */
const replaceSpotifyClientInfo = (userApiKey = null, callback) => {
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

/* returns a certain ammount of tracks based on genres */
function spotifyRecommendationWithGenre_alpha(authOptions, endpoint, genres) { // ISSUE: ammount of tracks must be added
    console.log('\x1b[35m\nspotifyRecommendationWithGenre was invoked.\x1b[0m')

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            /* Token is always different, therefore the given pattern is necessary */
            var token = body.access_token;
            console.log(`Token : ${token}`);
            var options = {
            // ISSUE: NICK, why is there a callback in my URL generator?! XD
                url: generateUrl(endpoint, genres, (err, result) => {
                    if (!err) {
                        return result;
                    } else {
                        return `/error/${err}` // ISSUE: error path could be implemented
                    }
                }),
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            json: true
            };
            /* Properties of callback attributes:
               1) error: not clear
               2) response: metadata and representation/body
               3) body: tracks (current standard: 20), seeds (length: 2 ???) */
            request.get(options, (error, response, body) => {
                if (error !== null || error !== undefined) {
                    console.log('Number of Tracks: ' + body.tracks.length);
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                    console.log('Seeds-Length: ' + body.seeds.length);
                    console.log(Object.getOwnPropertyNames(body.seeds));
                    console.log(Object.getOwnPropertyNames(body.seeds[0]));
                } else {
                    return error;
                };
            });
        } else {
            console.log("Token request was't successful! Statuscode: " + response.statusCode);
            return error;
        };
    });
};

// INSERT NEW CODE ABOVE HERE

module.exports = {
    spotifyRecommendationWithGenre_alpha
};

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

// ISSUE: exact iterable form for urlGenerator isn't known => code below isn't working
spotifyRecommendationWithGenre_alpha(defaultUserAuth, 'https://api.spotify.com/v1/recommendations', 
                                    {limit: 2, market: "US", seed_genres: "disney", seed_genres: "movies"});
