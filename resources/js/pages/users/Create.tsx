import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function UsersCreate() {
    return (
        <AppLayout>
            <Head title="Create User" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Create User</h2>
                <form method="post" action={route('users.store')}> 
                    <div className="grid gap-2">
                        <input name="name" placeholder="Name" className="input" />
                        <input name="email" placeholder="Email" className="input" />
                        <input name="password" placeholder="Password" className="input" />
                        <select name="role" className="input">
                            <option value="employee">Employee</option>
                            <option value="gateperson">Gateperson</option>
                            <option value="hr">HR</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button className="btn">Create</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
