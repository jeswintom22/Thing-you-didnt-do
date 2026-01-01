export type FearType = 'rejection' | 'uncertainty' | 'effort';

export interface AvoidanceEntry {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  category: FearType;
}