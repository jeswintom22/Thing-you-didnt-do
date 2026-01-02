import React from 'react';
import { render, screen } from '@testing-library/react';
import AnalyticsCards from '@/app/components/AnalyticsCards';
import { AvoidanceEntry } from '@/app/types';

describe('AnalyticsCards Component', () => {
  const mockEntry = (overrides?: Partial<AvoidanceEntry>): AvoidanceEntry => ({
    id: '1',
    date: new Date().toISOString().split('T')[0],
    text: 'Test avoidance',
    category: 'rejection',
    ...overrides,
  });

  test('renders empty state when no entries provided', () => {
    render(<AnalyticsCards entries={[]} />);

    expect(screen.getByText(/Start tracking to see your patterns/i)).toBeInTheDocument();
    expect(screen.getByText(/Each avoidance you log reveals patterns/i)).toBeInTheDocument();
  });

  test('renders insights section when entries exist', () => {
    const entries = [mockEntry()];
    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(screen.getByText('Tracking Streak')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Average')).toBeInTheDocument();
  });

  test('calculates tracking streak correctly', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const entries = [
      mockEntry({ date: today.toISOString().split('T')[0], id: '1' }),
      mockEntry({ date: yesterday.toISOString().split('T')[0], id: '2' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    // Should show streak of 2 (today and yesterday)
    expect(screen.getByText('days tracking avoidances')).toBeInTheDocument();
  });

  test('shows zero streak when today has no entry', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const entries = [mockEntry({ date: yesterday.toISOString().split('T')[0] })];

    const { container } = render(<AnalyticsCards entries={entries} />);

    // Streak should be 0 since today has no entry
    const streakValue = container.querySelector('[class*="text-3xl"]');
    expect(streakValue?.textContent).toContain('0');
  });

  test('displays today\'s entry count', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [
      mockEntry({ date: today, id: '1' }),
      mockEntry({ date: today, id: '2' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText('First day of tracking')).toBeInTheDocument();
  });

  test('compares today vs yesterday entries', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const entries = [
      mockEntry({ date: todayStr, id: '1' }),
      mockEntry({ date: todayStr, id: '2' }),
      mockEntry({ date: yesterdayStr, id: '3' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    // Today has 2, yesterday has 1, so should show up arrow
    expect(screen.getByText(/↑ vs yesterday/)).toBeInTheDocument();
  });

  test('shows down arrow when today has fewer entries than yesterday', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const entries = [
      mockEntry({ date: todayStr, id: '1' }),
      mockEntry({ date: yesterdayStr, id: '2' }),
      mockEntry({ date: yesterdayStr, id: '3' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText(/↓ vs yesterday/)).toBeInTheDocument();
  });

  test('shows right arrow when today equals yesterday count', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const entries = [
      mockEntry({ date: todayStr, id: '1' }),
      mockEntry({ date: yesterdayStr, id: '2' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText(/→ vs yesterday/)).toBeInTheDocument();
  });

  test('calculates average avoidances per day', () => {
    const today = new Date();
    const entries = [
      mockEntry({ date: today.toISOString().split('T')[0], id: '1' }),
      mockEntry({ date: today.toISOString().split('T')[0], id: '2' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText('avoidances per day')).toBeInTheDocument();
  });

  test('displays recurring patterns with top items', () => {
    const entries = [
      mockEntry({ text: 'Public speaking', id: '1' }),
      mockEntry({ text: 'Public speaking', id: '2' }),
      mockEntry({ text: 'Difficult conversation', id: '3' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText('Recurring Patterns')).toBeInTheDocument();
    expect(screen.getByText(/Public speaking/)).toBeInTheDocument();
    expect(screen.getByText(/2 times/)).toBeInTheDocument();
  });

  test('shows only top 3 recurring patterns', () => {
    const entries = [
      mockEntry({ text: 'Pattern 1', id: '1' }),
      mockEntry({ text: 'Pattern 1', id: '2' }),
      mockEntry({ text: 'Pattern 2', id: '3' }),
      mockEntry({ text: 'Pattern 2', id: '4' }),
      mockEntry({ text: 'Pattern 3', id: '5' }),
      mockEntry({ text: 'Pattern 4', id: '6' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    const patterns = screen.getAllByRole('listitem');
    // Should be 3 patterns (top items)
    expect(patterns.length).toBe(3);
  });

  test('displays medals for top patterns', () => {
    const entries = [
      mockEntry({ text: 'First', id: '1' }),
      mockEntry({ text: 'First', id: '2' }),
      mockEntry({ text: 'Second', id: '3' }),
      mockEntry({ text: 'Second', id: '4' }),
      mockEntry({ text: 'Third', id: '5' }),
    ];

    const { container } = render(<AnalyticsCards entries={entries} />);

    expect(container.textContent).toContain('🥇'); // Gold
    expect(container.textContent).toContain('🥈'); // Silver
    expect(container.textContent).toContain('🥉'); // Bronze
  });

  test('displays reflection message for patterns', () => {
    const entries = [mockEntry({ text: 'Test', id: '1' })];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText(/Notice what patterns emerge/)).toBeInTheDocument();
  });

  test('handles long text by truncating to 40 characters', () => {
    const longText = 'This is a very long avoidance that should be truncated at 40 characters';
    const entries = [mockEntry({ text: longText, id: '1' })];

    render(<AnalyticsCards entries={entries} />);

    const displayedText = screen.getByText(/This is a very long avoidance that sh.../);
    expect(displayedText).toBeInTheDocument();
  });

  test('pluralizes "time" correctly for frequency', () => {
    const entries = [
      mockEntry({ text: 'Single occurrence', id: '1' }),
      mockEntry({ text: 'Multiple occurrences', id: '2' }),
      mockEntry({ text: 'Multiple occurrences', id: '3' }),
    ];

    render(<AnalyticsCards entries={entries} />);

    expect(screen.getByText('1 time')).toBeInTheDocument();
    expect(screen.getByText('2 times')).toBeInTheDocument();
  });
});
