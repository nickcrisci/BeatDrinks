require('dotenv').config();
const axios = require('axios');

const generateUrl = require('./urlGenerator');

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const authToken = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`, 'utf-8').toString('base64');

let accessToken = { token: null, expires_in: null };

const isTokenExpired = () => {
  const now = new Date();
  if (accessToken.token == null || accessToken.expires_in < now) return true;
  return false;
};

const createTokenObject = (data) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + parseInt(data.expires_in, 10));
  const token = {
    token: data.access_token,
    expires_in: now,
  };
  return token;
};

const getAccessToken = async () => {
  if (!isTokenExpired()) {
    return accessToken.token;
  }
  const { data } = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  accessToken = { ...createTokenObject(data) };
  return accessToken.token;
};

const getTracks = async (url) => {
  const token = await getAccessToken();
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.tracks;
};

const simplifyTrack = (track) => ({
  songName: track.name,
  isrc: track.external_ids.isrc || null,
  songLink: track.external_urls.spotify || null,
  href: track.href,
  artists: track.artists,
});

const simplifyTracks = (tracks) => {
  const beatdrinksTracks = tracks.map(simplifyTrack);
  return beatdrinksTracks;
};

const spotifyRecommendationWithGenre = async (musicPreferences, options, callback) => {
  const url = await generateUrl(musicPreferences, options, (err, result) => {
    if (!err) {
      return result;
    }
  });
  getTracks(url)
    .then((tracks) => callback(null, simplifyTracks(tracks)));
};

module.exports = {
  spotifyRecommendationWithGenre,
};
