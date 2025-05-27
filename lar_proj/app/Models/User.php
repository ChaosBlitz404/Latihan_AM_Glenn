<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;
use Illuminate\Support\Str;

class User extends Model implements Authenticatable
{
    use AuthenticatableTrait;

    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $fillable = [
        'id',
        'username',
        'email',
        'password',
        'phone',
        'university_id',
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

            $model->approval = 'pending';
            $model->role = 'User';
        });
    }

    public function university()
    {
        return $this->belongsTo(University::class);
    }
    
    public function userFiles()
    {
        return $this->hasMany(UserFile::class,'user_id','id');
    }
}

