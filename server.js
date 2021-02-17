"use strict";

const http = require('http'),
      path = require("path");

const { processenv } = require('processenv');

const app = require(path.join(__dirname, "lib", "getApp.js"));

const server = http.createServer(app);

const port = processenv('PORT', 3000);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});