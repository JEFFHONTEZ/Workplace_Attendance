import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function SchedulesCreate() {
    return (
        <AppLayout>
            <Head title="Create Schedule" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Create Schedule</h2>
                <form method="post" action={route('schedules.store')}>
                    <div className="grid gap-2">
                        <select name="user_id" className="input">
                            {/* TODO: replace with users list */}
                            <option value="1">Employee 1</option>
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
