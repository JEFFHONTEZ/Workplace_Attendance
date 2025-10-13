import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function ReportsIndex({ totalUsers, totalEmployees, attendanceToday, schedulesCount }: any) {
    return (
        <AppLayout>
            <Head title="Reports" />
            <div className="p-4 space-y-4">
                <h2 className="text-lg font-medium">Reports</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">Total Users: {totalUsers}</div>
                    <div className="rounded-lg border p-4">Employees: {totalEmployees}</div>
                    <div className="rounded-lg border p-4">Today's Attendance: {attendanceToday}</div>
                    <div className="rounded-lg border p-4">Schedules: {schedulesCount}</div>
                </div>
            </div>
        </AppLayout>
    );
}
