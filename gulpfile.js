var gulp = require("gulp");
var deploy = require("gulp-gh-pages");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var browserSync = require("browser-sync").create();
var pug = require("gulp-pug");
var gulpIf = require("gulp-if");


// Static Server + watching scss/html files
gulp.task("preview", ["build"], function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("./sass/**/*.scss", ["sass"]);
    gulp.watch("./page/**/*.pug", ["pug"]);
    gulp.watch("./partials/**/*.pug", ["pug"]);

    // Reload upon changes to generated html or css
    gulp.watch("./dist/**/*.css").on('change', browserSync.reload);
    gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
});

gulp.task("pug", function() {
    return gulp.src("./page/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest('./dist/'));
});

// Build Sass files
gulp.task("sass", function() {
    gulp.src("./sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        //.pipe(minifyCSS()) // Optional minify step
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task("transform", [], function(){
    gulp.src(['./page/**/*'])
        .pipe(gulpIf(/\.pug$/, pug()))
        .pipe(gulp.dest('./dist'));
});

gulp.task("build", ["transform", "sass"]);

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ["build"], function () {
    return gulp.src("./dist/**/*")
        .pipe(deploy({
            branch: "master"
        }))
});