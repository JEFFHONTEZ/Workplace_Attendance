<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // deterministic passwords for seeded users: password
        $adminRole = Role::where('name', 'admin')->first();
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'role_id' => $adminRole?->id,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $hrRole = Role::where('name', 'hr')->first();
        User::updateOrCreate(
            ['email' => 'hr@example.com'],
            [
                'name' => 'HR User',
                'role_id' => $hrRole?->id,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $gateRole = Role::where('name', 'gateperson')->first();
        User::updateOrCreate(
            ['email' => 'gate@example.com'],
            [
                'name' => 'Gateperson User',
                'role_id' => $gateRole?->id,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // ensure at least one named employee for convenience
        $employeeRole = Role::where('name', 'employee')->first();
        User::updateOrCreate(
            ['email' => 'employee@example.com'],
            [
                'name' => 'Employee User',
                'role_id' => $employeeRole?->id,
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // create additional random employees to reach a target count (5 employees total)
        $existingEmployees = User::whereHas('role', function ($q) {
            $q->where('name', 'employee');
        })->count();
        $target = 2;
        if ($existingEmployees < $target) {
            User::factory()->count($target - $existingEmployees)->create();
        }
    }
}
