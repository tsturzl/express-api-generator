/* {{type}}
--- {{name}} ---

{{description}}


Author: {{author}}
*/
'use strict';

var ObjectId  = require('mongoose').Types.ObjectId;
var _         = require('underscore');
var Promise   = require('bluebird');

var {{name}} = {
  model: {}, //All methods bind to model
  document: {} //All methods bind to document
};

/* PUBLIC METHODS
----------------------------------------------------------------------------- */

/*** MODEL ***/

//Create Document/s
{{name}}.model.insert = function(data) {
  return new Promise(function(resolve, reject) {
    try {
      this.create(data)
        .exec()
        .then(resolve)
        .catch(reject)
    }
    catch(e) {
      reject(e);
    }
  })
};

//update single document
{{name}}.model.updater = function(id, data) {
  return new Promise(function(resolve, reject) {
    try {
      if(typeof id === "string") id = ObjectId(id);
      
      this.findById({id: id})
        .exec()
        .then(function(doc) {
          doc = _.extend(doc, data);
          
          doc.save();
          return doc;
        })
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
  return new Promise(function(resolve, reject) {
    try {
      if(typeof id === "string") id = ObjectId(id);
      
      this.findById(id)
        .exec()
        .then(resolve)
        .catch(reject)
    }
    catch(e) {
      reject(e);
    }
  });
};

//list documents
{{name}}.model.list = function(options) {
  return new Promise(function(resolve, reject) {
    try {
      //query object
      var q = {};
      
      //date range filter
      if(options.from) {
        q.update_at = {
          $gte: options.from,
          $lt: options.to || new Date()
        };
      }
      
      //sort string eg 'field' or '-field'
      var sort = options.sort || '-update_at';
      
      //Pagenation
      var size = options.size || 50;
      var page = options.page ? options.page * size : 0;
      
      //query model
      this.find(q)
        .skip(page)
        .limit(size)
        .sort(sort)
        .exec()
        .then(resolve)
        .catch(reject);
    }
    catch(e) {
      //reject exception
      reject(e);
    }
  });
};

//list documents
{{name}}.model.list = function(options) {
  return new Promise(function(resolve, reject) {
    try {
      //query object
      var q = {};
      
      //date range filter
      if(options.from) {
        q.update_at = {
          $gte: options.from,
          $lt: options.to || new Date()
        };
      }
      
      //sort string eg 'field' or '-field'
      var sort = options.sort || '-update_at';
      
      //Pagenation
      var size = options.size || 50;
      var page = options.page ? options.page * size : 0;
      
      //query model
      this.find(q)
        .skip(page)
        .limit(size)
        .sort(sort)
        .exec()
        .then(resolve)
        .catch(reject);
    }
    catch(e) {
      //reject exception
      reject(e);
    }
  });
};

//Delete document
{{name}}.model.delete = function(id) {
  return new Promise(function(resolve, reject){
    try {
      if(typeof id === "string") id = ObjectId(id);
      
      this.findOneAndRemove({id: id})
        .exec()
        .then(resolve)
        .catch(reject);
    }
    catch(e) {
      reject(e);
    }
  });
};

/*** DOCUMENT ***/
{{name}}.document.getCreateDate = function() {
  return new Date(this._id.getTimestamp());
}


/* PRIVATE METHODS
----------------------------------------------------------------------------- */



//export module
module.exports = {{name}};