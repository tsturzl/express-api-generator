/* Manager
 --- {{schemaName}} ---

 {{description}}


 Author: {{author}}
 */
'use strict';

var ObjectId  = require('mongoose').Types.ObjectId,
  _         = require('underscore'),
  Promise   = require('bluebird');


module.exports = function({{schemaName}}) {

  /*** MODEL METHODS ***/

  //Create Document/s
  {{schemaName}}.statics.createDoc = function(data) {
    var self = this;

    var dataArr = [].concat(data); //Ensure data is an array, cast single object to array
    return new Promise(function(resolve, reject) {
      self.insertMany(dataArr)
        .then(resolve)
        .catch(reject);
    });
  };

  //update single document
  {{schemaName}}.statics.updateDoc = function(id, data) {
    var me = this;
    return new Promise(function(resolve, reject) {
      if(!id) reject(new Error("Missing _id"));
      if(typeof id === "string") id = ObjectId(id);

      me.findByIdAndUpdate(id, data, {safe: false, new: true})
        .exec()
        .then(resolve)
        .catch(reject);
    });
  };

  //fetch by _id
  {{schemaName}}.statics.fetch = function(id) {
    var self = this;

    return new Promise(function(resolve, reject) {
      if(typeof id === "string") id = ObjectId(id);

      self.findById(id)
        .exec()
        .then(resolve)
        .catch(reject);

    });
  };

  //list documents
  {{schemaName}}.statics.list = function(options) {
    var self = this;

    return new Promise(function(resolve, reject) {
      //query object
      var q = {};

      //date range filter
      if(options.from) {
        q.updated_at = {
          $gte: options.from,
          $lt: options.to || new Date()
        };
      }

      //sort string eg 'field' or '-field'
      var sort = options.sort || '-updated_at';

      //Pagenation
      var size = options.size || 50;
      var page = options.page ? options.page * size : 0;

      //query model
      self.find(q)
        .skip(page)
        .limit(size)
        .sort(sort)
        .exec()
        .then(resolve)
        .catch(reject);
    });
  };

  //Delete document
  {{schemaName}}.statics.delete = function(id) {
    var self = this;

    return new Promise(function(resolve, reject){
      if(typeof id === "string") id = ObjectId(id);

      self.findOneAndRemove({id: id})
        .exec()
        .then(resolve)
        .catch(reject);
    });
  };

  /*** DOCUMENT METHODS ***/

  {{schemaName}}.methods.getCreateDate = function() {
    return new Date(this._id.getTimestamp());
  };



};