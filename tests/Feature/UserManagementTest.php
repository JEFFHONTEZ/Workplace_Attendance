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
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->post(route('users.store'), [
                'name' => 'New Employee',
                'email' => 'new@example.com',
                'password' => 'password',
                'role' => 'employee',
            ])
            ->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', ['email' => 'new@example.com']);
    }
}
