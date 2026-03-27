import { Habit } from './types';

const STORAGE_KEY = 'mindful_momentum_habits';

export const HabitService = {
  getHabits: (): Habit[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveHabits: (habits: Habit[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  },

  addHabit: (habit: Habit) => {
    const habits = HabitService.getHabits();
    habits.push(habit);
    HabitService.saveHabits(habits);
  },

  updateHabit: (updatedHabit: Habit) => {
    const habits = HabitService.getHabits();
    const index = habits.findIndex(h => h.id === updatedHabit.id);
    if (index !== -1) {
      habits[index] = updatedHabit;
      HabitService.saveHabits(habits);
    }
  },

  deleteHabit: (id: string) => {
    const habits = HabitService.getHabits();
    const filtered = habits.filter(h => h.id !== id);
    HabitService.saveHabits(filtered);
  },

  toggleCompletion: (id: string, date: string) => {
    const habits = HabitService.getHabits();
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const index = habit.completedDates.indexOf(date);
      if (index === -1) {
        habit.completedDates.push(date);
      } else {
        habit.completedDates.splice(index, 1);
      }
      HabitService.saveHabits(habits);
    }
  }
};
