'use strict';

const restify = require('restify');
const logger = require('./logger');
let server = restify.createServer({name: 'API-Test'});

const prom = require('./monitor/monitor');
prom.instrument(server);

// defining modules to be used at restify
server.use(restify.bodyParser());

// listening for requests
server.listen(8080, () => {
  logger.info('Server listening on port number', 8080);
});

// handling client errors
server.on('clientError', (err, socket) => {
  logger.error('[Server] Client sent event Error (Client error): ', err);
});

// handling server closing
server.on('close', () => {
  logger.info('[Server] Server stopping....');
});

server.server.on('request', (req, res) => {
  res.on('finish', () => {
    req.socket.destroy();
  });
});

// handling uncaught exceptions
server.on('uncaughtException', (request, response, route, error, cb) => {
  logger.error('[Server] Internal error (uncaughtException)',
    {error: error.stack});
  setTimeout(() => {
    process.exit(1);
  });
});

// loading routes
server.get('/name', (req, res, next) => {
  logger.info('NAME');
  return res.send(200);
});

server.get('/hello', (req, res, next) => {
  logger.info('/hello');
  return res.send(200);
});
