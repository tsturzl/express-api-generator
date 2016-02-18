/* {{type}}
--- {{name}} ---

{{description}}


Author: {{author}}
*/
'use strict';

module.exports = function(req, res, next) {

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
};
