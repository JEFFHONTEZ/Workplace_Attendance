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
        $hr = User::factory()->create(['role' => 'hr']);
        $employee = User::factory()->create(['role' => 'employee']);

        $this->actingAs($hr)
            ->post(route('schedules.store'), [
                'user_id' => $employee->id,
                'shift_name' => 'Evening',
                'start_time' => '14:00:00',
                'end_time' => '22:00:00',
            ])
            ->assertRedirect(route('schedules.index'));

        $this->assertDatabaseHas('schedules', ['user_id' => $employee->id, 'shift_name' => 'Evening']);
    }
}
