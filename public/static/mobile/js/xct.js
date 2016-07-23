/**
 * @author gaohuan@yiban.cn
 */
define(function(require, exports, module){
	require('jquery');
	var xct = {
		$D: {
			$doc: $(document),
			$body: $('body')
		},
		loading: '<div id="loading"><span class="scale-point active-1 scalePoint"></span><span class="scale-point active-2 scalePoint"></span><span class="scale-point active-3 scalePoint"></span><span class="pullTxt">努力加载中</span></div>',
		g_param: {
			popScroll: 'popScroll',
			lessons_detail_baseUrl: '/mobile/lessons/',
			homeUrl: '/mobile',
			universitylist_baseUrl: '/mobile/university/'
		},
		config: {
			tipsTime : 3000,
			banner: {
				width: 320,
				height:184
			}
		},
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
						self.alertPop(data.message);
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
						}
					}
				});
			// }
		},
		Typedata : function(type, url, data, success, fail){
			// if(window.ajaxRequest != undefined && window.ajaxRequest.readyState < 4){
				window.ajaxRequest = $.ajax({
					'type': type,
					'dataType': 'json',
					'url': url,
					'data': data,
					'success': function(data){
						if(data.meta){
							if(data.meta.status.code == 200){
								success&&success(data);
							}
						}else{
							fail&&fail(data);
							self.alertPop(data.message);
						}
					}
				});
			// }
		},
		scroll: function(param){
			var self = this,
				myscroll;
			param.id = param.id;
			param.updata = param.updata || false;
			param.pullUpEl = param.pullUpEl || null;
			param.pullDownEl = param.pullDownEl || null;
			param.topOffset = param.topOffset || 0;
			param.pullUpAction = param.pullUpAction || null;
			param.pullDownAction = param.pullDownAction || null;
			param.pullUpActive = param.pullUpActive || null;
			param.pullDownActive = param.pullDownActive || null;
			if(param.updata){
	            var pullUpOffset = param.pullUpEl ? param.pullUpEl.offsetHeight : null,
	                pullDownOffset = param.pullDownEl ? param.pullDownEl.offsetHeight : null;
	            var scrollY = 0,_scrollY = 0;
	            myscroll = new iScroll(param.id, {
	                useTransition: true,
	                topOffset: pullDownOffset || param.topOffset,
	                fadeScrollbar: true,
	                onRefresh : function() {
	                    if (param.pullDownEl && param.pullDownEl.className.match('loading')) {
	                        param.pullDownEl.className = '';
	                        param.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉查看最新';
	                    } else if (param.pullUpEl && param.pullUpEl.className.match('loading')) {
	                        param.pullUpEl.className = '';
	                        param.pullUpEl.querySelector('.pullUpLabel').innerHTML = '下拉查看最新';
	                    }
	                },
	                onScrollStart: function(){
	                	$('input, textarea').blur();
	                },
	                onScrollMove : function(e) {
	                	//阻止浏览器默认事件
	                    if (this.y > 5 && param.pullDownEl && !param.pullDownEl.className.match('flip')) {
	                        param.pullDownEl.className = 'flip';
	                        param.pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放加载';
	                        this.minScrollY = 0;
	                    } else if (this.y < 5 && param.pullDownEl && param.pullDownEl.className.match('flip')) {
	                        param.pullDownEl.className = '';
	                        param.pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉查看最新';
	                        this.minScrollY = -pullDownOffset;
	                    } else if (this.y < 0 && this.y < (this.maxScrollY - 5) && param.pullUpEl && !param.pullUpEl.className.match('flip')) {
	                        param.pullUpEl.className = 'flip';
	                        param.pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放加载';
	                        this.maxScrollY = this.maxScrollY;
	                    } else if (this.y > (this.maxScrollY + 5) && param.pullUpEl && param.pullUpEl.className.match('flip')) {
	                        param.pullUpEl.className = '';
	                        param.pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
	                        this.maxScrollY = pullUpOffset;
	                    }
	                    _scrollY = scrollY;
	                    scrollY = this.y;
	                    if(_scrollY > scrollY){
	                    	param.pullUpActive && param.pullUpActive();
	                    }else{
	                    	param.pullDownActive && param.pullDownActive();
	                    }
	                },
	                onScrollEnd : function() {
	                    if (param.pullDownEl && param.pullDownEl.className.match('flip')) {
	                        param.pullDownEl.className = 'loading';
	                        param.pullDownEl.querySelector('.pullDownLabel').innerHTML = self.message.loading;
	                        param.pullDownAction && param.pullDownAction();
	                    } else if (param.pullUpEl && param.pullUpEl.className.match('flip')) {
	                        param.pullUpEl.className = 'loading';
	                        param.pullUpEl.querySelector('.pullUpLabel').innerHTML = self.message.loading;
	                        param.pullUpAction && param.pullUpAction();
	                    }
	                }
	            });
			}else{
				myscroll = new iScroll(param.id, {
					useTransition: true
				});
			}
			return myscroll;
		},
		clearData: function(dom){
			dom.val('');
		},
		popLayer: function(tpl){
			var self = this, 
				html = '', popDom = '';
			if($('.pop-layer')[0]){
				popDom = $('.pop-layer');
				popDom.show();
				popDom.find('.scroll-bar').html(tpl);
				setTimeout(function(){
					popDom.addClass('active');
				},10 );
			}else{
				html = '<div class="pop-layer"><div id="layer-scroll"><div class="scroll-bar">' + tpl + '</div></div></div>';
				self.$D.$body.append(html);
				popDom = $('.pop-layer');
				popDom.show();
				setTimeout(function(){
					popDom.addClass('active');
				},10 );
			}
		},
		hidePop: function(){
			$('.pop-layer').removeClass('active');
			setTimeout(function(){
				$('.pop-layer').hide();
			},300);
		},
		showePop: function(){
			$('.pop-layer').show();
			setTimeout(function(){
				$('.pop-layer').addClass('active');
			},10 );
		},
		alertPop: function(msg, time){
			var self = this;
			if($('.pop-alert')[0]){
				$('.pop-alert').html(msg);
			}else{
				self.$D.$body.append('<div class="pop-alert">'+ msg +'</div>');
				var $alert = $('.pop-alert');
				$alert.css({'margin-left': -$alert.outerWidth()/2, bottom: '50%', 'margin-bottom': -$alert.outerHeight()/2});
				setTimeout(function(){
					$alert.remove();
				},time || self.config.tipsTime);
			}
		},
		confirmPop: function(param){
			var self = this;
			var tpl = '<div class="pop-comfirm">'+
						'<div class="comfirm-main">'+
							'<a class="comfirm-close comfirm-cancel shake-rotate" href="javascript:void(0)">'+
								'<span></span><span></span>'+
							'</a>'+
							'<p class="comfirm-txt">'+ param.msg +'</p>'+
							'<div class="comfirm-bottom clearfix">'+
								'<a class="comfirm-btn comfirm-cancel" href="javascript:void(0)">取消</a>'+
								'<a class="comfirm-btn comfirm-comfirm" href="javascript:void(0)">确认</a>'+
							'</div>'+
						'</div>'+
					'</div>';
			self.$D.$body.append(tpl);
			var $comfirm = $('.pop-comfirm');
			setTimeout(function(){
				$comfirm.addClass('active');
			},50);
			setTimeout(function(){
				$comfirm.find('.shake-rotate').addClass('shakeRotate');
				$comfirm.find('.comfirm-main').css('margin-top',-$comfirm.find('.comfirm-main').height()/2);
			},200);
			$comfirm.on('click', '.comfirm-cancel', function(){
				close();
			}).on('click', '.comfirm-comfirm', function(){
				param.comfirm && param.comfirm(function(){
					close();
				});
			});
			function close(){
				$comfirm.removeClass('active');
				setTimeout(function(){
					$comfirm.remove();
				},200);
			}
		},
		closeDom: function(event, closeClassName, startTime, fn){
            var endTime = new Date(),
            	$dom = $('.' + closeClassName),
            	sm = startTime.getMinutes(),
            	ss = startTime.getSeconds(),
            	em = endTime.getMinutes(),
            	es = endTime.getSeconds();
            d = (em - sm)*60 + es - ss;
            if($dom[0] && d >= 1){
            	var target = event.target;
            	while ((target.className.match(closeClassName) ? target.className.match(closeClassName)[0] : target.className) != closeClassName) {
	                target = target.parentNode;
	                if(target.tagName === "BODY"){
	                	$dom.removeClass('active');
	                	$dom[0].addEventListener('transitionend',function(){
	                		$dom.remove();
	                	});
	                    fn && fn();
	                    return false;
	                }
	            }
            }else{
            	return false;
            }
		}
	}
	xct.url = require('./config/url');
	module.exports = xct;
  	module.exports.url = xct.url;
});