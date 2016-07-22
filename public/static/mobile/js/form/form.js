define(function(require){
	var xct = require('xct');
	
	var l = {
		baseurl: {
			home: '/mobile'
		},
		msg: {
			mobile: '请输入手机号码',
			captcha: '请输入验证码',
			password: '请输入登录密码',
			password_confirmation: '请确认登录密码',
			passwordEmpty: '密码不能包含空格',
			code: '请输入动态码',
			diffpw: '两次输入的登录密码不一致',
			reg: '注册成功',
			login: '登录成功',
			reged: '手机号已被使用',
			relname: '请输入昵称',
			protocol: '您未同意邻里学堂服务协议',
			reg_success: '注册成功，三秒后跳转到首页',
			reset_success: '重置密码成功，三秒后跳转到首页'
		},
		config: {
			times: 60
		},
		checkMobile : function(mobile){
			xct.Getdata(xct.url.checkmobile, {mobile: mobile});
		},
		fresh: function(){
			var $dom = $('#fresh').parents('li');
			$dom.find('input').val('');
			$dom.find('img').attr('src', xct.url.captcha + Math.random());
		},
		selectData : function(){
			var data = {},
				isubmit = false;
			$('.data').each(function(){
				var $this = $(this),
					name = $this.attr('name'),
					type = $this.attr('type');
				switch (type){
					case 'text':;
					case 'tel':;
					case 'password':
						$('#form').find('.msg').remove();
						if($this.attr('must') == 1 && $.trim($this.val()) == ''){
							isubmit = false;
							xct.alertPop(l.msg[name]);
							return false;
						}else{
							isubmit = true;
							data[name] = $.trim($this.val());
						}
						break;
					case 'checkbox':
						if($this.is(':checked')){
							data[name] = true;
							isubmit = true;
						}else{
							data[name] = false;
							isubmit = false;
							xct.alertPop(l.msg[name]);
						}
						break;
				}
			});
			if(isubmit){
				return data;
			}else{
				return false;
			}
		}
	}
	if(document.getElementById('fresh')){
		document.getElementById('fresh').addEventListener('touchstart', function(){
			l.fresh();
		});
	}
	if(document.getElementById('show')){
		document.getElementById('show').addEventListener('touchstart', function(e){
			var $this = $('#show'),
				$p = $this.parent(),
				$input = $p.find('input'),
				inputType = $input.attr('type');
			if(inputType === 'password'){
				$input.attr('type', 'text');
				$this.find('.icon').addClass('active');
			}else{
				$input.attr('type', 'password');
				$this.find('.icon').removeClass('active');
			}
		});
	}
	if(document.getElementById('clearTxt')){
		document.getElementById('clearTxt').addEventListener('touchstart', function(e){
			var $this = $('#clearTxt');
			$this.parent().find('input').val('');
		});
	}
	if(document.getElementById('link-deal')){
		$('#link-deal').click(function(){
			$('#deal').show();
			$('body, html').css('overflow', 'hidden');
			setTimeout(function(){
				$('#deal').addClass('active');
			},10);
		});
		$('#deal').click(function(){
			$('#deal').removeClass('active');
			$('body, html').css('overflow', 'initial');
			setTimeout(function(){
				$('#deal').hide();
			},300);
		});
	}
	
	l.login = function(){
		var data = l.selectData();
		if(data){
			xct.Postdata(xct.url.login, data, function(){
				location.pathname = l.baseurl.home;
			}, function(data){
				l.fresh();
			});
		}
	}
	$('#login').click(function(){
		l.login();
	});
	
	l.reg = function(){
		submit(xct.url.reg, function(){
			xct.alertPop(l.msg.reg_success);
			setTimeout(function(){
				location.pathname = l.baseurl.home;
			},3000);
		});
	}
	$('#reg').click(function(){
		l.reg();
	});
	
	l.forget = function(){
		submit(xct.url.forget, function(){
			xct.alertPop(l.msg.reset_success);
			setTimeout(function(){
				location.pathname = l.baseurl.home;
			},3000);
		});
	}
	$('#forget').click(function(){
		l.forget();
	});
	
	var pageType = g_param.pagetype;
	document.onkeydown = function(e){
		if(e.keyCode == 13){
			switch (pageType){
				case 'login':
					l.login();
					break;
				case 'register':
					l.reg();
					break;
				case 'forget':
					l.forget();
					break;
			}
			return false;
		}
	};
	
	function submit(url, fn){
		var data = l.selectData();
		if(data){
			// if(data.password != data.password_confirmation){
				// xct.alertPop(l.msg.diffpw);
			// }
			xct.Postdata(url, data, function(){
				 fn&&fn();
			}, function(data){
				l.fresh();
			});
		}
	}
	
	var canGet = true;
	$('#code').click(function(){
		var mobile = $('input[name=mobile]').val(),
			code = $('input[name=captcha]').val(),
			$this = $(this);
		if(mobile && code){
			if(canGet){
				xct.Postdata(xct.url.sms, {mobile: mobile, code: code, kind: g_param.pagetype === 'register' ? 1 : 3}, function(){
					canGet = false;
					$this.addClass('disabled');
					$this.html('<span>'+ l.config.times +'</span>秒后重发');
					var cutDown = l.config.times;
					var setId = setInterval(function(){
						cutDown--;
						$this.find('span').html(cutDown);
					},1000);
					setTimeout(function(){
						clearInterval(setId);
						canGet = true;
						$this.removeClass('disabled');
						$this.html('获取动态码');
						l.fresh();
					},l.config.times * 1000);
				});
			}
		}else{
			xct.alertPop(mobile ? l.msg.captcha : l.msg.mobile);
		}
	});
	
	$('#form').on('input', 'input', function(e){
		var $this = $(this),
			val = $this.val();
		if(g_param.pagetype === 'register' && $this.attr('name') === 'mobile' && val.length == 11){
			l.checkMobile(val);
		}
	});
});
