<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Resource routes for the attendance system
    Route::resource('users', App\Http\Controllers\UserController::class)->except(['show']);
    Route::resource('schedules', App\Http\Controllers\ScheduleController::class);
    Route::resource('attendances', App\Http\Controllers\AttendanceController::class)->except(['edit']);
    Route::get('reports', [App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
