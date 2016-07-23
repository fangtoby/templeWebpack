/**
 * webpack 运行生产上线命令
 *  
 *  1. npm run product
 *  2. webpack --b --progress -w --config ./webpack.config.product.js --display-modules --display-reasons --display-error-details
 *  
 * Created by fangyanliang@yiban.cn on 2016/7/19.
 * 
 */
var path = require('path');
var webpack = require('webpack');
var entryTree = require('./public/static/mobile/js/webpack_entry');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    /**
     * webpack 的entry入口，根据配置
     * 生成相应的模块入口与生成路径
     *
     */
    entry: entryTree,
    output:{
        path: path.join(__dirname, 'public'),
        filename: '[name]?v=[chunkhash]',
        //publicPath 我们也用, 在 path 属性之前的, 比如调试或者 CDN 之类的域名
        publicPath: '/assets/images/',
        //按需加载 require.ensure([], function() { });文件路径配置
        chunkFilename: "/assets/mobile/js/ensure/[name].js?v=[chunkhash]"
    },
    plugins: [
        new webpack.DefinePlugin({
            //在开发环境中使用 __DEV__ 来输出判断调试信息
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            //隐藏后期版本功能
            __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        }),
        /**
         * javascript 文件压缩
         */
       new webpack.optimize.UglifyJsPlugin({
           compressor:{
               warnings: false
           },
           output: {
               comments: false
           }
       }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        //是否开启公告模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'/assets/mobile/js/commons/common.js',
            minChunks:2
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery',
            'window.jQuery':'jquery',
            _:'lodash'
        }),
        new AssetsPlugin({
            filename: './config/static.json'
        })
    ],
    resolve:{
        //加载库文件时候索引的库文件目录
        //这样你就不用在require()中
        //输入很长的路径 像require（../node_modules/jquery/src/index.js）
        //而是直接require('jquery')
        modulesDirectories:[
            './node_modules',
            './bower_components'
        ],
        //配置别名，在项目中可缩减引用路径
        alias:{
            _lib:'./public/static/mobile/js/lib'
        }
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        },{
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },{
            test: /\.css$/,
            loaders: ['style','css']
        },{ //tpl,ejs 模版文件加载器
            test: /\.(tpl|ejs)$/,
            loader: 'ejs'
        },{
            //test: /\.(png|jpg)$/,
            test: /\.(png|jpg|gif|jpeg)$/,
            // inline base64 URLs for <=8k images, direct URLs for the rest
            loader: 'url-loader?limit=8192&name=[name].[ext]?v=[chunkhash]'
        }]
    }
}