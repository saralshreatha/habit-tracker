import React from 'react';
import { Habit } from '../types';
import { Plus, CheckCircle2, Circle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  habits: Habit[];
  onAddHabit: () => void;
  onToggleHabit: (id: string) => void;
  onEditHabit: (habit: Habit) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ habits, onAddHabit, onToggleHabit, onEditHabit }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
            Your Garden
          </h2>
          <p className="text-on-surface-variant font-medium opacity-80">
            {habits.length === 0 
              ? "Start planting your first habit." 
              : `You have ${habits.length} habits in progress.`}
          </p>
        </div>
        <button
          onClick={onAddHabit}
          className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-cloud hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-8 h-8" />
        </button>
      </header>

      <div className="grid gap-4">
        {habits.map((habit) => {
          const isCompletedToday = habit.completedDates.includes(today);
          
          return (
            <motion.div
              key={habit.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-3xl transition-all border-2 ${
                isCompletedToday 
                  ? 'bg-primary-container/30 border-primary/10' 
                  : 'bg-surface-container-low border-transparent'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-3 h-12 rounded-full" 
                    style={{ backgroundColor: habit.color }}
                  />
                  <div className="space-y-1">
                    <h3 className={`font-headline font-bold text-lg ${isCompletedToday ? 'text-on-primary-container' : 'text-on-surface'}`}>
                      {habit.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {habit.frequency}
                      </span>
                      <span>•</span>
                      <span>{habit.goal} {habit.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditHabit(habit)}
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                  </button>
                  <button
                    onClick={() => onToggleHabit(habit.id)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isCompletedToday 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-surface-container-lowest text-on-surface-variant shadow-sm hover:scale-105'
                    }`}
                  >
                    {isCompletedToday ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {habits.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-10 h-10 text-on-surface-variant/30" />
            </div>
            <p className="text-on-surface-variant font-medium">No habits yet. Tap the + to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};
