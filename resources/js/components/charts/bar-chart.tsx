import * as React from 'react';
import { Bar, BarChart as ReBarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/charts/chart';

export interface BarChartProps<T extends { [k: string]: any }> {
    data: T[];
    xKey: keyof T;
    series: { key: keyof T; colorVar?: string; stackId?: string }[];
    config?: ChartConfig;
    height?: number;
}

export function BarChart<T extends { [k: string]: any }>({ data, xKey, series, config = {}, height = 280 }: BarChartProps<T>) {
    return (
        <ChartContainer config={config} className="h-full w-full p-2">
            <ResponsiveContainer width="100%" height={height}>
                <ReBarChart data={data} margin={{ left: 8, right: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey={xKey as string} tickLine={false} axisLine={false} className="text-xs" />
                    <YAxis width={32} tickLine={false} axisLine={false} className="text-xs" />
                    <Tooltip cursor={{ fill: 'var(--muted)' }} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)' }} />
                    {series.map((s, i) => (
                        <Bar
                            key={String(s.key)}
                            dataKey={s.key as string}
                            stackId={s.stackId}
                            fill={`var(${s.colorVar ?? `--chart-${i + 1}`})`}
                            radius={2}
                        />
                    ))}
                </ReBarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
