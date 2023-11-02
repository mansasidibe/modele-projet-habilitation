<?php

use Illuminate\Http\Request;
use App\Http\Controllers\api\PermissionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\ProfilController;
use App\Http\Controllers\api\MenuController;
use App\Http\Controllers\api\ActionController;

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

Route::group(['prefix' => '/permission'], function () {
    Route::get('all', [PermissionController::class, 'index']);
    Route::post('new', [PermissionController::class, 'store'])->withoutMiddleware("throttle:api");
    Route::get('{id}', [PermissionController::class, 'show']);
    Route::put('update', [PermissionController::class, 'update']);
    Route::delete('delete', [PermissionController::class, 'destroy']);
    Route::delete('delete_hard', [PermissionController::class, 'delete_hard'])->withoutMiddleware("throttle:api");
    Route::post('test_permission', [PermissionController::class, 'test_permission']);
});

Route::group(['prefix' => '/profil'], function () {
    Route::get('all', [ProfilController::class, 'index']);
    Route::post('new', [ProfilController::class, 'store']);
    Route::get('{id}', [ProfilController::class, 'show']);
    Route::put('update', [ProfilController::class, 'update']);
    Route::delete('delete', [ProfilController::class, 'destroy']);
    Route::post('/generate_code', [ProfilController::class, 'generate_code']);
    Route::delete('delete_hard', [ProfilController::class, 'delete_hard']);
    Route::get('/importer', [ActionController::class, 'charger_fichier']);
});

Route::group(['prefix' => '/action'], function () {
    Route::get('all', [ActionController::class, 'index']);
    Route::post('new', [ActionController::class, 'store']);
    Route::get('{id}', [ActionController::class, 'show']);
    Route::put('update', [ActionController::class, 'update']);
    Route::delete('delete', [ActionController::class, 'destroy']);
    Route::delete('delete_hard', [ActionController::class, 'delete_hard']);
});

Route::resources([
    'menu' => MenuController::class,
]);
