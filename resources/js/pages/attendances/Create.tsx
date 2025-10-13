import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function AttendancesCreate() {
    return (
        <AppLayout>
            <Head title="Create Attendance" />
            <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Create Attendance</h2>
                <form method="post" action={route('attendances.store')}>
                    <div className="grid gap-2">
                        <select name="user_id" className="input">
                            {/* TODO: populate users list */}
                            <option value="1">Employee 1</option>
                        </select>
                        <label>Check-in</label>
                        <input name="check_in_time" type="datetime-local" className="input" />
                        <label>Check-out</label>
                        <input name="check_out_time" type="datetime-local" className="input" />
                        <button className="btn">Save</button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
