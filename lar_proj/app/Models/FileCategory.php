<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileCategory extends Model
{
    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $casts = [
        'id' => 'string',
    ];

    public function userFiles()
    {
        $this -> hasMany(UserFile::class,'file_category_id','id');
    }

}
