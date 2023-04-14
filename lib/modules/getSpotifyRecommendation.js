/* eslint-disable consistent-return */
const request = require('request');

const generateUrl = require('./urlGenerator');

/* Developer key */
let clientId = '785df100c7994a0da2abeb60862fba8f';
let clientSecret = '158c44c48bd54f458cb3ec14b4fd432a';

/** Blueprint for Spotify Token-Request
 * @param currentId > Spotify clientId (string)
 * @param currentSecret > Spotify clientSecret (string)
 * @param grantType > 'client_credentials'
 * @param json > 'true'
*/
class AuthForToken {
  constructor(currentId = clientId, currentSecret = clientSecret, grantType = 'client_credentials', json = true) {
    this.url = 'https://accounts.spotify.com/api/token';
    this.headers = { Authorization: `Basic ${Buffer.from(`${currentId}:${currentSecret}`).toString('base64')}` };
    this.form = { grant_type: grantType };
    this.json = json;
  }
}

/**
 * Changes current default values for clientId and clientSecret.
 * @param userApiKey > {id: 'value', secret: 'value'}
 * @returns function(err, {clientId, clientSecret})
 */
const changeSpotifyClientInfo = (callback, userApiKey = null) => {
  if (!userApiKey) {
    return callback(new Error('Spotify API Key: Key is missing'), null);
  }
  if (!userApiKey.id) {
    return callback(new Error('Spotify API Key: clientId is missing.'), null);
  }
  if (!userApiKey.secret) {
    return callback(new Error('Spotify API Key: clientSecret is missing.'), null);
  }

  clientId = userApiKey.id;
  clientSecret = userApiKey.secret;

  return callback(null, { clientId, clientSecret });
};

/** Checks whether a default is set for clientId AND clientSecrets.
 * @returns boolean
*/
const checkSpotifyClientInfo = () => {
  if (typeof clientId === typeof null || typeof clientSecret === typeof null) {
    return false;
  }
  return true;
};

/**
 * Simplifies Spotify track array.
 * @param trackArray > Spotify track array
 * @returns beatdrink tracklist
 */
function simplifyTrackObjects(trackArray) {
  const beatdrinksTracks = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const track of trackArray) {
    const beatdrinksTrack = {};

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
function spotifyRecommendationWithGenre(
  authOptions,
  musicPreferences,
  limitMarketGenres,
  callback,
) {
  // console.log('\x1b[35m\nspotifyRecommendationWithGenre was invoked.\x1b[0m')

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      /* Token is always different, therefore the given pattern is necessary */
      const token = body.access_token;

      const options = {
        url: generateUrl(musicPreferences, limitMarketGenres, (err, result) => {
          if (!err) {
            return result;
          }
          throw err;
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      };

      /* Properties of get callback attributes:
               1) error: not clear
               2) response: metadata and representation/body
               3) body: tracks (artist and song data),
              seeds (how many songs were found with seed input etc.) */
      request.get(options, (getError, _getResponse, getBody) => {
        if (getError !== null || getError !== undefined) {
          const tracks = simplifyTrackObjects(getBody.tracks);
          return callback(null, tracks);
        }
        return callback(new Error(`Request on ${options.url} wasn't successful`), null);
      });
    } else {
      return callback(new Error('Token request went wrong'), null);
    }
  });
}

module.exports = {
  AuthForToken,
  spotify_changeClientInfo: changeSpotifyClientInfo,
  spotify_checkClientInfo: checkSpotifyClientInfo,
  spotify_RecommendationWithGenre: spotifyRecommendationWithGenre,
};
