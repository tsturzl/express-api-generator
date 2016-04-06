/* Controller
--- {{name}} ---

{{description}}


Author: {{author}}
*/
'use strict';

var {{name}} = require('../models/{{name}}');

var {{controllerName}} = {};

/*
  Create {{name}}
    - Desc: takes single document or array of documents to insert
*/

{{controllerName}}.create = function(req, res) {
  if(!req.body) return res.reject(new Error("Missing body"));
  
  {{name}}.createDoc(req.body)
    .then(res.resolve)
    .catch(res.reject)
};

/*
  List {{name}}
   - Desc: List documents per parameters provided
*/
{{controllerName}}.list = function(req, res) {
  var params = req.query;
  
  var options = {
    sort: params.sort || null,
    page: params.page || null,
    size: params.size || null,
    from: params.from || null,
    to:   params.to   || null
  };
  
  {{name}}.list(options)
    .then(res.resolve)
    .catch(res.reject);
};

/*
  Read {{name}}
   - Desc: Retrieve document by _id
*/
{{controllerName}}.read = function(req, res) {
  var id = req.query.id;
  
  if(!id) return res.reject(new Error("Missing id parameter"));
  
  {{name}}.fetch(id)
    .then(res.resolve)
    .catch(res.reject);
};

/*
  Update {{name}}
   - Desc: Update single document or array
*/
{{controllerName}}.update = function(req, res) {
  var body = req.body;
  var id = req.query.id;
  
  if(!body) return res.reject(new Error("Missing body"));
  if(!id) return res.reject(new Error("Missing id parameter"));
  
  {{name}}.updateDoc(id, body)
    .then(res.reject)
    .catch(res.resolve);
};

/*
  Delete {{name}}
   - Desc: Delete single document or array of _id's
*/
{{controllerName}}.delete = function(req, res) {
  var id = req.query.id;
  
  if(!id) return res.reject(new Error("Missing id parameter"));
  
  {{name}}.delete(id)
    .then(res.resolve)
    .catch(res.reject);
};

module.exports = {{controllerName}};