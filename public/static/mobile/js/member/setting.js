/**
 * Created by 10000461 on 2016/7/13.
 */

var uploader = require('../lib/upload/1.3.1/upload');

var pop = require('../lib/simplepop/index');

var t = {};

t.config = {
    //最多上传n张图片
    max: 1,
    //每张图片大小
    maxSize: 2 * 1024 * 1024,
    //弹窗的zIndex
    zIndex: 110
};

var $this = $('.avatar_uploader');

var _tip = new pop();

new uploader({
    trigger: $this,
    action: '/api/member/action/setting',
    name: 'avatar',
    accept: 'image/*',
    multiple: true,
    progress: null
}).change(function (files) {

    if (files.length > t.config.max) {
        y.msg('亲,全部图片不能超过' + t.config.max + '个!');
        return;
    }

    var reg = /^.*[^a][^b][^c]\.(?:png|jpg|gif|jpeg)$/g;
    for (var i = 0; i < files.length; i++) {
        var img = files[i];
        if (img.size >= t.config.maxSize) {
            _tip.show({
                msg:'您上传的图片超过2M，请重新上传',
                autoClose: true
            });
            return false;
        }

        var reg = /^.+\.(?:png|jpg|gif|jpeg)$/g;
        if (!reg.test(img.name.toLowerCase())) {
            _tip.show({
                msg:'图像只支持jpg、jpeg、 png、gif哦~',
                autoClose: true
            });
            return false;
        }
    }

    for (var i in files) {
        var file = files[i];
    }

    if (!$this.is('loading')) {
        $this.addClass('loading');

        _tip.show({
            msg:'图片正在玩命的上传，请稍等...'
        });

        this.submit();
    }
}).success(function (re) {
    $this.removeClass('loading');
    var re = $.parseJSON(re);
    if (re.response == 100) {
        _tip.show({
            msg:'图片上传成功',
            autoClose: true
        });
        window.location.href = "/mobile/member/action/setting";
    } else {
        _tip.show({
            msg: re.message,
            autoClose: true
        });
    }
});

function moveOut() {
    $('#reset-container').removeClass('active');
    $('body, html').css('overflow', 'initial');
    setTimeout(function(){
        $('#reset-container').remove();
    },300);
}

/**
 * 设置昵称
 */
$('#set_username').click(function () {

    $('body').append('<div id="reset-container">'+
        '<p class="reset_item set_change_border"><label>昵称：</label><input placeholder="请输入新昵称" id="reset_username_val"></p>'+
        '<p class="error_message"><span>请从新输入昵称</span></p>'+
        '<p class="btn-b"><a id="reset_username" class="reset_confirm" href="#null">确定</a></p>'+
        '<p class="btn-b"><a id="reset_cancel" class="reset_cancel" href="#null">取消</a></p>'+
        '</div>');

    setTimeout(function(){
        $('#reset-container').addClass('active');
    },10);

    setTimeout(function(){
        $('body').scrollTop(0);
        $('body, html').css('overflow', 'hidden');
    },310);
    $('#reset_cancel').unbind('click');
    $('#reset_cancel').click(function () {
        moveOut();
        return false;
    });

    $('#reset_username').unbind('click');
    $('#reset_username').click(function () {
        var username = $.trim( $('#reset_username_val').val() );

        if(username == ''){
            $('.error_message').fadeIn();
            return false;
        }
        $.ajax({
            url:'/api/member/action/setting',
            type: 'POST',
            data:{
                relname: username
            },
            success:function (resp) {
                _tip.show({
                    msg:'昵称修改成功',
                    autoClose: true
                });
                $('#set_username').find('.i_username_span').html( username );
                moveOut();
            },
            failure: function (resp) {
            }
        })

        return false;
    });
    return false;
});
/**
 * 设置街道
 */

