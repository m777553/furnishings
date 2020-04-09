var less = require("gulp-less");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");

gulp.task('less', function () {
  return gulp.src("sourses/less/style.less") // путь к файлам-исходникам
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
    autoprefixer()
    ]))

    .pipe(gulp.dest("sourses/css")) // путь к папке, куда помещаем конечные файлы
	.pipe(server.stream());

});


//.pipe(plugin_name()) // название плагина, через который прогоняем их

 gulp.task("server", gulp.series("less"), function () {
  server.init({
    server: "sourses/"
  });
  gulp.watch('sourses/less/**/*.less', gulp.series("less"), server.reload);
  //gulp.watch('sources/*.html', server.reload);

});

//запрос на просмотр изменений в less и компиляция в css
//series перезапускает задачу less
gulp.task('c', function () {
    gulp.watch('sourses/less/**/*.less', gulp.series('less')); //series - перезапуск задачи LESS
});

// var gulp = require("gulp");
// var less = require("gulp-less");
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var minify = require("gulp-csso");
// var rename = require("gulp-rename");


gulp.task("style", function () {
 gulp.src("sourses/less/style.less")
 .pipe(plumber())
 .pipe(less())
 .pipe(postcss([
 autoprefixer()
 ]))
 .pipe(gulp.dest("source/css"))
 .pipe(minify())
 .pipe(rename("style.min.css"))
 .pipe(gulp.dest("source/css"));
});
