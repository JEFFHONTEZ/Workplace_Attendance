import { useState } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import axios from 'axios';

export default function GatepersonPanel({ stats, signedIn }: any) {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<any | null>(null);

    async function search() {
        const res = await axios.get('/dashboard/search-employee', { params: { q: query } });
        setResult(res.data[0] ?? null);
    }

    async function toggle(action: 'in' | 'out') {
        if (!result) return;
        await axios.post('/dashboard/toggle-signin', { user_id: result.id, action });
        // refresh page
        window.location.reload();
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard title="Currently Signed In" value={signedIn?.length ?? 0} />
                <StatCard title="Signed Out" value={stats.presentToday - (signedIn?.length ?? 0)} />
                <StatCard title="Late Arrivals" value={stats.lateArrivals} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="col-span-2 rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Employee Search</h3>
                    <div className="flex gap-2">
                        <input className="flex-1 rounded border px-2 py-1" value={query} onChange={e => setQuery(e.target.value)} placeholder="ID or name" />
                        <button className="rounded bg-sky-600 px-3 text-white" onClick={search}>Search</button>
                    </div>

                    {result && (
                        <div className="mt-4 border p-3">
                            <div className="font-medium">{result.name}</div>
                            <div className="text-sm text-muted-foreground">{result.email}</div>
                            <div className="mt-2 flex gap-2">
                                <button className="rounded bg-green-600 px-3 text-white" onClick={() => toggle('in')}>Sign In</button>
                                <button className="rounded bg-rose-600 px-3 text-white" onClick={() => toggle('out')}>Sign Out</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Currently On-site</h3>
                    <div className="space-y-2">
                        {signedIn?.map((s: any) => (
                            <div key={s.id} className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                <div className="text-sm">{s.name} <span className="text-xs text-muted-foreground">{s.check_in_time}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
