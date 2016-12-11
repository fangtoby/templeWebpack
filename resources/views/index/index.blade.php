@extends('layout.main')
 
@section('header')
<link rel="stylesheet" type="text/css" href="{{ asset('/static/web/css/main.css') }}">
@stop

@section('content')	
<div>
<<<<<<< HEAD
	<video src="{{ asset('/vedio/1.mp4') }}" width="100%" controls="controls">
	您的浏览器不支持 video 标签。
	</video>
=======
	<span>{{time()}}</span>
    <h1>Articles</h1>
    <hr/>
 
	@foreach($results as $result)
        <article>
            <h2>{{ $result->id }}</h2>
            <div class="body">{{ $result->called }}</div>
        </article>
    @endforeach
>>>>>>> 33cf02965a22730bcfa36f5ef3404e6f5a67446e
</div>
@stop
 
@section('footer')
<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
<script type="text/javascript">
	console.log("success");
<<<<<<< HEAD
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
=======
	$.ajax({
		url: '{{ action('LtController@index') }}',
		// url: '{{ action('YdController@index') }}',
		type:'GET',
		data:{
			index:'1'
		},
		success:function(resp) {
			// body...
			//console.log(resp);
		}
	})
>>>>>>> 33cf02965a22730bcfa36f5ef3404e6f5a67446e
</script>
@stop