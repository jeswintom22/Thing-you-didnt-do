'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import InteractiveGrid from './components/InteractiveGrid';
import { getEntries } from './utils';
import { AvoidanceEntry } from './types';

const categoryMeta: Record<
  'rejection' | 'uncertainty' | 'effort',
  { label: string; tone: string }
> = {
  rejection: { label: 'Rejection', tone: 'from-rose-400/20 via-rose-400/10 to-transparent' },
  uncertainty: { label: 'Uncertainty', tone: 'from-amber-400/20 via-amber-400/10 to-transparent' },
  effort: { label: 'Effort', tone: 'from-emerald-400/20 via-emerald-400/10 to-transparent' },
};

export default function Home() {
  const [entries, setEntries] = useState<AvoidanceEntry[]>([]);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const loadTimer = window.requestAnimationFrame(() => {
      setEntries(getEntries());
    });
    const gridTimer = window.setTimeout(() => setShowGrid(true), 650);
    return () => {
      window.cancelAnimationFrame(loadTimer);
      clearTimeout(gridTimer);
    };
  }, []);

  const stats = useMemo(() => {
    const totals = entries.reduce(
      (acc, entry) => {
        acc[entry.category] += 1;
        return acc;
      },
      { rejection: 0, uncertainty: 0, effort: 0 }
    );

    const activeDays = new Set(entries.map((entry) => entry.date)).size;
    const latestDate = entries[0]?.date ?? null;

    const topCategory = Object.entries(totals).sort(([, a], [, b]) => b - a)[0];

    return {
      total: entries.length,
      activeDays,
      latestDate,
      topCategory:
        topCategory && topCategory[1] > 0
          ? {
              key: topCategory[0] as keyof typeof categoryMeta,
              count: topCategory[1],
            }
          : null,
      totals,
    };
  }, [entries]);

  const latestLabel = stats.latestDate
    ? new Date(`${stats.latestDate}T00:00:00`).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'No entries yet';

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_85%_15%,_rgba(250,204,21,0.12),_transparent_28%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_36%)]" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-4 shadow-2xl shadow-sky-950/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-sky-200/70">Local-first avoidance log</p>
            <h1 className="mt-2 font-great-vibes text-4xl text-white sm:text-5xl">Thing you Didn&apos;t do</h1>
          </div>
          <Link
            href="/tracker"
            className="inline-flex items-center justify-center rounded-full border border-sky-300/30 bg-sky-400/15 px-5 py-3 text-sm font-semibold text-sky-50 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200/60 hover:bg-sky-300/20"
          >
            Open tracker
          </Link>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-14">
          <div className="space-y-6">
            <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-100/80 backdrop-blur-xl">
              Name the avoidance. See the pattern.
            </span>
            <div className="space-y-5">
              <h2 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Track what you avoided, then turn it into a clearer next step.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-200/85 sm:text-lg">
                Capture the things you keep postponing, group them by fear type, and let the trends show you where your energy gets stuck.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tracker"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100"
              >
                Start tracking
              </Link>
              <a
                href="#pattern-grid"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
              >
                See the grid
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Logged</p>
                <p className="mt-2 text-3xl font-semibold text-white">{stats.total}</p>
                <p className="mt-2 text-sm text-slate-300/75">Avoidances already captured</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Active days</p>
                <p className="mt-2 text-3xl font-semibold text-white">{stats.activeDays}</p>
                <p className="mt-2 text-sm text-slate-300/75">Days with at least one entry</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Latest</p>
                <p className="mt-2 text-3xl font-semibold text-white">{latestLabel}</p>
                <p className="mt-2 text-sm text-slate-300/75">
                  {stats.topCategory
                    ? `${categoryMeta[stats.topCategory.key].label} leads with ${stats.topCategory.count}`
                    : 'Ready for your first reflection'}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">Why it works</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Three quick signals, one clearer pattern.</h3>
              </div>
              <span className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-slate-100">Local only</span>
            </div>

            <div className="mt-8 space-y-4">
              {[
                'Write the exact thing you avoided so the pattern stays concrete.',
                'Group it by rejection, uncertainty, or effort to expose the fear behind it.',
                'Watch the grid fill up as your avoidance history becomes easier to read.',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-3xl border border-white/8 bg-white/5 p-4 text-sm leading-6 text-slate-200/85"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sm font-semibold text-sky-100">
                    0{index + 1}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {Object.entries(categoryMeta).map(([key, meta]) => (
                <div key={key} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${meta.tone} p-4`}>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">{meta.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{stats.totals[key as keyof typeof stats.totals]}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="pattern-grid" className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-sky-950/20 backdrop-blur-xl sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">Interactive map</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">A quiet grid that still feels alive.</h3>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-200/75">
                Hover to inspect
              </span>
            </div>
            {showGrid ? (
              <div className="animate-fade-in-up">
                <InteractiveGrid entries={entries} />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8">
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-2xl border border-white/8 bg-white/5 animate-pulse"
                    aria-hidden="true"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/35 p-6 shadow-2xl shadow-slate-950/25 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">What you get</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">A compact reflection loop.</h3>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-200/80">
                <li className="rounded-2xl border border-white/8 bg-white/5 p-4">Log one entry in under a minute.</li>
                <li className="rounded-2xl border border-white/8 bg-white/5 p-4">Review recent entries, summaries, and charts on the tracker page.</li>
                <li className="rounded-2xl border border-white/8 bg-white/5 p-4">Keep the record local to this browser.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-400/15 via-white/5 to-indigo-400/10 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-100/70">Next step</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Open the tracker and start with the one thing you kept putting off.</h3>
              <p className="mt-4 text-sm leading-6 text-slate-200/80">
                The app stays intentionally lightweight, so the habit is to write the avoidant moment, not a polished summary.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-10 overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.35em] text-slate-200/65 animate-marquee">
            Track your avoidances • Face your fears • Spot the pattern • Track your avoidances • Face your fears • Spot the pattern •
          </div>
        </footer>
      </main>
    </div>
  );
}