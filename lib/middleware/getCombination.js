"use strict";

const path = require('path'),
    createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

const getUserById = require("../modules/getUserById");

const getCombination = function(req, res, next) {

    const userId = req.params.userId || null;
    const mood = req.query.mood || null;
    const market = req.query.market || null ;
    const limit = req.query.limit || null;

    //Pauls Aufruf an Spotify -> Variable zuweisen z.b. tracks
    //dann req.tracks = tracks;
    /*  const error = createErrorObject({ status: 400, title: "Bad Request", source: { parameter: "page" } });
        return res.status(400).send(error);*/


    //Sebs Aufruf an CocktailDB -> Variable zuweisen z.B. cocktails
    //dann req.cocktails = cocktails;
    
}

module.exports = getCombination;