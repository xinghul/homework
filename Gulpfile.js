+function(undefined) {
  "use strict";

  var gulp       = require("gulp")
  ,   jade       = require("gulp-jade")
  ,   sass       = require("gulp-sass")
  ,   rimraf     = require("gulp-rimraf")
  ,   browserify = require("browserify")
  ,   source     = require("vinyl-source-stream");


  gulp.task("default", ["browserify", "jade", "sass"], function() {
    console.log("haha");
  });

  gulp.task("browserify", ["clean"], function() {
    return browserify("./app/js/app.js")
      .bundle()
      .pipe(source("bundle.js"))
      .pipe(gulp.dest("./app/js/"));
  })

  gulp.task("jade", ["clean"], function() {
    return gulp.src("./build/jade/*.jade")
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest("./app/views/"));
  });

  gulp.task("sass", ["clean"], function() {
    return gulp.src("./build/sass/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./app/stylesheets/"));
  });

  gulp.task("clean", function() {
    return gulp.src([
        "./app/views/*",
        "./app/stylesheets/main.css",
        "./app/bundle.js"
      ], {read: false})
      .pipe(rimraf());
  });

}();
