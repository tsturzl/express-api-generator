// Gulpfile.js
var gulp = require('gulp')
  , nodemon = require('gulp-nodemon');

gulp.task('dev', function () {
  nodemon({ script: 'app.js',
    ext: 'html js css',
    ignore: []
  }).on('restart', function () {
    console.log('restarted!')
  });
});