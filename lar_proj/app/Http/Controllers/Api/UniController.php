<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\University;
use Illuminate\Http\Request;

class UniController extends Controller
{
    public function index()
    {
        return response()->json(University::all());
    }
}
