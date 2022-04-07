// import gulp from 'gulp';
// import imagemin from 'gulp-imagemin';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es');
const imageIn = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets/'));
    done();
});

gulp.task('js', function(done){
    console.log('minifying js');
    gulp.src('./assets/sass/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets/'));
    done();
});

gulp.task('images', function(done){
    console.log('compressing images');
    gulp.src('./assets/sass/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets/'));
    done();
});
//clean:sass is valid naming in gulp even though it has ":"
gulp.task('clean:sass' ,function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('bulid',gulp.series('clean:assets','css','js','images'),function(done){
    console.log('processing assets and building');
    done();
});