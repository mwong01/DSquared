const url = require('url');

function fullURL(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host'),
  });
} 

module.exports = {fullURL};