/* {{type}}
--- {{name}} ---

{{description}}


Author: {{author}}
*/
'use strict';

var mongoose  = require('mongoose');
var _         = require('underscore');
var ObjectId  = mongoose.Schema.ObjectId;
var {{name}}  = require('../managers/{{name}}');

//Construct Schema
var {{schemaName}} = new mongoose.Schema({
  update_at: {type: Date}
});


/* Manager
----------------------------------------------------------------------------- */

//Bind model methods from manager
{{schemaName}}.statics = {{name}}.model;

//Bind document methods from manager
{{schemaName}}.methods = {{name}}.document;

/* Validators
----------------------------------------------------------------------------- */


/* Hooks
----------------------------------------------------------------------------- */

//stamp update_at on save
{{schemaName}}.pre('save', function(done) {
  this.updated_at = new Date();
  done();
});

//stamp update_at on update
{{schemaName}}.pre('update', function(done) {
  this.updated_at = new Date();
  done();
});


/* Indices
----------------------------------------------------------------------------- */

//Index for sorting and querying by update_at
{{schemaName}}.index({updated_at: 1});


/* Virtual Fields
----------------------------------------------------------------------------- */

//Create virtual for created_at from _id creation timestamp
{{schemaName}}.virtual('created_at')
.get(function () {
  return this.getCreateDate();
});

/* Private methods
----------------------------------------------------------------------------- */

//Export model
module.exports = mongoose.model('{{namePlural}}', {{schemaName}});