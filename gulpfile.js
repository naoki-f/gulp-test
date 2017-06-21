var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

function plumberWithNotify() {
  return plumber({errorHandler: notify.onError("<%= error.message %>")});
}

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
    .pipe(plumberWithNotify())
    .pipe(sass())
    .pipe(gulp.dest('css/'));
});

gulp.task('optimize',['sass'], function() {
  return gulp.src('css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('css/'))
    .pipe(minify())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('css/'));
});

gulp.task('watch', function() {
  gulp.watch(['./sass/**/*.scss'], ['sass']);
});

gulp.task('sassOptimize', function() {
  runSequence(
    'sass',
    'optimize'
  );
});