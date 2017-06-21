var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var browser = require("browser-sync") ;
var ssi = require('browsersync-ssi') ;
var htmlhint = require('gulp-htmlhint');
var minifyHtml = require('gulp-minify-html');


var path =
{
	src:"./",
	dest:"./"
};

var port = 3006 ;

function plumberWithNotify() {
  return plumber({errorHandler: notify.onError("<%= error.message %>")});
}

gulp.task('sass', function() {
  return gulp.src('./assets/common/scss/**/*.scss')
    .pipe(plumberWithNotify())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./assets/common/css/'));
});

gulp.task('watch', function() {
  gulp.watch(['./sass/**/*.scss'], ['sass']);
});

gulp.task('html', function(){
　　gulp.src('*.html')
　　　　.pipe(htmlhint())
       .pipe(htmlhint.reporter())
       .pipe(plumberWithNotify())
       .pipe(minifyHtml())
　　　　.pipe(gulp.dest('./html'));
});

gulp.task( "server" , function( )
{
	browser(
		{
			port:port ,
			server:
			{
				baseDir:path.dest ,
				middleware:
				[
					ssi( { baseDir:path.dest , ext: ".html" } )
				]
			} ,
			ghostMode:false ,
			browser:"google chrome"
			//, open:"external"
		} ) ;
} ) ;


gulp.task( "reload" , function( )
{
	browser.reload( {stream:true} ) ;
} ) ;

gulp.task('sassOptimize', function() {
  runSequence(
    'sass',
    'optimize'
  );
});