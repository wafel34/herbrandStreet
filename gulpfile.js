/**
 * Module Dependencies
 */

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    reload = browserSync.reload;

var sassSources = './resources/sass/style.sass',
    jsSources = './resources/scripts/**/*.js',
    outputDir = './app/public',
    env = 'production';


var onError = function (err) {
    console.log(err);
    this.emit('end');
};
/**
 * Gulp Tasks
 **/

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: "localhost:5000",  // local node app address
    port: 7000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app/server.js',
    ignore: [
        'resources/scripts/',
        'gulpfile.js',
        'node_modules/',
        'app/public/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
  }, 1000);
  });
});

//JS
gulp.task('js', function () {
   return gulp.src(jsSources)
            .pipe(plumber({
                errorHandler: onError
            }))
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(browserify())
            .pipe(gulpIf(env === 'production', uglify()))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(outputDir + '/js'))
            .pipe(browserSync.stream());
});

//SASS TO CSS
gulp.task('sass', function () {
    return gulp.src(sassSources)
            .pipe(plumber({
              errorHandler: onError
            }))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulpIf(env === 'production', cleanCss({compatibility: 'ie8'})))
            .pipe(gulp.dest(outputDir + '/css'))
            .pipe(browserSync.stream());
});


//load only visible part of webiste fisrt
gulp.task('pre-sass', function () {
    return gulp.src('./resources/sass/intro.sass')
            .pipe(plumber({
              errorHandler: onError
            }))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulpIf(env === 'production', cleanCss({compatibility: 'ie8'})))
            .pipe(gulp.dest(outputDir + '/css'))
            .pipe(browserSync.stream());
});




gulp.task('default', ['browser-sync', 'sass', 'pre-sass', 'js'], function () {
    gulp.watch(jsSources, ['js']);
    gulp.watch('resources/sass/**/*.sass', ['sass']);
    gulp.watch('resources/sass/**/intro.sass', ['pre-sass']);
    gulp.watch('app/*.html', browserSync.reload);
});
