const http = require('http');

const { processenv } = require('processenv');

const app = require('./lib/getApp');

const server = http.createServer(app);

const port = processenv('PORT', 3000);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
