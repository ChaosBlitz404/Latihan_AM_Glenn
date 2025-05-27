<?php

use App\Http\Controllers\Api\FileCategoryController;
use App\Http\Controllers\Api\UniController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/users', [UserController::class, 'index']);

Route::get('/uni', [UniController::class, 'index']);

Route::get('/files',[FileCategoryController::class,'index']);

Route::post('/registration',[UserController::class,'store']);

Route::post('/logout',[UserController::class,'logout']);

Route::post('/auth',[UserController::class,'authenticate']);

Route::put('/update/{user}', [UserController::class, 'change']);

Route::get('/users/{user}', [UserController::class, 'show']);
