"use strict";

const path = require('path'),
      fs = require('fs'),
      mapPath = path.join(__dirname, '..', 'data', 'mapMoodMusicGenre.json'),
      createErrorObject = require(path.join(__dirname, "..", "modules", "createErrorObject"));

// Server must be restarted to save changes
const readMap = JSON.parse(fs.readFileSync(mapPath,'utf8'));

function getGenreSeeds(mood) {
    if (readMap[mood]) {
        return readMap[mood];
    } else {
        return createErrorObject({ status: 404, title: "Mood not found", source: {parameter: "mood"} });
    }
}

module.exports = getGenreSeeds;