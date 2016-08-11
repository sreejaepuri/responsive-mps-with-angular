/**
 * Created by EPAV on 21/06/2016.
 */
// Include gulp
var gulp = require('gulp');

// Include gulp-jshint
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');


//js-hint taks
gulp.task('jshint', function () {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//minify new images
gulp.task('imagemin', function () {
    var imgSrc = './src/img/**/*',
        imgDst = './build/img';

    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    var htmlSrc = './src/html/**/*',
        htmlDst = './build/html';

    gulp.src(['./src/index.html', htmlSrc])
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

// minify new or changed HTML pages
gulp.task('index', function() {
    var htmlSrc = './src/index.html',
        htmlDst = './build/';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src('./src/js/*.js')
        .pipe(concat('mps-app.js'))
        .pipe(stripDebug())
        .pipe(gulp.dest('./build/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js/'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', ['sass'], function() {
    gulp.src(['./src/css/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css/'));
});


// default gulp task
gulp.task('default', ['imagemin', 'index', 'htmlpage', 'scripts', 'styles'], function() {
    // watch for HTML changes
    gulp.watch('./src/html/*.html', function() {
        gulp.run('htmlpage');
    });

    // watch for JS changes
    gulp.watch('./src/js/*.js', function() {
        gulp.run('jshint', 'scripts');
    });

    // watch for CSS changes
    gulp.watch('./src/css/*.css', function() {
        gulp.run('styles');
    });
});

