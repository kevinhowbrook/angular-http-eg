var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var print = require('gulp-print');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
   LessPluginAutoPrefix = require('less-plugin-autoprefix'),
   cleancss = new LessPluginCleanCSS({ advanced: true }),
   autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('less', function () {
 return gulp.src(['./node_modules/bootstrap/less/bootstrap.less',
  './lib/less/style.less'])
   .pipe(less({
     paths: [ path.join(__dirname, 'less', 'includes') ],
     plugins: [autoprefix, cleancss]
   }))
   .pipe(print())
   .pipe(concat('style.css'))
   .pipe(gulp.dest('./lib/less/css'))
});

//js
gulp.task('js', function () {
    gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.js',
     './app.js',
      './lib/js/custom.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./lib/js'));
});

gulp.task('default', ['less', 'js'], function() {
 gulp.watch(['./lib/less/*.less', './lib/js/*.js'], ['less', 'js']);
});