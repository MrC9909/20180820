const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    entry: './src/js/app.js',
    //出口
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: "./js/built.js"
    },
    //loader   配置loader,配置对象是module
    module: {
        //规则
        rules: [
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
    //插件
    plugins: [
        //尽量少用style 多用link link同步  style异步（有可能闪屏） 提取css位单独的一个文件
        new HtmlWebpackPlugin({
            title: 'webpack',//给创建的index.html添加标题
            filename:'index.html',//创建html文件名称
            template: './src/index.html',//以指定文件模板来创建新的文件，新的文件会引入css,js
            inject:true/*true || 'head' || 'body' || false将所有资产注入给定template或templateContent。传递true或'body'所有javascript资源将被放置在body元素的底部。'head'将脚本放在head元素中*/
        }),
    ]
};