var request = require('request'); // "request" module

//necessary key for the Spotify API
var client_id = '785df100c7994a0da2abeb60862fba8f';
var client_secret = '158c44c48bd54f458cb3ec14b4fd432a';

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&target_acousticness=1.0&min_energy=0.2&target_loudness=0.2&min_popularity=50&min_valence=0.5&max_valence=1.0&target_valence=8',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    
    request.get(options, function(error, response, body) {
      console.log(body.tracks[0]);
    });
  }
});