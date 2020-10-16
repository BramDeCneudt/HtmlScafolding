const gulp = require('gulp');
const minify = require("gulp-minify");
const clean = require('gulp-clean');
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss')

const browserSync = require('browser-sync').create();
var reload = browserSync.reload;

const { series } = require('gulp');

function cleanDist() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
}

function minifyJS() {
    return gulp.src(['src/js/*.js'])
        .pipe(minify({
            ext: {
                min: '.js' // Set the file extension for minified files to just .js
            },
            noSource: true // Don’t output a copy of the source file
        }))
        .pipe(gulp.dest('dist/js'))
}

function sassToMinCss() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
}

function purgeCss() {
    return gulp.src('src/**/*.css')
        .pipe(purgecss({
            content: ['src/*.html'],
            safelist: ["display-on-small"]
        }))
        .pipe(gulp.dest('dist'))
}

function moveVendor() {
    return gulp.src("src/vendor/**")
        .pipe(gulp.dest("dist/vendor"));
}

function moveDocs() {
    return gulp.src("src/docs/**")
        .pipe(gulp.dest("dist/docs"));
}

function moveHtml() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
}

// not needed in favor of purgeCss
function moveCss() {
    return gulp.src("src/css/*.css")
        .pipe(gulp.dest("dist/css"));
}

function moveImages() {
    return gulp.src("src/images/**")
        .pipe(gulp.dest("dist/images"));
}

gulp.task('sync', () => {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./src"
        }
    });
    gulp.watch("src/*.html").on("change", reload);
    gulp.watch("src/js/*.js").on("change", reload);
    gulp.watch("src/css/*.css").on("change", reload);
});

exports.default = series(cleanDist, minifyJS, sassToMinCss, moveVendor, moveDocs, moveHtml, purgeCss, moveImages);