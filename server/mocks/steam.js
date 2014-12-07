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
    http.get(url, function(res) {
      console.log('URL is:' + url);
      console.log("Got response: " + res.statusCode);

      res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
      });
    }).on('error', function(error) {
      console.log("Got error: " + error.message);
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
