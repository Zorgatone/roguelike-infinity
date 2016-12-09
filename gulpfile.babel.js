"use strict";

import "babel-polyfill";
import gulp from "gulp";

import {build} from "./gulp-tasks";

gulp.task("build", build);

gulp.task("default", ["build"]);
