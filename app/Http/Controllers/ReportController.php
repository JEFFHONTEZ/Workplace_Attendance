<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Schedule;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        if (! Gate::allows('view-reports')) {
            abort(403);
        }

        $totalUsers = \App\Models\User::count();
        $totalEmployees = \App\Models\User::where('role', 'employee')->count();
        $attendanceToday = Attendance::whereDate('created_at', now()->toDateString())->count();
        $schedulesCount = Schedule::count();

        return Inertia::render('reports/Index', [
            'totalUsers' => $totalUsers,
            'totalEmployees' => $totalEmployees,
            'attendanceToday' => $attendanceToday,
            'schedulesCount' => $schedulesCount,
        ]);
    }
}
