/* {{type}}
--- {{name}} ---

{{description}}


Author: {{author}}
*/
'use strict';

var router = require('express').Router();
var {{controllerName}} = require('../controllers/{{controllerName}}');

router.route('/api/{{name}}')
  .get({{controllerName}}.list)
  .post({{controllerName}}.create);
  
router.route('/api/{{name}}/:id')
  .get({{controllerName}}.read)
  .put({{controllerName}}.update)
  .delete({{controllerName}}.delete);

module.exports = function(app) {
  app.use(router);
}