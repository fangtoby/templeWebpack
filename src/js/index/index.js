
var pop = require('../components/popup/index');

if(__DEV__){

	console.log('is developer!');
	console.log('works.');

}
var p = new pop();


$('.show_pop').click(function (argument) {
	// body...
	p.show({
		autoClose: true,
		timeout: 4000
	});

})

$('.close_pop').click(function (e) {
	// body...
	p.hide();
})
$('body').addClass('helloworld');