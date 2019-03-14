const gulp = require('gulp')
const minify = require('gulp-minify')

function defaultTask(cb) {
    // place code for your default task here
    gulp.src('./src/*.js').pipe(minify()).pipe(gulp.dest('./dist/'))
    cb();
  }
  
exports.default = defaultTask