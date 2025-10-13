<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Schedule;

class SchedulePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isHR() || $user->id === $user->id;
    }

    public function view(User $user, Schedule $schedule): bool
    {
        return $user->isAdmin() || $user->isHR() || $schedule->user_id === $user->id;
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
