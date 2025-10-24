<?php

namespace Tests\Unit;

use App\Models\Attendance;
use App\Models\User;
use App\Policies\AttendancePolicy;
use PHPUnit\Framework\TestCase;

class AttendancePolicyTest extends TestCase
{
    public function test_gateperson_can_create()
    {
    $g = new User();
    $g->setRelation('role', new \App\Models\Role(['name' => 'gateperson']));
        $policy = new AttendancePolicy();

        $this->assertTrue($policy->create($g));
    }

    public function test_employee_cannot_create()
    {
    $e = new User();
    $e->setRelation('role', new \App\Models\Role(['name' => 'employee']));
        $policy = new AttendancePolicy();

        $this->assertFalse($policy->create($e));
    }
}
