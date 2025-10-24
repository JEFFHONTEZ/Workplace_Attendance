import { Head, Link } from '@inertiajs/react';

function formatTime(val: any) {
    if (!val) return '--:--';
    try {
        const d = new Date(val);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
        return String(val);
    }
}

function getStatus(a: any) {
    // Prefer explicit status if provided by backend
    if (a.status) return a.status;
    if (a.on_leave || a.is_on_leave) return 'On Leave';
    if (a.check_in_time) {
        try {
            const d = new Date(a.check_in_time);
            // treat after 09:00 as late (simple rule)
            if (d.getHours() > 9 || (d.getHours() === 9 && d.getMinutes() > 0)) return 'Late';
        } catch (e) {}
        return 'Present';
    }
    return 'Absent';
}

export default function AttendancesIndex({ attendances }: { attendances: any }) {
    const items = attendances?.data || [];

    const presentCount = items.filter((a: any) => getStatus(a) === 'Present').length;
    const lateCount = items.filter((a: any) => getStatus(a) === 'Late').length;
    const absentCount = items.filter((a: any) => getStatus(a) === 'Absent').length;
    const onLeaveCount = items.filter((a: any) => getStatus(a) === 'On Leave').length;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Head title="Attendance Records" />

            <div className="max-w-6xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Attendance Records</h1>
                        <p className="text-sm text-gray-500">View and manage daily attendance</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded shadow">Export Report</button>
                        {/* Placeholder for other top controls if needed */}
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold">{items.length}</div>
                        <div className="text-sm text-gray-500">Total Records</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                        <div className="text-sm text-gray-500">Present</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-orange-500">{lateCount}</div>
                        <div className="text-sm text-gray-500">Late</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                        <div className="text-sm text-gray-500">Absent</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <input placeholder="Search by name, ID, or department..." className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <input type="date" className="border rounded px-3 py-2" />
                        </div>
                        <div>
                            <select className="border rounded px-3 py-2">
                                <option>All Status</option>
                                <option>Present</option>
                                <option>Late</option>
                                <option>Absent</option>
                                <option>On Leave</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-lg font-medium mb-4">Attendance Log</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-sm text-gray-500 border-b">
                                    <th className="py-3">Employee</th>
                                    <th className="py-3">ID</th>
                                    <th className="py-3">Department</th>
                                    <th className="py-3">Date</th>
                                    <th className="py-3">Check In</th>
                                    <th className="py-3">Check Out</th>
                                    <th className="py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((a: any) => (
                                    <tr key={a.id} className="border-b last:border-b-0">
                                        <td className="py-3">{a.user?.name || '—'}</td>
                                        <td className="py-3">{a.user?.employee_id || a.user?.id || '—'}</td>
                                        <td className="py-3">{a.user?.department || '—'}</td>
                                        <td className="py-3">{a.created_at ? new Date(a.created_at).toLocaleDateString() : '—'}</td>
                                        <td className="py-3">{formatTime(a.check_in_time)}</td>
                                        <td className="py-3">{formatTime(a.check_out_time)}</td>
                                        <td className="py-3">
                                            <StatusBadge status={getStatus(a)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const base = 'px-3 py-1 rounded-full text-sm font-medium';
    switch ((status || '').toLowerCase()) {
        case 'present':
            return <span className={`${base} bg-green-100 text-green-800`}>Present</span>;
        case 'late':
            return <span className={`${base} bg-orange-100 text-orange-800`}>Late</span>;
        case 'on leave':
            return <span className={`${base} bg-sky-100 text-sky-800`}>On Leave</span>;
        case 'absent':
        default:
            return <span className={`${base} bg-red-100 text-red-800`}>{status || 'Absent'}</span>;
    }
}
