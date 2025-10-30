import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Users, Clock, CheckCircle2, Calendar } from 'lucide-react';

export interface StatItem {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    className?: string;
}

export function StatsCards({ items }: { items: StatItem[] }) {
    const icons = [
        <Users key="users" className="h-4 w-4" />,
        <Clock key="clock" className="h-4 w-4" />,
        <CheckCircle2 key="check" className="h-4 w-4" />,
        <Calendar key="calendar" className="h-4 w-4" />
    ];
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
                <Card key={i} className={cn('p-4', item.className)}>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                            <div className="text-2xl font-semibold tracking-tight">{item.value}</div>
                            {item.trend && (
                                <div className="text-xs text-muted-foreground">{item.trend}</div>
                            )}
                        </div>
                        <div className="rounded-md border bg-muted p-2 text-muted-foreground">
                            {(item.icon as any) ?? icons[i % icons.length]}
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
