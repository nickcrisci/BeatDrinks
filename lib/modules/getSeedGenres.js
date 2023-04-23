const path = require('path');
const fs = require('fs');

const mapPath = path.join(__dirname, '..', 'data', 'mapMoodMusicGenre.json');

// Server must be restarted to save changes
const readMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

function getGenreSeeds(mood) {
  if (readMap[mood]) {
    return readMap[mood];
  }
  return null;
}

module.exports = getGenreSeeds;
