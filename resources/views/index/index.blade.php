<!DOCTYPE html>
<html>
<head>
	<title>爬虫</title>
</head>
<body>

<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
<script type="text/javascript">
	console.log("success");
	$.ajax({
		url: '{{ action('HistoryController@index') }}',
		type:'GET',
		data:{
			index:'1'
		},
		success:function(resp) {
			// body...
			//console.log(resp);
		}
	})
</script>
</body>
</html>