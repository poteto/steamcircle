module.exports = function(app) {
  var http          = require('http');
  var express       = require('express');
  var steamRouter   = express.Router();

  var apiKey        = process.env.STEAM_API_KEY;
  var protocol      = 'http';
  var host          = 'api.steampowered.com';
  var interfaceName = 'ISteamUser';

  steamRouter.get('/resolveVanityUrl/:url', function(req, res) {
    var url = _buildUrl(interfaceName, 'ResolveVanityURL', 1, { vanityurl: req.params.url });
    var data = '';
    http.get(url, function(response) {
      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function() {
        res.status(response.statusCode).json(data);
      });
    }).on('error', function(error) {
      console.error(error.message);
    });
  });

  _buildUrl = function(interfaceName, method, version, opts) {
    var params = [];
    version  = 'v000' + version;

    for (var key in opts) {
      if (opts.hasOwnProperty(key)) {
        params.push('' + key + '=' + opts[key]);
      }
    }

    params = params.join('&');

    return (
      '' + protocol + '://' + host + '/' + interfaceName + '/' + method + '/' + version + '/?' + 'key=' + apiKey + '&' + params
      );
  };

  app.use('/api/steam', steamRouter);
};
