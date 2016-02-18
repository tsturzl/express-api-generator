module.exports = function(req, res, next) {

  res.err = function(err) {
    res.status('404').send(err.toString());
  };

  res.dbResp = function(results) {
    res.json(results);
  };

  next();
};