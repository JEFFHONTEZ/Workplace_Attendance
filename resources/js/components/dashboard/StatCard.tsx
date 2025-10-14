import { Card } from '@/components/ui/card';

export default function StatCard({ title, value, children }: any) {
    return (
        <Card className="p-4">
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="mt-2 text-2xl font-semibold">{value}</div>
            {children}
        </Card>
    );
}
