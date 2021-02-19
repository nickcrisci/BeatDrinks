"use strict";

const path = require('path'),
      createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

const modulePath = path.join(__dirname, "..", "modules");

const getUserById   = require(path.join(modulePath, "getUserById")),
      getCocktail   = require(path.join(modulePath, "getCocktail")),
      getSeedGenres = require(path.join(modulePath, "getSeedGenres")),
      getPlaylist   = require(path.join(modulePath, "getSpotifyRecommendation"));

const getCombination = async function(req, res, next) {

    // Has to be an object because "in" checks for properties in Objects, not in list (in a list it checks for an index)
    const allowedQueries = {"mood": true, "limit": true, "market": true};

    // Checks for illegal query
    for (const query in req.query) {
        if( ! (query in allowedQueries) ) {
            const error = createErrorObject({ status: 400, title: "Bad Request", source: { parameter: query } });
            return res.status(400).send(error);
        }
    }

    // This allows the middleware to be used for both the track & playlist combination
    // If the track path is invoked the limit will be set to 1, else it will be set to the given limit in the query, or null if not specified
    let limit;

    if (req.originalUrl.includes("/combination/track")) {
        limit = 1;
    } else {
        limit = req.query.limit || null;
    }

    const userId = req.params.userId || null;
    const mood = req.query.mood || 'Froh';
    const market = req.query.market || null ;
    
    getCocktail(mood,(err,result) => {
        req.cocktails = result;
    });

    const genre_seeds = getSeedGenres(mood);
      
    if (genre_seeds.status) {
        return res.status(genre_seeds.status).send(genre_seeds);
    }

    // Spotify Request - to eliminate duplicate code
    const getTracks = preferences => {
        getPlaylist.spotify_RecommendationWithGenre(
            new getPlaylist.AuthForToken(),
            preferences, 
            {limit, market, genre_seeds},
            (err, tracks) => {
                if (err) {
                    const error = createErrorObject({ status: 503, title: "Bad Gateway" });
                    return res.status(503).send(error);
                }
                req.tracks = tracks;
                return next();
            }
        );
    }

    if (userId) {
        await getUserById(userId, (err, userObject) => {
            if (err) {
                const error = createErrorObject({ status: 404, title: "Not found" });
                return res.status(404).send(error);
            }
            const musicPreferences = userObject.musicPreferences || [];
            req.user = userObject;

            getTracks(musicPreferences);
        });
    } else {
        getTracks([]);
    }
}

module.exports = getCombination;
