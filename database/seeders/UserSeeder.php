<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'HR User',
            'email' => 'hr@example.com',
            'role' => 'hr',
        ]);

        User::factory()->create([
            'name' => 'Gateperson User',
            'email' => 'gate@example.com',
            'role' => 'gateperson',
        ]);

        User::factory()->create([
            'name' => 'Employee User',
            'email' => 'employee@example.com',
            'role' => 'employee',
        ]);
    }
}
