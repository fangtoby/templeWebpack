@extends('layout.main')
 
@section('header')
<link rel="stylesheet" type="text/css" href="{{ asset('/static/web/css/main.css') }}">
@stop

@section('content')	
<div>
<<<<<<< HEAD
	<h1>Worker 线程</h1>
	<div>
	Please input number:<input type="text" id="num" >
	<button onclick="caculate()">Caculate</button>
	</div>
=======
	<span>{{time()}}</span>
    <h1>Articles</h1>
    <hr/>

    <article>
        <h2>{{ $result->id }}</h2>
        <div class="body">{{ $result->called }}</div>
    </article>
>>>>>>> 33cf02965a22730bcfa36f5ef3404e6f5a67446e
</div>
@stop
 
@section('footer')
<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
<script type="text/javascript">
	console.log("success");
<<<<<<< HEAD
	var worker = new Worker("{{ asset('/static/web/js/index/worker.js') }}");
	function caculate(){
		console.log("click");
		var num = parseInt(document.querySelector("#num").value,10);
		worker.postMessage(num);
	}
	worker.onmessage = function(event){
		alert("caculate result:" + event.data);
	}
=======
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
>>>>>>> 33cf02965a22730bcfa36f5ef3404e6f5a67446e
</script>
@stop