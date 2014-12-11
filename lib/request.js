var http        = require('http');
var buildUrl    = require('./urlbuilder');
var winston     = require('winston');
var isDebugging = process.env.DEBUG;

module.exports = function(options, callback) {
  var url = buildUrl(options.interfaceName, options.method, options.version, options.params);
  if (isDebugging) { winston.info(url); }
  var data = '';

  http.get(url, function(response) {
    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      if (data && response.statusCode === 200) {
        data = JSON.parse(data);
      }
      return callback(response, data);
    });
  }).on('error', function(error) {
    winston.error(error.message);
  });
};
