import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function UsersEdit({ user }: { user: any }) {
    return (
        <AppLayout>
            <Head title="Edit User" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Edit User</h2>
                <form method="post" action={route('users.update', user.id)}>
                    <input type="hidden" name="_method" value="put" />
                    <div className="grid gap-2">
                        <input name="name" defaultValue={user.name} className="input" />
                        <input name="email" defaultValue={user.email} className="input" />
                        <input name="password" placeholder="Leave blank to keep" className="input" />
                        <select name="role" defaultValue={user.role} className="input">
                            <option value="employee">Employee</option>
                            <option value="gateperson">Gateperson</option>
                            <option value="hr">HR</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button className="btn">Save</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
