@extends('layout.main')
 
@section('header')
<link rel="stylesheet" type="text/css" href="{{ asset('/static/web/css/main.css') }}">
@stop

@section('content')	
<div>
	<h1>Worker 线程</h1>
	<div>
	Please input number:<input type="text" id="num" >
	<button onclick="caculate()">Caculate</button>
	</div>
</div>
@stop
 
@section('footer')
<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
<script type="text/javascript">
	console.log("success");
	var worker = new Worker("{{ asset('/static/web/js/index/worker.js') }}");
	function caculate(){
		console.log("click");
		var num = parseInt(document.querySelector("#num").value,10);
		worker.postMessage(num);
	}
	worker.onmessage = function(event){
		alert("caculate result:" + event.data);
	}
</script>
@stop