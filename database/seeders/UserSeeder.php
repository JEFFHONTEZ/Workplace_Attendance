<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // deterministic passwords for seeded users: password
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'HR User',
            'email' => 'hr@example.com',
            'role' => 'hr',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        User::factory()->create([
            'name' => 'Gateperson User',
            'email' => 'gate@example.com',
            'role' => 'gateperson',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);

        // create multiple employees for richer demo data
        User::factory()->count(5)->create();

        // ensure at least one named employee for convenience
        User::factory()->create([
            'name' => 'Employee User',
            'email' => 'employee@example.com',
            'role' => 'employee',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
        ]);
    }
}
