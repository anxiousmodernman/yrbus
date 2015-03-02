var browserify = require('browserify');
var del = require('del');
var gulp = require('gulp');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var nodemon = require('gulp-nodemon');
//var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
//var args = require('yargs').argv;
//var gutil = require('gulp-util');


var paths = {
    /*
     * Set the path to the frontend app.
     * Require will follow main.jsx to the React .jsx dependencies.
     */
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

gulp.task('sass', function() {
     gulp.src('./app/styles/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./yrbus/static/yrbus/bundled/css'));
});

gulp.task('default', ['build'],function() {
    //var opts = {
    //    script: 'app.js',
    //    ext: 'js html scss jsx',
    //    ignore: ['app/public/**'],
    //    env: { 'NODE_ENV': 'development' }
    //};
    //nodemon(opts)
    //    .on('start', ['build', 'test'], function() {
    //        console.log('Restarting Server ******************');
    //    });
});


gulp.task('test', function() {
    gulp.src('./app/tests/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});



