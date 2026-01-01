'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AvoidanceEntry } from '../types';

export default function Visualization({ entries }: { entries: AvoidanceEntry[] }) {
  const today = new Date();
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const dayEntries = entries.filter((e) => e.date === dateStr);
    const rejection = dayEntries.filter((e) => e.category === 'rejection').length;
    const uncertainty = dayEntries.filter((e) => e.category === 'uncertainty').length;
    const effort = dayEntries.filter((e) => e.category === 'effort').length;

    data.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      rejection,
      uncertainty,
      effort,
    });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Avoidance Trends (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none', color: '#fff' }}
          />
          <Bar dataKey="rejection" stackId="a" fill="#ef4444" />
          <Bar dataKey="uncertainty" stackId="a" fill="#f59e0b" />
          <Bar dataKey="effort" stackId="a" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}