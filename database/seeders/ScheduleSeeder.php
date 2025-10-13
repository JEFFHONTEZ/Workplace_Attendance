<?php

namespace Database\Seeders;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $employees = User::where('role', 'employee')->get();

        foreach ($employees as $i => $e) {
            Schedule::create([
                'user_id' => $e->id,
                'shift_name' => 'Day Shift',
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
            ]);
        }
    }
}
