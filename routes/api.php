<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\convertController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TimeLimitController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/convert', [convertController::class, 'convert']);

Route::post('/store', [QuestionController::class, 'store']);

Route::post('/update', [QuestionController::class, 'update']);

Route::post('/delete', [QuestionController::class, 'delete']);

Route::post('/time-limit', [TimeLimitController::class, 'store']);
