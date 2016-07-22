define(function(require){
	var xct = require('xct');
	xct.Getdata(xct.url.universitylist, {}, function(data){
		var data = data.data.list.data,
			len = data.length,
			html = '';
		for(var i=0; i< len; i++){
			html += '<li class="it clearfix">'+
						'<a href="'+ xct.g_param.universitylist_baseUrl + data[i].id +'">'+
						'<div class="fl pic"><p><img src="'+ data[i].logo +'" /></p></div>'+
						'<div class="fl info">'+
							'<p class="title">'+ data[i].schoolname +'</p>'+
							'<p class="teacher">'+ data[i].brief +'</p>'+
							 (data[i].professionalselection[0] ? '<p class="creatime"><i class="label">'+ data[i].professionalselection[0].title +'</i></p>' : '')+
						'</div>'+
						'</a>'+
					'</li>';
		}
		$('#university').html(html);
	});
});
