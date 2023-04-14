const path = require('path');
const fs = require('fs');

const mapPath = path.join(__dirname, '..', 'data', 'mapMoodMusicGenre.json');
const createErrorObject = require('./createErrorObject');

// Server must be restarted to save changes
const readMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

function getGenreSeeds(mood) {
  if (readMap[mood]) {
    return readMap[mood];
  }
  return createErrorObject({ status: 404, title: 'Mood not found', source: { parameter: 'mood' } });
}

module.exports = getGenreSeeds;
