(function () {

    /**
    *   @example
    *
    *   new album({
    *    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg']
    *   })
    *
    *   @note
    *
    *   1）  4 x 8 = 32 最多可以容下32张图片
    *   2）  32个格子有多少种组合？
    *   3）  如果按给定图片数，随机组合，想法是否可行？
    *   4）  假定album对象是个黑盒子，给定图片按照给定图片的个数，按照一定算法组合显示效果
    *
    *   规则
    *
    *   1> 1,2,4,6,12 ... 组合格子 
    *       
    *        A: ratio = width/height; 
    *        B: 2 >= ratio >= 1
    *
    *   1）墨菲定律
    *
    *   "事情如果有变坏的可能，不管这种可能性有多小，它总会发生"
    *
    *   If there are two or more ways to do something, _and one of 
    *   those ways can result in a catastrophe, then someone will do it. 
    *
    *   2）马太效应
    *
    *   “马太效应”与“平衡之道”相悖；与“二八定则”类似，是十分重要的自然法则。
    *
    *   《道德经·七十七章》：“天之道，损有余而补不足；人之道则不然，损不足以奉有余。”
    *
    *   3）霍桑效应
    *
    *   意识到自己正在被别人观察的个人具有改变自己行为的倾向。
    *
    *   4）不值得定律
    *
    *   直观的表达为：不值得做的事情，就不值得做好。 这个定律反映出人们的一种心理，
    *   一个人如果从事的是一份自认为不值得的事情，往往会持冷嘲热讽、敷衍了事的态度。
    *   不仅成功率小，即使成功，也不会觉得有多大的成就感。
    *
    *   5）口红效应
    *   
    *   指因经济萧条而导致口红热卖的一种有趣的经济现象
    *   
    *   
    */
  
  	//startOffset == 0
    //添加或修改样式
    //startOffset > 0 && indexOf('span','b','p','em','li'..) == 1
    //分组添加或修改样式
    //startOffset > 0 && indexOf('span','b','p','em','li'..) == 0
    //创建span添加样式

    //拓展编辑器对象
	function extendEdit(){
		return this;
	}
    //初始化
	extendEdit.prototype.init = function () {
		this.mouseAction();
	}
    //获取系统选择文本事件，返回选择对象
	extendEdit.prototype.getSelectedContents = function () {
       if (window.getSelection) { //chrome,firefox,opera
           var range=window.getSelection().getRangeAt(0);
		  if(range.collapsed){
			  this.range = null;
			  $('.edit_pop').remove();
			  return false;
		   }
		   this.range = range;
		   console.log(range);
		   var boundary = range.getBoundingClientRect();
		   this.createPop();
		   
		    var elem = $('.edit_pop'),
			bubbleWidth = elem.width(),
			bubbleHeight = elem.height(),
			offset = $('#cm_extend_edit').offset(),
			pos = {
				x: (boundary.left + boundary.width / 2) - (bubbleWidth / 2) - offset.left,
				y: boundary.top - bubbleHeight - 8 + $(document).scrollTop() - offset.top
			};
		   this.pop = elem;
		   this.updatePosition(elem,pos.x,pos.y);
		   
           var container = document.createElement('div');
           container.appendChild(range.cloneContents());
           return container.innerHTML;
           //return window.getSelection(); //只复制文本
       }
       else if (document.getSelection) { //其他
           var range=window.getSelection().getRangeAt(0);
           var container = document.createElement('div');
           container.appendChild(range.cloneContents());
           return container.innerHTML;
           //return document.getSelection(); //只复制文本
       }
       else if (document.selection) { //IE特有的
           return document.selection.createRange().htmlText;
           //return document.selection.createRange().text; //只复制文本
       }
    }
    //监控鼠标按钮事件
	extendEdit.prototype.mouseAction = function () {
		var text = '',self = this;
		this.bindEditMenuEvent();
		$(document).on('mouseup', '.b-content', function () {
			text = self.getSelectedContents();
			if(text != '')
			    console.log(text);
        });
    }
    //创建菜单层
    extendEdit.prototype.createPop = function () {
        var htmlArr = [];
		var editPop = $('.edit_pop');
		if (editPop.length == 0) {
		    htmlArr.push('<div class="edit_pop">');
		    htmlArr.push('<div class="clearfix">');
		    htmlArr.push('<ul>');
		    htmlArr.push('<li><a href="#" class="edit_fstyle_bold"> B </a></li>');
		    htmlArr.push('<li><a href="#" class="edit_fstyle_italy"> I </a></li>');
		    htmlArr.push('<li><a href="#" class="edit_fstyle_underline"> U </a></li>');
		    htmlArr.push('<li><a href="#" class="edit_fstyle_hsize"> H_ </a></li>');
		    htmlArr.push('<li><a href="#" class=""> List </a></li>');
		    htmlArr.push('<li><a href="#" class="edit_add_link"> Link </a></li>');
		    htmlArr.push('</ul>');
		    htmlArr.push('</div>');
			htmlArr.push('<div class="edit_sub_menu clearfix"></div>');
            htmlArr.push('</div>');
            $('#cm_extend_edit').append(htmlArr.join(''));
        }
    }
	//绑定事件
	extendEdit.prototype.bindEditMenuEvent = function() {
		var self = this,
			dom = {
			h:'.edit_fstyle_hsize',
			b:'.edit_fstyle_bold',
			i:'.edit_fstyle_italy',
			u:'.edit_fstyle_underline',
			l:'.edit_add_link',
			bl:'.but_add_link'
			},
	        value = '';
		
        $(document).on('click', dom.h, function (e) {
            //标题
			self.hSizeList($('.edit_sub_menu'));
        }).on('click', dom.b, function (e) {
            //加粗
            self.addStyleBold();
        }).on('click', dom.i, function (e) {
            //倾斜
			self.addStyleItaly();
        }).on('click', dom.u, function (e) {
            //添加下划线
            self.addStyleUnderline();
        }).on('click', dom.l, function (e) {
            //链接
            self.addDomLinkInit($('.edit_sub_menu'));
        }).on('click', dom.bl, function (e) {
            //添加链接
            value = $(this).parent().find('input').val();
            self.addDomLink(value);
            self.pop.fadeOut();
        });
        
    }
    //标题
	extendEdit.prototype.hSizeList = function(dom) {
        var htmlArr = [];
        var hSizeList = $('.edit_pop_hlist');
        if (hSizeList.length == 0) {
            htmlArr.push('<div class="edit_pop_hlist">');
            htmlArr.push('<ul>');
            htmlArr.push('<li><a href="#" class=""> H1 </a></li>');
            htmlArr.push('<li><a href="#" class=""> H2 </a></li>');
            htmlArr.push('<li><a href="#" class=""> H3 </a></li>');
            htmlArr.push('<li><a href="#" class=""> H4 </a></li>');
            htmlArr.push('<li><a href="#" class=""> H5 </a></li>');
            htmlArr.push('<li><a href="#" class=""> H6 </a></li>');
            htmlArr.push('</ul>');
            htmlArr.push('</div>');
            dom.html(htmlArr.join(''));
        } else {
            hSizeList.remove();
        }
    }
    //链接
	extendEdit.prototype.makeLinkTpl = function(dom) {
        var htmlArr = [];
        var _link = $('.edit_pop_link');
        if (_link.length == 0) {
            htmlArr.push('<div class="edit_pop_link">');
            htmlArr.push('<input type="text" value="http://" /><span class="but_add_link">+</span>');
            htmlArr.push('</div>');
            dom.html(htmlArr.join(''));
        } else {
            _link.remove();
        }
    }
    //加粗
	extendEdit.prototype.addStyleBold = function() {
        var parent = this.range.commonAncestorContainer.parentNode;
		
		if(parent.style.fontWeight == 'bold'){
			parent.style.fontWeight = 'normal';
		}else{
			parent.style.fontWeight = 'bold';
		}
    }
	//倾斜
	extendEdit.prototype.addStyleItaly = function() {
		var parent = this.range.commonAncestorContainer.parentNode;
		
		if(parent.style.fontStyle == 'italic'){
			parent.style.fontStyle = 'normal';
		}else{
			parent.style.fontStyle = 'italic';
		}	
	}
	//下划线
	extendEdit.prototype.addStyleUnderline = function() {
		var parent = this.range.commonAncestorContainer.parentNode;
		if(parent.style.textDecoration == 'underline'){
			parent.style.textDecoration = 'none';
		}else{
			parent.style.textDecoration = 'underline';
		}
	}
	//显示添加链接页面
	extendEdit.prototype.addDomLinkInit = function (dom) {
	    this.makeLinkTpl(dom);
	}
    //添加链接
    //替换方法不合理，多个匹配选项问题
    //@todo: 
    /*
        function insertstring(mainstr,searchstr,insertstr){
           // var front=getfront(mainstr,searchstr);
             foundoffset=mainstr.indexof(searchstr);
          if(foundoffset==-1){
               return null;
             }    
             var front = mainstr.substring(0,foundoffset);
             var end =  mainstr.substring(foundoffset+searchstr.length,mainstr.length);
          if(front!=null && end!=null){
               return front+insertstr+searchstr+end;
             }
            return null;
        }
        //如何要改为字符串替换的代码如下
        function insertstring(mainstr,searchstr,insertstr){
             foundoffset=mainstr.indexof(searchstr); 
             var front = mainstr.substring(0,foundoffset);
             var end =  mainstr.substring(foundoffset+searchstr.length,mainstr.length);
  
          if(front!=null && end!=null){
               return front+replacestr+end;
             }
            return null;
        }
    */
	extendEdit.prototype.addDomLink = function (value) {
	    var parent = this.range.commonAncestorContainer.parentNode;
	    var phtml = parent.innerHTML;
	    var text = this.range.toString();
	    var linkArr = [];
	    var linkText = '';

	    linkArr.push('<a href="' + value + '">');
	    linkArr.push(text);
	    linkArr.push('</a>');
	    linkText = linkArr.join('');
	    phtml.replace(text, linkText);
	    parent.innerHTML = phtml.replace(text, linkText);

    }
	//更新弹窗位置
	extendEdit.prototype.updatePosition = function(ele,px,py) {
		ele.css({
			'left':px,
			'top':py	
		});	
	}
	
	var edit = new extendEdit();
	
	edit.init();
	
    function album(obj) {
        this.box = obj.box;
        this.attrUrl = obj.attrUrl || 'data-url';
        this.size = obj.size || {
            width: 150,
            height: 150
        };
		this.boxParentStyle = {
				'position':'relative',
				'overflow':'hidden'
			};
		this.setParentPosition();
    }
	
    album.prototype.init = function () {
        var self = this,
            size = this.size,
            style = {
                'height': 0,
                'width': 0,
                'left': 0,
                'top': 0,
				'display':'none'
            },
            ratio = 0,
            initRatio = size.height / size.width;
		
        this.box.each(function () {
            var img = $(this),
                _url = img.attr(self.attrUrl);
			self.get(_url, function (obj, url) {
			    ratio = obj.height / obj.width;
			    if (initRatio <= ratio) {
			        style.width = size.width;
			        style.left = 0;
			        style.height = style.width * ratio;
			        style.top = (size.height - style.height) / 2;
			    } else {
			        style.height = size.height;
			        style.top = 0;
			        style.width = style.height / ratio;
			        style.left = (size.width - style.width) / 2;
			    }
			    img.attr('src', url).css(style).fadeIn(1000);
			    img.parent().removeClass('load');
			});
        });
    };

    album.prototype.setParentPosition = function () {
        var dom ,
		self = this;
		
        this.box.each(function () {
            dom = $(this);
            dom.parent().css(self.boxParentStyle);
        });
    };

	album.prototype.get = function(url,callback){
		var obj = new Image(),
		states = {
			c:'complete',
			l:'loaded'	
		};
		obj.src = url;
        //cash
		if (obj.complete) {
		    callback && callback(obj, url);
		    return;
		};
		//ie[6-9]
		if (!-[1, ]) {
			obj.onreadystatechange=function(){
				console.log(obj);
				if(this.readyState== states.c || this.readyState == states.l){
					callback && callback(obj,this.src);
				}
			}
		} else {
        //ie[10>=] && chrome,firefox
			obj.onload = function(){
				callback && callback(obj,this.src);
			}
		}
	};
	
	document.onreadystatechange = function () {
        if (document.readyState == 'loaded' || document.readyState == 'complete') {
            setTimeout(function () {
				var pic = new album({
						box: $('img.img-box-body'),
						attrUrl: 'data-url',
						size: {
							width: 155,
							height: 155
						}
				});
        	    pic.init();
            },3000);
	    }
	}
	
	/*
	*	XMLHttpRequest
	*
	*	@Example
	*	
	*	_ajax({
	*		'url':'scripts/md5.js',
	*		'type':'get',
	*		data:{
	*			page:1
	*		},
	*		'success':function(data){
	*			console.log(data);
	*		},
	*		failure:function(msg){
	*			console.log(msg);	
	*		}
	*	});
	*	
	*	@Author: !F
	*	@Email: fangtoby@live.cn
	*	@Date:2014-12-30 15:12:10 GMT+0800 (中国标准时间)
	*/
	
	function _ajax( param ){
		function getXMLHttpRequest(){
			var XmlHttp ;
			if (window.ActiveXObject){  
				var arr=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.5.0","MSXML2.XMLHttp.4.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp","Microsoft.XMLHttp"];  
				for(var i=0;i<arr.length;i++)  
				{  
					try{  
						XmlHttp=new ActiveXObject(arr[i]);  
						return XmlHttp;  
					}catch(error){
					}  
				}  
			}else {  
				try{  
					XmlHttp=new XMLHttpRequest();
					return XmlHttp;  
				}catch(otherError){  
				}  
			}
		}
		function obj2str(o){   
			var r = []; 
			if(typeof o =="string") return ""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"";   
			if(typeof o =="undefined") return "";  
			if(typeof o == "object"){   
				if(o===null) return "null";  
				else if(!o.sort){   
					for(var i in o)   
						 r.push(i+"="+obj2str(o[i])) 
					 r=""+r.join('&')+"" 
				}else{   
					for(var i =0;i<o.length;i++)   
						 r.push(obj2str(o[i]))  
					 r="["+r.join()+"]"  
				}   
				return r;   
			}   
			return o.toString();
		}

		function request(){
			var XMLHttpReq = getXMLHttpRequest();
			var _params = obj2str( param.data || {} );
			var type = param.type || 'post';
			var timer = setTimeout(function(){
					if(XMLHttpReq){
						XMLHttpReq.abort();
					}
					param.failure && param.failure( "请求超时" );
			}, param.timeout || 10000);
			
			if(type == 'get'){
				param.url =  param.url +"?" + _params;
				_params = null;
			}
			
			XMLHttpReq.open( type , param.url , true);
			
			if(type == 'post'){
				XMLHttpReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			
			XMLHttpReq.onreadystatechange = function(){
				if (XMLHttpReq.readyState == 4) {  
					if (XMLHttpReq.status == 200) {
						if(timer){
							clearTimeout(timer);
						}
						/*
						*	IE 6/7/8
						*	如果请求为图片格式，或其他不是文本编码的文件流时,js有
						*	文件末尾处于当前编码的无效状态.
						*/
						try{  
							param.success( XMLHttpReq.responseText );
						}catch(error){
							param.success();
						}  
					} 
					if (XMLHttpReq.status == 404){
						if(timer){
							clearTimeout(timer);
						}
						param.failure && param.failure( XMLHttpReq.statusText );
					} 
				}  
			}; //指定响应函数  
			XMLHttpReq.send(_params || null);
		}
		return new request();
	}
	
	//
	function addEvent(elm, evType, fn, useCapture) {
		if (elm.addEventListener) {
			elm.addEventListener(evType, fn, useCapture);//DOM2.0
			return true;
		}
		else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, fn);//IE5+
			return r;
		}
		else {
			elm['on' + evType] = fn;//DOM 0
		}
	}

	var imagesList = [];
	for(var i = 1;i< 10;i++){
		imagesList.push( '_ (' + i+ ').jpg' );
	}
	var vid = 0;
	
	var targetDom = document.getElementById('ajax_get_img');
	
	addEvent(targetDom,'click',function(){
		vid = 0;
		getList();
	});
	
	function getList(){
		var url = "upload/"+imagesList[vid];
		_ajax({
				url: url,
				type:'get',
				timeout:3000,
				data:{
					page:1,
					size:20,
					username:'fyl',
					age:23
				},
				success:function(data){
					/*
					var dom = document.createElement('img');
					dom.setAttribute('src',url);
					console.log(dom);
					document.body.appendChild( dom );
					*/
					vid++;
					if(vid < imagesList.length){
						getList();
					}
				},
				failure:function(msg){
					console.log(msg);	
				}
			});
	}
	
    function index() {
        this.init();
        return this;
    }
    
    index.prototype.init = function () {
        console.log("index init start.");

    };

    index.prototype.bind = function () {

    };

    index.prototype.load = function () {

    };

    index.prototype.isMobile = function (){
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    
    return new index();

})();