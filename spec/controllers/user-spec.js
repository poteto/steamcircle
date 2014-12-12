var request = require('supertest');
var mocha   = require('mocha');
var should  = require('should');
var app     = require('../../index.js');

describe('api/users', function() {
  describe('#/resolve/:name', function() {
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

  describe('#/:id', function() {
    describe('when the id is valid', function() {
      it('responds with 200', function(done) {
        request(app)
          .get('/api/users/76561197962914071')
          .expect(200, done);
      });

      it("responds with the user", function(done) {
        request(app)
          .get('/api/users/76561197962914071')
          .end(function(err, res) {
            res.body.user.should.have.property('personaname', 'sugarpirate');
            done();
          });
      });
    });

    describe('when the id is invalid', function() {
      it('responds with 404', function(done) {
        request(app)
          .get('/api/users/k')
          .expect(404, done);
      });
    });
  });

  describe('#/:id/friends/', function() {
    describe('when the id is valid', function() {
      it('responds with 200', function(done) {
        request(app)
          .get('/api/users/76561197962914071/friends')
          .expect(200, done);
      });

      it("responds with the user's friend list", function(done) {
        request(app)
          .get('/api/users/76561197962914071/friends')
          .end(function(err, res) {
            res.body.should.have.property('friends');
            done();
          });
      });
    });

    describe('when the id is invalid', function() {
      it('responds with 500', function(done) {
        request(app)
          .get('/api/users/k/friends')
          .expect(500, done);
      });
    });
  });

  describe('#/:id/games/owned', function() {
    describe('when the id is valid', function() {
      it('responds with 200', function(done) {
        request(app)
          .get('/api/users/76561197962914071/games/owned')
          .expect(200, done);
      });

      it("responds with the user's game list", function(done) {
        request(app)
          .get('/api/users/76561197962914071/games/owned')
          .end(function(err, res) {
            res.body.should.have.property('game_count');
            res.body.should.have.property('games');
            done();
          });
      });
    });

    describe('when the id is invalid', function() {
      it('responds with 500', function(done) {
        request(app)
          .get('/api/users/k/games/owned')
          .expect(500, done);
      });
    });
  });

  describe('#/:id/games/recent', function() {
    describe('when the id is valid', function() {
      it('responds with 200', function(done) {
        request(app)
          .get('/api/users/76561197962914071/games/recent')
          .expect(200, done);
      });

      it("responds with the user's game list", function(done) {
        request(app)
          .get('/api/users/76561197962914071/games/recent')
          .end(function(err, res) {
            res.body.should.have.property('total_count');
            done();
          });
      });
    });

    describe('when the id is invalid', function() {
      it('responds with 500', function(done) {
        request(app)
          .get('/api/users/k/games/recent')
          .expect(500, done);
      });
    });
  });

  describe('#/games/:appid', function() {
    describe('when the id is valid', function() {
      it('responds with 200', function(done) {
        request(app)
          .get('/api/games/220')
          .expect(200, done);
      });

      it("responds with the game's schema", function(done) {
        request(app)
          .get('/api/games/220')
          .end(function(err, res) {
            res.body.should.have.property('gameName');
            done();
          });
      });
    });

    describe('when the id is invalid', function() {
      it('responds with 400', function(done) {
        request(app)
          .get('/api/games/abcd')
          .expect(400, done);
      });
    });
  });
});
