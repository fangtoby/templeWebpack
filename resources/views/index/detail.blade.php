@extends('layout.main')
 
@section('header')
<link rel="stylesheet" type="text/css" href="{{ asset('/static/web/css/main.css') }}">
@stop

@section('content')	
<div>
	<span>{{time()}}</span>
    <h1>Articles</h1>
    <hr/>

    <article>
        <h2>{{ $result->id }}</h2>
        <div class="body">{{ $result->called }}</div>
    </article>
</div>
@stop
 
@section('footer')
<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
<script type="text/javascript">
	console.log("success");
	$.ajax({
		// url: '{{ action('LtController@index') }}',
		url: '{{ action('YdController@index') }}',
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
@stop