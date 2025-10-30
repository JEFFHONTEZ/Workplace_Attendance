import * as React from 'react';
import { Line, LineChart as ReLineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, type ChartConfig } from '@/components/charts/chart';

export interface LineChartProps<T extends { [k: string]: any }> {
    data: T[];
    xKey: keyof T;
    series: { key: keyof T; colorVar?: string }[];
    config?: ChartConfig;
    height?: number;
}

export function LineChart<T extends { [k: string]: any }>({ data, xKey, series, config = {}, height = 280 }: LineChartProps<T>) {
    return (
        <ChartContainer config={config} className="h-full w-full p-2">
            <ResponsiveContainer width="100%" height={height}>
                <ReLineChart data={data} margin={{ left: 8, right: 8, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey={xKey as string} tickLine={false} axisLine={false} className="text-xs" />
                    <YAxis width={32} tickLine={false} axisLine={false} className="text-xs" />
                    <Tooltip cursor={{ stroke: 'var(--border)' }} contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)' }} />
                    {series.map((s, i) => (
                        <Line
                            key={String(s.key)}
                            type="monotone"
                            dataKey={s.key as string}
                            stroke={`var(${s.colorVar ?? `--chart-${i + 1}`})`}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    ))}
                </ReLineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
