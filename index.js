var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var winston       = require('winston');
var app           = express();
var router        = express.Router();

var staticPath    = './client/dist';
var applyRoutes   = require('./routes/application');

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  winston.info('Listening at http://%s:%s', host, port);
});

app.use(logger('dev'));
app.use('/api', router);
app.use(express.static(path.join(__dirname, staticPath), { maxAge: 86400000 }));
app.get('*', function(request, response){
  response.sendFile(path.join(__dirname, staticPath, 'index.html'));
});

applyRoutes(router);
module.exports = app;
