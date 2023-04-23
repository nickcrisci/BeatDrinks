const createErrorObject = require('../modules/createErrorObject');

const getUserById = require('../modules/getUserById');
const getCocktail = require('../modules/getCocktail');
const getSeedGenres = require('../modules/getSeedGenres');
const { spotifyRecommendationWithGenre } = require('../modules/spotify');

const getCombination = async (req, res, next) => {
  // Has to be an object because "in" checks for properties in Objects,
  // not in list (in a list it checks for an index)
  const allowedQueries = { mood: true, limit: true, market: true };

  req.query.forEach((query) => {
    if (!(query in allowedQueries)) {
      const error = createErrorObject({ status: 400, title: 'Bad Request', source: { parameter: query } });
      return res.status(400).send(error);
    }
  });

  // This allows the middleware to be used for both the track & playlist combination
  // If the track path is invoked the limit will be set to 1,
  // else it will be set to the given limit in the query, or null if not specified
  let limit;

  if (req.originalUrl.includes('/combination/track')) {
    limit = 1;
  } else {
    limit = req.query.limit || null;
  }

  const userId = req.params.userId || null;
  const mood = req.query.mood || 'Froh';
  const market = req.query.market || null;

  getCocktail(mood, (err, result) => {
    req.cocktails = result;
  });

  const genreSeeds = getSeedGenres(mood);

  if (genreSeeds === null) {
    const error = createErrorObject({ status: 404, title: 'Mood not found', source: { parameter: 'mood' } });
    return res.status(error.status).send(error);
  }

  // Spotify Request - to eliminate duplicate code
  const getTracks = (preferences) => {
    spotifyRecommendationWithGenre(
      preferences,
      { limit, market, genreSeeds },
      (err, tracks) => {
        if (err) {
          const error = createErrorObject({ status: 503, title: 'Bad Gateway' });
          return res.status(503).send(error);
        }
        req.tracks = tracks;
        return next();
      },
    );
  };

  if (userId) {
    await getUserById(userId, (err, userObject) => {
      if (err) {
        const error = createErrorObject({ status: 404, title: 'Not found' });
        return res.status(404).send(error);
      }
      const musicPreferences = userObject.musicPreferences || [];
      req.user = userObject;

      getTracks(musicPreferences);
    });
  } else {
    getTracks([]);
  }
};

module.exports = getCombination;
