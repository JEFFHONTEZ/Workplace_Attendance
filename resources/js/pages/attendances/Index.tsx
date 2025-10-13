import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function AttendancesIndex({ attendances }: { attendances: any }) {
    return (
        <AppLayout>
            <Head title="Attendances" />
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Attendances</h2>
                    <Link href={route('attendances.create')} className="btn">New</Link>
                </div>
                <div className="rounded-lg border">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th className="text-left p-2">Employee</th>
                                <th className="text-left p-2">Check-in</th>
                                <th className="text-left p-2">Check-out</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendances.data.map((a: any) => (
                                <tr key={a.id} className="border-t">
                                    <td className="p-2">{a.user?.name}</td>
                                    <td className="p-2">{a.check_in_time}</td>
                                    <td className="p-2">{a.check_out_time}</td>
                                    <td className="p-2 text-center">
                                        <Link href={route('attendances.show', a.id)} className="text-blue-600">View</Link>
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
