<?php

use App\Http\Api\AuthController;
use App\Http\Api\PongController;
use App\Http\Api\UsersController;
use App\Models\Users;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('no-token')->get('/ping', [PongController::class, 'index']);

Route::middleware('no-token')->get('/auth', [AuthController::class, 'view']);
Route::middleware('no-token')->post('/auth', [AuthController::class, 'create']);
Route::middleware('no-token')->delete('/auth', [AuthController::class, 'delete']);

Route::middleware('with-token')->get('/users', [UsersController::class, 'index']);
Route::middleware('with-token')->post('/users', [UsersController::class, 'create']);
Route::middleware('with-token')->get('/users/{id}', [UsersController::class, 'view']);
Route::middleware('with-token')->put('/users/{id}', [UsersController::class, 'update']);
Route::middleware('with-token')->delete('/users/{id}', [UsersController::class, 'delete']);

