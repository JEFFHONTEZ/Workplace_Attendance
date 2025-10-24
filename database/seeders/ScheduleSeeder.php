<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $employees = User::whereHas('role', function ($q) {
            $q->where('name', 'employee');
        })->get();

        foreach ($employees as $e) {
            Schedule::create([
                'role_id' => $e->role_id,
                'shift_name' => 'Day Shift',
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
            ]);
        }
    }
}
