import StatCard from '@/components/dashboard/StatCard';
import { WeeklyBar, DepartmentPie } from '@/components/dashboard/Charts';

export default function AdminPanel({ stats, weekly, departments }: any) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <StatCard title="Total Employees" value={stats.totalEmployees} />
                <StatCard title="Present Today" value={stats.presentToday} />
                <StatCard title="Late Arrivals" value={stats.lateArrivals} />
                <StatCard title="Absent Today" value={stats.absentToday} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Weekly Attendance Trends</h3>
                    <WeeklyBar data={weekly} />
                </div>
                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Department Distribution</h3>
                    <DepartmentPie data={departments} />
                </div>
            </div>
        </div>
    );
}
