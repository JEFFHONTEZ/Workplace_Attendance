<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Schedule;

class SchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isHR();
    }

    public function view(User $user, Schedule $schedule): bool
    {
        // Admin and HR can view any schedule. Otherwise allow if user's role matches the schedule's role.
        return $user->isAdmin() || $user->isHR() || ($user->role_id !== null && $schedule->role_id === $user->role_id);
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isHR();
    }

    public function update(User $user, Schedule $schedule): bool
    {
        return $user->isAdmin() || $user->isHR();
    }

    public function delete(User $user, Schedule $schedule): bool
    {
        return $user->isAdmin() || $user->isHR();
    }
}
