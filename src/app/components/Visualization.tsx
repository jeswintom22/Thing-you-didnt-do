'use client';

import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AvoidanceEntry } from '../types';

const VisualizationComponent = memo(function Visualization({ entries }: { entries: AvoidanceEntry[] }) {
  const today = new Date();
  const data: Array<{ date: string; rejection: number; uncertainty: number; effort: number }> = [];

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

  // Enhanced tooltip with full date context
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dayIndex = data.findIndex(d => d.date === label);
      let fullDate = new Date(today);
      fullDate.setDate(today.getDate() - (6 - dayIndex));
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-white font-medium mb-1">{label}</p>
          <p className="text-xs text-gray-400 mb-2">{fullDate.toLocaleDateString()}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span className="text-gray-300">{entry.name}:</span>
              <span className="font-medium" style={{ color: entry.color }}>{entry.value}</span>
            </div>
          ))}
          <div className="border-t border-gray-600 pt-2 mt-2">
            <p className="text-sm font-medium text-white">Total: <span className="text-blue-400">{total}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg" aria-labelledby="avoidance-trends">
      <div className="mb-6">
        <h2 id="avoidance-trends" className="text-xl font-bold mb-2 text-white">Avoidance Trends</h2>
        <p className="text-gray-400 text-sm">Last 7 days of avoidance patterns by fear category</p>
      </div>

      {!hasData ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-400 mb-2">No data to visualize yet</p>
          <p className="text-sm text-gray-500">Start tracking avoidances to see trends here</p>
        </div>
      ) : (
        <>
          <div className="h-80 animate-fade-in" style={{ animationDuration: '0.5s' }}>
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
                  label={{ value: 'Day', position: 'insideBottomRight', offset: -5, fill: '#9ca3af', fontSize: 11 }}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  tick={{ fill: '#9ca3af' }}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }}
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
          <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
              <span className="text-gray-400">Rejection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
              <span className="text-gray-400">Uncertainty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
              <span className="text-gray-400">Effort</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
});

VisualizationComponent.displayName = 'Visualization';

export default VisualizationComponent;