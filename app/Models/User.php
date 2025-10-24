<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        // two-factor fields removed
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Determine if user has a given role.
     */
    public function hasRole(string $role): bool
    {
        // Support both the new Role relation and the legacy string `role` attribute.
        // If the relation is loaded or set as a Role model instance, compare its name.
        if ($this->role instanceof \App\Models\Role) {
            return $this->role->name === $role;
        }

        // If the legacy `role` string column is still present or populated, compare that.
        $attrRole = $this->getAttribute('role');
        if (is_string($attrRole) && $attrRole !== '') {
            return $attrRole === $role;
        }

        // As a fallback, if role_id is present, attempt to lazy-load the Role and compare.
        if ($this->role_id) {
            $r = $this->role()->getResults();
            return $r?->name === $role;
        }

        return false;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole('admin');
    }

    public function isHR(): bool
    {
        return $this->hasRole('hr');
    }

    public function isGateperson(): bool
    {
        return $this->hasRole('gateperson');
    }

    public function isEmployee(): bool
    {
        return $this->hasRole('employee');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
