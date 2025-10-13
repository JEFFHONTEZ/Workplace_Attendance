<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $employees = User::where('role', 'employee')->get();
        $gate = User::where('role', 'gateperson')->first();

        // For the last 14 days, create attendances for each employee
        $days = 14;
        for ($d = 0; $d < $days; $d++) {
            $date = now()->subDays($d)->startOfDay();

            foreach ($employees as $e) {
                // randomize whether the employee attended that day (90% chance)
                if (rand(1, 100) > 90) {
                    continue;
                }

                $checkIn = (clone $date)->addHours(9)->addMinutes(rand(-30, 60));
                $checkOut = (clone $date)->addHours(17)->addMinutes(rand(-60, 90));

                Attendance::create([
                    'user_id' => $e->id,
                    'check_in_time' => $checkIn,
                    'check_out_time' => $checkOut,
                    'created_by' => $gate?->id,
                    'created_at' => $checkIn,
                    'updated_at' => $checkOut,
                ]);
            }
        }
    }
}
