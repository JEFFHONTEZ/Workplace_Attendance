<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'admin', 'label' => 'Administrator'],
            ['name' => 'hr', 'label' => 'HR'],
            ['name' => 'gateperson', 'label' => 'Gate Person'],
            ['name' => 'employee', 'label' => 'Employee'],
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['name' => $r['name']], $r);
        }

        // Map existing users that still have a string role (if any)
        if (Schema::hasColumn('users', 'role')) {
            foreach (User::all() as $user) {
                if (!empty($user->role)) {
                    $role = Role::where('name', $user->role)->first();
                    if ($role) {
                        $user->role_id = $role->id;
                        $user->save();
                    }
                }
            }
        }
    }
}
