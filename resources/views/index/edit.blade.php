@extends('layout.main')
 
@section('header')
<link rel="stylesheet" type="text/css" href="{{ asset('/static/web/css/main.css') }}">
<!-- Theme included stylesheets -->
<link href="//cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
<style type="text/css">
	.e_editor{
	}
	.ql-editor{
		min-height: 1100px;
		position: relative;
		height: auto;
	}
	.e_editor .ql-toolbar.ql-snow{
		border: none;
		border-bottom: solid 1px #eee;
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		z-index: 3;
		background-color: #fff;
		text-align: center;
	}
	.e_editor .ql-container.ql-snow{
		border: none;
	}
	.e_editor .ql-editor{
		position: static;
		z-index: 2;
		width: 980px;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 50px;
		margin-bottom: 30px;
		border: solid 1px #eee;
		padding: 70px 100px;
	}
	.ql-snow.ql-toolbar .ql-Save{
		background-color: #3385ff;
		border:solid 1px #2d78f4;
		color: #fff;
		height: 24px;
		padding: 0px 20px;
		line-height: 24px;
		text-align: center;;
		display: inline-block;
		margin-top: -4px;
		width: auto;
	}
</style>
@stop

@section('content')	
<div class="e_editor">
<!-- Create the editor container -->
<div id="editor">
  <p>...</p>
</div>
</div>
@stop
 
<script type="text/javascript" src="{{ asset('/static/web/js/tools/jquery.js') }}"></script>
@section('footer')
<!-- Include the Quill library -->
<script src="https://cdn.quilljs.com/1.0.0/quill.js"></script>

<!-- Initialize Quill editor -->
<script>
var toolbarOptions = [
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'align': [] }],
  ['image'],
  ['video'],
  ['clean'],// remove formatting button
  ['Save']                                         
];
 var editor = new Quill('#editor', {
    modules: { 
    	toolbar: toolbarOptions
    },
    theme: 'snow'
 });
document.querySelector('.ql-Save').innerHTML = "Save"
document.querySelector('.ql-Save').addEventListener('click', function (argument) {
	this.innerHTML = "Saveing..."
	ql_submit();
});
function ql_submit (argument) {
	// body...

	var delta = editor.getContents();
	console.log("front_html");
	console.log(delta);
	var ql_html = document.querySelector('.ql-editor').innerHTML;
	console.log(ql_html);
	$.ajax({
		url: '{{ action('IndexController@postSave') }}',
		type:'POST',
		data:{
			id: 1,
			html: ql_html
		},
		success:function(resp) {
			// body...
			console.log("feed back html");
			console.log(resp);
			document.querySelector('.ql-Save').innerHTML = "Save"
		}
	})
}
getContentById(1);
function getContentById (id) {
	$.ajax({
		url: '{{ action('IndexController@getContent') }}',
		type:'GET',
		data:{
			id: id
		},
		success:function(resp) {
			// body...
			document.querySelector('.ql-editor').innerHTML = resp;
		}
	})
}
</script>
@stop