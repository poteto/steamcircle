var qs       = require('querystring');
var url      = require('url');

var apiKey   = process.env.STEAM_API_KEY;
var protocol = 'http';
var host     = 'api.steampowered.com';
var format   = 'json';

var buildUrl = function(interfaceName, method, version, opts) {
  var params, api;
  version     = 'v000' + version;
  opts.format = format;
  params      = qs.stringify(opts);

  api = url.format({
    protocol : protocol,
    hostname : host,
    pathname : interfaceName + '/' + method + '/' + version,
    search   : 'key=' + apiKey
  });

  return api + '&' + params;
};

module.exports = buildUrl;
