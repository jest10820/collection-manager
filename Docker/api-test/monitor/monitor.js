'use strict';

const metrics = require('./metrics');

function middleware (request, response, next) {
  let start = process.hrtime();
  response.on('finish', () => {
    if (typeof request.path === 'function') {
      request.path = request.path();
    }
    let respStatus = 'error';
    if (response._body && response._body.status) {
      respStatus = response._body.status;
    }
    metrics.observe(request.method, request.path, response.statusCode, respStatus, start);
  });
  // return
  return next();
}

function instrument (server, options) {
  server.use(middleware);
  server.get('/metrics', (req, res) => {
    res.setHeader('Content-Type', metrics.client.contentType);
    return res.end(metrics.summary());
  });
}

module.exports = {
  instrument: instrument
};

