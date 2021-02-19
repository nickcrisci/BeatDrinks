"use strict";

const getTrackCombination = function(req, res) {

    setTimeout(() => {
        const response = {data: {tracks: req.tracks, cocktails: req.cocktails}};
        return res.send(response);
    }, 0);

}

module.exports = getTrackCombination;