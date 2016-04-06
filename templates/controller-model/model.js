/* Model
--- {{name}} ---

{{description}}


Author: {{author}}
*/
'use strict';

var mongoose  = require('mongoose'),
  _         = require('underscore'),
  ObjectId  = mongoose.Schema.ObjectId;

//Construct Schema
var {{schemaName}} = new mongoose.Schema({
  updated_at: {type: Date}
});


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

/* Manager
 ----------------------------------------------------------------------------- */

require('../managers/{{camelName}}')({{schemaName}});


//Export model
module.exports = mongoose.model('{{collectionName}}', {{schemaName}});