'use strict';

function parse (path) {
  let ret = {
    path: path
  };
  if (path[path.length - 1] === '/') {
    ret.path = path.substr(0, path.lastIndexOf('/'));
  }
  return ret;
}

module.exports = {
  parse: parse
};

