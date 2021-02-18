"use strict";

const getTrackCombination = function(req, res) {

    setTimeout(() => {
        const response = {data: {track: req.track, cocktails: req.cocktails, mood: req.mood, user: req.user}};
        return res.send(response);
    }, 0);

}

module.exports = getTrackCombination;