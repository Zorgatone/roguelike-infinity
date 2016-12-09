import gulp from "gulp";

import browserify from "browserify";
import tsify from "tsify";
import babelify from "babelify";
import watchify from "watchify";

import source from "vinyl-source-stream";
import pretty from "prettysize";

export function build(args = {}) {
  if (args.watch) {
    return watch_task;
  }

  return build_task;

  function build_task(done) {
    return browserify(args.entries)
      .plugin(tsify)
      .transform(babelify, { extensions: [".ts"] })
      .bundle()
      .pipe(source(args.output))
      .pipe(gulp.dest(args.path));
  }

  function watch_task(done) {
    let b = browserify(args.entries, {
      cache: {},
      packageCache: {},
    })
      .plugin(watchify)
      .plugin(tsify)
      .transform(babelify, { extensions: [".ts"] });

    b.on("update", bundle);
    b.on("log", log => console.log((log = log.split(" "), log[0] = pretty(log[0]), log.join(" "))));

    return bundle();

    function bundle() {
      return b
        .bundle()
        .pipe(source(args.output))
        .pipe(gulp.dest(args.path));
    }
  }
}
