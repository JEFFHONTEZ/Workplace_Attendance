<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Attendance;

class AttendancePolicy
{
    public function viewAny(User $user): bool
    {
        // Admin and HR can view all attendances; users can view their own
        return $user->isAdmin() || $user->isHR() || $user->isGateperson();
    }

    public function view(User $user, Attendance $attendance): bool
    {
        return $user->isAdmin() || $user->isHR() || $attendance->user_id === $user->id || $user->isGateperson();
    }

    public function create(User $user): bool
    {
        // Only Admin and Gateperson can create attendance logs
        return $user->isAdmin() || $user->isGateperson();
    }

    public function update(User $user, Attendance $attendance): bool
    {
        return $user->isAdmin() || $user->isGateperson();
    }

    public function delete(User $user, Attendance $attendance): bool
    {
        return $user->isAdmin();
    }
}
