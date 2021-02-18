"use strict";

const path = require('path'),
      createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

const getUserById = require("../modules/getUserById");

const getCocktail = require("../modules/getCocktail");

const getCombination = async function(req, res, next) {

    //Has to be an object because "in" checks for properties in Objects, not in list (in a list it checks for an index)
    const allowedQueries = {"mood": true, "limit": true, "market": true};

    //check for illegal query
    for (const query in req.query) {
        if( ! (query in allowedQueries) ) {
            const error = createErrorObject({ status: 400, title: "Bad Request", source: { parameter: query } });
            return res.status(400).send(error);
        }
    }

    //This allowes the middleware to be used for both the track & playlist combination
    //If the track path is invoked the limit will be set to 1, else it will be set to the given limit in the query, or null if not specified
    let limit;

    if (req.originalUrl == "/combination/track") {
        limit = 1;
    } else {
        limit = req.query.limit || null;
    }

    const userId = req.params.userId || null;
    const mood = req.query.mood || null;
    const market = req.query.market || null ;
    
    let user; 
    
    if (userId) {
        getUserById(userId, (err, userObject) => {
            if (err) {
                const error = createErrorObject({ status: 404, title: "Not found"});
                return res.status(404).send(error);
            }

            req.user = userObject;
            return next();
            
        });
    } else {
        req.limit = limit;
        return next();
    }

    //return next();

    //Pauls Aufruf an Spotify -> Variable zuweisen z.b. tracks
    //dann req.tracks = tracks;
    /*  const error = createErrorObject({ status: 400, title: "Bad Request", source: { parameter: "page" } });
        return res.status(400).send(error);*/


    //Sebs Aufruf an CocktailDB -> Variable zuweisen z.B. cocktails
    //dann req.cocktails = cocktails;
    //Es werden alle Cocktails der Stimmung der Variable mood zurückgegeben.
    getCocktail.mood(mood,(err,result) => {
        req.cocktails = result;
    })
    
}

module.exports = getCombination;