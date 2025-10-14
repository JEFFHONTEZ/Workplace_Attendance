import StatCard from '@/components/dashboard/StatCard';

export default function HRPanel({ stats, recentAttendance, schedules }: any) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <StatCard title="Total Employees" value={stats.totalEmployees} />
                <StatCard title="Present Today" value={stats.presentToday} />
                <StatCard title="Absentees" value={stats.absentToday} />
                <StatCard title="Shifts Active Today" value={schedules?.length ?? 0} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Recent Attendance</h3>
                    <div className="space-y-2">
                        {recentAttendance?.map((r: any) => (
                            <div key={r.id} className="flex items-center justify-between border-b py-2">
                                <div>
                                    <div className="font-medium">{r.name}</div>
                                    <div className="text-xs text-muted-foreground">{r.check_in_time}</div>
                                </div>
                                <div className="text-sm">{r.status}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Employee Schedule Overview</h3>
                    <div className="text-sm text-muted-foreground">Schedules overview coming from backend.</div>
                </div>
            </div>
        </div>
    );
}
