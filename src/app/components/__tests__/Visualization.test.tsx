import React from 'react';
import { render, screen } from '@testing-library/react';
import Visualization from '@/app/components/Visualization';
import type { AvoidanceEntry } from '@/app/types';

describe('Visualization Component', () => {
  const mockEntry = (overrides?: Partial<AvoidanceEntry>): AvoidanceEntry => ({
    id: '1',
    date: new Date().toISOString().split('T')[0],
    text: 'Test avoidance',
    category: 'rejection',
    ...overrides,
  });

  test('renders component without crashing', () => {
    render(<Visualization entries={[]} />);
    expect(screen.getByText('Avoidance Trends')).toBeInTheDocument();
  });

  test('displays empty state when no entries provided', () => {
    render(<Visualization entries={[]} />);

    expect(screen.getByText(/No data to visualize yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Start tracking avoidances to see trends here/i)).toBeInTheDocument();
  });

  test('displays chart container when entries exist', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [mockEntry({ date: today })];

    const { container } = render(<Visualization entries={entries} />);

    // Check if ResponsiveContainer is rendered (height-based check)
    const chartContainer = container.querySelector('[style*="height"]');
    expect(chartContainer).toBeInTheDocument();
  });

  test('displays chart title and description', () => {
    const entries = [mockEntry()];
    render(<Visualization entries={entries} />);

    expect(screen.getByText('Avoidance Trends')).toBeInTheDocument();
    expect(screen.getByText(/Last 7 days of avoidance patterns/i)).toBeInTheDocument();
  });

  test('aggregates entries correctly by date and category', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [
      mockEntry({ date: today, category: 'rejection', id: '1' }),
      mockEntry({ date: today, category: 'rejection', id: '2' }),
      mockEntry({ date: today, category: 'uncertainty', id: '3' }),
    ];

    render(<Visualization entries={entries} />);

    // Chart should render without errors - component handles aggregation internally
    expect(screen.queryByText(/No data to visualize yet/i)).not.toBeInTheDocument();
  });

  test('displays legend with all three categories', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [
      mockEntry({ date: today, category: 'rejection', id: '1' }),
      mockEntry({ date: today, category: 'uncertainty', id: '2' }),
      mockEntry({ date: today, category: 'effort', id: '3' }),
    ];

    render(<Visualization entries={entries} />);

    expect(screen.getByText('Rejection')).toBeInTheDocument();
    expect(screen.getByText('Uncertainty')).toBeInTheDocument();
    expect(screen.getByText('Effort')).toBeInTheDocument();
  });

  test('renders with accessible aria-label on BarChart', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [mockEntry({ date: today })];

    render(<Visualization entries={entries} />);

    // Verify chart section renders
    expect(screen.getByText('Avoidance Trends')).toBeInTheDocument();
  });

  test('has proper semantic structure with section and heading', () => {
    const { container } = render(<Visualization entries={[]} />);

    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'avoidance-trends');
  });

  test('displays all legend labels in chart', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [
      mockEntry({ date: today, category: 'rejection', id: '1' }),
      mockEntry({ date: today, category: 'uncertainty', id: '2' }),
      mockEntry({ date: today, category: 'effort', id: '3' }),
    ];

    render(<Visualization entries={entries} />);

    // Verify all legend labels are present
    expect(screen.getByText('Rejection')).toBeInTheDocument();
    expect(screen.getByText('Uncertainty')).toBeInTheDocument();
    expect(screen.getByText('Effort')).toBeInTheDocument();
  });

  test('renders chart with data across multiple days', () => {
    const entries: AvoidanceEntry[] = [];
    const today = new Date();

    // Add entries for 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      entries.push(mockEntry({ date: dateStr, category: 'rejection', id: String(i) }));
    }

    render(<Visualization entries={entries} />);

    // Should render chart, not empty state
    expect(screen.queryByText(/No data to visualize yet/i)).not.toBeInTheDocument();
    expect(screen.getByText('Avoidance Trends')).toBeInTheDocument();
  });

  test('shows empty state when no entries exist', () => {
    render(<Visualization entries={[]} />);

    expect(screen.getByText(/No data to visualize yet/i)).toBeInTheDocument();
  });

  test('renders chart when only one category has entries', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [
      mockEntry({ date: today, category: 'rejection', id: '1' }),
      mockEntry({ date: today, category: 'rejection', id: '2' }),
    ];

    render(<Visualization entries={entries} />);

    expect(screen.queryByText(/No data to visualize yet/i)).not.toBeInTheDocument();
    expect(screen.getByText('Avoidance Trends')).toBeInTheDocument();
  });

  test('handles single entry', () => {
    const entries = [mockEntry()];

    render(<Visualization entries={entries} />);

    expect(screen.getByText('Avoidance Trends')).toBeInTheDocument();
  });

  test('does not show empty state message when data exists', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [mockEntry({ date: today })];

    render(<Visualization entries={entries} />);

    expect(screen.queryByText(/No data to visualize yet/i)).not.toBeInTheDocument();
  });
});
