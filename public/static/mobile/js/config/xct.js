/**
 * 校村通配置
 */

var jsBasePath = '/static/mobile/js/',
	jsVersion = '20160523';

seajs.config({
	base: jsBasePath,
	alias: {
		'css': 'lib/seajs/seajs-css/1.0.4/seajs-css.js',
		'text': 'lib/seajs/seajs-text/1.1.1/seajs-text.js',
		'jquery': 'lib/jquery/jquery-2.0.3.min.js',
		'iscroll': 'lib/iscroll/iScroll-4.2.5.js',
		'juicer': 'lib/juicer/0.6.5/juicer-min.js',
		'layer': 'lib/layer/2.2/layer.js',
		'toucher': 'lib/toucher/toucher.js',
		'slide': 'lib/slide/slide.js',
		'xct': 'xct.js',
		'url': 'config/url.js'
	},
	charset: 'utf-8',
	preload: ['css', 'text']
});
