const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const convert = require("gulp-convert");
const rename = require("gulp-rename");
const tsb = require("gulp-tsb");
const del = require("del");
const lib = tsb.create("src/lib");

gulp.task("clean:lib", () => del(["out/lib"]));
gulp.task("clean:syntax", () => del(["out/syntax"]));
gulp.task("clean", ["clean:lib", "clean:syntax"]);

gulp.task("build:lib", () => lib
    .src()
    .pipe(sourcemaps.init())
    .pipe(lib.compile())
    .pipe(sourcemaps.write(".", { includeContent: false, destPath: "out/lib" }))
    .pipe(gulp.dest("out/lib")));

gulp.task("build:syntax", () => gulp
    .src("src/syntax/**/*.yaml")
    .pipe(convert({ from: "yml", to: "plist" }))
    .pipe(rename({ extname: ".tmLanguage" }))
    .pipe(gulp.dest("out/syntax")));

gulp.task("build", ["build:lib", "build:syntax"]);

gulp.task("watch", ["build"], () => gulp.watch(["src/**/*"], ["build"]));

gulp.task("default", ["build"]);
