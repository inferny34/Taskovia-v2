<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Routes pour la gestion des tâches (API utilisée par dashboard.js)
    Route::get('/taches', [App\Http\Controllers\TacheController::class, 'index'])->name('taches.index');
    Route::post('/taches', [App\Http\Controllers\TacheController::class, 'store'])->name('taches.store');
    Route::put('/taches/{id}', [App\Http\Controllers\TacheController::class, 'update'])->name('taches.update');
    Route::delete('/taches/{id}', [App\Http\Controllers\TacheController::class, 'destroy'])->name('taches.destroy');

    // Route pour le dashboard legacy (Blade + jQuery)
    Route::get('/mon-dashboard', function () {
        return view('mon-dashboard');
    })->name('mon-dashboard');

    // Routes pour les paramètres utilisateur
    Route::get('/user/settings', [App\Http\Controllers\UserController::class, 'settings'])->name('user.settings');
    Route::post('/user/avatar', [App\Http\Controllers\UserController::class, 'uploadAvatar'])->name('user.avatar');
});

require __DIR__ . '/auth.php';
