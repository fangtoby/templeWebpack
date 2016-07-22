define(function(require) {

	var pop = require('../lib/simplepop/index');

	var _tip = new pop();

	var xct = {};
	xct.url = {
		commentlist: '/api/mobile/comments',
		set: '/api/member/action/setting'
	}
	xct.loading = '<div id="loading"><span class="scale-point active-1 scalePoint"></span><span class="scale-point active-2 scalePoint"></span><span class="scale-point active-3 scalePoint"></span><span class="pullTxt">努力加载中</span></div>';
	xct.comment = {
		$container: $('#container'),
		$comment_container: $('#commentlist'),
		streetTpl: $('#street').html(),
		nostreetTpl: $('#nostreet').html(),
		msg: {
			noselect: '未作选择',
			empty: '评论不能为空哦~',
			end: '已加载完毕',
			more: '点击加载更多',
			streetempty: '暂无留言,快来留言吧！',
			out: '您尚未登录，请先登录，三秒后跳转到登陆页'
		},
		baseurl: {
			login: '/mobile/auth/action/login'
		},
		page: 1,
		Getdata : function(url, data, success, fail){
			var self = this;
			window.ajaxRequest = $.ajax({
				'type': 'GET',
				'dataType': 'json',
				'url': url,
				'data': data,
				'success': function(data){
					if(data.response == 100){
						success&&success(data);
					}else{
						fail&&fail(data);
						// self.alertPop(data.message);
						_tip.show({
							msg: data.message ,
							autoClose: true
						});
					}
				}
			});
		},
		Postdata : function(url, data, success, fail){
			var self = this;
			// if(window.ajaxRequest != undefined && window.ajaxRequest.readyState < 4){
				window.ajaxRequest = $.ajax({
					'type': 'POST',
					'dataType': 'json',
					'url': url,
					'data': data,
					'success': function(data){
						if(data.response == 100){
							success&&success(data);
						}else{
							fail&&fail(data);
							self.alertPop(data.message);
							if(data.response == 106){
								setTimeout(function(){
									location.pathname = self.baseurl.login;
								},2000);
							}
						}
					}
				});
			// }
		},
		alertPop: function(msg, time){
			var self = this;
			if($('.pop-alert')[0]){
				$('.pop-alert').html(msg);
			}else{
				$('body').append('<div class="pop-alert">'+ msg +'</div>');
				var $alert = $('.pop-alert');
				$alert.css({'margin-left': -$alert.outerWidth()/2, bottom: '50%', 'margin-bottom': -$alert.outerHeight()/2});
				setTimeout(function(){
					$alert.remove();
				},time || 3000);
			}
		},
		render: function(relationId, type, page){
			var self = this;
			if(page == 1){
				self.$comment_container.html('<li>' + xct.loading + '</li>');
			}
			self.Getdata(xct.url.commentlist, {
				relationId: relationId,
				type: type,
				page: page
			},function(data){
				var list = data.data.list,
					data = list.data,
					len = data.length,
					html = '';
				var totalpage = Math.ceil(list.total/list.per_page);
				if(page == 1){
					self.$comment_container.html('');
				}
				if(page == 1 && len ==0){
					html = '<div class="empty"><em class="icon icon-empty"></em><p class="txt">'+ self.msg.streetempty +'</p></div>'
				}else if(len > 0){
					for(var i=0; i<len; i++){
						html += '<li class="it">'+
									'<p class="title"><span>'+ data[i].member.relname +'</span><span>'+ data[i].createdAt +'</span></p>'+
									'<p class="content">'+ data[i].content +'</p>'+
								'</li>';
					}
					html += '<li class="tips"><a id="more" href="javascript:void(0)">'+ (page == totalpage ? self.msg.end : self.msg.more) +'</a></li>';
				}else {
					html += '<li class="tips">'+ self.msg.end +'</li>';
				}
				$('#more').parent().remove();
				self.$comment_container.append(html);
			});
		},
		comment: function(){
			var self = this;
			document.getElementById('comment-btn').addEventListener('touchstart', function(){
				if(g_param.memberId){
					var $container = '';
					if(!document.getElementById('comment-container')){
						$('body').append('<div id="comment-container">'+
											'<p><textarea placeholder="期待更多有趣内容，请留下您的建议..."></textarea></p>'+
											'<p class="btn-b"><a id="comment-confirm" href="javascript:void(0)">确定</a></p>'+
											'<p class="btn-b"><a id="comment-close" href="javascript:void(0)">取消</a></p>'+
										'</div>');
						$container = $('#comment-container');
						$container.css('top', $('#video_frame').height());
						//评论是暂停播放视频
						// if(yplayer && yplayer.pause){
						// 	yplayer.pause();
						// }
						document.getElementById('comment-confirm').addEventListener('touchstart', function(){
							var content = $.trim($('#comment-container').find('textarea').val());
							if(content){
								self.Postdata(xct.url.commentlist, {
									relationId: g_param.relationId,
									content: content,
									type: g_param.type
								}, function(){
									//继续播放视频
									// if(yplayer && yplayer.play){
									// 	yplayer.play();
									// }
									$('body, html').css('overflow', 'initial');
									self.page = 1;
									self.render(g_param.relationId, g_param.type, self.page);
									$container.removeClass('active');
									$container.find('textarea').val('');
								});
							}else{
								// self.alertPop(self.msg.empty);
								_tip.show({
									msg: self.msg.empty,
									autoClose: true
								});
							}
						});
						document.getElementById('comment-close').addEventListener('touchstart', function(){
							$container.removeClass('active');
							$('body, html').css('overflow', 'initial');
						});
					}else {
						$container = $('#comment-container');
					}
					setTimeout(function(){
						$container.addClass('active');
					},10);
					setTimeout(function(){
						$('body').scrollTop(0);
						$('body, html').css('overflow', 'hidden');
					},310);
				}else{
					// self.alertPop(self.msg.out);
					_tip.show({
						msg: self.msg.out
					});
					setTimeout(function(){
						location.pathname = self.baseurl.login;
					},3000);
				}
			});
		},
		init: function(){
			var self = this;
			self.render(g_param.relationId, g_param.type, 1);
			self.comment();
			$(document).on('click', '#confirm', function(){
				var checked = false,
					id = '';
				$('#comment-layer').find('li').each(function(){
					var $this = $(this),
						$input = $this.find('input');
					if($input.is(':checked')){
						checked = true;
						id = $this.attr('id');
						return false;
					}
				});
				if(checked){
					if(id == 'no'){
						xct.hidePop();
						$('body').css('overflow', 'auto');
					}else{
						self.Getdata(xct.url.set, {
							Street_id: id
						},function(){
							self.street();
						});
					}
				}else{
					// self.alertPop(self.msg.noselect);
					_tip.show({
						msg: self.msg.noselect,
						autoClose: true
					});
				}
			}).on('click', '#more', function(){
				self.page++;
				$(this).html(xct.loading);
				self.render(g_param.relationId, g_param.type, self.page);
			});
		}
	}
	xct.comment.init();

});