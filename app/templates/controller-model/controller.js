var {{name}} = require("{{modelPath}}");

var {{controllerName}} = {};

/*
  Create {{name}}
    - Desc: takes single document or array of documents to insert
 */

{{controllerName}}.create = function(req, res) {
  {{name}}.create(req.body, res.dbResp());
};

/*
  List {{name}}
   - Desc: List documents per parameters provided
 */
{{controllerName}}.list = function(req, res) {

};

/*
  Read {{name}}
   - Desc: Retrieve document by _id
 */
{{controllerName}}.read = function(req, res) {

};

/*
  Update {{name}}
   - Desc: Update single document or array
 */
{{controllerName}}.update = function(req, res) {

};

/*
  Delete {{name}}
   - Desc: Delete single document or array of _id's
 */
{{controllerName}}.delete = function(req, res) {

};