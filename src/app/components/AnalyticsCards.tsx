'use client';

import { memo } from 'react';
import { AvoidanceEntry } from '../types';

const AnalyticsCardsComponent = memo(function AnalyticsCards({ entries }: { entries: AvoidanceEntry[] }) {
  // Calculate daily stats
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayDate = new Date(today);
  yesterdayDate.setDate(today.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  const todayEntries = entries.filter(e => e.date === todayStr);
  const yesterdayEntries = entries.filter(e => e.date === yesterdayStr);

  // Calculate streak
  let streak = 0;
  const checkDate = new Date(today);
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const hasEntry = entries.some(e => e.date === dateStr);
    if (hasEntry) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Most frequent avoided items (text snippets)
  const itemFrequency: Record<string, number> = {};
  entries.forEach(entry => {
    const snippet = entry.text.substring(0, 40) + (entry.text.length > 40 ? '...' : '');
    itemFrequency[snippet] = (itemFrequency[snippet] || 0) + 1;
  });

  const topItems = Object.entries(itemFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Overall insights
  const total = entries.length;
  const earliestEntry = entries
    .map((entry) => new Date(`${entry.date}T00:00:00`))
    .sort((a, b) => a.getTime() - b.getTime())[0];
  const elapsedDays = earliestEntry
    ? Math.max(1, Math.ceil((new Date(todayStr).getTime() - earliestEntry.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    : 1;
  const avgPerDay = total > 0 ? (total / elapsedDays).toFixed(1) : '0';

  if (total === 0) {
    return (
      <section className="mb-8" aria-labelledby="analytics-title">
        <h2 id="analytics-title" className="text-xl font-semibold mb-4 text-white">Insights</h2>
        <div className="rounded-[2rem] border border-white/10 bg-white/6 p-8 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-lg text-slate-200/85">Start tracking to see your patterns</p>
          <p className="mt-2 text-sm text-slate-400/80">Each avoidance you log reveals patterns about what holds you back</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8" aria-labelledby="analytics-title">
      <h2 id="analytics-title" className="text-xl font-semibold mb-6 text-white">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Tracking Streak */}
        <article className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition-colors duration-300 hover:border-sky-300/30">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-300/80">Tracking Streak</h3>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{streak}</div>
          <p className="text-xs text-slate-400/80">days tracking avoidances</p>
        </article>

        {/* Today's Activity */}
        <article className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition-colors duration-300 hover:border-emerald-300/30">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-300/80">Today</h3>
            <span className="text-2xl">📝</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{todayEntries.length}</div>
          <p className="text-xs text-gray-500">
            {yesterdayEntries.length > 0 
              ? `${todayEntries.length > yesterdayEntries.length ? '↑' : todayEntries.length < yesterdayEntries.length ? '↓' : '→'} vs yesterday (${yesterdayEntries.length})`
              : 'First day of tracking'
            }
          </p>
        </article>

        {/* Overall Average */}
        <article className="rounded-[1.75rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition-colors duration-300 hover:border-violet-300/30">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-slate-300/80">Average</h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{avgPerDay}</div>
          <p className="text-xs text-slate-400/80">avoidances per day</p>
        </article>
      </div>

      {/* Most Frequent Avoidances */}
      {topItems.length > 0 && (
        <article className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
          <h3 className="text-sm font-medium text-slate-300/80 mb-4">Recurring Patterns</h3>
          <ul className="space-y-3">
            {topItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4 transition-colors duration-200 hover:bg-white/8">
                <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm break-words">{item[0]}</p>
                  <p className="text-xs text-slate-400/80 mt-1">{item[1]} time{item[1] > 1 ? 's' : ''}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs italic text-slate-400/80">Notice what patterns emerge. They point to your deepest fears.</p>
        </article>
      )}
    </section>
  );
});

AnalyticsCardsComponent.displayName = 'AnalyticsCards';

export default AnalyticsCardsComponent;
