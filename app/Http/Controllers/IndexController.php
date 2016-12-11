<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
//载入数据model
use App\Http\Models\Articles;

class IndexController extends Controller
{
    //
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
}
































