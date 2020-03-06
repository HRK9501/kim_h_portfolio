const gulp = require('gulp');
const sass = require('gulp-sass');

function compile(done) {
    gulp.src('./sass/**/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./public/css'))
    done()
}

exports.compile = compile;