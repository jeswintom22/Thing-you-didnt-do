import { AvoidanceEntry, FearType } from '../types';

export default function WeeklySummary({ entries }: { entries: AvoidanceEntry[] }) {
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
  if (total === 0) {
    insight = 'No avoidances this week. Great job facing fears!';
  } else {
    insight = `This week, you avoided ${maxCategory} the most (${categoryCounts[maxCategory]} times).`;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Weekly Summary</h2>
      <p className="text-gray-300 mb-4">{insight}</p>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(categoryCounts).map(([cat, count]) => (
          <div key={cat} className="text-center">
            <div className="text-2xl font-bold text-blue-400">{count}</div>
            <div className="text-sm text-gray-400 capitalize">{cat}</div>
          </div>
        ))}
      </div>
    </div>
  );
}