import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function WeeklyBar({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#4ADE80" />
                <Bar dataKey="late" fill="#FB923C" />
                <Bar dataKey="absent" fill="#F43F5E" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function DepartmentPie({ data }: { data: Array<{ name: string; count: number }> }) {
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie data={data} dataKey="count" nameKey="name" outerRadius={80} fill="#8884d8">
                    {data.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}
