import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import KebabMenu from '@/components/kebab-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UsersIndex({ users }: { users: any }) {
    return (
        <AppLayout>
            <Head title="Users" />
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Users</h2>
                    <Link href={route('users.create')}>
                        <Button>New User</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-auto">
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
                                    {users.data.map((u: any) => {
                                        const { user: authUser } = usePage().props as any;
                                        const isAdmin = authUser?.role === 'admin';

                                        return (
                                            <tr key={u.id} className="border-t">
                                                <td className="p-2">{u.name}</td>
                                                <td className="p-2">{u.email}</td>
                                                <td className="p-2">{u.role}</td>
                                                <td className="p-2 text-center">
                                                    <KebabMenu
                                                        viewUrl={route('users.show', u.id)}
                                                        editUrl={route('users.edit', u.id)}
                                                        deleteUrl={route('users.destroy', u.id)}
                                                        showView={true}
                                                        showEdit={isAdmin}
                                                        showDelete={isAdmin}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
