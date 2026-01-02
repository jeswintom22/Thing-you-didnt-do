'use client';

import { useState, useEffect } from 'react';
import InteractiveGrid from './components/InteractiveGrid';
import { getEntries } from './utils';
import Link from 'next/link';

export default function Home() {
  const [entries, setEntries] = useState<any[]>([]);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    setEntries(getEntries());
    // Show grid after a delay for smooth transition
    const timer = setTimeout(() => setShowGrid(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-6xl text-center">
        <header className="mb-12">
          <h1 className="text-6xl font-great-vibes mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Thing you Didn't do
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in animation-delay-500">
            Track the things you consciously avoided each day
          </p>
          <Link
            href="/tracker"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 animate-fade-in animation-delay-1000"
          >
            Start Tracking →
          </Link>
        </header>

        {showGrid && (
          <div className="animate-fade-in-up">
            <InteractiveGrid entries={entries} />
          </div>
        )}

        <footer className="mt-12 py-8 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee text-gray-400 text-lg font-mono">
            TRACK YOUR AVOIDANCES • FACE YOUR FEARS • TRACK YOUR AVOIDANCES • FACE YOUR FEARS • TRACK YOUR AVOIDANCES • FACE YOUR FEARS • TRACK YOUR AVOIDANCES • FACE YOUR FEARS •          </div>
        </footer>
      </div>
    </div>
  );
}