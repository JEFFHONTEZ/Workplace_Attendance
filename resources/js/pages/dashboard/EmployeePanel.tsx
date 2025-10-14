import StatCard from '@/components/dashboard/StatCard';

export default function EmployeePanel({ stats, history, schedules }: any) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <StatCard title="Days Present" value={history?.filter((h: any) => h.status === 'present').length ?? 0} />
                <StatCard title="Days Absent" value={history?.filter((h: any) => h.status === 'absent').length ?? 0} />
                <StatCard title="Current Shift" value={schedules?.current ?? '—'} />
                <StatCard title="Last Check-In" value={history?.[0]?.check_in_time ?? '—'} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">My Attendance History</h3>
                    <div className="space-y-2">
                        {history?.map((h: any) => (
                            <div key={h.date} className="flex items-center justify-between border-b py-2">
                                <div>
                                    <div className="font-medium">{h.date}</div>
                                    <div className="text-xs text-muted-foreground">{h.check_in_time} — {h.check_out_time}</div>
                                </div>
                                <div className="text-sm">{h.status}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">My Schedule</h3>
                    <div className="text-sm text-muted-foreground">Weekly schedule card (from backend).</div>
                </div>
            </div>
        </div>
    );
}
