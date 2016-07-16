//webpack.config.js
/*
  首先在定义entry的时候可以，
  entry = {
	  "/demo/button": "demo/button/index.jsx"),
	  "/demo/grid": "demo/grid/index.jsx")
  }
  然后输出的时候，就能建到指定目录下去了

*/

var path = require('path');

var webpack = require('webpack');

module.exports = {
    entry: {
		 'js/index/index':'./src/js/index/index.js',
		 'js/detail/index':'./src/js/detail/index.js'
    },
	output: {
		path: path.join(__dirname, 'assets'),
		/*
		如何缓存

		缓存控制要做到两件事情，提到缓存命中率

		1.对于没有修改的文件，从缓存中获取文件

		2.对于已经修改的文件，不要从缓存中获取

		围绕这两点，演绎出了很多方案，此处列两种：

		不处理，等待用户浏览器缓存过期，自动更新。这是最偷懒的，命中率低一些，同时可能会出现部分文件没有更新，导致报错的情况。

		Http头对文件设置很大的max-age，例如1年。同时，给每个文件命名上带上该文件的版本号，例如把文件的hash值做为版本号，topic. ef8bed6c.js。即是让文件很长时间不过期。

		1.当文件没有更新时，使用缓存的文件自然不会出错；

		2.当文件已经有更新时，其hash值必然改变，此时文件名变了，自然不存在此文件的缓存，于是浏览器会去加载最新的文件。

		从上面的截图可以看出来，通过WebPack是可以很轻松做到第二点的——只需要给文件名配置上[chunkhash:8]即可，其中8是指hash长度为8，默认是16。
		*/
		filename: '[name].js',//'[name].[chunkhash:16].js',
		chunkFilename: '[name].js',//'[name].[chunkhash:8].js',
		/*
		P.S.这样的处理效果已经很好了，但同样有劣处，即浏览器给这种缓存方式的缓存容量太少了，只有12Mb，

		且不分Host。所以更极致的做法是以文件名为Key，文件内容为value，缓存在localStorage里，命中则

		从缓存中取，不命中则去服务器取，虽然缓存容量也只有5Mb，但是每个Host是独享这5Mb的。
		*/
		//require.ensure([], function() { // 语法奇葩, 但是有用
		// hideLoadingState();
		// require('./feed').show(); // 函数调用后, 模块保证在同步请求下可用
		//});
		//Webpack 会完成其余的工作, 生成额外的 chunk 文件帮你加载好.
		//Webpack 在 HTML script 标签中加载他们时会假设这些文件是怎你的根路径下. 你可以用 output.publicPath 来配置.
		publicPath: "./assets/" // 引用你的文件时考虑使用的地址
	},
	plugins: [
		// definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
		// process.env.BUILD_DEV 从运行环境中获取BUILD_DEV设置的值
		// process.env.BUILD_PRERELEASE 从运行环境中获取BUILD_PRERELEASE设置的值
		// 控制台里用 BUILD_DEV=1 BUILD_PRERELEASE=1 webpack 编译. 注意一下因为 
		// webpack -p 会执行 uglify dead-code elimination, 任何这种代码都会被剔除, 所以你不用担心秘密功能泄漏.
        new webpack.DefinePlugin({
             __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
             __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        }),
        //压缩js代码
		new webpack.optimize.UglifyJsPlugin({
			compressor:{
				warnings: false	
			}
		}),
    	// 使用 OccurenceOrderPlugin 減少入口文件大小
		new webpack.optimize.OccurenceOrderPlugin(),
		//避免循环调用与多次加载
		new webpack.optimize.DedupePlugin(),
		//Webpack 可以分析出来他们有多少共用模块, 然后
		//生成一个共享的包用于代码的缓存.
		//在上一个步骤的 script 标签前面加上 
		//<script src="build/common.js"></script> 
		//你就能得到廉价的缓存了.
		/*
		//多级公用文件打包
		//基本不修改的类库 lib.commons.[hashstring].js
		//偶尔更新的自定义类库 modules.commons.[hashstring].js
		//经常更新的类库 components.commons.[hashstring].js

        new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
        new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
        */
		new webpack.optimize.CommonsChunkPlugin({
			name:'js/lib/common',
			minChunks: 2
		}),

		//当引用的库文件里面包含第三方引用$
		//webpack 会用jquery模块替换
		new webpack.ProvidePlugin({
			$:'jquery',
			'jQuery':'jquery',
			'jquery':'jquery',
			'window.jQuery':'jquery'
		})
	],
	resolve:{
		//加载库文件时候索引的库文件目录
		//这样你就不用在require()中
		//输入很长的路径 像require（../node_modules/jquery/src/index.js）
		//而是直接require('jquery')
		modulesDirectories:[
             './bower_components',
			 './node_modules'
		]
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
		},{
			test: /\.(tpl|ejs)$/, //tpl,ejs 模版文件加载器
			loader: 'ejs'
		},{
			//test: /\.(png|jpg)$/,
			test: /\.(png|jpe?g|gif)$/, 
			// inline base64 URLs for <=8k images, direct URLs for the rest
			loader: 'url-loader?limit=10000&name=／img/[name].[hash:8].[ext]'
		},{ 
       		test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
		    loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[hash:8].[ext]' 
		}]
	}
}
