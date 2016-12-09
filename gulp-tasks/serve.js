import gulp from "gulp";
import server from "gulp-server-livereload";

export function serve(args = {}) {
  return function serve_task(done) {
    return gulp.src("./www")
      .pipe(server({
        livereload: true,
        directoryListing: false,
        open: true
      }));
  }
}
