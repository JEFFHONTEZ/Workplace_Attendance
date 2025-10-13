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

        foreach ($employees as $e) {
            Attendance::create([
                'user_id' => $e->id,
                'check_in_time' => now()->subHours(rand(1, 8)),
                'check_out_time' => now()->subHours(rand(0, 1)),
                'created_by' => User::where('role', 'gateperson')->first()?->id,
            ]);
        }
    }
}
