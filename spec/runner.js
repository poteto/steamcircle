'use strict';

var glob  = require('glob');
var Mocha = require('mocha');

var mocha = new Mocha({
  ui       : 'bdd',
  reporter : 'spec',
  timeout  : 5000,
  slow     : 500
});

var root = 'spec';

function addFiles(mocha, files) {
  glob.sync(root + files).forEach(mocha.addFile.bind(mocha));
}

addFiles(mocha, '/**/*-spec.js');

mocha.run(function(failures) {
  process.exit(failures);
});
