import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import KebabMenu from '@/components/kebab-menu';

export default function SchedulesIndex({ schedules }: { schedules: any }) {
    return (
        <AppLayout>
            <Head title="Schedules" />
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Schedules</h2>
                    <Link href={route('schedules.create')} className="btn">
                        New Schedule
                    </Link>
                </div>
                <div className="rounded-lg border">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Shift</th>
                                <th className="text-left p-2">Employee</th>
                                <th className="text-left p-2">Start</th>
                                <th className="text-left p-2">End</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.data.map((s: any) => {
                                const { user: authUser } = usePage().props as any;
                                const isAdmin = authUser?.role === 'admin';

                                return (
                                    <tr key={s.id} className="border-t">
                                        <td className="p-2">{s.shift_name}</td>
                                        <td className="p-2">{s.role?.label ?? s.role?.name}</td>
                                        <td className="p-2">{s.start_time}</td>
                                        <td className="p-2">{s.end_time}</td>
                                        <td className="p-2 text-center">
                                            <KebabMenu
                                                viewUrl={route('schedules.show', s.id)}
                                                editUrl={route('schedules.edit', s.id)}
                                                deleteUrl={route('schedules.destroy', s.id)}
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
            </div>
        </AppLayout>
    );
}
