<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

class TrimStrings extends Middleware
{
    protected $except = [
        // Add any fields you don't want trimmed (e.g. 'password')
    ];
}
