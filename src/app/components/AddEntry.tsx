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
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl"
    >
      <h2 className="text-xl font-semibold mb-2 text-white">Add Today&apos;s Avoidance</h2>
      <p className="mb-6 text-sm text-slate-300/80">Keep it specific enough that future-you can recognize the moment instantly.</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="avoidance-text" className="block text-sm font-medium text-slate-200 mb-2">
            What did you consciously avoid today?
          </label>
          <textarea
            id="avoidance-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Didn't send the email I was scared of..."
            className="w-full rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-white placeholder:text-slate-400/70 focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30 transition-all duration-200 resize-none"
            rows={3}
            required
            aria-describedby="text-help"
          />
          <p id="text-help" className="mt-2 text-xs text-slate-400/80">
            Be specific about what you avoided and why
          </p>
        </div>
        <div>
          <label htmlFor="fear-category" className="block text-sm font-medium text-slate-200 mb-2">
            Fear Category
          </label>
          <select
            id="fear-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as FearType)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-white focus:border-sky-300/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30 transition-all duration-200"
            aria-describedby="category-help"
          >
            <option value="rejection">Rejection - Fear of disapproval</option>
            <option value="uncertainty">Uncertainty - Fear of unknown outcomes</option>
            <option value="effort">Effort - Avoidance of hard work</option>
          </select>
          <p id="category-help" className="mt-2 text-xs text-slate-400/80">
            Choose the primary fear that held you back
          </p>
        </div>
        <button
          type="submit"
          disabled={!text.trim()}
          className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-slate-300/70"
          aria-describedby="submit-help"
        >
          Add Entry
        </button>
        <p id="submit-help" className="text-center text-xs text-slate-400/80">
          {!text.trim() ? 'Enter your avoidance to enable submission' : 'Your entry will be saved locally'}
        </p>
      </div>
    </form>
  );
});

AddEntryComponent.displayName = 'AddEntry';

export default AddEntryComponent;