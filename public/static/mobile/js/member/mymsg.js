/**
 * Created by 10000461 on 2016/7/13.
 * 
 */

var page = 1;
var $content = $('.mymsg');
var $empty = $('.my-msg-empty');
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
        $content.hide();
        $next.hide();
        $empty.fadeIn();
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
        html += '<a href="/mobile/comments/'+ item.id +'" class="mymsg-item">'+
            '<div class="mymsg-header">'+
            '<b>'+ item.member.relname +'</b><span>'+ item.createdAt +'</span>'+
            '</div>'+
            '<div class="mymsg-content">'+
            '<p>'+ item.content +'</p>'+
            '</div>'+
            '<div class="mymsg-footer">'+
            '<span></span>'+
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
        url:'/api/member/action/comments',
        type: 'GET',
        data:{
            page: page
        },
        success:function (resp) {
            callback && callback(resp.data);
        },
        failure: function (resp) {
        }
    })
}