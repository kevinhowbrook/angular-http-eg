var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var print = require('gulp-print');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
   LessPluginAutoPrefix = require('less-plugin-autoprefix'),
   cleancss = new LessPluginCleanCSS({ advanced: true }),
   autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
gulp.task('less', function () {
 return gulp.src('./less/style.less')
   .pipe(less({
     paths: [ path.join(__dirname, 'less', 'includes') ],
     plugins: [autoprefix, cleancss]
   }))
   .pipe(print())
   .pipe(gulp.dest('less/css'))
});
gulp.task('default', ['less'], function() {
 gulp.watch(['less/**/*.less'], ['less']);
});