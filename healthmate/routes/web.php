<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Users\UserDetailsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Users\UserHealthDetailsController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

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
});

Route::middleware(['auth'])->group(function () {
    Route::get('/user/details', [UserDetailsController::class, 'show'])->name('user.details');
    Route::post('/user/details/update', [UserDetailsController::class, 'update'])->name('user.details.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/user/health/details/update', [UserHealthDetailsController::class, 'update'])->name('user.health.details.update');
    Route::get('/user/health/details', [UserHealthDetailsController::class, 'show'])->name('user.health.details');
});

require __DIR__.'/auth.php';
