<?php

use App\Http\Api\AuthController;
use App\Http\Api\CustomersController;
use App\Http\Api\PongController;
use App\Http\Api\ProductsController;
use App\Http\Api\UsersController;
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

Route::middleware('with-token')->get('/customers', [CustomersController::class, 'index']);
Route::middleware('with-token')->post('/customers', [CustomersController::class, 'create']);
Route::middleware('with-token')->get('/customers/{id}', [CustomersController::class, 'view']);
Route::middleware('with-token')->put('/customers/{id}', [CustomersController::class, 'update']);
Route::middleware('with-token')->delete('/customers/{id}', [CustomersController::class, 'delete']);

Route::middleware('with-token')->get('/products', [ProductsController::class, 'index']);
Route::middleware('with-token')->post('/products', [ProductsController::class, 'create']);
Route::middleware('with-token')->get('/products/{id}', [ProductsController::class, 'view']);
Route::middleware('with-token')->put('/products/{id}', [ProductsController::class, 'update']);
Route::middleware('with-token')->delete('/products/{id}', [ProductsController::class, 'delete']);

