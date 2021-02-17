'use strict';

const request = require('request'),
      path = require('path'),
      generateUrlPath = path.join(__dirname, 'urlGenerator.js'),
      generateUrl = require(generateUrlPath);

/* Developer key */
let client_id = '785df100c7994a0da2abeb60862fba8f';
let client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

/** Blueprint for Spotify Token-Request 
 * @param current_id > Spotify client_id (string)
 * @param current_secret > Spotify client_secret (string)
 * @param grantType > 'client_credentials'
 * @param json > 'true'
*/
class AuthForToken {
    constructor(current_id = client_id, current_secret = client_secret, grantType = 'client_credentials', json = true) {
        this.url = 'https://accounts.spotify.com/api/token';
        this.headers = { Authorization: 'Basic ' + (new Buffer.from(current_id + ':' + current_secret).toString('base64')) };
        this.form = { grant_type: grantType }
        this.json = json;
    };
};

/**
 * Changes current default values for client_id and client_secret.
 * @param userApiKey > {id: 'value', secret: 'value'}
 * @returns function(err, {client_id, client_secret})
 */
const changeSpotifyClientInfo = (userApiKey = null, callback) => {
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

/** Checks whether a default is set for client_id AND client_secrets. 
 * @returns boolean
*/
const checkSpotifyClientInfo = () => {
    if (typeof client_id === null || typeof client_secret === null) {
        return false;
    } else {
        return true;
    };
};

/**
 * Simplifies Spotify track array.
 * @param trackArray > Spotify track array
 * @returns beatdrink tracklist
 */
function simplifyTrackObjects(trackArray) {
    let beatdrinksTracks = new Object();
    for (let id = 0; id < trackArray.length; id++) {
        beatdrinksTracks[id] = {}

        beatdrinksTracks[id].songname = trackArray[id].name;
        if (trackArray[id].external_ids.isrc)
            beatdrinksTracks[id].isrc = trackArray[id].external_ids.isrc;
        else
            beatdrinksTracks[id].isrc = null;
        if (trackArray[id].external_urls.spotify)
            beatdrinksTracks[id].URL_endUser = trackArray[id].external_urls.spotify;
        else
            beatdrinksTracks[id].URL_endUser = null;
        beatdrinksTracks[id].href = trackArray[id].href;
        beatdrinksTracks[id].artists = trackArray[id].artists;
    }
    console.log('\x1b[35mFollowing beatdrinksTrack was created\x1b[0m \n');
    console.log(beatdrinksTracks);
    return beatdrinksTracks;
}

/**
 * Returns a certain amount of Spotify-listed tracks based on genres.
 * @param authOptions > AuthForToken - Object
 * @param musicPreferences > Array of specified musicPreferences
 * @param limitMarketGenres > {limit: 'value', market: 'value', genre_seeds: [values]}
 * @returns Array[beatdrinksTrack]
 */
function spotifyRecommendationWithGenre(authOptions, musicPreferences, limitMarketGenres) {
    console.log('\x1b[35m\nspotifyRecommendationWithGenre was invoked.\x1b[0m')

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            /* Token is always different, therefore the given pattern is necessary */
            var token = body.access_token;
            console.log(`\x1b[35mToken:\x1b[0m ${token}`);

            var options = {
                url: generateUrl(musicPreferences, limitMarketGenres, (err, result) => {
                    if (!err) {
                        return result;
                    } else {
                        throw err;
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
               3) body: tracks (artist and song data), seeds (how many songs were found with seed input etc.) */
            request.get(options, (error, response, body) => {
                if (error !== null || error !== undefined) {
                    console.log('\x1b[35mNumber of Tracks received:\x1b[0m ' + body.tracks.length);
                    for (let i = 0; i < body.seeds.length; i++) {
                        console.log(`\x1b[35m${body.seeds[i].id}:\x1b[0m ${body.seeds[i].initialPoolSize} available tracks.`);
                    }

                    return simplifyTrackObjects(body.tracks);
                } else {
                    throw error;
                };
            });

        } else {
            console.log("Token request was't successful! Statuscode: " + response.statusCode);
            throw error;
        };
    });
};
// INSERT NEW CODE ABOVE HERE

module.exports = {
    AuthForToken,
    spotify_changeClientInfo : changeSpotifyClientInfo,
    spotify_checkClientInfo : checkSpotifyClientInfo,
    spotify_RecommendationWithGenre: spotifyRecommendationWithGenre
};


/********************************************************
 *              TESTING BELOW THIS BOX                  *
 *******************************************************/

spotifyRecommendationWithGenre(new AuthForToken(), [], {limit: 2, market: "DE", genre_seeds: ["disney", "movies"]});

/*
changeSpotifyClientInfo({id: 'adawawfafaw121a', secret: '21dib2l23hjawddadeggtjkr'}, (err, data) => {
    if (err)
        { console.log(err.message); };
    
    console.log(
        'Notification: Spotify API Key was set to:\n',
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
let defaultUserAuth = new AuthForToken();
let someChangedUserAuth = new AuthForToken(client_id, client_secret, 'client_credentials', true);
someChangedUserAuth.headers.Authorization = 'I can finally change every aspect of the AuthOptions for Spotify';
console.log(defaultUserAuth);
console.log(someChangedUserAuth);
*/