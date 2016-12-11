<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    //
    protected $table = 'articles';

	protected $primaryKey= 'id';

	public $timestamps=false;
    
    //除了上面指定的三个字段，用户输入的所有其他字段都会被忽略，这样就确保了我们的应用更加安全。
    protected $fillable = [
        'content',
        'status'
    ];

}
