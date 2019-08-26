const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common,{
    //loader   配置loader,配置对象是module
    module: {
        //规则
        rules: [
            //less-loader   解析less
            {
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
            },
            //添加htmlloader
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),//修补依赖
        new webpack.HotModuleReplacementPlugin()//热膜替换的插件
    ],

    //webpack-dev-sever  开启服务器运行代码
    devServer: {
        contentBase: './build',
        hot: true,//开启热膜替换
        open:true,//自动打开浏览器
        port:3000,//端口号
        compress:true,//一切服务都启用gzip 压缩
    },
});
