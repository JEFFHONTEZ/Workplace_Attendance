import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function SchedulesCreate({ users }: { users: any[] }) {
    return (
        <AppLayout>
            <Head title="Create Schedule" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Create Schedule</h2>
                <form method="post" action={route('schedules.store')}>
                    <div className="grid gap-2">
                        <select name="user_id" className="input">
                            {users.map((u: any) => (
                                <option key={u.id} value={u.id}>{u.name}</option>
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
