// プラグインの変数を指定
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
var jshint = require("gulp-jshint");
var cached = require('gulp-cached');


// エラーハンドリングの関数
function plumberWithNotify() {
	return plumber({errorHandler: notify.onError("<%= error.message %>")});
}


// sassのコンパイル + prefixの付与 + cssの圧縮と名前変更
gulp.task('sass', function() {
	return gulp.src('./assets/common/scss/**/*.scss')
		.pipe(plumberWithNotify())
		.pipe(cached())
    	.pipe(sass())
    	.pipe(autoprefixer({
        	browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4'],
        	cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(rename({extname: '.min.css'}))
		.pipe(gulp.dest('./assets/common/css/'))
		.pipe(browser.reload({stream: true}));
});


// htmlhint
gulp.task('html', function(){
	gulp.src('./assets/views/layouts/**/*.html')
		.pipe(plumberWithNotify())
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(htmlhint.failReporter())
		.pipe( browser.reload({stream: true}));
});


// jshint
gulp.task('js', function(){
	gulp.src('./assets/common/js/**/*.js')
		.pipe(plumberWithNotify())
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(browser.reload({stream:true}));
});


// browserの立ち上げ
gulp.task('server', function(){
	browser(
		{
			port:3006,
			server:
			{
				baseDir: './assets/views/layouts/',
				index  : 'index.html',
				middleware:
				[
					ssi({ baseDir: './assets/views/layouts/', ext: ".html" })
				]
			},
			ghostMode: false,
			browser: 'google chrome'
		});
});


// gulpのwatch
gulp.task('watch', function(){
	gulp.watch(['./assets/common/scss/**/*.scss'], ['sass']);
	gulp.watch(['./assets/views/layouts/**/*.html'], ['html']);
	gulp.watch(['./assets/common/js/**/*.js'], ['js']);
});


// browser リロードのハンドリング
gulp.task('reload', function(){
	browser.reload({stream: true});
});


// タスクの直列、並列処理
gulp.task('default', function(){
	runSequence(
		'sass',
		'html',
		'js',
		'server',
		'watch'
	);
});