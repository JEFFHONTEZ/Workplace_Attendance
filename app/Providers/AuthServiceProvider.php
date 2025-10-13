<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Attendance;
use App\Models\Schedule;
use App\Policies\UserPolicy;
use App\Policies\AttendancePolicy;
use App\Policies\SchedulePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Attendance::class => AttendancePolicy::class,
        Schedule::class => SchedulePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Additional gates if needed
        Gate::define('view-reports', function (User $user) {
            return $user->isAdmin() || $user->isHR();
        });
    }
}
