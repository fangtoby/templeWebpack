require('./style/main.less');


function pop (config) {
	function _pop (argument) {
		// body...
		var _dom_ = '<div class="simple_popup"><div class="pop_content">Hello World</div></div>';		

		$('body').append(_dom_);


	}
	_pop.prototype.$element = null;
	_pop.prototype.timer = null;
	_pop.prototype.timeout = 2000;
	_pop.prototype.show = function (param) {
		// body...
		var $frame = $('.simple_popup');
		var self = this;

		this.$element = $frame;

		if(param && param.innerHtml){
			$frame.html( param.innerHtml );
		}

		var p_height = $frame.height();

		$frame.css({
			'marginTop': - (p_height/2+50) + 'px'
		});

		if(this.timer != null){
			clearTimeout( this.timer );
		}
		if(param && param.autoClose == true){
			if(param.timeout){
				self.timeout = param.timeout;
			}
			this.timer = setTimeout(function (argument) {
				// body...
				self.hide();
			}, self.timeout);
		}
		if(!$frame.hasClass('popup_show'))
			$frame.addClass('popup_show');
	}
	_pop.prototype.hide = function(argument) {
		// body...
		if(this.$element != null)
				this.$element.removeClass('popup_show');
	}
	// body...
	return new _pop(config);
}

module.exports = pop;