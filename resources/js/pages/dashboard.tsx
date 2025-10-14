import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import AdminPanel from '@/pages/dashboard/AdminPanel';
import HRPanel from '@/pages/dashboard/HRPanel';
import GatepersonPanel from '@/pages/dashboard/GatepersonPanel';
import EmployeePanel from '@/pages/dashboard/EmployeePanel';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const page = usePage<SharedData>().props as any;
    const { auth, stats, weekly, departments, signedIn, employeeHistory } = page;

    const role = auth?.user?.role ?? 'employee';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-lg border p-4">Welcome to the Attendance Management System!</div>

                {role === 'admin' ? (
                    <AdminPanel stats={stats} weekly={weekly} departments={departments} />
                ) : role === 'hr' ? (
                    <HRPanel stats={stats} recentAttendance={weekly?.slice(0, 5)} schedules={[]} />
                ) : role === 'gateperson' ? (
                    <GatepersonPanel stats={stats} signedIn={signedIn} />
                ) : (
                    <EmployeePanel stats={stats} history={employeeHistory} schedules={{}} />
                )}
            </div>
        </AppLayout>
    );
}
