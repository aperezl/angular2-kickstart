var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var gls = require('gulp-live-server');
var config = require('./tsconfig.json');
var webserver = require('gulp-webserver');

gulp.task('clean', function() {
  return del('dist/**/*');
});

gulp.task('compile', function() {
  return gulp
    .src('src/app/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(config.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:libs', function() {
  return gulp.src([
      "node_modules/es6-shim/es6-shim.min.js",
      "node_modules/systemjs/dist/system-polyfills.js",
      "node_modules/angular2/bundles/angular2-polyfills.js",
      "node_modules/systemjs/dist/system.src.js",
      "node_modules/rxjs/bundles/Rx.js",
      "node_modules/angular2/bundles/angular2.dev.js",
      "node_modules/angular2/bundles/router.dev.js",
      "node_modules/ng2-material/dist/ng2-material.css",
      "node_modules/ng2-material/dist/ng2-material.js"
    ])
    .pipe(gulp.dest('dist/lib'))
});



// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function() {
  return gulp.src(['src/app/**/*', 'src/index.html', 'src/style.css', '!src/app/**/*.ts'], { base : './src' })
    .pipe(gulp.dest('dist'))
});

gulp.task('live-serve', function() {
  gulp.src('dist')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: {
        enable: true, // need this set to true to enable livereload
        filter: function(fileName) {
          if (fileName.match(/.map$/)) { // exclude all source maps from livereload
            return false;
          } else {
            return true;
          }
        }
      }
    }));
});

gulp.watch('src/app/**/*.ts', ['compile']);
gulp.watch('src/**/*.html', ['copy:assets']);
gulp.watch('src/**/*.css', ['copy:assets']);




gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);
gulp.task('serve', ['compile', 'copy:libs', 'copy:assets', 'live-serve']);
gulp.task('default', ['build']);
