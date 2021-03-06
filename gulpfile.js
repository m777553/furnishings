var less = require("gulp-less");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");

var del = require("del");

gulp.task("clean", function () {
  return del("build");
})


gulp.task('less', function () {
  return gulp.src("sourses/less/style.less") // путь к файлам-исходникам
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
    autoprefixer({
      cascade: false
    })
    ]))

    .pipe(gulp.dest("sourses/css")) // путь к папке, куда помещаем конечные файлы
	.pipe(server.stream());

});


//.pipe(plugin_name()) // название плагина, через который прогоняем их

 gulp.task("server", function () {
  server.init({
    server: "sourses/"
  });
  gulp.watch('sourses/less/**/*.less', gulp.series("less"), server.reload);
  gulp.watch('sources/*.html', server.reload);

});

//запрос на просмотр изменений в less и компиляция в css
//series перезапускает задачу less
gulp.task('c', function () {
    gulp.watch('sourses/less/**/*.less', gulp.series('less')); //series - перезапуск задачи LESS
});




gulp.task("style", function (done) {
 gulp.src("sourses/less/style.less")
 .pipe(plumber())
 .pipe(less())
 .pipe(postcss([
 autoprefixer()
 ]))
 .pipe(gulp.dest("build/css"))
 .pipe(minify())
 .pipe(rename("style.min.css"))
 .pipe(gulp.dest("build/css"))
 done();
});

gulp.task("copy", function () {
  return gulp.src([
    "sourses/fonts/**/*.{woff,woff2}",
    "sourses/js/**",
    "sourses/*.html"
  ], {
    base: "sourses"
  })
  .pipe(gulp.dest("build"));
})

// var gulp = require("gulp");
// var imagemin = require("gulp-imagemin");

gulp.task("images", function () {
 return gulp.src("sourses/img/**/*.{png,jpg,svg}")
 .pipe(imagemin([
 imagemin.optipng({optimizationLevel: 3}),
 imagemin.mozjpeg({quality: 75, progressive: true}),
 imagemin.svgo()
 ]))
.pipe(gulp.dest("build/img"));
});


gulp.task("build",
  gulp.series(
    "clean",
    "copy",
    "style",
    "images"
  ));
