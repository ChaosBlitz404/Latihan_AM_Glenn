<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class University extends Model
{
        public $incrementing = false; 
        protected $keyType = 'string'; 
    
        protected $casts = [
            'id' => 'string',
        ];
}
