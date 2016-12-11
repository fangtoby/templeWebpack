<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
//载入数据model
<<<<<<< HEAD
use App\Http\Models\Articles;
=======
use App\Http\Models\History;
>>>>>>> 33cf02965a22730bcfa36f5ef3404e6f5a67446e

class IndexController extends Controller
{
    //
<<<<<<< HEAD
	public function getIndex()
	{

		return view("index.index");
	}

	public function getShow()
	{
		return view("index.detail");
	}

	public function getEdit()
	{
		# code...
		return view("index.edit");
	}

	public function postSave()
	{
		# code...
		$content = $_REQUEST['html'];
		if($_REQUEST['id']){
			$model=Articles::find($_REQUEST['id']);
			$model->content = $content;
			$bool = $model->save();
		}else{
			$model = new Articles();
			$model->content = $content;
			$model->status = 0;
			$bool = $model->save();
		}
		echo $bool;
		// return view("index.index");
	}
	public function getContent()
	{
		# code...
		$id = $_REQUEST['id'];
		$model=Articles::find($id);

		return $model->content;
	}
=======
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
	
>>>>>>> 33cf02965a22730bcfa36f5ef3404e6f5a67446e
}
































