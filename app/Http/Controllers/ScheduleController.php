<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Schedule::class, 'schedule');
    }

    public function index()
    {
        $this->authorize('viewAny', Schedule::class);

        $schedules = Schedule::with('user')->orderBy('start_time')->paginate(20);

        return Inertia::render('schedules/Index', [
            'schedules' => $schedules,
        ]);
    }

    public function create()
    {
        $this->authorize('create', Schedule::class);

        return Inertia::render('schedules/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', Schedule::class);

        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shift_name' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        Schedule::create($data);

        return redirect()->route('schedules.index');
    }

    public function show(Schedule $schedule)
    {
        $this->authorize('view', $schedule);

        return Inertia::render('schedules/Show', [
            'schedule' => $schedule->load('user'),
        ]);
    }

    public function edit(Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        return Inertia::render('schedules/Edit', [
            'schedule' => $schedule,
        ]);
    }

    public function update(Request $request, Schedule $schedule)
    {
        $this->authorize('update', $schedule);

        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'shift_name' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        $schedule->update($data);

        return redirect()->route('schedules.index');
    }

    public function destroy(Schedule $schedule)
    {
        $this->authorize('delete', $schedule);

        $schedule->delete();

        return redirect()->route('schedules.index');
    }
}
