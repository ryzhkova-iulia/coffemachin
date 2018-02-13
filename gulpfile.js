var gulp = require('gulp'),
    pug = require('gulp-pug'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    spritesmith = require("gulp.spritesmith"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    newer = require("gulp-newer"),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');



// sass
gulp.task('sass', function () {
    return gulp.src([
        'dev/static/sass/main.sass'
    ])
    // gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))

        .pipe(autoprefixer({
            browsers: ['> 0%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7']
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dev/static/css'))

        .pipe(browsersync.reload({
            stream: true
        }));
});



// Работа с Pug
gulp.task('pug', function() {
    return gulp.src('dev/pug/pages/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .on("error", notify.onError(function(error) {
            return "Message to the notifier: " + error.message;
        }))
        .pipe(gulp.dest('dev'));
});

// Browsersync
gulp.task('browsersync', function() {
    browsersync({
        server: {
            baseDir: 'dev'
        },
    });
});

// Работа с JS
gulp.task('scripts', function() {
    return gulp.src([
        // Библиотеки
        'dev/static/libs/magnific/jquery.magnific-popup.min.js',
        'dev/static/libs/bxslider/jquery.bxslider.min.js',
        'dev/static/libs/maskedinput/maskedinput.js',
        'dev/static/libs/slick/slick.min.js',
        'dev/static/libs/validate/jquery.validate.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dev/static/js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});


// Сборка спрайтов PNG
gulp.task('cleansprite', function() {
    return del.sync('dev/static/img/sprite/sprite.png');
});


gulp.task('spritemade', function() {
    var spriteData =
        gulp.src('dev/static/img/sprite/*.*')
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.sass',
                padding: 15,
                cssFormat: 'sass',
                algorithm: 'binary-tree',
                cssTemplate: 'sass.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name;
                }
            }));

    spriteData.img.pipe(gulp.dest('dev/static/img/sprite/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('dev/static/sass/')); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);
// Слежение
gulp.task('watch', ['browsersync', 'sass', 'scripts'], function() {
    gulp.watch('dev/static/sass/**/*.sass', ['sass']);
    gulp.watch('dev/pug/**/*.pug', ['pug']);
    gulp.watch('dev/*.html', browsersync.reload);
    gulp.watch(['dev/static/js/*.js', '!dev/static/js/libs.min.js', '!dev/static/js/jquery.js'], ['scripts']);
});

// Очистка папки сборки
gulp.task('clean', function() {
    return del.sync('docs');
});

// Оптимизация изображений
gulp.task('img', function() {
    return gulp.src(['dev/static/img/**/*', '!dev/static/img/sprite/*'])
        .pipe(cache(imagemin({
            progressive: true,
            use: [pngquant()]

        })))
        .pipe(gulp.dest('docs/static/img'));
});

// Сборка проекта

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    var buildCss = gulp.src('dev/static/css/*.css')
        .pipe(gulp.dest('docs/static/css'));

    var buildFonts = gulp.src('dev/static/fonts/**/*')
        .pipe(gulp.dest('docs/static/fonts'));

    var buildJs = gulp.src('dev/static/js/**.js')
        .pipe(gulp.dest('docs/static/js'));

    var buildHtml = gulp.src('dev/*.html')
        .pipe(gulp.dest('docs/'));

    var buildImg = gulp.src('dev/static/img/sprite/sprite.png')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('docs/static/img/sprite/'));
});

// Очистка кеша
gulp.task('clear', function() {
    return cache.clearAll();
});

// Дефолтный таск
gulp.task('default', ['watch']);
