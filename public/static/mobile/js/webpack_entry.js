/**
 * webpack 入口配置文件
 *
 * 后期前端入口管理目录
 *
 * @todo: 后期改为自动检测脚本
 *
 * Created by fangyanliang@yiban.cn on 2016/7/19.
 *
 */
// var path = require('path');
// var fs = require('fs');
// var glob = require('glob');
//
// function entries (globPath) {
//     var files = glob.sync(globPath);
//     var entries = {}, entry, dirname, basename;
//
//     for (var i = 0; i < files.length; i++) {
//         entry = files[i];
//         dirname = path.dirname(entry).replace('static','oo');
//         basename = path.basename(entry, '.js');
//         basename = basename + '.js';
//         console.log('basename:'+basename);
//         if(dirname.indexOf('config') == -1 &&
//             dirname.indexOf('modules') == -1 &&
//             dirname.indexOf('components') == -1&&
//             dirname.indexOf('lib') == -1){
//             entries[path.join(dirname, basename)] = entry;
//         }
//     }
//     return entries;
// }
//
// console.log( entries('./public/static/mobile/js/*/*.js') );
//
//
// function getEntry() {
//     var jsDir = path.resolve('./','js');
//     var entryFiles = glob.sync(jsDir + '/*.{js,jsx}');
// }
//
var dir = {
    assert: '/assets/mobile/js/',
    src: './public/static/mobile/js/'
};

module.exports  = {
    '/assets/mobile/js/comment/comment.js' : './public/static/mobile/js/comment/comment.js',
    '/assets/mobile/js/form/form.js' : './public/static/mobile/js/form/form.js',
    '/assets/mobile/js/home/home.js' : './public/static/mobile/js/home/home.js',
    '/assets/mobile/js/lessons/detail.js' : './public/static/mobile/js/lessons/detail.js',
    '/assets/mobile/js/lessons/lessons.js' : './public/static/mobile/js/lessons/lessons.js',
    '/assets/mobile/js/member/index.js' : './public/static/mobile/js/member/index.js',
    '/assets/mobile/js/member/mymsg.js' : './public/static/mobile/js/member/mymsg.js',
    '/assets/mobile/js/member/msgmanage.js' : './public/static/mobile/js/member/msgmanage.js',
    '/assets/mobile/js/member/setting.js' : './public/static/mobile/js/member/setting.js',
    '/assets/mobile/js/university/university.js' : './public/static/mobile/js/university/university.js'
};
// module.exports = entries('./public/static/mobile/js/*/*.js');

// //判断手机横竖屏状态：  
// function hengshuping(){  
//   if(window.orientation==180||window.orientation==0){  
//         alert("竖屏状态！")         
//    }  
// if(window.orientation==90||window.orientation==-90){  
//         alert("横屏状态！")          
//     }  
//  }  
// window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);  
  
// //移动端的浏览器一般都支持window.orientation这个参数，通过这个参数可以判断出手机是处在横屏还是竖屏状态。  
// 从而根据实际需求而执行相应的程序。通过添加监听事件onorientationchange，进行执行就可以了。 


 // 1、  
 // @media (orientation: portrait) { } 横屏  
 // @media (orientation: landscape) { }竖屏  
   
 // 2、  
 // <link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">横屏  
 // <link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css">竖屏 












