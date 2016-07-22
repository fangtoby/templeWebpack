/**
 * Created by 10000461 on 2016/7/15.
 */

require('./style/main.less');

function pop(param) {
    var config = {
        html:' <div class="y_pop_tip"> <div class="y_pop_context"> <span>图片正在上传，请稍等...</span></div></div>',
        cls:{
            show: 'y_pop_show'
        },
        $element: null,
        timer: null,
        timeout:1000
    };
    var config = $.extend({},config,param);

    function Popup() {

    }

    Popup.prototype = $.extend(true, {}, this.prototype, config);

    Popup.prototype.hide = function () {
        var self = this;
        if(this.$element != null){
            this.$element.removeClass(self.cls.show );
        }
    };

    Popup.prototype.show = function (param) {
        var $element = $('.y_pop_tip');
        var $msg = $element.find('span');
        var self = this;
        self.$element = $element;
        if(param && param.msg){
            $msg.html( param.msg );
        }
        var p_height = $element.height();

        $element.css({
            'marginTop': - (p_height/2) + 'px'
        });
        
        if(!$element.hasClass( self.cls.show )){
            $element.addClass( self.cls.show );
        }
        if(param && param.autoClose == true){
            if(param.timeout){
                self.timeout = param.timeout;
            }
            if(self.timer != null){
                self.timer = null;
            }
            self.timer = setTimeout(function () {
                $element.removeClass( self.cls.show );
            },self.timeout);
        }
    };

    $('body').append(config.html);

    return new Popup();
}

module.exports = pop;