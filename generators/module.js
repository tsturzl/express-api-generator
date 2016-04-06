var fs = require('fs');
module.exports = function(gulp, install, conflict, template, rename, _, inflections, inquirer, mkdirp, es) {
  gulp.task('', function (done) {

    var config = JSON.parse(fs.readFileSync(process.cwd() + '/package.json'));

    var prompts = [{
      name: 'modName',
      message: 'Name of module(controller/model)?'
    }, {
      name: 'description',
      message: 'Description?',
      default: ''
    }];

    inquirer.prompt(prompts, function(answer) {
      var slug = _.slugify(answer.modName);
      var slugPlural = inflections.pluralize(slug);

      answer.name = _.classify(slug);
      answer.camelName = _.camelize(slug, true);
      answer.controllerName = answer.name + 'Ctrl';
      answer.schemaName = _.camelize(slug, true) + 'Schema';
      answer.collectionName = _.classify(slugPlural);
      answer.routeName = answer.collectionName;
      answer.appName = config.name;
      answer.author = config.author;
      
      var fileName = answer.camelName + '.js';

      mkdirp.sync('./lib/controllers');

      var controller = gulp.src(__dirname + '/../templates/controller-model/controller.js')
        .pipe(template(answer))
        .pipe(rename(fileName))
        .pipe(conflict('./lib/controllers'))
        .pipe(gulp.dest('./lib/controllers'));

      mkdirp.sync('./lib/models');

      var model = gulp.src(__dirname + '/../templates/controller-model/model.js')
        .pipe(template(answer))
        .pipe(rename(fileName))
        .pipe(conflict('./lib/models'))
        .pipe(gulp.dest('./lib/models'));

      mkdirp.sync('./lib/managers');

      var manager = gulp.src(__dirname + '/../templates/controller-model/manager.js')
        .pipe(template(answer))
        .pipe(rename(fileName))
        .pipe(conflict('./lib/managers'))
        .pipe(gulp.dest('./lib/managers'));

      mkdirp.sync('./lib/routes');

      var route = gulp.src(__dirname + '/../templates/controller-model/route.js')
        .pipe(template(answer))
        .pipe(rename(fileName))
        .pipe(conflict('./lib/routes'))
        .pipe(gulp.dest('./lib/routes'));

      mkdirp.sync('./test/unit');

      var test = gulp.src(__dirname + '/../templates/test/unitTest.js')
        .pipe(template(answer))
        .pipe(rename(fileName))
        .pipe(conflict('./test/unit'))
        .pipe(gulp.dest('./test/unit'));

      es.merge(controller, model, manager, route, test)
        .on('end', done);
    });
  });
};