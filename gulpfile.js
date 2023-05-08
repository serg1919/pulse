const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat            = require('gulp-concat');
const browserSync       = require('browser-sync').create();
const uglify            = require('gulp-uglify-es').default;
const autoprefixer      = require('gulp-autoprefixer');
const del               = require('del');
const imagemin          = require('gulp-imagemin');



function styles() {
  return src([
    'app/css/*.css',
    '!app/css/style.min.css',
    'app/scss/**/*.scss'
  ])
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts () {
  return src([
    'app/js/libs/*.js',
    'app/js/*.js',
    '!app/js/main.min.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream());
}

function images () {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
     })
   ]))
    .pipe(dest('dist/images'));
}

function browsersync () {
  browserSync.init({
    server: {
        baseDir: 'app/'
    }
  });
}

function build() {
  return src([
    'app/*.html',
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/fonts/**/*'
  ], {base: 'app'} )
    .pipe(dest('dist'));
}

function cleanDist() {
  return del('dist');
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js','!app/js/main.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);

}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);   //gulp build - запуск (собирает проект в папку dist)
exports.default = parallel(browsersync, styles, scripts, watching);
