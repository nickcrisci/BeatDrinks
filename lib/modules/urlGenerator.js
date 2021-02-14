"use strict";

// Optionen: 
// Limit
// Market
// Genres

/*  urlOptions = {
        limit: 10,
        market: "US",
        genre_seeds: [
            "Pop",
            "Rock",
            Disney
        ]
    } */

/** URL Generator for the Spotify Endpoint
 *   
 * Converts given properties into a single string, 
 * attached to the base url of the endpoint
 *
 * Returns the generated as a single string 
 * which can be used to get data from the Spotify API
 * 
 * @param {List of specified musicPreferences} musicPreferences 
 * @param {*} callback 
*/
const generateUrl = function(musicPreferences, options, callback) {

    if (!callback) {
        throw new Error("Callback is missing");
    }

    //Checking if function is invoked properly
    if (!musicPreferences) {
        const musicPreferences = [];
    }
    //Wenn keine Mood dann Standardgenres -> Mach ich noch

    let url = "https://api.spotify.com/v1/recommendations?";

    const standardLimit = 5;
    const standardMarket = "US";

    if(options) {
        url += `limit=${options.limit || standardLimit}`;
        url += `&market=${options.market || standardMarket}`;

        let genresString = "";

        for (const seed of options.genre_seeds) {
            genresString += `${seed}%2C`;
        }

        url += `&seed_genres=${genresString}`;
    }

    //Converts all elements of the propertie Array into a single String
    for (const preference of musicPreferences) {

        if (!preference["name"]) {
            return callback(new Error("Name of the preference is missing"));
        }
        if (!preference["value"]) {
            return callback(new Error("Value of the preference is missing"));
        }

        let suffix = `&${preference["name"]}=${preference["value"].toFixed(1)}`;

        url += suffix;
    };

    return callback(null, url);
    
};
/* Kleiner Test Aufruf
const music = {name: "loudness", value: 0.9}
generateUrl([music], {limit: 6, market: "DE", genre_seeds: ["pop", "rock"]}, (err, data) => {
    console.log(data);
})*/

module.exports = generateUrl;