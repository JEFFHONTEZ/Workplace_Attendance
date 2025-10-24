import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function SchedulesEdit({ schedule, roles }: { schedule: any; roles: any[] }) {
    return (
        <AppLayout>
            <Head title="Edit Schedule" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Edit Schedule</h2>
                <form method="post" action={route('schedules.update', schedule.id)}>
                    <input type="hidden" name="_method" value="put" />
                    <div className="grid gap-2">
                        <select name="role_id" defaultValue={schedule.role_id} className="input">
                            {roles.map((r: any) => (
                                <option key={r.id} value={r.id}>{r.label ?? r.name}</option>
                            ))}
                        </select>
                        <input name="shift_name" defaultValue={schedule.shift_name} className="input" />
                        <input name="start_time" type="time" defaultValue={schedule.start_time} className="input" />
                        <input name="end_time" type="time" defaultValue={schedule.end_time} className="input" />
                        <button className="btn">Save</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
