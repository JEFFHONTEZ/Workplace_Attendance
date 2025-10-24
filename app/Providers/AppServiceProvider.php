<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share authenticated user information with Inertia so the frontend can
        // render role-aware UI. We include id, name, email and role.
        if (class_exists(\Inertia\Inertia::class)) {
            \Inertia\Inertia::share([
                'auth' => function () {
                    $user = auth()->user();

                    if (! $user) {
                        return ['user' => null];
                    }

                    return [
                        'user' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'role' => $user->role?->name ?? 'employee',
                            'role_label' => $user->role?->label ?? $user->role?->name ?? 'employee',
                            'created_at' => $user->created_at?->toDateTimeString(),
                            'updated_at' => $user->updated_at?->toDateTimeString(),
                        ],
                    ];
                },
            ]);
        }
    }
}
