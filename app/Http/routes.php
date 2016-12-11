<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});
/*
Route::controller('users', 'UserController');
Would lead you to set up the controller with a sort of RESTful naming scheme:

class UserController extends BaseController {

    public function getIndex()
    {
        // GET request to index
    }

    public function getShow($id)
    {
        // get request to 'users/show/{id}'
    }

    public function postStore()
    {
        // POST request to 'users/store'
    }

}
*/
Route::controller('index','IndexController');
//移动数据测试
/*
Route::resource('users', 'UsersController');
Gives you these named routes:

Verb    Path                        Action  Route Name
GET     /users                      index   users.index
GET     /users/create               create  users.create
POST    /users                      store   users.store
GET     /users/{user}               show    users.show
GET     /users/{user}/edit          edit    users.edit
PUT     /users/{user}               update  users.update
DELETE  /users/{user}               destroy users.destroy
And you would set up your controller something like this (actions = methods)

class UsersController extends BaseController {

    public function index() {}

    public function show($id) {}

    public function store() {}

}
You can also choose what actions are included or excluded like this:

Route::resource('users', 'UsersController', [
    'only' => ['index', 'show']
]);

Route::resource('monkeys', 'MonkeysController', [
    'except' => ['edit', 'create']
]);
*/
//移动数据测试
Route::resource('yd','YdController');
//联通数据测试
Route::resource('lt','LtController');
Route::resource('pay','PayController');
Route::resource('user','UserController');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
