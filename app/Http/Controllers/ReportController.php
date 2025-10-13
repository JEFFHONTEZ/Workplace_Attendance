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

        // Date filters
        $start = request()->query('start_date') ? \Carbon\Carbon::parse(request()->query('start_date'))->startOfDay() : now()->subDays(7)->startOfDay();
        $end = request()->query('end_date') ? \Carbon\Carbon::parse(request()->query('end_date'))->endOfDay() : now()->endOfDay();

        // Build daily counts for chart
        $period = new \DatePeriod($start, new \DateInterval('P1D'), $end->addDay());
        $labels = [];
        $data = [];

        foreach ($period as $date) {
            $labels[] = $date->format('Y-m-d');
            $count = Attendance::whereDate('created_at', $date->format('Y-m-d'))->count();
            $data[] = $count;
        }

        return Inertia::render('reports/Index', [
            'totalUsers' => $totalUsers,
            'totalEmployees' => $totalEmployees,
            'attendanceToday' => $attendanceToday,
            'schedulesCount' => $schedulesCount,
            'chart' => [
                'labels' => $labels,
                'data' => $data,
            ],
            'start_date' => $start->toDateString(),
            'end_date' => $end->toDateString(),
        ]);
    }
}
