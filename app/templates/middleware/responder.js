/* Middleware
--- Responder ---

Promise flavored response method injector.

Author: {{author}}
*/
'use strict';

function responder(req, res, next) {

  res.reject = function(err) {
    try {
      res.status(500).send(JSON.stringify(err));
    }
    catch(e) {
      console.log(e);
      res.status(500).send("Internal Server Error");
    }
  };

  res.resolve = function(results) {
    res.json(results);
  };

  next();
}

module.exports = function(app) {
  app.use(responder);
};
