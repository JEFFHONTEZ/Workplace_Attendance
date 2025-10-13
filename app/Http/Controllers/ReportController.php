<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Schedule;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class ReportController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        if (! $user || (! $user->isAdmin() && ! $user->isHR())) {
            abort(403);
        }
        $totalUsers = \App\Models\User::count();
        $totalEmployees = \App\Models\User::where('role', 'employee')->count();
        $attendanceToday = Attendance::whereDate('created_at', now()->toDateString())->count();
        $schedulesCount = Schedule::count();

        // Date filters with basic validation
        $validator = Validator::make(request()->query(), [
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        if ($validator->fails()) {
            abort(400, 'Invalid date parameters');
        }

        $start = request()->query('start_date') ? \Carbon\Carbon::parse(request()->query('start_date'))->startOfDay() : now()->subDays(7)->startOfDay();
        $end = request()->query('end_date') ? \Carbon\Carbon::parse(request()->query('end_date'))->endOfDay() : now()->endOfDay();

        if ($start->gt($end)) {
            abort(400, 'start_date must be before or equal to end_date');
        }

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

    /**
     * Return chart data as JSON for a given date range.
     */
    public function chart(): JsonResponse
    {
        $user = auth()->user();
        if (! $user || (! $user->isAdmin() && ! $user->isHR())) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validator = Validator::make(request()->query(), [
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid date parameters'], 400);
        }

        $start = request()->query('start_date') ? \Carbon\Carbon::parse(request()->query('start_date'))->startOfDay() : now()->subDays(7)->startOfDay();
        $end = request()->query('end_date') ? \Carbon\Carbon::parse(request()->query('end_date'))->endOfDay() : now()->endOfDay();

        if ($start->gt($end)) {
            return response()->json(['message' => 'start_date must be before or equal to end_date'], 400);
        }

        $period = new \DatePeriod($start, new \DateInterval('P1D'), $end->addDay());
        $labels = [];
        $data = [];

        foreach ($period as $date) {
            $labels[] = $date->format('Y-m-d');
            $count = Attendance::whereDate('created_at', $date->format('Y-m-d'))->count();
            $data[] = $count;
        }

        return response()->json(['labels' => $labels, 'data' => $data]);
    }
}
