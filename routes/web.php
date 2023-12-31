<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfilController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\MenuController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('/test_permission', [PermissionController::class, 'test_permission'])->name('test_permission');

Route::resources([
    'profil' => ProfilController::class,
    'menu' => MenuController::class,
]);

Route::get('habilitation_menu', [MenuController::class, 'habilitation_user_menus2']);