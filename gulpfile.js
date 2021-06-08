const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const plugins = gulpLoadPlugins();
const cssImport = require("gulp-cssimport");
const webpackStream = require("webpack-stream");
const gulpUtil = require("gulp-util");
const gulpCleanCSS = require("gulp-clean-css");
const del = require("del");
const browserSync = require("browser-sync");

const isDevelopment = gulpUtil.env.mode === "development" ? true : false;

const paths = {
  html: {
    src: "*.html",
    dest: "static/",
    watch: "*.html",
  },
  styles: {
    src: "css/styles.css",
    dest: "static/css",
    watch: "css/**/*.css",
  },
  js: {
    src: "js/**/*.js",
    dest: "static/",
    watch: "js/**/*.js",
  },
  fonts: {
    src: "fonts/*.*",
    dest: "static/fonts/",
  },
  jslib: {
    src: "jslib/**/*.js",
    dest: "static/js",
  },
  images: {
    src: "img/*.*",
    dest: "static/img/",
    watch: "img/*.{jpg,png,svg}",
  },
};

gulp.task("clean", function () {
  return del("static");
});

gulp.task("html", function () {
  return gulp
    .src(paths.html.src)
    .pipe(plugins.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
  return gulp
    .src(paths.js.src)
    .pipe(
      webpackStream({
        output: {
          filename: "js/scripts.js",
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      [
                        "@babel/preset-env",
                        {
                          targets: {
                            chrome: "58",
                            ie: "11",
                          },
                        },
                      ],
                    ],
                  },
                },
              ],
            },
          ],
        },
        mode: isDevelopment ? "development" : "production",
        devtool: isDevelopment ? "source-map" : "",
      })
    )
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
});

gulp.task("styles", function () {
  return gulp
    .src(paths.styles.src)
    .pipe(cssImport())
    .pipe(plugins.if(isDevelopment, plugins.sourcemaps.init()))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.if(!isDevelopment, gulpCleanCSS()))
    .pipe(plugins.if(isDevelopment, plugins.sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp
    .src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(browserSync.stream());
});

gulp.task("jslib", function () {
  return gulp
    .src(paths.jslib.src)
    .pipe(gulp.dest(paths.jslib.dest))
    .pipe(browserSync.stream());
});

gulp.task("images", function () {
  return gulp
    .src(paths.images.src)
    .pipe(plugins.if(!isDevelopment, plugins.imagemin()))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  browserSync.init({
    server: "static",
  });
  gulp.watch(paths.html.watch, gulp.series("html"));
  gulp.watch(paths.styles.watch, gulp.series("styles"));
  gulp.watch(paths.js.watch, gulp.series("scripts"));
  gulp.watch(paths.images.watch, gulp.series("images"));
});

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("html", "jslib", "fonts", "scripts", "styles", "images")
  )
);
gulp.task("default", gulp.series("build", "watch"));
