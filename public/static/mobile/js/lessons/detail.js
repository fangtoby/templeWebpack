/**
 * 课程详情页
 *
 * Created by 10000461 on 2016/7/12.
 */

/**
 * 评论模块
 */
require('../comment/comment-list');

var $video_frame = $('#video_frame');

var video_url = $video_frame.data('url');

$video_frame.html('');

/**
 * window.innerHeight   FF/CH 支持，获取窗口尺寸。
 * document.documentElement.clientHeight    IE/CH支持
 * document.body.client    通过body元素获取内容的尺寸
 */

var clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidht;

/**
 * 视频全屏播放问题
 * 在iOS APP中使用网页视频，是可以禁止全屏播放的，方法如下：
 *
 * 1.前端将video标签加入属性 webkit-playsinline，如：<video id="player" width="480" height="320" webkit-playsinline>；
 * 2.Obj-C中，添加配置：webview.allowsInlineMediaPlayback = YES
 */

var webkit = '';

if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    webkit = 'webkit-playsinline';
}

/**
 * 视频格式支持
 * mp4,ogg ,webm
 */

var sourceArray = video_url.split('.');

var sourceUrl = {
    ogg:'',
    mp4:'',
    webm:''
};
sourceArray[ sourceArray.length-1 ] = 'ogg';

sourceUrl.ogg = sourceArray.join('.');

sourceArray[ sourceArray.length-1 ] = 'mp4';

sourceUrl.mp4 = sourceArray.join('.');

sourceArray[ sourceArray.length-1 ] = 'webm';

sourceUrl.webm = sourceArray.join('.');

var _videHTML = '<video width="'+ clientWidth  +'"  controls="controls" id="detail_main_player" '+ webkit  +' >'+
    '<source src="'+ sourceUrl.mp4 + '" type="video/mp4">'+
    '<source src="'+  sourceUrl.ogg + '" type="video/ogg">'+
    '<source src="'+ sourceUrl.webm + '" type="video/webm">'+
    'Your browser does not support the video tag.'+
    '</video>';

$video_frame.html( _videHTML );

/**
 *
 * 抛出第三方暂停接口
 *
 * yplayer.pause();
 *
 * 抛出第三方播放接口
 *
 * yplayer.play();
 *
 */

window.yplayer = document.getElementById('detail_main_player');

/**
 *
 * 详情页 Tab 菜单交互
 *
 */

$('.tab-item').click(function() {
    var self = $(this);
    if(!self.hasClass('active')){
        var type = self.data('type');
        $('.tab-item').removeClass('active');
        self.addClass('active');
        if(type == 0){
            $('.lessons-detail').css({
                'display':'block'
            });
            $('.lessons-list').css({
                'display':'none'
            });
        }else{
            $('.lessons-detail').css({
                'display':'none'
            });
            $('.lessons-list').css({
                'display':'block'
            });
        }
    }
})

