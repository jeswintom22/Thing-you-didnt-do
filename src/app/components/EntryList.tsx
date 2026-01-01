import { AvoidanceEntry } from '../types';

export default function EntryList({ entries }: { entries: AvoidanceEntry[] }) {
  const recentEntries = entries.slice(-5).reverse(); // last 5, newest first

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Recent Avoidances</h2>
      {recentEntries.length === 0 ? (
        <p className="text-gray-400">No entries yet. Start tracking!</p>
      ) : (
        <ul className="space-y-3">
          {recentEntries.map((entry) => (
            <li key={entry.id} className="bg-gray-700 p-4 rounded">
              <p className="text-white mb-2">{entry.text}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{entry.date}</span>
                <span className="capitalize">{entry.category}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}