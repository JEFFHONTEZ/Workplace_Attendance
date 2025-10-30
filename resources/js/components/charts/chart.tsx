import * as React from 'react';
import { cn } from '@/lib/utils';

export type ChartConfig = Record<
    string,
    {
        label: string;
        color?: string;
    }
>;

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    config: ChartConfig;
}

export function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
    const style = React.useMemo(() => {
        const entries = Object.entries(config);
        const vars: Record<string, string> = {};
        entries.forEach(([key, value], i) => {
            const cssVarName = `--chart-${i + 1}`;
            vars[cssVarName as any] = `var(--color-${key}, ${value.color ?? `var(${cssVarName})`})`;
        });
        return vars as React.CSSProperties;
    }, [config]);

    return (
        <div
            className={cn('flex w-full items-center justify-center rounded-lg border bg-card p-4', className)}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}

export function ChartLegend({ children }: { children?: React.ReactNode }) {
    return <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">{children}</div>;
}

export function ChartLegendItem({ colorVar, label }: { colorVar: string; label: string }) {
    return (
        <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: `var(${colorVar})` }} />
            <span>{label}</span>
        </div>
    );
}
