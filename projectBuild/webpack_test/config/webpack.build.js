/*
* 安装
* 全局安装  npm install --save-dev webpack@3 -g
* 本地安装： npm install --save-dev webapck@3
*
* 安装了webpack之后可以直接执行命令  webpack ./src/js/app.js ./build/js/built.js
*   1.webpack 入口文件  输出文件  局限：只能编译打包js或json文件，别的问价识别不了
*   2.配置了webpack.config.js文件后只需要直接执行webpack命令就可以了，默认在当前目录下找webpack.config.js配置文件
*
* 执行webpack命令，默认在当前目录下找webpack.config.js配置文件。
* 找不到也可以自己指定执行文件
*
* webpack --display-modules 查看隐藏的任务
* webpack --display-modules --config  ./config/webpack.build.js
*
* 4个核心概念
*   entry:入口文件,将所有的打包资源全部引入
*   output:将资源文件输出到指定目录下
*   loader:解析webpack解析不了文件，将文件解析成webpack的模块
*   plugins:执行任务更广的任务，loader做不了的它来完成
* */

//引入node的内置模块path
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');

//将任意多个对象合并成一个
module.exports = merge(common,{
    //loader   配置loader,配置对象是module
    module: {
        //规则
        rules: [
            //解析less并且将css提取位单独的一个文件
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'less-loader']
                })
            },
        ]
    },
    plugins: [
        //尽量少用style 多用link link同步  style异步（有可能闪屏） 提取css位单独的一个文件
        new ExtractTextPlugin("./css/styles.css"),
        new CleanWebpackPlugin(),
    ]
});

