import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function UsersEdit({ user }: { user: any }) {
    const form = useForm({ name: user.name, email: user.email, password: '', role: user.role });

    function submit(e: any) {
        e.preventDefault();
        form.put(route('users.update', user.id));
    }

    return (
        <AppLayout>
            <Head title="Edit User" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid gap-3">
                            <Label>Name</Label>
                            <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                            {form.errors.name && <div className="text-destructive text-sm">{form.errors.name}</div>}

                            <Label>Email</Label>
                            <Input value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                            {form.errors.email && <div className="text-destructive text-sm">{form.errors.email}</div>}

                            <Label>Password</Label>
                            <Input type="password" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} />

                            <Label>Role</Label>
                            <select className="input" value={form.data.role} onChange={(e) => form.setData('role', e.target.value)}>
                                <option value="employee">Employee</option>
                                <option value="gateperson">Gateperson</option>
                                <option value="hr">HR</option>
                                <option value="admin">Admin</option>
                            </select>

                            <div className="pt-2">
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
