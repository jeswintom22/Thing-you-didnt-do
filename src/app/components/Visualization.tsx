'use client';

import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AvoidanceEntry } from '../types';

const VisualizationComponent = memo(function Visualization({ entries }: { entries: AvoidanceEntry[] }) {
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

  const hasData = data.some(day => day.rejection > 0 || day.uncertainty > 0 || day.effort > 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
          <p className="text-gray-400 text-sm mt-1 border-t border-gray-600 pt-1">
            Total: {total}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg" aria-labelledby="avoidance-trends">
      <h2 id="avoidance-trends" className="text-xl font-bold mb-6 text-white">Avoidance Trends</h2>
      <p className="text-gray-400 text-sm mb-4">Last 7 days of avoidance patterns</p>

      {!hasData ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-400 mb-2">No data to visualize yet</p>
          <p className="text-sm text-gray-500">Start tracking avoidances to see trends here</p>
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              aria-label="Stacked bar chart showing daily avoidance counts by category"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9ca3af"
                fontSize={12}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="rejection"
                stackId="a"
                fill="#ef4444"
                name="Rejection"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="uncertainty"
                stackId="a"
                fill="#f59e0b"
                name="Uncertainty"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="effort"
                stackId="a"
                fill="#10b981"
                name="Effort"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
});

VisualizationComponent.displayName = 'Visualization';

export default VisualizationComponent;