define(function(require){
	var xct = require('xct');
	var lessons = {
		g_param: {
			cid:0,
			school:0,
			professional:0,
			page:1
		},
		msg: {
			end: '已加载完毕',
			more: '点击加载更多'
		},
		courselist: function(data){
			var self = this;
			var $container = $('#lessonsbox');
			if(self.g_param.page == 1){
				$container.html('<li id="more">'+ xct.loading +'</li>');
			}else{
				$('#more').html(xct.loading);
			}
			xct.Getdata(xct.url.courselist, {
				cid: self.g_param.cid,
				school: self.g_param.school,
				professional: self.g_param.professional,
				page: self.g_param.page
			}, function(data){
				var data = data.data.list,
					html = '',
					len = data.data.length;
				var totalpage = Math.ceil(data.total/data.per_page);
				if(len > 0){
					for(var i=0; i<len; i++){
						html+='<li class="it clearfix">'+
								'<a href="'+ xct.g_param.lessons_detail_baseUrl + data.data[i].id +'"><div class="fl pic"><img src="'+ data.data[i].image +'" /></div>'+
								'<div class="fl info">'+
									'<p class="title">'+ data.data[i].title +'</p>'+
									'<p class="teacher"><em class="icon icon-teacher"></em><span>'+ data.data[i].teacher +'</span><i class="label">'+ data.data[i].category.title +'</i></p>'+
									'<p class="creatime">'+ data.data[i].updatedAt +'</p>'+
								'</div></a>'+
							'</li>';
					}
					html += '<li id="more"><div><a href="javascript:void(0)">'+ (self.g_param.page == totalpage ? self.msg.end : self.msg.more) +'</a></div></li>';
					$container.find('#more').remove();
					$container.append(html);
				}else{
					$container.find('#more').html(self.msg.end);
				}
				
			});
		},
		category: function(){
			var $container = $('#category');
			xct.Getdata(xct.url.category, {}, function(data){
				var list = data.data.list,
					html = '<li class="it" id="0" data-type="cid"><a class="see" href="javascript:void(0)">全部课程</a></li>';
				for(var i=0; i<list.length; i++){
					html += '<li class="it" id="'+ list[i].id +'" data-type="cid"><a class="see" href="javascript:void(0)">'+ list[i].title +'</a></li>';
				}
				$container.find('ul').html(html);
				$container.find('li').eq(0).addClass('active');
			});
		},
		school: function(){
			var self = this;
			var $container = $('#school');
			xct.Getdata(xct.url.schoolclass, {}, function(data){
				var list = data.data.list,
					html = '<li class="it active" id="0" data-type="school"><a class="see" href="javascript:void(0)">全部学校</a></li>',
					professional = '';
				for(var i=0; i<list.length; i++){
					professional = JSON.stringify(list[i].professional);
					html += '<li class="it" id="'+ list[i].id +'" data-type="school"><a class="see" href="javascript:void(0)">'+ list[i].schoolname +'</a><span class="dataholder">'+ professional +'</span></li>';
				}
				$container.find('.first').html(html);
			});
			// $container.on('click', '.first a', function(){
				// var $p = $(this).parent(),
					// data = $p.find('span').text();
				// data = data ? JSON.parse(data) : '';
				// var html = '';
				// for(var i=0; i<data.length; i++){
					// html += '<li id="'+ data[i].id +'" data-type="professional"><a class="see" href="javascript:void(0)">'+ data[i].title +'</a></li>'
				// }
				// $container.find('.second').html(html);
				// $container.find('.first').find('li').removeClass('active');
				// $p.addClass('active');
				// self.g_param.school = $p.attr('id');
				// console.log(1,self.g_param.school)
			// });
		},
		init: function(){
			var self = this;
			self.category();
			self.school();
			self.courselist();
			var $class = $('#class');
			$class.find('a').click(function(){
				var $this = $(this),
					$p = $this.parent(),
					type = $p.data('type');
				$class.find('li').removeClass('active');
				$p.addClass('active');
				$('.class').hide();
				$('#' + type).slideDown();
				$('.xct-container').css('position','fixed');
			});
			$(document).on('click', '.see', function(){
				var $p = $(this).parent(),
					$ul = $p.parent(),
					type = $p.data('type');
				$ul.find('li').removeClass('active');
				$p.addClass('active');
				$('.xct-container').css('position','relative');
				$ul.parents('.class').slideUp();
				self.g_param[type] = $p.attr('id');
				self.g_param.page = 1;
				self.courselist();
				var $cur = $class.find('li[data-type='+ $ul.parent().attr('id') +']');
				$cur.find('i').text($(this).text());
				$cur.removeClass('active');
			}).on('click', '#more a', function(){
				self.g_param.page++;
				self.courselist();
			});
		}
	}
	lessons.init();
});
