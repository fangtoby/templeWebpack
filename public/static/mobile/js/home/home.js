define(function(require){
	var xct = require('../xct');
	var slide = require('../lib/slide/slide');
	xct.banner = function(data){
		var html = '';
		for(var i=0; i<data.length; i++){
			html += '<li class="banner-sheet" style="background-color:'+ data[i].color +'"><a href="'+ ($.trim(data[i].url) == '' ? 'javascript:void(0)' : data[i].url) +'"><img src="'+ data[i].image +'" /></a></li>';
		}
		$('#bannerBox').html(html);
		$('#loading').remove();
		slide('headerBox', true);
		$('#main').css('visibility', 'visible');
	};
	xct.course = function(data){
		var html = '';
		for(var i=0; i<data.length; i++){
			html += '<li class="it">'+
					'<div class="list-box">'+
						'<a href="'+ xct.g_param.lessons_detail_baseUrl + data[i].id +'">'+
						'<p class="pic-image"><img src="'+ data[i].image +'" /></p>'+
						'<p class="title">'+ data[i].title +'</p>'+
						'<p class="subtitle">'+ data[i].teacher +'</p>'+
						'</a>'+
					'</div>'+
				'</li>';
		}
		$('#coursebox').html(html);
	}
	xct.Getdata(xct.url.home,{}, function(data){
		xct.banner(data.data.banner);
		xct.course(data.data.lessons);
	});
	
});
