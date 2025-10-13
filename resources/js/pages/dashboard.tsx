import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

function AdminHRPanel() {
    return (
        <div className="space-y-4">
            <div className="rounded-lg border p-4">Manage Users (Admin/HR)</div>
            <div className="rounded-lg border p-4">Manage Schedules</div>
            <div className="rounded-lg border p-4">Attendance Reports & Analytics</div>
        </div>
    );
}

function GatepersonPanel() {
    return (
        <div className="space-y-4">
            <div className="rounded-lg border p-4">Employee Sign-in / Sign-out</div>
        </div>
    );
}

function EmployeePanel() {
    return (
        <div className="space-y-4">
            <div className="rounded-lg border p-4">My Attendance History</div>
            <div className="rounded-lg border p-4">My Schedule</div>
        </div>
    );
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    const role = auth?.user?.role ?? 'employee';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-6">
                    {role === 'admin' || role === 'hr' ? (
                        <AdminHRPanel />
                    ) : role === 'gateperson' ? (
                        <GatepersonPanel />
                    ) : (
                        <EmployeePanel />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
