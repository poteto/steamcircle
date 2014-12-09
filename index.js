/* jshint node: true */

var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var winston       = require('winston');
var app           = express();
var router        = express.Router();

var interfaces    = require('./lib/interfaces');
var makeRequest   = require('./lib/request');
var staticPath;

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  winston.info('Listening at http://%s:%s', host, port);
});

if (app.get('env') === 'development') {
  staticPath = './dist';
} else {
  staticPath = './public';
}

app.use(logger('dev'));
app.use('/api', router);
app.use(express.static(path.join(__dirname, staticPath), { maxAge: 86400000 }));

app.get('*', function(request, response){
  response.sendFile(path.join(__dirname, staticPath, 'index.html'));
});

router.get('/resolve/:name', function(req, res) {
  var options = {
    interfaceName : interfaces.user.name,
    method        : interfaces.user.methods.vanity.endpoint,
    version       : interfaces.user.methods.vanity.version,
    params        : { vanityurl: req.params.name }
  };

  makeRequest(options, function(response, data) {
    res.status(response.statusCode).send(data.response.steamid);
  });
});

router.get('/users/:id', function(req, res) {
  var options = {
    interfaceName : interfaces.user.name,
    method        : interfaces.user.methods.summary.endpoint,
    version       : interfaces.user.methods.summary.version,
    params        : { steamids: req.params.id }
  };

  makeRequest(options, function(response, data) {
    var user = data.response.players[0];
    user.id = user.steamid;
    var parsed = { 'user': user };
    res.status(response.statusCode).send(parsed);
  });
});

router.get('/users/:id/friends/:relationship', function(req, res) {
  var options = {
    interfaceName : interfaces.user.name,
    method        : interfaces.user.methods.friends.endpoint,
    version       : interfaces.user.methods.friends.version,
    params        : { steamid: req.params.id, relationship: req.params.relationship }
  };

  makeRequest(options, function(response, data) {
    res.status(response.statusCode).send(data.friendslist);
  });
});

router.get('/users/:id/games/owned', function(req, res) {
  var options = {
    interfaceName : interfaces.player.name,
    method        : interfaces.player.methods.games.endpoint,
    version       : interfaces.player.methods.games.version,
    params        : { steamid: req.params.id, include_appinfo: true }
  };

  makeRequest(options, function(response, data) {
    res.status(response.statusCode).send(data.response);
  });
});

router.get('/users/:id/games/recent', function(req, res) {
  var options = {
    interfaceName : interfaces.player.name,
    method        : interfaces.player.methods.recentlyPlayed.endpoint,
    version       : interfaces.player.methods.recentlyPlayed.version,
    params        : { steamid: req.params.id }
  };

  makeRequest(options, function(response, data) {
    res.status(response.statusCode).send(data.response);
  });
});

router.get('/games/:appid', function(req, res) {
  var options = {
    interfaceName : interfaces.stats.name,
    method        : interfaces.stats.methods.schema.endpoint,
    version       : interfaces.stats.methods.schema.version,
    params        : { appid: req.params.appid }
  };

  makeRequest(options, function(response, data) {
    res.status(response.statusCode).send(data.game);
  });
});

module.exports = app;
