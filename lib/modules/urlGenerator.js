const standardLimit = 5;
const standardMarket = 'US';
let url = 'https://api.spotify.com/v1/recommendations?';

// eslint-disable-next-line consistent-return
const addPreferenceToUrl = (preference) => {
  if (!preference.name || !preference.value) {
    return null;
  }

  const suffix = `&${preference.name}=${preference.value.toFixed(1)}`;
  url += suffix;
};

/** URL Generator for the Spotify Endpoint
 *
 * Converts given properties into a single string,
 * attached to the base url of the endpoint
 *
 * Returns the generated as a single string
 * which can be used to get data from the Spotify API
 *
 * @param {List of specified musicPreferences} musicPreferences
 * @param {Requires limit, market and seed_genres} options
 * @param {*} callback
*/
const generateUrl = (musicPreferences, options, callback) => {
  if (!callback) {
    throw new Error('Callback is missing');
  }
  console.log(options);
  // reset url
  url = 'https://api.spotify.com/v1/recommendations?';

  // Checking if function is invoked properly
  if (!musicPreferences) {
    const musicPreferences = [];
  }
  if (!options.genreSeeds) {
    options.genreSeeds = ['pop', 'rock', 'classical', 'country', 'dance'];
  }

  if (options) {
    url += `limit=${options.limit || standardLimit}`;
    url += `&market=${options.market || standardMarket}`;

    let genresString = '';

    options.genreSeeds.forEach((seed) => {
      genresString += `${seed},`;
    });

    url += `&seed_genres=${genresString}`;
  }

  // Converts all elements of the propertie Array into a single String
  musicPreferences.forEach(addPreferenceToUrl);

  return callback(null, url);
};

module.exports = generateUrl;
