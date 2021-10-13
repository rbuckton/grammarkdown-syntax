const gulp = require("gulp");
const yaml = require("js-yaml");
const plist = require("plist");
const { Transform } = require("stream");
const del = require("del");

gulp.task("clean:syntax", () => del(["out/syntax"]));
gulp.task("clean", gulp.task("clean:lib"));

gulp.task("build:syntax", () => gulp
    .src("src/syntax/**/*.yaml")
    .pipe(new Transform({
        objectMode: true,
        transform: (/** @type {import("vinyl")} */ file, _, cb) => !file.isBuffer() ?
            cb(new Error("Only buffers are supported")) :
            cb(null, (
                file.contents = Buffer.from(plist.build(yaml.load(file.contents.toString("utf8"))), "utf8"),
                file.extname = ".tmLanguage",
                file
            ))
    }))
    .pipe(gulp.dest("out/syntax")));

gulp.task("build", gulp.task("build:syntax"));

gulp.task("watch", gulp.task("build"), () => gulp.watch(["src/**/*"], gulp.task("build")));

gulp.task("default", gulp.task("build"));
