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
        this.form = { grant_type: grantType };
        this.json = json;
    }
}

/**
 * Changes current default values for client_id and client_secret.
 * @param userApiKey > {id: 'value', secret: 'value'}
 * @returns function(err, {client_id, client_secret})
 */
const changeSpotifyClientInfo = (userApiKey = null, callback) => {
    if (!userApiKey) {
        return callback(new Error('Spotify API Key: Key is missing'), null);
    }
    if (!userApiKey.id) {
        return callback(new Error('Spotify API Key: client_id is missing.'), null);
    }
    if (!userApiKey.secret) {
        return callback(new Error('Spotify API Key: client_secret is missing.'), null);
    }
    
    client_id = userApiKey.id;
    client_secret = userApiKey.secret;
    
    return callback(null, {client_id, client_secret});
}

/** Checks whether a default is set for client_id AND client_secrets. 
 * @returns boolean
*/
const checkSpotifyClientInfo = () => {
    if (typeof client_id === null || typeof client_secret === null) {
        return false;
    } else {
        return true;
    }
}

/**
 * Simplifies Spotify track array.
 * @param trackArray > Spotify track array
 * @returns beatdrink tracklist
 */
function simplifyTrackObjects(trackArray) {
    const beatdrinksTracks = [];

    for (const track of trackArray) {
        const beatdrinksTrack = new Object();

        beatdrinksTrack.songName = track.name;
        beatdrinksTrack.isrc = track.external_ids.isrc || null;
        beatdrinksTrack.songLink = track.external_urls.spotify || null;
        beatdrinksTrack.href = track.href;
        beatdrinksTrack.artists = track.artists;

        beatdrinksTracks.push(beatdrinksTrack);
    }

    return beatdrinksTracks;
}

/**
 * Returns a certain amount of Spotify-listed tracks based on genres.
 * @param authOptions > AuthForToken - Object
 * @param musicPreferences > Array of specified musicPreferences
 * @param limitMarketGenres > {limit: 'value', market: 'value', genre_seeds: [values]}
 * @returns Array[beatdrinksTrack]
 */
function spotifyRecommendationWithGenre(authOptions, musicPreferences, limitMarketGenres, callback) {
    //console.log('\x1b[35m\nspotifyRecommendationWithGenre was invoked.\x1b[0m')

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            /* Token is always different, therefore the given pattern is necessary */
            let token = body.access_token;

            let options = {
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

            /* Properties of get callback attributes:
               1) error: not clear
               2) response: metadata and representation/body
               3) body: tracks (artist and song data), seeds (how many songs were found with seed input etc.) */
            request.get(options, (error, response, body) => {
                if (error !== null || error !== undefined) {
                    const tracks = simplifyTrackObjects(body.tracks);
                    return callback(null, tracks);
                } else {
                    return callback(new Error(`Request on ${options.url} wasn't successful`), null);
                }
            });

        } else {
            return callback(new Error('Token request went wrong'), null);
        }
    });
}

module.exports = {
    AuthForToken,
    spotify_changeClientInfo : changeSpotifyClientInfo,
    spotify_checkClientInfo : checkSpotifyClientInfo,
    spotify_RecommendationWithGenre: spotifyRecommendationWithGenre
};