<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScheduleManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_hr_can_create_schedule()
    {
    $hrRole = \App\Models\Role::create(['name' => 'hr']);
    $employeeRole = \App\Models\Role::create(['name' => 'employee']);

    $hr = User::factory()->create(['role_id' => $hrRole->id]);
    $employee = User::factory()->create(['role_id' => $employeeRole->id]);

        $this->actingAs($hr)
            ->post(route('schedules.store'), [
                'role_id' => $employee->role_id,
                'shift_name' => 'Evening',
                'start_time' => '14:00:00',
                'end_time' => '22:00:00',
            ])
            ->assertRedirect(route('schedules.index'));

    $this->assertDatabaseHas('schedules', ['role_id' => $employee->role_id, 'shift_name' => 'Evening']);
    }
}
