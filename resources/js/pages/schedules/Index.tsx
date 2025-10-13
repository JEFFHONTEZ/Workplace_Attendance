import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

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
                            {schedules.data.map((s: any) => (
                                <tr key={s.id} className="border-t">
                                    <td className="p-2">{s.shift_name}</td>
                                    <td className="p-2">{s.user?.name}</td>
                                    <td className="p-2">{s.start_time}</td>
                                    <td className="p-2">{s.end_time}</td>
                                    <td className="p-2 text-center">
                                        <Link href={route('schedules.edit', s.id)} className="text-blue-600">Edit</Link>
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
