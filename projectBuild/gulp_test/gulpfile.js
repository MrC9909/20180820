/*
1.什么是gulp:基于流的构建工具
            npm install gulp -g  安装全局
2.特点：基于流和异步构建

3.使用
   - 下载插件
    npm install xxx -D
   - 引入插件
    const xxx = require("xxx");
   - 配置插件任务
   gulp.task('任务名称',任务的回调函数);
4.启动任务
    gulp 任务名称
*/

//gulp所有的操作都要依赖于插件   -- plugins
//引入gulp插件
const gulp = require('gulp');
const jshint = require('gulp-jshint');

//目前要处理的文件有js,css,html

//配置任务   先处理js:语法检查   语法转换（ES6，模块化）
gulp.task('jshint', () => {
    return gulp.src('./src/js/*.js')  //要处理的资源文件,指定目录下所有的js文件全部导入gulp的流中
        .pipe(jshint({
            esversion: 6
        }))//对gulp流中的文件做语法检查
        .pipe(jshint.reporter('default'));//将检查的语法错在控制台输出
});