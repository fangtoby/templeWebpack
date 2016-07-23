/**
 * @author gaohuan@yiban.cn
 * slide(containerId)
 * updata 2015-09-12
 */
 define(function(require){

(function(global,slide){
	global.slide = slide().init;
	global.define && define(function(require,exports,module){
		require('../toucher/toucher');
		return global.slide;
	});
})(window,function(){
		var slide = slide || {};
		slide = {
			g_param: {
				setIntervalId: '',
				index: 0,
				len: 0
			},
			init: function(containerId, isInterVal, index){
				var self = slide;
				self.g_param.isInterVal = isInterVal || false;
				self.g_param.index = index || 0;
				clearInterval(self.g_param.setIntervalId);
				self.g_param.windoWidth = $(window).width();
				self.g_param.$mainBox = $('#' + containerId);
				self.g_param.$pic = self.g_param.$mainBox.find('.header-banner');
				self.g_param.$sheet = self.g_param.$mainBox.find('.banner-sheet');
				var len = self.g_param.$sheet.length;
				if(self.g_param.$sheet.length > 1){
					self.g_param.$pic.prepend(self.g_param.$sheet.eq(len-1).clone());
					self.g_param.$pic.append(self.g_param.$sheet.eq(0).clone());
					self.g_param.len = len;
					self.g_param.$pic = self.g_param.$mainBox.find('.header-banner');
					self.g_param.$sheet = self.g_param.$mainBox.find('.banner-sheet');
					self.slideAction();
				}
				self.g_param.$mainBox.css('visibility', 'visible');
			},
			setInterval: function(){
				var self = slide;
				self.g_param.setIntervalId = setInterval(function() {
		            self.g_param.index++;
		            if (self.g_param.index > self.g_param.len-1) {
		            	self.g_param.index = 0;
		            }
	            	self.moveFn(-self.g_param.windoWidth*2);
		        }, 5000);
			},
			moveFn: function(left){
				var self = slide,
					curIndex = self.g_param.index + 1,
	        		preIndex = curIndex - 1,
	        		nextIndex = curIndex + 1,
					$bar = self.g_param.$mainBox.find('.header-line');
	        	self.g_param.$pic.addClass('active').css({
	                'margin-left' : left
	            });
	            setTimeout(function(){
	            	self.g_param.$pic.removeClass('active');
	            	self.g_param.$sheet.css('display','none');
	            	self.g_param.$sheet.eq(preIndex).css('display','block');
	            	self.g_param.$sheet.eq(curIndex).css('display','block');
	            	self.g_param.$sheet.eq(nextIndex).css('display','block');
	            	self.g_param.$pic.css('margin-left',-self.g_param.windoWidth);
	            },610);
	            $bar.children().removeClass('active');
	            $bar.children().eq(self.g_param.index).addClass('active');
			},
			slideAction: function(){
				var self = slide;
				//渲染
				if(self.g_param.len > 1){
					self.g_param.$pic.css('margin-left',-self.g_param.windoWidth);
					self.g_param.$pic.width(self.g_param.windoWidth*(self.g_param.len+1));
					self.g_param.$mainBox.find('.header-container').width(self.g_param.windoWidth);
					self.g_param.$sheet.width(self.g_param.windoWidth);
					self.g_param.$mainBox.height(self.g_param.$mainBox.find('img').height());
					var html = '';
					for(var i=0; i<self.g_param.len; i++){
						html += '<li><i class="line-bar"></i><i class="line-bg"></i></li>';
					}
					self.g_param.$mainBox.find('#line').html(html);
					self.g_param.$mainBox.find('#line li').eq(0).addClass('active');
					//动画
					if(self.g_param.isInterVal){
						self.setInterval();
					}
			        //
			        var myTouch = util.toucher(document.getElementById('bannerBox'));
			        var swipeLeftX, swipeRightX, swipeEndX, moveX, iswipeLeft = false, iswipeRight = false,//滑动变量
			        	offset = self.g_param.$pic.offset(), startX = 0, dragX = 0;//拖动变量
			        
					myTouch.on('swipeLeft','.banner-sheet',function(e){
						clearInterval(self.g_param.setIntervalId);
						iswipeLeft = true;
						swipeLeftX = e.pageX;
						return false;
					});
					
					myTouch.on('swipeRight','.banner-sheet',function(e){
						clearInterval(self.g_param.setIntervalId);
						iswipeRight = true;
						swipeRightX = e.pageX;
						return false;
					});
					
					myTouch.on('swipeStart',function(e){
						clearInterval(self.g_param.setIntervalId);
						startX = e.pageX;
					 	offset = self.g_param.$pic.offset();
					 	dragX = 0;
						// return false;
					});
					
					myTouch.on('swipe',function(e){
						clearInterval(self.g_param.setIntervalId);
					 	dragX = e.pageX - startX;
					 	self.g_param.$pic.css('margin-left',offset.left+dragX);
					});
					
			        myTouch.on('swipeEnd','.banner-sheet',function(e){
			        	swipeEndX = e.pageX;
			        	if(startX != swipeEndX){
				        	if(iswipeLeft){
				        		moveX = -(swipeEndX - swipeLeftX);
					        	if(moveX > 10){
					        		self.g_param.index++;
					        	}
					        	if(self.g_param.index > self.g_param.len - 1){
					        		self.g_param.index = 0;
					        	}
				        		self.moveFn(-self.g_param.windoWidth*2);
				        	}else if(iswipeRight){
				        		moveX = swipeEndX - iswipeRight;
				        		if(moveX > 10){
				        			self.g_param.index--;
				        		}
				        		if(self.g_param.index < 0){
				        			self.g_param.index = self.g_param.len-1;
				        		}
				        		self.moveFn(0);
				        	}else{
				        		var offsetLeft = -self.g_param.$pic.offset().left;
				        		if(dragX > 0){
				        			self.g_param.index = self.g_param.index - 1;
				        			if(self.g_param.index < 0){
				        				self.g_param.index = self.g_param.len - 1;
				        			}
				        			//console.log('left',self.g_param.index)
				        			self.moveFn(0);
				        		}else{
				        			self.g_param.index = self.g_param.index + 1;
				        			if(self.g_param.index > self.g_param.len-1){
				        				self.g_param.index = 0;
				        			}
				        			//console.log('right',self.g_param.index)
				        			self.moveFn(-self.g_param.windoWidth*2);
				        		}
				        	}
				        	if(self.g_param.isInterVal){
								self.setInterval();
							}
				        	iswipeLeft = false;
				        	iswipeRight = false;
			        	}
			        	return false;
					});
				}
			}
		}
		return slide;
	}
);

});
