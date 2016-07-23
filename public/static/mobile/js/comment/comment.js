define(function(require){
	var xct = require('../xct');
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
			streetempty: '本社区暂无留言,快来留言吧！'
		},
		page: 1,
		street: function(){
			var self = this;
			xct.Getdata(xct.url.street, {},function(data){
				var html = self.streetTpl.replace(/{(\w+)}/g, function(){
					return data.data[arguments[1]]
				});
				self.$container.prepend(html);
				self.render(data.data.id, g_param.type, 1);
				self.comment();
				self.selectstreet();
			},function(data){
				if(data.response == 105){
					self.$container.prepend(self.nostreetTpl);
					self.render(0, g_param.type, 1);
					self.selectstreet();
					return false;
				}
			});
		},
		render: function(relationId, type, page){
			var self = this;
			if(page == 1){
				self.$comment_container.html('<li>' + xct.loading + '</li>');
			}
			xct.Getdata(xct.url.commentlist, {
				relationId: relationId,
				type: type,
				page: page
			},function(data){
				var list = data.data.list,
					data = list.data,
					len = data.length,
					html = '', zan = '';
				var totalpage = Math.ceil(list.total/list.per_page);
				if(page == 1){
					self.$comment_container.html('');
				}
				if(page == 1 && len ==0){
					html = '<li class="empty"><em class="icon icon-empty"></em><p class="txt">'+ self.msg.streetempty +'</p></li>'
				}else if(len > 0){
					for(var i=0; i<len; i++){
						zan = relationId != 0 ? '<a class="zan" href="javascript:void(0)"><span class="label"><em class="icon icon-liked"></em><i>'+ data[i].zan +'</i></span></a>' : '';
						html += '<li class="it" id="'+ data[i].id +'">'+
									'<p class="title"><span>'+ data[i].member.relname +'</span><span>'+ data[i].createdAt +'</span>'+ zan + '</p>'+
									'<p class="content"><a href="/mobile/comments/'+ data[i].id +'">'+ data[i].content +'</a></p>'+
								'</li>';
					}
					html += '<li class="tips"><a id="more" href="javascript:void(0)">' + (page == totalpage ? self.msg.end : self.msg.more) + '</a></li>';
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
				if(!document.getElementById('comment-container')){
					$('body').append('<div id="comment-container">'+
										'<p><textarea placeholder="期待更多有趣内容，请留下您的建议..."></textarea></p>'+
										'<p class="btn-b"><a id="comment-confirm" href="javascript:void(0)">确定</a></p>'+
										'<p class="btn-b"><a id="comment-close" href="javascript:void(0)">取消</a></p>'+
									'</div>');
					var $container = $('#comment-container');
					document.getElementById('comment-confirm').addEventListener('touchstart', function(){
						var content = $.trim($container.find('textarea').val());
						if(content){
							xct.Postdata(xct.url.commentlist, {
								relationId: g_param.relationId,
								content: content,
								type: g_param.type
							}, function(){
								$('body, html').css('overflow', 'initial');
								self.page = 1;
								self.render(g_param.relationId, g_param.type, self.page);
								$container.removeClass('active');
								$container.find('textarea').val('');
							});
						}else{
							xct.alertPop(self.msg.empty);
						}
					});
					document.getElementById('comment-close').addEventListener('touchstart', function(){
						$container.removeClass('active');
					});
				}
				setTimeout(function(){
					$('#comment-container').addClass('active');
				},10);
				setTimeout(function(){
					$('body').scrollTop(0);
					$('body, html').css('overflow', 'hidden');
				},310);
			});
		},
		selectstreet: function(){
			document.getElementById('select-street').addEventListener('touchstart', function(){
				if($('#comment-layer')[0]){
					xct.showePop();
				}else{
					xct.Getdata(xct.url.streetlist, {}, function(data){
						var data = data.data.list,
							html = '<ul id="comment-layer">';
						for(var i=0; i<data.length; i++){
							html += '<li id="'+ data[i].id +'">'+
										'<label class="clearfix">'+
											'<span>'+ data[i].streetname +'</span>'+
											'<input class="checkbox hidden" name="streetname" type="radio" />'+
											'<em class="icon icon-checkbox"></em>'+
										'</label>'+
									'</li>';
						}
						html += '<li id="no">'+
									'<label class="clearfix">'+
										'<span>暂不选择</span>'+
										'<input class="checkbox hidden" name="streetname" type="radio" />'+
										'<em class="icon icon-checkbox"></em>'+
									'</label>'+
								'</li>';
						html += '</ul>';
						xct.popLayer(html);
						$('.pop-layer').append('<p class="btn-b"><a id="confirm" href="javascript:void(0)">确定</a></p></div>')
						$('body').append(html);
						$('body').css('overflow', 'hidden');
					});
				}
			});
		},
		init: function(){
			var self = this;
			if(g_param.pagetype === 'street'){
				self.street();
			}
			
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
						xct.Postdata(xct.url.set, {
							Street_id: id
						},function(){
							location.reload();
						});
					}
				}else{
					xct.alertPop(self.msg.noselect);
				}
			}).on('click', '#more', function(){
				self.page++;
				$(this).html(xct.loading);
				self.render(g_param.relationId, g_param.type, self.page);
			}).on('click', '.zan', function(){
				var $this = $(this),
					id = $this.parents('li').attr('id');
				xct.Postdata(xct.url.zan, {
					id: id
				},function(){
					$this.find('i').text(parseInt($this.find('i').text())+1);
				});
			});
		}
	}
	xct.comment.init();
});
