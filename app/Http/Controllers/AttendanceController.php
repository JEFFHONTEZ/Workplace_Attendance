<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Attendance::class, 'attendance');
    }

    public function index()
    {
        $this->authorize('viewAny', Attendance::class);

        $attendances = Attendance::with('user', 'creator')->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('attendances/Index', [
            'attendances' => $attendances,
        ]);
    }

    public function create()
    {
        // Gateperson / Admin create attendance entries
        $this->authorize('create', Attendance::class);

        return Inertia::render('attendances/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Attendance::class);

        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'check_in_time' => 'nullable|date',
            'check_out_time' => 'nullable|date',
        ]);

        $data['created_by'] = auth()->id();

        Attendance::create($data);

        return redirect()->route('attendances.index');
    }

    public function show(Attendance $attendance)
    {
        $this->authorize('view', $attendance);

        return Inertia::render('attendances/Show', [
            'attendance' => $attendance->load('user', 'creator'),
        ]);
    }

    public function update(Request $request, Attendance $attendance)
    {
        $this->authorize('update', $attendance);

        $data = $request->validate([
            'check_in_time' => 'nullable|date',
            'check_out_time' => 'nullable|date',
        ]);

        $attendance->update($data);

        return redirect()->route('attendances.index');
    }

    public function destroy(Attendance $attendance)
    {
        $this->authorize('delete', $attendance);

        $attendance->delete();

        return redirect()->route('attendances.index');
    }
}
