"use strict";

const path = require('path');

const getUserById = require(path.join(__dirname, "..", "modules", "getUserById.js"));

const getUser = function(req, res) {

    const self = req.originalUrl;

    let getTrack;
    let getPlaylist;

    if (req.params.id) {
        getTrack = `/combination/track/${req.users.id}`;
        getPlaylist = `/combination/playlist/${req.users.id}`;
    } else {
        getTrack = `/combination/track`;
        getPlaylist = `/combination/playlist`;
    }

    res.send({links: {self, track: getTrack , playlist: getPlaylist}, data: req.users});

}

module.exports = getUser;