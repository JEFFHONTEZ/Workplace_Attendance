<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AttendanceFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_gateperson_can_create_attendance()
    {
    $gateRole = \App\Models\Role::create(['name' => 'gateperson']);
    $employeeRole = \App\Models\Role::create(['name' => 'employee']);

    $gate = User::factory()->create(['role_id' => $gateRole->id]);
    $employee = User::factory()->create(['role_id' => $employeeRole->id]);

        $this->actingAs($gate)
            ->post(route('attendances.store'), [
                'user_id' => $employee->id,
                'check_in_time' => now()->toDateTimeString(),
            ])
            ->assertRedirect(route('attendances.index'));

        $this->assertDatabaseHas('attendances', ['user_id' => $employee->id]);
    }

    public function test_employee_cannot_create_attendance()
    {
    $employeeRole = \App\Models\Role::firstOrCreate(['name' => 'employee']);
    $employee = User::factory()->create(['role_id' => $employeeRole->id]);
    $other = User::factory()->create(['role_id' => $employeeRole->id]);

        $this->actingAs($employee)
            ->post(route('attendances.store'), [
                'user_id' => $other->id,
                'check_in_time' => now()->toDateTimeString(),
            ])
            ->assertStatus(403);
    }
}
