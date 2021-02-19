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

// For receiving cocktails based on specified preferences
const preference = (want, hate, callback) => {
    const ergebnis = [];

    // Returns an error whether both want and hate are null
    if (want == null && hate == null) {
        return callback(new Error("Want- and Hate-Arrays cannot both be null"));
    }

    if ((want != null && want.length == undefined) || (hate != null && hate.length == undefined)) {
        return callback(new Error("Want- or Hate-Arrays cannot be empty arrays"));
    }
    
    for (const cocktail of cocktails) {
        var wantBool = false;
        var hateBool = false;
        for (const ingredient of cocktail["ingredients"]) {
            if (want == null) {
                wantBool = true;
            } else if (want.some(element => element == ingredient["name"])) {
                wantBool = true;
            }

            if (hate.some(element => element == ingredient["name"])){
                hateBool = true;
                break;
            }
        }
        if (wantBool && !hateBool) {
            ergebnis.push(cocktail);
        }
    }
    
    return callback(null, ergebnis);
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