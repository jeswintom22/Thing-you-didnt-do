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
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg" aria-labelledby="weekly-summary">
      <h2 id="weekly-summary" className="text-xl font-bold mb-6 text-white">Weekly Summary</h2>

      {total === 0 ? (
        <div className="text-center py-6">
          <div className="text-4xl mb-3">{insightEmoji}</div>
          <p className="text-gray-300 text-lg font-medium mb-2">{insight}</p>
          <p className="text-sm text-gray-500">Keep up the good work!</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{insightEmoji}</span>
              <p className="text-gray-300 leading-relaxed">{insight}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              const isMax = cat === maxCategory && total > 0;

              return (
                <div key={cat} className={`text-center p-3 rounded-lg border-2 transition-all ${isMax ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'}`}>
                  <div className={`text-2xl font-bold mb-1 ${isMax ? 'text-blue-400' : 'text-gray-300'}`}>
                    {count}
                  </div>
                  <div className="text-sm text-gray-400 capitalize mb-2">{cat}</div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${isMax ? 'bg-blue-500' : 'bg-gray-500'}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
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