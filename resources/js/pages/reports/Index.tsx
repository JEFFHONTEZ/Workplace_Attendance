import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ReportsIndex(props: any) {
    const { totalUsers, totalEmployees, attendanceToday, schedulesCount, chart, start_date, end_date } = props;
    const { visit } = usePage();

    const [start, setStart] = useState(start_date || '');
    const [end, setEnd] = useState(end_date || '');

    const data = {
        labels: chart?.labels || [],
        datasets: [
            {
                label: 'Attendance',
                data: chart?.data || [],
                borderColor: 'rgb(34 197 94)',
                backgroundColor: 'rgba(34,197,94,0.2)',
            },
        ],
    };

    function applyFilter(e: React.FormEvent) {
        e.preventDefault();
        const params: any = {};
        if (start) params.start_date = start;
        if (end) params.end_date = end;
        // Use Inertia visit to reload with query params
        visit('/reports', { method: 'get', data: params });
    }

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

                <form onSubmit={applyFilter} className="flex items-end gap-2">
                    <div>
                        <label className="block text-sm">Start date</label>
                        <input type="date" value={start} onChange={e => setStart(e.target.value)} className="mt-1 rounded border px-2 py-1" />
                    </div>
                    <div>
                        <label className="block text-sm">End date</label>
                        <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="mt-1 rounded border px-2 py-1" />
                    </div>
                    <div>
                        <button className="rounded bg-sky-600 text-white px-3 py-1">Apply</button>
                    </div>
                </form>

                <div className="rounded-lg border p-4">
                    <Line data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
