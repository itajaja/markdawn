"use strict";

var gulp = require('gulp'),
  babel = require('gulp-babel'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber'),

  path = {
    src: {
      js: 'src/*.js'
    },
    dist: {
      js: "dist/"
    }
  };

gulp.task('6to5', function() {
  gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(babel())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task('watch', ['6to5'], function() {
  gulp.watch([path.src.js], ['6to5']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['6to5']);
