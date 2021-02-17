"use strict";

const path = require('path'),
      fs = require('fs'),
      mapPath = path.join(__dirname, '..', 'data', 'mapMoodMusicGenre.json'),
      createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

function getGenreSeeds(mood) {
    const readMap = JSON.parse(fs.readFileSync(mapPath,'utf8'));

    if (readMap[mood]) {
        return readMap[mood];
    } else {
        //ISSUE: valide at this point of our logic?
        return createErrorObject({ status: 404, title: "Mood not found", source: {parameter: "mood"} });
    }
}

module.exports = getGenreSeeds;

// Beispielcode:
/*
console.log(getGenreSeeds('Froh'));
console.log(getGenreSeeds('Hyperaggressiv'));
console.log(getGenreSeeds("Entspannt"));
*/