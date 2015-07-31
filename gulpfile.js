var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    modulizr = require('gulp-modulizr'),
    opts = modulizr.all;


opts.filename = 'modernizr.js';

gulp.task('modulizr', function () {
    return modulizr(opts)
        .pipe(gulp.dest('app/js/'));
});

gulp.task('server', function () {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app',
            index: "works.html"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/**/*.js',
        'app/css/**/*.css'
    ]).on('change', browserSync.reload);
});


gulp.task('default', ['server', 'watch']);