$('#set_street').click(function () {
// document.getElementById('set_street').addEventListener('touchstart', function() {
    $('body').append('<div id="reset-container">'+
        '<div class="street-default">'+
        '<div class="street_container"><div class="street_loading">正在加载...</div> </div>'+
        '<p class="error_message"><span>请选择街道</span></p>'+
        '</div>'+
        '<p class="btn-b"><a id="reset_street_but" class="reset_confirm" href="#null">确定</a></p>'+
        '<p class="btn-b"><a id="reset_cancel" class="reset_cancel" href="#null">取消</a></p>'+
        '</div>');
    var street_name = $('.i_street_name').html();
    $.ajax({
        url:'/api/mobile/street',
        type: 'GET',
        success:function (resp) {
            var _html = '';
            var _active = 'active';

            $.each(resp.data.list,function(i,item){
                _active = '';
                if(item.streetname == street_name){
                    _active = 'active';
                }
                _html += '<div class="street_item street_item_noborder clearfix '+ _active +'" data-sid="'+ item.id +'"><div class="left_street_name">'+ item.streetname +'</div><div class="right_but"></div> </div>';
            });

            $('.street_container').addClass('set_change_border').html( _html );

            $('.street_item').click(function () {
                if(!$(this).hasClass('active')){
                    $('.street_item').removeClass('active');
                    $(this).addClass('active');
                }
            })
        },
        failure: function (resp) {
        }
    });
    setTimeout(function(){
        $('#reset-container').addClass('active');
    },10);

    setTimeout(function(){
        $('body').scrollTop(0);
        $('body, html').css('overflow', 'hidden');
    },310);
    $('#reset_cancel').unbind('click');
    $('#reset_cancel').click(function () {
        moveOut();
        return false;
    });
    $('.street_item').click(function () {
        if(!$(this).hasClass('active')){
            $('.street_item').removeClass('active');
            $(this).addClass('active');
        }
    });

    $('#reset_street_but').unbind('click');
    $('#reset_street_but').click(function () {
        var $street_item = $('.street_item');
        var currectId = null;
        var currectStreetName = null;
        $street_item.each(function () {
            if($(this).hasClass('active')){
                currectId = $(this).data('sid');
                currectStreetName = $(this).find('.left_street_name').html();
            }
        })
        if(currectId == null){
            $('.error_message').fadeIn();
            return false;
        }
        $.ajax({
            url:'/api/member/action/setting',
            type: 'POST',
            data:{
                Street_id: currectId
            },
            success:function (resp) {
                $('#set_street').find('.i_street_name').html( currectStreetName );
                moveOut();

                _tip.show({
                    msg:'社区修改成功',
                    autoClose: true
                });
            },
            failure: function (resp) {
            }
        });
        return false;
    });
    return false;
});

/**
 * set_password
 */

$('#set_password').click(function () {
// document.getElementById('set_password').addEventListener('touchstart', function() {
    $('body').append('<div id="reset-container">'+
        '<div class="password_container">' +
            '<p class="password_item"><input placeholder="请输入当前密码" type="password" id="old_password"> </p>'+
             '<p class="password_item"><input placeholder="新密码（6-14字符）" type="password" id="new_password"> </p>'+
            '<p class="password_item"><input placeholder="重新输入新密码" type="password" id="new_password_repeat"> </p>'+
        '</div>'+
        '<p class="error_message"><span></span></p>'+
        '<p class="btn-b"><a id="reset_passwrod_but" class="reset_confirm" href="#null">修改</a></p>'+
        '<p class="btn-b"><a id="reset_cancel" class="reset_cancel" href="#null">取消</a></p>'+
        '</div>');
    setTimeout(function(){
        $('#reset-container').addClass('active');
    },10);

    setTimeout(function(){
        $('body').scrollTop(0);
        $('body, html').css('overflow', 'hidden');
    },310);
    $('#reset_cancel').unbind('click');
    $('#reset_cancel').click(function () {
        moveOut();
        return false;
    });

    $('#reset_passwrod_but').unbind('click');
    $('#reset_passwrod_but').click(function () {
    // document.getElementById('reset_passwrod_but').addEventListener('touchstart', function(){
        var old_password = $.trim( $('#old_password').val() );
        var new_password = $.trim( $('#new_password').val() );
        var new_password_repeat = $.trim( $('#new_password_repeat').val());

        if (old_password == '' || new_password == '' || new_password_repeat == ''){
            $('.error_message').find('span').html('请输入完全');
            return false;
        }
        if(new_password != new_password_repeat){
            $('.error_message').find('span').html('新密码输入有误，请重新输入');
            return false;
        }
        $.ajax({
            url:'/api/member/action/reset',
            type: 'POST',
            data:{
                oldpassword: old_password,
                password: new_password,
                password_confirmation: new_password_repeat,
            },
            success:function (resp) {
                if(resp.response == 100){
                    $('#reset_passwrod_but').html('修改成功');
                    _tip.show({
                        msg:'密码修改成功',
                        autoClose: true
                    });
                    moveOut();
                }else{
                    _tip.show({
                        msg:resp.response,
                        autoClose: true
                    });
                }
            },
            failure: function (resp) {
            }
        });

        return false;
    });

    return false;
});
/**
 * Hash change Event
 */
// window.onhashchange=function() {
//     if($.trim(location.hash) === '' || location.hash == '#null'){
//         moveOut();
//     }
// };