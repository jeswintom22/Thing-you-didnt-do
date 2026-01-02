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
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg" aria-labelledby="recent-entries">
      <h2 id="recent-entries" className="text-xl font-bold mb-6 text-white">Recent Avoidances</h2>
      {recentEntries.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📝</div>
          <p className="text-gray-400 mb-2">No entries yet</p>
          <p className="text-sm text-gray-500">Start tracking your avoidances to see them here</p>
        </div>
      ) : (
        <ul className="space-y-4" role="list">
          {recentEntries.map((entry, index) => (
            <li key={entry.id} className="bg-gray-700 p-4 rounded-md border border-gray-600 hover:border-gray-500 hover:shadow-md transition-all duration-200 hover:translate-y-[-2px] animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
              <article>
                <p className="text-white mb-3 leading-relaxed">{entry.text}</p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-400" dateTime={entry.date}>
                    {formatDate(entry.date)}
                  </time>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border capitalize transition-colors duration-200 hover:bg-opacity-20 ${getCategoryColor(entry.category)}`}>
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