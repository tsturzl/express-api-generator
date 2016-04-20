var mongoose = require('mongoose');
var should = require('should');
var {{name}} = require();

before(function(done) {
  require('../../app.js');
  mongoose.connection.on('connected', function() {
    {{name}}.remove({}, done);
  });
});

after(function(done) {
  {{name}}.remove({}, done);
});

describe("{{name}}", function() {

  var id;
  describe("#createDoc()", function() {
    it('should create and return new document via promise', function(done) {
      {{name}}.createDoc({})
        .then(function(doc) {
          doc.should.have.property("_id");
          doc.should.have.property('updated_at').as.a.Date();
          id = doc._id;
          done();
        })
        .catch(function(err){
          should.not.exist(err);
          done();
        });
    });
  });

  describe("#updateDoc()", function() {

    it('should update document', function(done) {
      {{name}}.updateDoc(id, {})
        .then(done)
        .catch(function(err) {
          should.not.exist(err);
          done()
        });
    });
  });

  describe("#fetch()", function() {
    it('should fetch one document', function(done) {
      {{name}}.fetch(id)
        .then(function(doc) {
          doc.should.have.property("_id");
          doc.should.have.property('updated_at').as.a.Date();
        })
        .catch(function(err) {
          should.not.exist(err);
          done()
        });
    });
  });

  describe("#list()", function() {});

  describe("#delete()", function() {});

});