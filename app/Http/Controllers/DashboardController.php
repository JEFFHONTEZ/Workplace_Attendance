<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // Provide common stats
        $totalEmployees = User::where('role', 'employee')->count();
        $presentToday = Attendance::whereDate('created_at', now()->toDateString())->whereNotNull('check_in_time')->count();
        $lateArrivals = Attendance::whereDate('created_at', now()->toDateString())->whereNotNull('check_in_time')
            ->whereTime('check_in_time', '>', '09:00:00')
            ->count();
        $absentToday = max(0, $totalEmployees - $presentToday);

        // Build weekly attendance trends (present/late/absent by weekday)
        $weekStart = now()->startOfWeek();
        $labels = [];
        $weekly = [];
        for ($i = 0; $i < 7; $i++) {
            $day = $weekStart->copy()->addDays($i);
            $labels[] = $day->format('l');
            $present = Attendance::whereDate('created_at', $day->toDateString())->whereNotNull('check_in_time')->count();
            $late = Attendance::whereDate('created_at', $day->toDateString())->whereNotNull('check_in_time')->whereTime('check_in_time', '>', '09:00:00')->count();
            $absent = max(0, $totalEmployees - $present);
            $weekly[] = ['date' => $day->toDateString(), 'present' => $present, 'late' => $late, 'absent' => $absent];
        }

        // Department distribution (we'll approximate by role for now)
        $departments = User::select('role', \DB::raw('count(*) as total'))->groupBy('role')->get()->map(function ($r) {
            return ['name' => $r->role, 'count' => $r->total];
        })->values();

        // Gateperson data: currently signed in
        $signedIn = Attendance::whereNull('check_out_time')->with('user')->get()->map(function ($a) {
            return ['id' => $a->user->id ?? null, 'name' => $a->user->name ?? 'Unknown', 'check_in_time' => $a->check_in_time];
        });

        // Employee specific data: last checkin and history (small sample)
        $employeeHistory = [];
        if ($user && $user->isEmployee()) {
            $history = Attendance::where('user_id', $user->id)->orderBy('created_at', 'desc')->limit(14)->get();
            $employeeHistory = $history->map(function ($h) {
                return [
                    'date' => $h->created_at->toDateString(),
                    'check_in_time' => $h->check_in_time?->toTimeString(),
                    'check_out_time' => $h->check_out_time?->toTimeString(),
                    'status' => $h->check_in_time ? 'present' : 'absent',
                ];
            });
        }

        // Render role-aware dashboard component
        return Inertia::render('dashboard', [
            'role' => $user?->role ?? 'employee',
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'presentToday' => $presentToday,
                'lateArrivals' => $lateArrivals,
                'absentToday' => $absentToday,
            ],
            'weekly' => $weekly,
            'weekLabels' => $labels,
            'departments' => $departments,
            'signedIn' => $signedIn,
            'employeeHistory' => $employeeHistory,
        ]);
    }

    /**
     * Simple API for gateperson to search employee by query
     */
    public function searchEmployee(Request $request)
    {
        $q = $request->query('q');
        $results = User::where('role', 'employee')
            ->when($q, fn($qB) => $qB->where(function ($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")->orWhere('email', 'like', "%{$q}%")->orWhere('id', $q);
            }))
            ->limit(10)
            ->get(['id', 'name', 'email']);

        return response()->json($results);
    }

    /**
     * Sign in or sign out an employee (gateperson action)
     */
    public function toggleSignin(Request $request)
    {
        $request->validate(['user_id' => 'required|exists:users,id', 'action' => 'required|in:in,out']);

        $userId = $request->input('user_id');
        $action = $request->input('action');

        if ($action === 'in') {
            $attendance = Attendance::create(['user_id' => $userId, 'check_in_time' => now(), 'created_by' => auth()->id()]);
            return response()->json(['status' => 'signed_in', 'attendance_id' => $attendance->id]);
        }

        // sign out: find latest attendance without check_out_time
        $attendance = Attendance::where('user_id', $userId)->whereNull('check_out_time')->orderBy('created_at', 'desc')->first();
        if ($attendance) {
            $attendance->update(['check_out_time' => now()]);
            return response()->json(['status' => 'signed_out']);
        }

        return response()->json(['status' => 'not_found'], 404);
    }
}
