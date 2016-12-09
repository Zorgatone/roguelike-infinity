import "babel-polyfill";
import gulp from "gulp";

import { build, serve } from "./gulp-tasks";

const config = {
  entries: [
    "./src/main.ts"
  ],
  output: "bundle.js",
  path: "./www/scripts/"
}

gulp.task("build", build(config));

gulp.task("watch", build(
  merge(config, { watch: true })
));

gulp.task("serve", ["watch"], serve());

gulp.task("default", ["build"]);

function merge(one, two) {
  return Object.assign({}, one, two);
}
