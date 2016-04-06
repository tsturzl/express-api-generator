module.exports = function(gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, es) {
  gulp.task('middleware', function(done) {

    var prompts = [{
      name: 'name',
      message: 'Middleware name?',
      default: 'middleware'
    }];

    inquirer(prompts, function(answers) {
      var fileName = _.camelize(_.slugify(answers.name)) + '.js';

      mkdirp.sync('./lib/middleware');

      gulp.src(__dirname + '/../templates/middleware/middleware.js')
        .pipe(rename(fileName))
        .pipe(conflict('./lib/middleware'))
        .pipe(gulp.dest('./lib/middleware'))
        .on('end', done);
    });
  });
};