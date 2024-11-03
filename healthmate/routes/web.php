<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Users\UserDetailsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\UserHealthDetailsController;
use App\Http\Controllers\MedicineHistoryController;
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
    $activities = \App\Models\Activities::all(); // Fetch activities from the database
    return Inertia::render('Dashboard', [
        'activities' => $activities,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::resource('activities', ActivityController::class);
Route::apiResource('activities', ActivityController::class);
Route::apiResource('user-health-details', UserHealthDetailsController::class);
Route::apiResource('medicine-history', MedicineHistoryController::class);

Route::middleware(['auth'])->group(function () {
    Route::get('/user/details', [UserDetailsController::class, 'show'])->name('user.details');
    Route::post('/user/details/update', [UserDetailsController::class, 'update'])->name('user.details.update');
});

require __DIR__.'/auth.php';
