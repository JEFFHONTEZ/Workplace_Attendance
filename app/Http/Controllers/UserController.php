<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    public function index()
    {
        $this->authorize('viewAny', User::class);

        $users = User::orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('users/Index', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        $this->authorize('create', User::class);

        return Inertia::render('users/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,hr,gateperson,employee',
        ]);

    $data['password'] = bcrypt($data['password']);
    $user = User::create($data);

        return redirect()->route('users.index');
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user);

        return Inertia::render('users/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|string|in:admin,hr,gateperson,employee',
        ]);

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->input('password'));
        }

        $user->update($data);

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return redirect()->route('users.index');
    }
}
