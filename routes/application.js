var interfaces  = require('../lib/interfaces');
var makeRequest = require('../lib/request');

module.exports = function(router) {
  router.get('/users/resolve/:name', function(req, res) {
    var options = {
      interfaceName : interfaces.user.name,
      method        : interfaces.user.methods.vanity.endpoint,
      version       : interfaces.user.methods.vanity.version,
      params        : { vanityurl: req.params.name }
    };

    makeRequest(options, function(response, data) {
      if (data.response.success === 42) {
        res.status(404).send();
      } else {
        res.status(response.statusCode).json(data.response.steamid);
      }
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
      if (data.response.players.length) {
        var user = data.response.players[0];
        user.id = user.steamid;
        var parsed = { 'user': user };
        res.status(response.statusCode).json(parsed);
      } else {
        res.status(404).send();
      }
    });
  });

  router.get('/users/:id/friends/', function(req, res) {
    var options = {
      interfaceName : interfaces.user.name,
      method        : interfaces.user.methods.friends.endpoint,
      version       : interfaces.user.methods.friends.version,
      params        : { steamid: req.params.id, relationship: 'all' }
    };

    makeRequest(options, function(response, data) {
      res.status(response.statusCode).json(data.friendslist);
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
      res.status(response.statusCode).json(data.response);
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
      res.status(response.statusCode).json(data.response);
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
      res.status(response.statusCode).json(data.game);
    });
  });
};
