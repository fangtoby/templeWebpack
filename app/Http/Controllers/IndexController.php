<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
//载入数据model
// use App\Http\Models\History;

class IndexController extends Controller
{
    //
	public function index()
	{
		// $data = History::all();使用model查询数据
	 //    echo $data;
	 //    exit;
		return view("index.index",[]);
	}

	public function create()
	{
		# code...
		return view("index.detail");
	}

	public function edit($index)
	{
		# code...
		return view("index.detail");
	}
	
}
