/*前端自动化构建工具gulp
* 特点：基于流的自动构建工具
* 特点：基于流和异步操作
*
* 使用gulp
* 安装gulp
*     npm install gulp -g
*     npm install gulp -D
*
* 1 .gulp使用
*       1.下载插件
*       npm install xxx
*
*       2.导入插件
*       const xxx = require('xxx');
*
*       3.创建任务
*       gulp.task('人物名',回调函数);
*
*       3.执行任务
*       gulp 任务名称
*
*       4.配置默认任务
*       gulp.task('default',gulp.series('任务名称',....));
* */

//对js进行操作  js的语法检查   编译   将编译后common.js语法转化为浏览器可识别语法

//导入插件
const gulp = require('gulp');
//导入 语法检查的插件gulp-jshint
const jshint = require('gulp-jshint');
//导入 gulp-babel  编译
const babel = require('gulp-babel');
//导入browserify 将common.js语法转换为浏览器识别的语法
const browserify = require('gulp-browserify');
//导入gulp-rename 对转化后的文件进行重新命名
const rename = require('gulp-rename');
//导入less编译less文件
const less = require('gulp-less');
//压缩js文件
const uglify = require('gulp-uglify');
//扩展前缀
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
//css合并
const concat = require('gulp-concat');
//css压缩
const cssmin = require('gulp-cssmin');
//压缩图片
const imagemin = require('gulp-imagemin');
//html压缩
const htmlmin = require('gulp-htmlmin');
//自动刷新
const livereload = require('gulp-livereload');
//创建服务
const connect = require('gulp-connect');
//自动打开浏览器
const open =  require('open');

//1.使用js-hint语法检查
gulp.task('lint', function() {
    return gulp.src('./src/js/*.js')
        .pipe(jshint({   //使用jshint进行语法检查
            esversion:6  //配置版本  es6
        }))
        .pipe(jshint.reporter('default'))  //输出错误信息
        .pipe(livereload());
});


//2.使用babel语法编译
gulp.task('babel', () =>{
    return gulp.src('src/js/*js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build/js'))
        .pipe(livereload());
});

//3.导入browserify 将common.js语法转换为浏览器识别的语法
gulp.task('browserify', function() {
    // Single entry point to browserify
    return gulp.src('build/js/index.js')
        .pipe(browserify())  //将common.js语法转化为浏览器可识别的语法
        .pipe(rename('built.js')) //对转化后的文件进行重新命名
        .pipe(gulp.dest('./build/js'))//将gulp流中的文件输出到指定文件夹
        .pipe(livereload());
});


//4.压缩js文件
gulp.task('compress', function () {
    return gulp.src('./build/js/built.js')
        .pipe( uglify())
        .pipe(rename('built.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});



//css操作
//5.编译less
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(less({//将less编译为css
            plugins: [autoprefix]  //自动扩展前缀
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

//6.合并css
gulp.task('concat',function () {
    return gulp.src(['./build/css/test1.css','./build/css/test2.css'])
        .pipe(concat('built.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

//7.压缩css
gulp.task('cssmin', function () {
    return gulp.src('./build/css/built.css')
        .pipe(cssmin())
        .pipe(rename('built.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

//8.imgs-min
gulp.task('imagemin', function () {
    return gulp.src('./src/imgs/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/imgs'))
        .pipe(livereload());
});

//html操作
//9.压缩html
gulp.task('minify', () => {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,//压缩空格
            removeComments:true//去掉注释
        }))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});


// 配置watch任务
gulp.task('watch', function() {
    //1. 在所有可能要执行任务后面加上 .pipe(livereload());
   //2. 配置watch任务
    livereload.listen();
    //通过自己服务器打开项目，自动刷新
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true  // 自动刷新
    });
    //自动打开浏览器
    open('http://localhost:3000/index.html');
    livereload.listen();
    gulp.watch('./src/js/*.js',gulp.series('lint','babel','browserify','compress'));
    gulp.watch('./src/less/*.less', gulp.series('less','concat','cssmin'));
    gulp.watch('./src/imgs/*.{png,jpg,gif,ico}', gulp.series('imagemin'));
    gulp.watch('./src/index.html', gulp.series('minify'));
});

//配置默认任务
gulp.task('default',gulp.series('watch'));
