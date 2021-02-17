/*
Code Ausschnitt zum Ausprobieren der Spotify API
*/

const request = require("request");

// necessary key for the Spotify API
var client_id = '785df100c7994a0da2abeb60862fba8f';
var client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    // dynamically buffers from current client_id and client_secret
    Authorization: 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // body holds HTML element with access_token attribute
    var token = body.access_token;
    var options = {
      // recommendation query options don't have a strict order
      url: 'https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&target_acousticness=1.0&min_energy=0.2&target_loudness=0.2&min_popularity=50&min_valence=0.5&max_valence=1.0&target_valence=0.8&market=AU',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    // the real magic happens here => options will be finally used here
    request.get(options, function(error, response, body) {
      console.log(body.tracks[0]);
    });
  }
});


/**
 * Proof on concept messbarer machen
 * Exit und Fail Situationen
 * Benötigten Parameter für Aufruf prüfen
 */