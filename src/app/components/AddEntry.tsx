'use client';

import { useState } from 'react';
import { FearType } from '../types';
import { addEntry } from '../utils';

export default function AddEntry({ onAdd }: { onAdd: () => void }) {
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
      <h2 className="text-xl font-bold mb-4 text-white">Add Today's Avoidance</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What did you consciously avoid today?"
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
        rows={3}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as FearType)}
        className="w-full p-3 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
      >
        <option value="rejection">Rejection</option>
        <option value="uncertainty">Uncertainty</option>
        <option value="effort">Effort</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors"
      >
        Add Entry
      </button>
    </form>
  );
}