/*
    All returns of getCocktail convey objects with the following attributes:

    name: String                    name of one cocktail
    teaser: String                  short description of one cocktail
    ingredients: Array[String]    an array of ingredients one cocktail is made of

*/

// Requires Cocktails.json dynamically
const path = require('path'),
      fs = require('fs');
    
cocktailsPath = path.join(__dirname,"..","data","Cocktails.json");

const cocktails = JSON.parse(fs.readFileSync(cocktailsPath,'utf8'));
    
// Checks for specific ingredient one cocktail may involve
const checkProperty = (drinknr, property, callback) => {
    const ingredients = cocktails[drinknr].ingredients;

    for (const element of ingredients) {
        if (element["name"].toUpperCase().includes(property.toUpperCase())) {
            return callback(null, true);
        }
    }

    return callback(null, false);
}

// Cocktail lookup based on name
const search = (name, callback) => {
    for (const cocktail of cocktails) {
        if (cocktail["name"] == name) {
            return callback(null, cocktail);
        }
    }
    return callback (null, false);
}

// Conveys cocktails without alcohol
const alcoholfree = (callback) => {
    const ergebnis = [];
    for (const cocktail of cocktails) {
        if (cocktail["name"].toUpperCase().includes("VIRGIN")) {
            ergebnis.push(cocktail);
        }
    }
    mood("ALKOHOLFREI", (err,result) => {
        ergebnis.push(result);
    });

    return callback (null, ergebnis);
}

/**Returns all cocktails being considered for a certain mood
 * @note available moods: 
 * Froh, Entspannt, Energetisch, Melancholisch, Traurig, Aggressiv
 */
const mood = (mood, callback) => {
    const result = [];

    for (const cocktail of cocktails) {
        if (cocktail["mood"].toUpperCase() == mood.toUpperCase()) {
            result.push(cocktail);
        }
    }

    return callback(null, result);
}

module.exports = mood;