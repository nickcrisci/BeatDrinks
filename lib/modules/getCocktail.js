/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */

/*
    All returns of getCocktail convey objects with the following attributes:

    name: String                    name of one cocktail
    teaser: String                  short description of one cocktail
    ingredients: Array[String]    an array of ingredients one cocktail is made of

*/

// Requires Cocktails.json dynamically
const path = require('path');
const fs = require('fs');

const cocktailsPath = path.join(__dirname, '..', 'data', 'Cocktails.json');

const cocktails = JSON.parse(fs.readFileSync(cocktailsPath, 'utf8'));

// Checks for specific ingredient one cocktail may involve
const checkProperty = (drinknr, property, callback) => {
  const { ingredients } = cocktails[drinknr];

  ingredients.array.forEach((element) => {
    if (element.name.toUpperCase().includes(property.toUpperCase())) {
      return callback(null, true);
    }
  });
  return callback(null, false);
};

// Cocktail lookup based on name
const search = (name, callback) => {
  cocktails.forEach((cocktail) => {
    if (cocktail.name === name) {
      return callback(null, cocktail);
    }
  });
  return callback(null, false);
};

/** Returns all cocktails being considered for a certain mood
 * @note available moods:
 * Froh, Entspannt, Energetisch, Melancholisch, Traurig, Aggressiv
 */
const mood = (userMood, callback) => {
  const result = [];
  cocktails.forEach((cocktail) => {
    if (cocktail.mood.toUpperCase() === userMood.toUpperCase()) {
      result.push(cocktail);
    }
  });
  return callback(null, result);
};

// Conveys cocktails without alcohol
const alcoholfree = (callback) => {
  const ergebnis = [];
  cocktails.forEach((cocktail) => {
    if (cocktail.name.toUpperCase().includes('VIRGIN')) {
      ergebnis.push(cocktail);
    }
  });
  mood('ALKOHOLFREI', (err, result) => {
    ergebnis.push(result);
  });

  return callback(null, ergebnis);
};

module.exports = mood;
