'use strict';

var express = require('express'),
  config = require('./config.js'),
  path = require('path'),
  fs = require('fs'),
  log = require('./lib/helpers/logger'),
  sessions = require('client-sessions'),
  Promise = require('bluebird'),
  mongoose = require('mongoose');


//Catch uncaught exceptions to log in bunyan
process.on('uncaughtException', function(err) {
  log.fatal({
    stack: err.stack || null,
    code: err.code ||null
  }, err.message || err);

  //DO NOT CONTINUE EXECUTION. Process could be in undefined state, safer to exit.
  process.exit(1); //Uncaught exception exit code
});

//plugin bluebird as promise provider
mongoose.Promise = Promise;

//start mongoose
log.info({uri: config.mongodb}, 'Connecting to MongoDB[Mongoose]');
mongoose.connect(config.mongodb);

//Init Express
var app = express();

log.info({path: path.resolve(config.viewsPath)}, 'Setup views path');
app.set('views', path.resolve(config.viewsPath));


//Standard middleware
log.info("Load standard middleware");
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
log.middleware(app);

if(config.requestLogger) app.use(require('morgan')(config.requestLogger));

//Load custom middleware
//TODO: Iterate lib/middleware and pass `app`
log.info({path: path.join(__dirname, '/lib/middleware')}, 'Load middleware from path');
loader(path.join(__dirname, '/lib/middleware'));

//Load routes
//TODO: Interate lib/routes and pass `app`
log.info({path: path.join(__dirname, '/lib/routes')}, 'Load routes from path');
loader(path.join(__dirname, '/lib/routes'));

//Listen
log.info("Starting app...");

app.listen(config.port, function() {
  log.info({port: config.port},"App started");
});

//Loader helper
function loader(dir) {
  dir = path.resolve(dir);

  fs.readdirSync(dir)
    .forEach(function(fileName) {
      var modulePath = path.join(dir, fileName);
      log.info({path: modulePath, file: __filename, fn: "#loader()"}, "Load module");
      require(modulePath)(app);
    });
}