<?php

namespace Tests\Unit;

use App\Models\User;
use App\Policies\UserPolicy;
use PHPUnit\Framework\TestCase;

class UserPolicyTest extends TestCase
{
    public function test_hr_cannot_update_admin()
    {
    $hr = new User();
    $hr->setRelation('role', new \App\Models\Role(['name' => 'hr']));
    $admin = new User();
    $admin->setRelation('role', new \App\Models\Role(['name' => 'admin']));

        $policy = new UserPolicy();

        $this->assertFalse($policy->update($hr, $admin));
    }

    public function test_admin_can_update_hr()
    {
    $admin = new User();
    $admin->setRelation('role', new \App\Models\Role(['name' => 'admin']));
    $hr = new User();
    $hr->setRelation('role', new \App\Models\Role(['name' => 'hr']));

        $policy = new UserPolicy();

        $this->assertTrue($policy->update($admin, $hr));
    }
}
