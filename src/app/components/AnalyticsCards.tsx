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
  let checkDate = new Date(today);
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
  const avgPerDay = total > 0 ? (total / Math.max(1, Math.ceil((new Date().getTime() - new Date(entries[0]?.date || today).getTime()) / (1000 * 60 * 60 * 24)))).toFixed(1) : '0';

  if (total === 0) {
    return (
      <section className="mb-8" aria-labelledby="analytics-title">
        <h2 id="analytics-title" className="text-xl font-bold mb-4 text-white">Insights</h2>
        <div className="bg-gradient-to-br from-gray-800 to-gray-750 p-8 rounded-lg border border-gray-700 text-center">
          <div className="text-5xl mb-4">📚</div>
          <p className="text-gray-400 text-lg">Start tracking to see your patterns</p>
          <p className="text-gray-500 text-sm mt-2">Each avoidance you log reveals patterns about what holds you back</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8" aria-labelledby="analytics-title">
      <h2 id="analytics-title" className="text-xl font-bold mb-6 text-white">Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Tracking Streak */}
        <article className="bg-gradient-to-br from-gray-800 to-gray-750 p-6 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">Tracking Streak</h3>
            <span className="text-2xl">🔥</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{streak}</div>
          <p className="text-xs text-gray-500">days tracking avoidances</p>
        </article>

        {/* Today's Activity */}
        <article className="bg-gradient-to-br from-gray-800 to-gray-750 p-6 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors duration-300">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">Today</h3>
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
        <article className="bg-gradient-to-br from-gray-800 to-gray-750 p-6 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors duration-300">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-400">Average</h3>
            <span className="text-2xl">📊</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{avgPerDay}</div>
          <p className="text-xs text-gray-500">avoidances per day</p>
        </article>
      </div>

      {/* Most Frequent Avoidances */}
      {topItems.length > 0 && (
        <article className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-400 mb-4">Recurring Patterns</h3>
          <ul className="space-y-3">
            {topItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm break-words">{item[0]}</p>
                  <p className="text-xs text-gray-500 mt-1">{item[1]} time{item[1] > 1 ? 's' : ''}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4 italic">Notice what patterns emerge. They point to your deepest fears.</p>
        </article>
      )}
    </section>
  );
});

AnalyticsCardsComponent.displayName = 'AnalyticsCards';

export default AnalyticsCardsComponent;
