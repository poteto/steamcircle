var request = require('supertest');
var mocha   = require('mocha');
var should  = require('should');
var app     = require('../../index.js');

describe('App', function() {
  it('should exist', function (done) {
    should.exist(app);
    done();
  });
});
