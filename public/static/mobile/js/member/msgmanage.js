/**
 * Created by 10000461 on 2016/7/13.
 */

var $ = require('jquery');
var page = 1;
var $content = $('.msg-list');
var $empty = $('.msg-manage-empty');
var $next = $('.mymsg-next');
var pageSize = 10;
var totalPage = 0;
var canClick =  true;

getData(page, addToPage)

$next.click(function () {
    if(canClick){
        $next.find('span').html('正在加载...');
        getData(page, addToPage)
    }else{
        $next.find('span').html('无更多');
    }
});


function addToPage(data) {
    var html = $.trim( render(data.list) );

    if($.trim( $content.html()) == '' && html == ''){
        $empty.fadeIn();
        $next.hide();
    }else {
        if(html == ''){
            $next.find('span').html('无更多');
        }else{
            $next.find('span').html('点击获取更多');
            $content.append(html)
        }
    }
}

function render(list) {
    var html = '';

    $.each(list.data,function (i,item) {
        html += ' <a href="javascript: void(0);" class="msg-list-item" data-id="'+ item.id +'">'+
            '<span class="msg-list-header">'+ item.member.relname +' <b>'+ item.createdAt +'</b></span>'+
        '<div class="msg-list-context">'+
            '<p>'+ item.content + '</p>'+
            '</div>'+
            '<div class="msg-list-decoration">'+
            '</div>'+
            '</a>';
    });
    totalPage = list.total;

    if(list.data.length === pageSize){
        page++;
    }else {
        canClick = false;
    }

    return html;
}


function getData(page,callback) {
    $.ajax({
        url: '/api/admin/comments',
        type: 'GET',
        data: {
            page: page
        },
        success: function (resp) {
            callback && callback(resp.data);
        },
        failure: function (resp) {
        }
    })
}


$(document).on('click','.msg-list-item',function() {
    var id = $(this).data('id');

    $('body').append('<div id="reset-container">'+
        '<p class="btn-b"><a id="reset_top" class="reset_confirm" href="javascript:void(0)">置顶</a></p>'+
        '<p class="btn-b"><a id="reset_hidden" class="reset_cancel reset_hidden" href="javascript:void(0)">屏蔽</a></p>'+
        '<p class="btn-b"><a id="reset_cancel" class="reset_cancel" href="javascript:void(0)">取消</a></p>'+
        '<div class="success">操作成功</div>'+
        '</div>');
    setTimeout(function(){
        $('#reset-container').addClass('active');
    },10);

    setTimeout(function(){
        $('body').scrollTop(0);
        $('body, html').css('overflow', 'hidden');
    },310);
    function moveOut() {
        setTimeout(function () {
            $('#reset-container').removeClass('active');
            $('body, html').css('overflow', 'initial');
            setTimeout(function(){
                $('#reset-container').remove();
            },300);
            window.location.reload();
        },1000);
    }
    document.getElementById('reset_cancel').addEventListener('touchstart', function(){
        moveOut();
    });

    document.getElementById('reset_hidden').addEventListener('touchstart', function(e){
        $.ajax({
            url: '/api/admin/comments/'+ id,
            type: 'delete',
            success: function (resp) {
                if(resp.response == 100){
                    $('.success').slideDown();
                    moveOut();
                }else{
                    alert(resp.message);
                }
            },
            failure: function (resp) {
            }
        })
    });
    document.getElementById('reset_top').addEventListener('touchstart', function(){
        $.ajax({
            url: '/api/admin/comments/action/top/'+ id,
            type: 'put',
            success: function (resp) {
                if(resp.response == 100){
                    $('.success').slideDown();
                    moveOut();
                }else{
                    alert(resp.message);
                }
            },
            failure: function (resp) {
            }
        })
    });
});
