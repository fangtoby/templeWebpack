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