<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Http\Controllers\TacheController;
use App\Http\Controllers\UserController;



//Route::post('/inscription', [AuthController::class, 'inscription'])->name('inscription');
//Route::post('/connexion', [AuthController::class, 'connexion'])->name('connexion');

Route::get('/', function () {
    return view('index');
});

Route::get('/dashboard', function () {
    return view('mon-dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/fonctionnalites', function () {
    return view('fonctionnalites'); 
});

Route::get('/tarif', function () {
    return view('tarif'); 
});

Route::get('/contact', function () {
    return view('contact'); 
});

Route::get('/conditions-utilisation', function () {
    return view('conditions-utilisation');
});

Route::get('/politique-confidentialite', function () {
    return view('politique-confidentialite');
});

Route::get('/a-propos', function () {
    return view('a-propos'); 
});

Route::get('/overlay/connect', function () {
    return view('partials.overlay-connect');
});

Route::get('/overlay/inscription', function () {
    return view('partials.overlay-inscription');
});

Route::get('/overlay/payment', function () {
    return view('partials.overlay-payment');
});

// Route Dashboard

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/taches', [TacheController::class, 'index']);
    Route::post('/taches', [TacheController::class, 'store']);
    Route::put('/taches/{id}', [TacheController::class, 'update']);
    Route::delete('/taches/{id}', [TacheController::class, 'destroy']);
});

//Route::post('/parametres/avatar', [UserController::class, 'uploadAvatar'])->name('user.avatar.upload');

//Route::get('/parametres', [UserController::class, 'settings'])->name('user.settings');

Route::middleware([App\Http\Middleware\IsAdmin::class, 'auth'])->group(function () {
    Route::get('/parametres', [UserController::class, 'settings'])->name('user.settings');
    Route::post('/parametres/avatar', [UserController::class, 'uploadAvatar'])->name('user.avatar.upload');
});

Route::post('/logout', [Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');

require __DIR__.'/auth.php';
