


if(__DEV__){

	console.log('is developer!');
	console.log('works.');

}

var p =  null;

$('.show_pop').click(function (argument) {

	require.ensure([], function() { // 语法奇葩, 但是有用
		var pop = require('../components/popup/index');

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