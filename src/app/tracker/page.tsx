'use client';

import { useState, useEffect } from 'react';
import AddEntry from '../components/AddEntry';
import EntryList from '../components/EntryList';
import WeeklySummary from '../components/WeeklySummary';
import Visualization from '../components/Visualization';
import { getEntries } from '../utils';
import { AvoidanceEntry } from '../types';
import AnalyticsCards from '../components/AnalyticsCards';

export default function Tracker() {
  const [entries, setEntries] = useState<AvoidanceEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries());
  }, []);

  const refreshEntries = () => {
    setEntries(getEntries());
  };

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Avoidance Tracker
          </h1>
          <p className="text-xl text-gray-300">
            Track your daily avoidances
          </p>
        </header>

        <AnalyticsCards entries={entries} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AddEntry onAdd={refreshEntries} />
          <EntryList entries={entries} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeeklySummary entries={entries} />
          <Visualization entries={entries} />
        </div>
      </div>
    </div>
  );
}