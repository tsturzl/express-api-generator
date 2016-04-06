'use strict';

var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-mustache'),
  rename = require('gulp-rename'),
  _ = require('underscore.string'),
  inflection = require('inflection'),
  inquirer = require('inquirer'),
  es = require("event-stream"),
  mkdirp = require('mkdirp');

gulp = require('./generators/app.js')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, es);
gulp = require('./generators/middleware.js')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, es);
gulp = require('./generators/module.js')(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, es);