import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function UsersIndex({ users }: { users: any }) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Users</h2>
                    <Link href={route('users.create')} className="btn">
                        New User
                    </Link>
                </div>
                <div className="rounded-lg border">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Email</th>
                                <th className="text-left p-2">Role</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((u: any) => (
                                <tr key={u.id} className="border-t">
                                    <td className="p-2">{u.name}</td>
                                    <td className="p-2">{u.email}</td>
                                    <td className="p-2">{u.role}</td>
                                    <td className="p-2 text-center">
                                        <Link href={route('users.edit', u.id)} className="text-blue-600">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
