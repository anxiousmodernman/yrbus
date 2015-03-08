var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');


var paths = {
    frontedApp: './app/main.jsx',
    buildDir: './yrbus/static/yrbus/bundled/*/**'
};



gulp.task('build', ['clean', 'sass'], function() {
    browserify({entries: paths.frontedApp})
        .transform(reactify)
        .bundle()
        .pipe(source('bundled.js'))
        .pipe(gulp.dest('./yrbus/static/yrbus/bundled/js'));
});

gulp.task('clean', function(cb) {
    console.log('Cleaning: ' + paths.buildDir);
    del(paths.buildDir, cb);
});

gulp.task('setup', function() {
    gulp.src('./bower_components/bootstrap/**/*')
        .pipe(gulp.dest('./yrbus/static/yrbus/bootstrap'))
})

gulp.task('sass', function() {
     gulp.src('./app/styles/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./yrbus/static/yrbus/bundled/css'));
});

gulp.task('default', ['build'],function() {
});


gulp.task('test', function() {
    gulp.src('./app/tests/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});



