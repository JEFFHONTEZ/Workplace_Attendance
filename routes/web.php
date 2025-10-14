<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/search-employee', [App\Http\Controllers\DashboardController::class, 'searchEmployee'])->name('dashboard.search');
    Route::post('dashboard/toggle-signin', [App\Http\Controllers\DashboardController::class, 'toggleSignin'])->name('dashboard.toggle_signin');

    // Resource routes for the attendance system
    Route::resource('users', App\Http\Controllers\UserController::class)->except(['show']);
    Route::resource('schedules', App\Http\Controllers\ScheduleController::class);
    Route::resource('attendances', App\Http\Controllers\AttendanceController::class)->except(['edit']);
    Route::get('reports', [App\Http\Controllers\ReportController::class, 'index'])->name('reports.index');
    Route::get('reports/chart', [App\Http\Controllers\ReportController::class, 'chart'])->name('reports.chart');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
