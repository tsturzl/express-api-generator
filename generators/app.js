module.exports = function(gulp, install, conflict, template, rename, _, inflection, inquirer, mkdirp, es) {
  gulp.task('default', function(done) {

    var prompts = [{
      name: 'appName',
      message: 'Application Name?',
      default: 'API'
    }, {
      name: 'appDesc',
      message: 'Description of application?',
      default: 'An API project'
    }, {
      name: 'appAuthorName',
      message: 'Author Name?'
    }, {
      name: 'appAuthorEmail',
      message: "Author's email?"
    }, {
      name: 'license',
      message: 'License? ',
      default: 'MIT'
    }];

    inquirer.prompt(prompts, function(answers) {
      // General app
      var init = gulp.src(__dirname + '/../templates/init/**')
        .pipe(template(answers))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install());

      mkdirp.sync('./lib/middleware');

      var middleware = gulp.src(__dirname + '/../templates/middleware/responder.js')
        .pipe(template(answers))
        .pipe(conflict('./lib/middleware'))
        .pipe(gulp.dest('./lib/middleware'));

      mkdirp.sync('./lib/helpers');

      var helpers = gulp.src(__dirname + '/../templates/helpers/**')
        .pipe(template(answers))
        .pipe(conflict('./lib/helpers'))
        .pipe(gulp.dest('./lib/helpers'));

      es.merge(init, middleware, helpers)
        .on('end', done);
    });
  });
};