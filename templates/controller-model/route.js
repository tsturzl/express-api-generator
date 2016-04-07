'use strict';

var router = require('express').Router();
var {{controllerName}} = require('../controllers/{{camelName}}');

router.route('/api/{{routeName}}')
  .get({{controllerName}}.list)
  .post({{controllerName}}.create);

router.route('/api/{{routeName}}/:id')
  .get({{controllerName}}.read)
  .put({{controllerName}}.update)
  .delete({{controllerName}}.delete);

module.exports = function(app) {
  app.use(router);
};