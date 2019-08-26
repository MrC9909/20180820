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
* webpack --display-modules 查看隐藏的任务
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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//向外暴露出去一个对象
module.exports = {
    //入口
    entry: './src/js/app.js',
    //出口
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "./js/built.js"
    },
    //loader   配置loader,配置对象是module
    module: {
        //规则
        rules: [
            //less-loader   解析less
            /* {
                //规则检查类型
                test: /\.less$/,
                //使用哪种loader处理检测好的文件
                use: [
                        {//执行顺序是从右往左，从下至上的
                            loader: "style-loader" // 生成style标签，设置css样式
                        },
                        {
                            loader: "css-loader" // 将css转化为模块加载到js文件中，遵循的模块的规范是common.js
                        },
                        {
                            loader: "less-loader" //将less编译成css
                        }
                    ]
            },*/
            //解析less并且将css提取位单独的一个文件
            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",'less-loader']
                })
            },
            //file-loader  解析图片
            /*
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',//如果不做图片转base64可以用file-loader
                        options: {
                            name:'[name]_[hash:5].[ext]',  //图片输出的名称  自身名称 + 哈希值5位  .[ext]原来的文件格式
                            outputPath:'imgs',//文件资源输出路径
                            publicPath:'../build/imgs',//改变css图片资源路径
                        }
                    }
                ]
            },
            */
            //url-loader 图片解析  图片base64处理
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name:'[name]_[hash:5].[ext]',
                            outputPath:'imgs',//输出的图片资源路径
                            publicPath:'../imgs',//修改css图片的资源路径
                            limit: 8192  //大小限制8kb一下的图片文件会转换为base64格式  可以自己设置 8--12kb，看具体情况
                        }
                    }
                ]
            },
            //语法检查
            {
                test: /.js/,//涵盖js文件
                enforce: 'pre',//预先加载好js-hint loader
                exclude: /node_modules/,//排除node_modules
                use: [
                    {
                        loader: "jshint-loader",
                        options: {
                            esversion: 6,
                            emitErrors:false,
                            //类型：Boolean 默认：undefined
                            //指示加载程序将所有JSHint警告和错误作为webpack错误发出。

                            failOnHint:false
                           // 类型：Boolean 默认：undefined
                           // 指示加载程序导致webpack构建在所有JSHint警告和错误上失败。
                        }
                    }
                ]
            },

            //去掉json错误
            {
               test:/\.json$/,
                use:[{loader:'json-loader'}]
            }
        ]
    },
    plugins: [
        //尽量少用style 多用link link同步  style异步（有可能闪屏） 提取css位单独的一个文件
        new ExtractTextPlugin("./css/styles.css"),
        new HtmlWebpackPlugin({
            title: 'webpack',//给创建的index.html添加标题
            filename:'index.html',//创建html文件名称
            template: './src/index.html',//以指定文件模板来创建新的文件，新的文件会引入css,js
            inject:true/*true || 'head' || 'body' || false将所有资产注入给定template或templateContent。传递true或'body'所有javascript资源将被放置在body元素的底部。'head'将脚本放在head元素中*/
        }),
        new CleanWebpackPlugin({
            //在Webpack编译之前删除一次文件
            cleanOnceBeforeBuildPatterns:['build']
        }),
    ]
};