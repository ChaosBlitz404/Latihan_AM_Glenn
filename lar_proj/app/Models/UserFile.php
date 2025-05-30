<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class UserFile extends Model
{

    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $fillable = [
        'id',
        'user_id',
        'file_category_id',
        'file_url'
    ];

    protected $casts = [
        'id' => 'string',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function fileCategory()
    {
        return $this->belongsTo(FileCategory::class,'file_category_id','id');
    }
}
