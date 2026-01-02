import React from 'react';
import { render, screen } from '@testing-library/react';
import EntryList from '@/app/components/EntryList';
import { AvoidanceEntry } from '@/app/types';

describe('EntryList Component', () => {
  const mockEntry = (overrides?: Partial<AvoidanceEntry>): AvoidanceEntry => ({
    id: '1',
    date: new Date().toISOString().split('T')[0],
    text: 'Test avoidance',
    category: 'rejection',
    ...overrides,
  });

  test('renders empty state when no entries provided', () => {
    render(<EntryList entries={[]} />);

    expect(screen.getByText(/No entries yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Start tracking your avoidances/i)).toBeInTheDocument();
  });

  test('renders list with entries', () => {
    const entries = [
      mockEntry({ id: '1', text: 'Entry 1' }),
      mockEntry({ id: '2', text: 'Entry 2' }),
    ];

    render(<EntryList entries={entries} />);

    expect(screen.getByText('Entry 1')).toBeInTheDocument();
    expect(screen.getByText('Entry 2')).toBeInTheDocument();
  });

  test('displays entries in reverse order (newest first)', () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

    const entries = [
      mockEntry({ id: '1', date: yesterday, text: 'Older entry' }),
      mockEntry({ id: '2', date: today, text: 'Newer entry' }),
    ];

    render(<EntryList entries={entries} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0]).toHaveTextContent('Newer entry');
    expect(listItems[1]).toHaveTextContent('Older entry');
  });

  test('shows only last 5 entries', () => {
    const entries = Array.from({ length: 10 }, (_, i) =>
      mockEntry({ id: String(i), text: `Entry ${i}` })
    );

    render(<EntryList entries={entries} />);

    // Should show entries 5-9 (last 5)
    expect(screen.getByText('Entry 9')).toBeInTheDocument();
    expect(screen.queryByText('Entry 0')).not.toBeInTheDocument();
  });

  test('displays "Today" for current date', () => {
    const today = new Date().toISOString().split('T')[0];
    const entries = [mockEntry({ date: today })];

    render(<EntryList entries={entries} />);

    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  test('displays "Yesterday" for previous day', () => {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split('T')[0];
    const entries = [mockEntry({ date: yesterday })];

    render(<EntryList entries={entries} />);

    expect(screen.getByText('Yesterday')).toBeInTheDocument();
  });

  test('displays formatted date for older entries', () => {
    const oldDate = new Date(new Date().setDate(new Date().getDate() - 5))
      .toISOString()
      .split('T')[0];
    const entries = [mockEntry({ date: oldDate })];

    render(<EntryList entries={entries} />);

    // Should be formatted like "Jan 5" or similar
    const dateElement = screen.getByText(/\w{3}\s+\d+/);
    expect(dateElement).toBeInTheDocument();
  });

  test('displays category badge with correct content', () => {
    const entries = [mockEntry({ category: 'rejection' })];

    render(<EntryList entries={entries} />);

    expect(screen.getByText('rejection')).toBeInTheDocument();
  });

  test('renders different category types', () => {
    const entries = [
      mockEntry({ id: '1', category: 'rejection', text: 'Rejection entry' }),
      mockEntry({ id: '2', category: 'uncertainty', text: 'Uncertainty entry' }),
      mockEntry({ id: '3', category: 'effort', text: 'Effort entry' }),
    ];

    render(<EntryList entries={entries} />);

    expect(screen.getByText('rejection')).toBeInTheDocument();
    expect(screen.getByText('uncertainty')).toBeInTheDocument();
    expect(screen.getByText('effort')).toBeInTheDocument();
  });

  test('renders semantic HTML with article and time elements', () => {
    const entries = [mockEntry()];

    const { container } = render(<EntryList entries={entries} />);

    expect(container.querySelector('article')).toBeInTheDocument();
    expect(container.querySelector('time')).toBeInTheDocument();
  });

  test('includes datetime attribute on time element', () => {
    const testDate = '2026-01-05';
    const entries = [mockEntry({ date: testDate })];

    const { container } = render(<EntryList entries={entries} />);

    const timeElement = container.querySelector('time');
    expect(timeElement).toHaveAttribute('dateTime', testDate);
  });
});
