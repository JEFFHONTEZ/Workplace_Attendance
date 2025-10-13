<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isHR();
    }

    public function view(User $user, User $model): bool
    {
        return $user->isAdmin() || $user->isHR() || $user->id === $model->id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isHR();
    }

    public function update(User $user, User $model): bool
    {
        // HR cannot update Admin users
        if ($user->isHR() && $model->isAdmin()) {
            return false;
        }

        return $user->isAdmin() || $user->isHR();
    }

    public function delete(User $user, User $model): bool
    {
        // Prevent deleting admin by non-admin
        if ($model->isAdmin() && !$user->isAdmin()) {
            return false;
        }

        return $user->isAdmin() || $user->isHR();
    }
}
