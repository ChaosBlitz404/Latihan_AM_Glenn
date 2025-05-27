<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FileCategory;
use Illuminate\Http\Request;

class FileCategoryController extends Controller
{
    public function index()
    {
        return response()->json(FileCategory::all());
    }
}
