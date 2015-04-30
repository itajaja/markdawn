"use strict";

var gulp = require('gulp'),
  babel = require('gulp-babel'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),

  path = {
    src: {
      js: 'src/*.js'
    },
    dist: {
      js: "lib/"
    }
  };

gulp.task('clean', function () {
  return gulp.src(path.dist.js, {read: false})
      .pipe(clean());
});

gulp.task('6to5', function() {
  return gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(babel())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('watch', ['build'], function() {
  gulp.watch([path.src.js], ['6to5']);
});

gulp.task('default', ['watch']);
gulp.task('build', [], function(cb){
  runSequence('clean','6to5',cb);
  });
