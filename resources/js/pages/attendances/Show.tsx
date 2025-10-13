import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AttendanceShow({ attendance }: { attendance: any }) {
    return (
        <AppLayout>
            <Head title="Attendance" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Attendance</h2>
                <div className="rounded-lg border p-4">
                    <div>Employee: {attendance.user?.name}</div>
                    <div>Check-in: {attendance.check_in_time}</div>
                    <div>Check-out: {attendance.check_out_time}</div>
                </div>
            </div>
        </AppLayout>
    );
}
