import { AvoidanceEntry } from './types';

const STORAGE_KEY = 'avoidance-entries';

export function getEntries(): AvoidanceEntry[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveEntries(entries: AvoidanceEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addEntry(entry: Omit<AvoidanceEntry, 'id'>): void {
  const entries = getEntries();
  const newEntry: AvoidanceEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  entries.push(newEntry);
  saveEntries(entries);
}