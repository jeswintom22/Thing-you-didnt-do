import { AvoidanceEntry } from '../types';
import { memo } from 'react';

const EntryListComponent = memo(function EntryList({ entries }: { entries: AvoidanceEntry[] }) {
  const recentEntries = entries.slice(-5).reverse(); // last 5, newest first

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rejection': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'uncertainty': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'effort': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl" aria-labelledby="recent-entries">
      <h2 id="recent-entries" className="text-xl font-semibold mb-6 text-white">Recent Avoidances</h2>
      {recentEntries.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-slate-200/85 mb-2">No entries yet</p>
          <p className="text-sm text-slate-400/80">Start tracking your avoidances to see them here</p>
        </div>
      ) : (
        <ul className="space-y-4" role="list">
          {recentEntries.map((entry, index) => (
            <li key={entry.id} className="rounded-2xl border border-white/8 bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/15 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
              <article>
                <p className="mb-3 leading-relaxed text-slate-100">{entry.text}</p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-slate-400/80" dateTime={entry.date}>
                    {formatDate(entry.date)}
                  </time>
                  <span className={`rounded-full border px-2 py-1 text-xs font-medium capitalize transition-colors duration-200 hover:bg-opacity-20 ${getCategoryColor(entry.category)}`}>
                    {entry.category}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
});

EntryListComponent.displayName = 'EntryList';

export default EntryListComponent;