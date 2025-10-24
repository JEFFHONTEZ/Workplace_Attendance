<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_user()
    {
        $adminRole = \App\Models\Role::create(['name' => 'admin']);
        $employeeRole = \App\Models\Role::create(['name' => 'employee']);
        $admin = User::factory()->create(['role_id' => $adminRole->id]);

        $this->actingAs($admin)
            ->post(route('users.store'), [
                'name' => 'New Employee',
                'email' => 'new@example.com',
                'password' => 'password',
                'role_id' => $employeeRole->id,
            ])
            ->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', ['email' => 'new@example.com']);
    }
}
