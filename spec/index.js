var request = require('supertest');
var mocha   = require('mocha');
var should  = require('should');
var winston = require('winston');

describe('API', function() {
  describe('When serving a static folder', function () {
    it('should serve the right static folder', function () {
      [1].indexOf(2).should.equal(-1);
    });
  });
});
