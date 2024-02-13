<?php

use App\Http\Api\AuthController;
use App\Http\Api\PongController;
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
Route::middleware('no-token')->post('/auth', [AuthController::class, 'create']);

// Route::middleware('api-admin')->post('/token', [TokenController::class, 'create']);
// Route::middleware('api-admin-token')->get('/auth', [AuthController::class, 'detail']);
