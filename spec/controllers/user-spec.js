var request = require('supertest');
var mocha   = require('mocha');
var should  = require('should');
var app     = require('../../index.js');

describe('api/users', function() {
  describe('#resolve', function() {
    describe('when the username is valid', function() {
      it('responds with 200', function(done) {
        request(app)
          .get('/api/users/resolve/sugarpirate')
          .expect(200, done);
      });

      it("responds with the user's steam id", function(done) {
        request(app)
          .get('/api/users/resolve/sugarpirate')
          .end(function(err, res) {
            res.body.should.equal('76561197962914071');
            done();
          });
      });
    });

    describe('when the username is invalid', function() {
      it('responds with 404', function(done) {
        request(app)
          .get('/api/users/resolve/k')
          .expect(404, done);
      });
    });
  });
});
