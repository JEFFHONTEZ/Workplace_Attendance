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

                    // Provide role information whether it's stored as a relation or legacy string.
                    $roleName = null;
                    $roleLabel = null;

                    if ($user->role instanceof \App\Models\Role) {
                        $roleName = $user->role->name;
                        $roleLabel = $user->role->label ?? $user->role->name;
                    } else {
                        $roleName = is_string($user->getAttribute('role')) ? $user->getAttribute('role') : ($user->role_id ? optional($user->role()->getResults())->name : null);
                        $roleLabel = $roleName;
                    }

                    return [
                        'user' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'role' => $roleName ?? 'employee',
                            'role_label' => $roleLabel ?? ($roleName ?? 'employee'),
                            'created_at' => $user->created_at?->toDateTimeString(),
                            'updated_at' => $user->updated_at?->toDateTimeString(),
                        ],
                    ];
                },
            ]);
        }
    }
}
