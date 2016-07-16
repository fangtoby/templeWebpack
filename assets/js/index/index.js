webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {


	if(true){

		console.log('is developer!');
		console.log('works.');

	}

	var p =  null;

	$('.show_pop').click(function (argument) {

		__webpack_require__.e/* nsure */(0, function() { // 语法奇葩, 但是有用
			var pop = __webpack_require__(6);

			if(p == null){
				p = new pop();
			}
			p.show({
				autoClose: true,
				timeout: 4000
			});
		});
	});

	$('.close_pop').click(function (e) {
		// body...
		p.hide();
	});

	$('body').addClass('helloworld');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
]);