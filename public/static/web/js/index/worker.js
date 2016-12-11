onmessage = function (event) {
	// body...
	console.log("in worker");
	var result = 0;
	num = event.data;

	for (var i = 0; i < num; i++) {
		result += i;
	}
	postMessage(result);
}