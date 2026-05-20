'use client';

import { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AvoidanceEntry } from '../types';

type ChartDatum = {
  date: string;
  rejection: number;
  uncertainty: number;
  effort: number;
};

type TooltipItem = {
  color?: string;
  name?: string;
  value?: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
  data: ChartDatum[];
  today: Date;
};

function ChartTooltip({ active, payload, label, data, today }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0 || !label) {
    return null;
  }

  const dayIndex = data.findIndex((datum) => datum.date === label);
  const fullDate = new Date(today);
  fullDate.setDate(today.getDate() - (6 - dayIndex));
  const total = payload.reduce((sum, entry) => sum + (entry.value ?? 0), 0);

  return (
    <div className="max-w-xs rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
      <p className="mb-1 font-medium text-white">{label}</p>
      <p className="mb-3 text-xs text-slate-400/80">{fullDate.toLocaleDateString()}</p>
      {payload.map((entry, index) => (
        <div key={`${entry.name ?? 'item'}-${index}`} className="mb-1 flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
          <span className="text-slate-300/80">{entry.name}:</span>
          <span className="font-medium" style={{ color: entry.color }}>{entry.value ?? 0}</span>
        </div>
      ))}
      <div className="mt-2 border-t border-white/10 pt-2">
        <p className="text-sm font-medium text-white">Total: <span className="text-sky-300">{total}</span></p>
      </div>
    </div>
  );
}

const VisualizationComponent = memo(function Visualization({ entries }: { entries: AvoidanceEntry[] }) {
  const today = new Date();
  const data: ChartDatum[] = [];

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
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl" aria-labelledby="avoidance-trends">
      <div className="mb-6">
        <h2 id="avoidance-trends" className="text-xl font-semibold mb-2 text-white">Avoidance Trends</h2>
        <p className="text-sm text-slate-400/80">Last 7 days of avoidance patterns by fear category</p>
      </div>

      {!hasData ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-slate-200/85 mb-2">No data to visualize yet</p>
          <p className="text-sm text-slate-400/80">Start tracking avoidances to see trends here</p>
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
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
                <XAxis
                  dataKey="date"
                  stroke="#cbd5e1"
                  fontSize={12}
                  tick={{ fill: '#cbd5e1' }}
                  label={{ value: 'Day', position: 'insideBottomRight', offset: -5, fill: '#cbd5e1', fontSize: 11 }}
                />
                <YAxis
                  stroke="#cbd5e1"
                  fontSize={12}
                  tick={{ fill: '#cbd5e1' }}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#cbd5e1', fontSize: 11 }}
                />
                <Tooltip content={<ChartTooltip data={data} today={today} />} />
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
              <span className="text-slate-400/80">Rejection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
              <span className="text-slate-400/80">Uncertainty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
              <span className="text-slate-400/80">Effort</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
});

VisualizationComponent.displayName = 'Visualization';

export default VisualizationComponent;