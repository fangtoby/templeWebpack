<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
//载入数据model
use App\Http\Models\History;

class IndexController extends Controller
{
    //
	public function index()
	{
		// $data = History::all();使用model查询数据
	 	// echo $data;
	 	// exit;

		// // select * from articles where id = 1;
		// $article = App\Article::find(1);

		// $article->toArray();

		// // select * from articles where body = 'Lorem ipsum';
		// //find
		// $article = App\Article::where('body', 'Lorem ipsum')->get();
		// //find
		// $article = App\Article::where('body', 'Lorem ipsum')->first();
		// //add
		// $article = App\Article::create(['title' => 'New Article', 'body' => 'New Body', 'published_at' => Carbon\Carbon::now()]);

		$results = History::all();

		return view("index.index",compact("results"));
	}

	public function show($id)
	{
		$result = History::find($id);
		if(is_null($result)){
			abort(404);
		}
		// $results = History::findOrFail($id);

		return view("index.detail",compact("result"));
	}

	public function edit($index)
	{
		# code...
		return view("index.detail");
	}
	
}
































