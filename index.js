/* jshint node: true */

var http          = require('http');
var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var app           = express();
var router        = express.Router();

var buildUrl      = require('./lib/urlbuilder');
var interfaces    = require('./lib/interfaces');

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 86400000 }));
app.use('/api', router);

router.get('/id/:url', function(req, res) {
  var interfaceName = interfaces.user.name;
  var method        = interfaces.user.methods.vanity.endpoint;
  var version       = interfaces.user.methods.vanity.version;
  var params        = { vanityurl: req.params.url };

  var api = buildUrl(interfaceName, method, version, params);
  var data = '';
  var steamId;

  http.get(api, function(response) {
    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      if (data) {
        data = JSON.parse(data);
      }
      // res.status(response.statusCode).json(data.response.steamid);
      steamId = encodeURIComponent(data.response.steamid);
      res.redirect(response.statusCode, '/api/profile/' + steamId);
    });
  }).on('error', function(error) {
    console.error(error.message);
  });
});

router.get('/profile/:id', function(req, res) {
  var interfaceName = interfaces.user.name;
  var method        = interfaces.user.methods.summary.endpoint;
  var version       = interfaces.user.methods.summary.version;
  var params        = { steamids: req.params.id };

  var api = buildUrl(interfaceName, method, version, params);
  var data = '';
  http.get(api, function(response) {
    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      if (data) {
        data = JSON.parse(data);
      }
      res.status(response.statusCode).json(data.response);
    });
  }).on('error', function(error) {
    console.error(error.message);
  });
});

router.get('/profile/:id/friends/:relationship', function(req, res) {
  var interfaceName = interfaces.user.name;
  var method        = interfaces.user.methods.friends.endpoint;
  var version       = interfaces.user.methods.friends.version;
  var params        = { steamid: req.params.id, relationship: req.params.relationship };

  var api = buildUrl(interfaceName, method, version, params);
  var data = '';
  http.get(api, function(response) {
    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      if (data) {
        data = JSON.parse(data);
      }
      res.status(response.statusCode).json(data.friendslist);
    });
  }).on('error', function(error) {
    console.error(error.message);
  });
});

router.get('/profile/:id/games/owned', function(req, res) {
  var interfaceName = interfaces.player.name;
  var method        = interfaces.player.methods.games.endpoint;
  var version       = interfaces.player.methods.games.version;
  var params        = { steamid: req.params.id, include_appinfo: true };

  var api = buildUrl(interfaceName, method, version, params);
  var data = '';
  http.get(api, function(response) {
    response.on('data', function(chunk) {
      data += chunk;
    });

    response.on('end', function() {
      if (data) {
        data = JSON.parse(data);
      }
      res.status(response.statusCode).json(data.response);
    });
  }).on('error', function(error) {
    console.error(error.message);
  });
});

module.exports = app;
