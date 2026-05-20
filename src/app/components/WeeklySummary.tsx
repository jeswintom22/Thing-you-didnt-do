import { AvoidanceEntry, FearType } from '../types';
import { memo } from 'react';

const WeeklySummaryComponent = memo(function WeeklySummary({ entries }: { entries: AvoidanceEntry[] }) {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const weekEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return entryDate >= weekAgo && entryDate <= today;
  });

  const categoryCounts: Record<FearType, number> = {
    rejection: 0,
    uncertainty: 0,
    effort: 0,
  };

  weekEntries.forEach((entry) => {
    categoryCounts[entry.category]++;
  });

  const total = weekEntries.length;
  const maxCategory = Object.entries(categoryCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0] as FearType;

  let insight = '';
  let insightEmoji = '';
  if (total === 0) {
    insight = 'No avoidances this week. Great job facing fears!';
    insightEmoji = '🎉';
  } else {
    const percentage = Math.round((categoryCounts[maxCategory] / total) * 100);
    insight = `This week, you avoided ${maxCategory} the most (${categoryCounts[maxCategory]} times, ${percentage}% of total).`;
    insightEmoji = maxCategory === 'rejection' ? '🚫' : maxCategory === 'uncertainty' ? '❓' : '💪';
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl" aria-labelledby="weekly-summary">
      <h2 id="weekly-summary" className="text-xl font-semibold mb-6 text-white">Weekly Summary</h2>

      {total === 0 ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">{insightEmoji}</div>
          <p className="text-lg font-medium text-slate-200/85 mb-2">{insight}</p>
          <p className="text-sm text-slate-400/80">Keep up the good work!</p>
        </div>
      ) : (
        <>
          <div className="rounded-3xl border border-white/8 bg-white/5 p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{insightEmoji}</span>
              <p className="leading-relaxed text-slate-200/85">{insight}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              const isMax = cat === maxCategory && total > 0;

              return (
                <div key={cat} className={`text-center p-3 rounded-2xl border-2 transition-all duration-300 ${isMax ? 'border-sky-300/70 bg-sky-400/10 animate-pulse-glow' : 'border-white/10 bg-white/5'} hover:scale-105`}>
                  <div className={`text-2xl font-bold mb-1 transition-colors duration-300 ${isMax ? 'text-sky-300' : 'text-slate-200/85'}`}>
                    {count}
                  </div>
                  <div className="text-sm text-slate-400/80 capitalize mb-2">{cat}</div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${isMax ? 'bg-sky-400' : 'bg-slate-400/60'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-slate-400/80 transition-opacity duration-300">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
});

WeeklySummaryComponent.displayName = 'WeeklySummary';

export default WeeklySummaryComponent;