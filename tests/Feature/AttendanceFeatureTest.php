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
        $gate = User::factory()->create(['role' => 'gateperson']);
        $employee = User::factory()->create(['role' => 'employee']);

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
        $employee = User::factory()->create(['role' => 'employee']);
        $other = User::factory()->create(['role' => 'employee']);

        $this->actingAs($employee)
            ->post(route('attendances.store'), [
                'user_id' => $other->id,
                'check_in_time' => now()->toDateTimeString(),
            ])
            ->assertStatus(403);
    }
}
