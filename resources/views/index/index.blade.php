@extends('layout.main')
 
@section('header')
<link rel="stylesheet" type="text/css" href="{{ asset('/static/web/css/main.css') }}">
@stop

@section('content')	
<div>
	<video src="{{ asset('/vedio/1.mp4') }}" width="100%" controls="controls">
	您的浏览器不支持 video 标签。
	</video>
</div>
@stop
 
@section('footer')
<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
<script type="text/javascript">
	console.log("success");
	// $.ajax({
	// 	url: '{{ action('LtController@index') }}',
	// 	// url: '{{ action('YdController@index') }}',
	// 	type:'GET',
	// 	data:{
	// 		index:'1'
	// 	},
	// 	success:function(resp) {
	// 		// body...
	// 		//console.log(resp);
	// 	}
	// })
</script>
@stop