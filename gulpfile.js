const gulp = require('gulp');
const rev = require('gulp-rev');
const terser = require('gulp-terser');
const del = require('del');
gulp.task('js', function(done){
    console.log('minifying js');
    gulp.src('./assets/**/*.js')
    .pipe(terser())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true,
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
});
gulp.task('clean:assets',function(done){
    del.sync('./public/assets/js');
    done();
});
gulp.task(
    'build',
    gulp.series('clean:assets','js',function (done) {
      console.log('Building assets')
      done();
    })
  )