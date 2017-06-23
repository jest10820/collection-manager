const restify = require('restify');

let server = restify.createServer();

server.listen(8080, () => {
  console.log('Server listening at %s', server.url);
});

