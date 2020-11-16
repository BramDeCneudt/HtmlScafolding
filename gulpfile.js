const gulp = require('gulp');
const minify = require("gulp-minify");
const sass = require('gulp-sass');
const purgecss = require('gulp-purgecss')
const handlebars = require('gulp-compile-handlebars');
const del = require('del');

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const { series } = require('gulp');

function cleanDist() {
    return del(['dist/**/*', '!dir/.gitignore']);
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
            content: ['dist/*.html'],
            safelist: [
                //put classes or id names that you don't want to have purged
            ]
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

function generateHandlebars() {
    let templateData = {
    }
    let options = {
        ignorePartials: true,
        partials : {
        },
        batch : ['./src/template']
    }
 
    return gulp.src('src/*.html')
        .pipe(handlebars(templateData, options))
        .pipe(gulp.dest('dist'));
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
    defaultOperation().apply();
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/*.html").on("change", htmlChanged);
    gulp.watch("src/template/*.handlebars").on("change", htmlChanged);
    gulp.watch("src/js/*.js").on("change", jsChanged);
    gulp.watch("src/css/*.css").on("change", cssChanged);
    gulp.watch("src/docs/*").on("change", docsChanged);
    gulp.watch("src/images/*").on("change", imagesChanged);
    gulp.watch("src/vendor/*").on("change", vendorChanged);
});

function defaultOperation() {
    return series(cleanDist, minifyJS, sassToMinCss, moveVendor, moveDocs, generateHandlebars, purgeCss, moveImages);
}

function htmlChanged() {
    generateHandlebars();
    reload();
}

function jsChanged() {
    minifyJS();
    reload();
}

function cssChanged() {
    purgeCss();
    reload();
}

function docsChanged() {
    moveDocs();
    reload();
}

function imagesChanged() {
    moveImages();
    reload();
}

function vendorChanged() {
    moveVendor();
    reload();
}

exports.default = defaultOperation();