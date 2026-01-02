'use client';

import { useState, memo } from 'react';
import { FearType } from '../types';
import { addEntry } from '../utils';

const AddEntryComponent = memo(function AddEntry({ onAdd }: { onAdd: () => void }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<FearType>('rejection');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addEntry({
      date: new Date().toISOString().split('T')[0],
      text: text.trim(),
      category,
    });
    setText('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-white">Add Today's Avoidance</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="avoidance-text" className="block text-sm font-medium text-gray-300 mb-2">
            What did you consciously avoid today?
          </label>
          <textarea
            id="avoidance-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Didn't send the email I was scared of..."
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors resize-none"
            rows={3}
            required
            aria-describedby="text-help"
          />
          <p id="text-help" className="text-xs text-gray-400 mt-1">
            Be specific about what you avoided and why
          </p>
        </div>
        <div>
          <label htmlFor="fear-category" className="block text-sm font-medium text-gray-300 mb-2">
            Fear Category
          </label>
          <select
            id="fear-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as FearType)}
            className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            aria-describedby="category-help"
          >
            <option value="rejection">Rejection - Fear of disapproval</option>
            <option value="uncertainty">Uncertainty - Fear of unknown outcomes</option>
            <option value="effort">Effort - Avoidance of hard work</option>
          </select>
          <p id="category-help" className="text-xs text-gray-400 mt-1">
            Choose the primary fear that held you back
          </p>
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-describedby="submit-help"
        >
          Add Entry
        </button>
        <p id="submit-help" className="text-xs text-gray-400 text-center">
          {!text.trim() ? 'Enter your avoidance to enable submission' : 'Your entry will be saved locally'}
        </p>
      </div>
    </form>
  );
});

AddEntryComponent.displayName = 'AddEntry';

export default AddEntryComponent;