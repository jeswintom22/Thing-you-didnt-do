'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import AddEntry from '../components/AddEntry';
import { getEntries } from '../utils';
import { AvoidanceEntry } from '../types';
import EntryList from '../components/EntryList';
import WeeklySummary from '../components/WeeklySummary';
import Visualization from '../components/Visualization';
import AnalyticsCards from '../components/AnalyticsCards';

const categoryLabels = {
  rejection: 'Rejection',
  uncertainty: 'Uncertainty',
  effort: 'Effort',
} as const;

export default function Tracker() {
  const [entries, setEntries] = useState<AvoidanceEntry[]>([]);

  useEffect(() => {
    const loadTimer = window.requestAnimationFrame(() => {
      setEntries(getEntries());
    });
    return () => {
      window.cancelAnimationFrame(loadTimer);
    };
  }, []);

  const summary = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = entries.filter((entry) => entry.date === today).length;
    const activeDays = new Set(entries.map((entry) => entry.date)).size;

    const categoryCounts = entries.reduce(
      (acc, entry) => {
        acc[entry.category] += 1;
        return acc;
      },
      { rejection: 0, uncertainty: 0, effort: 0 }
    );

    const topCategory = Object.entries(categoryCounts).sort(([, a], [, b]) => b - a)[0];

    return {
      total: entries.length,
      todayEntries,
      activeDays,
      topCategory:
        topCategory && topCategory[1] > 0
          ? {
              key: topCategory[0] as keyof typeof categoryLabels,
              count: topCategory[1],
            }
          : null,
    };
  }, [entries]);

  const refreshEntries = () => {
    setEntries(getEntries());
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_30%),radial-gradient(circle_at_20%_20%,_rgba(250,204,21,0.12),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_35%)]" />
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 shadow-2xl shadow-sky-950/20 backdrop-blur-xl sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
            >
              ← Back home
            </Link>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200/75">
              Private, local, fast
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.35em] text-sky-200/70">Tracker</p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Capture the avoidance, then read the pattern back to yourself.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-200/85 sm:text-lg">
                Add a daily entry, review the latest reflections, and use the summaries to spot which fear shows up most often.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Total logged</p>
                <p className="mt-2 text-3xl font-semibold text-white">{summary.total}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Today</p>
                <p className="mt-2 text-3xl font-semibold text-white">{summary.todayEntries}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Active days</p>
                <p className="mt-2 text-3xl font-semibold text-white">{summary.activeDays}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {summary.topCategory ? (
              <span className="rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-50">
                {categoryLabels[summary.topCategory.key]} leads with {summary.topCategory.count}
              </span>
            ) : (
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200/75">
                Your first entry will reveal the dominant pattern
              </span>
            )}
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200/75">
              Everything stays in this browser
            </span>
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(320px,0.88fr)_minmax(0,1.12fr)]">
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <AddEntry onAdd={refreshEntries} />
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">How to use it</p>
              <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-200/80">
                <li className="rounded-2xl border border-white/8 bg-white/5 p-4">Write one thing you avoided as precisely as you can.</li>
                <li className="rounded-2xl border border-white/8 bg-white/5 p-4">Choose the fear category that best matches the moment.</li>
                <li className="rounded-2xl border border-white/8 bg-white/5 p-4">Review your insights and the chart to find repeating patterns.</li>
              </ol>
            </div>
          </div>

          <div className="space-y-8">
            <AnalyticsCards entries={entries} />

            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <EntryList entries={entries} />
              <WeeklySummary entries={entries} />
            </div>

            <Visualization entries={entries} />
          </div>
        </section>
      </main>
    </div>
  );
}