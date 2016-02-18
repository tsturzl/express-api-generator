var ObjectId  = require('mongoose').Types.ObjectId;
var _         = require('underscore');
var Promise   = require('bluebird');

var {{name}} = {
  model: {}, //All methods bind to model
  document: {} //All methods bind to document
};

/*
   --- PUBLIC METHODS ---
*/

/*** MODEL ***/
//update single document
{{name}}.model.updater = function(data) {
  return new Promise(function(resolve, reject) {
    try {
      var id = ObjectId(data.id);
      this.findOneAndUpdate({id: id}).exec()
        .then(resolve)
        .catch(reject)
    }
    catch(e) {
      reject(e);
    }
  });
};

//fetch by _id
{{name}}.model.fetch = function(id) {
  return this.findById(id).exec();
};

//list documents
{{name}}.model.list = function(options) {
  return new Promise(function(resolve, reject) {

  });
};

/*** DOCUMENT ***/



/*
   --- PRIVATE METHODS ---
 */


module.exports = {{name}};