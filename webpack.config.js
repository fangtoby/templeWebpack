//webpack.config.js
/*
  首先在定义entry的时候可以，
  entry = {
	  "/demo/button": "demo/button/index.jsx"),
	  "/demo/grid": "demo/grid/index.jsx")
  }
  然后输出的时候，就能建到指定目录下去了

*/

import path from 'path'
import webpack from 'webpack'

export default {
    entry: {
		 index:'./src/index',
		 songs:'./src/songs'
    },
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'	
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor:{
				warnings: false	
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			minChunks:2
		})
	],
	resolve:{
		modulesDirectories:[
			 'node_modules',
             'bower_components',
             'lib',
             'src'
		]
	},
	module: {
		loaders: [{
			test: /\.less$/, 
			loader: 'style-loader!css-loader!less-loader'
		},{
			test: /\.css$/,
			loaders: ['style','css']
		},{
			//test: /\.(png|jpg)$/,
			test: /\.(png|jpg)$/, 
			// inline base64 URLs for <=8k images, direct URLs for the rest
			loader: 'url-loader?limit=8192'
			/*loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
            	'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]*/
		},{
			test: /\.js$/,
			loader: 'babel',
			query: {
        			 presets:['es2015']
            		}
		}]
	}
}
