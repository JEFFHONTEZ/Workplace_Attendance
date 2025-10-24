<?php

namespace Tests\Feature;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReportControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_chart_api_returns_counts_for_date_range()
    {
    // seed roles and users
    $adminRole = \App\Models\Role::create(['name' => 'admin']);
    $employeeRole = \App\Models\Role::create(['name' => 'employee']);

    $admin = User::factory()->create(['role_id' => $adminRole->id]);
    $employee = User::factory()->create(['role_id' => $employeeRole->id]);

        // create attendances: one today, one 2 days ago
        Attendance::create([
            'user_id' => $employee->id,
            'check_in_time' => now()->startOfDay()->addHours(9),
            'check_out_time' => now()->startOfDay()->addHours(17),
            'created_by' => $admin->id,
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
        ]);

        Attendance::create([
            'user_id' => $employee->id,
            'check_in_time' => now()->subDays(2)->startOfDay()->addHours(9),
            'check_out_time' => now()->subDays(2)->startOfDay()->addHours(17),
            'created_by' => $admin->id,
            'created_at' => now()->subDays(2)->toDateTimeString(),
            'updated_at' => now()->subDays(2)->toDateTimeString(),
        ]);

        // act as admin
        $this->actingAs($admin)
            ->getJson('/reports/chart?start_date=' . now()->subDays(3)->toDateString() . '&end_date=' . now()->toDateString())
            ->assertStatus(200)
            ->assertJsonStructure(['labels', 'data'])
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('labels')->has('data')
            );
    }
}
