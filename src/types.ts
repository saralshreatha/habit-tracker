export type Frequency = 'daily' | 'weekly';

export interface Reminder {
  id: string;
  time: string;
}

export interface Habit {
  id: string;
  name: string;
  goal: number;
  unit: string;
  frequency: Frequency;
  remindersEnabled: boolean;
  reminders: Reminder[];
  color: string;
  createdAt: number;
  completedDates: string[]; // ISO dates
}
