import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function SchedulesCreate({ roles }: { roles: any[] }) {
    return (
        <AppLayout>
            <Head title="Create Schedule" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Create Schedule</h2>
                <form method="post" action={route('schedules.store')}>
                    <div className="grid gap-2">
                        <select name="role_id" className="input">
                            {roles.map((r: any) => (
                                <option key={r.id} value={r.id}>{r.label ?? r.name}</option>
                            ))}
                        </select>
                        <input name="shift_name" placeholder="Shift name" className="input" />
                        <input name="start_time" type="time" className="input" />
                        <input name="end_time" type="time" className="input" />
                        <button className="btn">Create</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
