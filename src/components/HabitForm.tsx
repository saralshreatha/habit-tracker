import React, { useState } from 'react';
import { Timer, Repeat, Bell, Plus, X, Palette, Edit3 } from 'lucide-react';
import { Habit, Frequency, Reminder } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HabitFormProps {
  onSave: (habit: Habit) => void;
  onCancel: () => void;
  initialHabit?: Habit;
}

const COLORS = [
  '#059669', // Emerald
  '#0ea5e9', // Sky
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#6366f1', // Indigo
];

export const HabitForm: React.FC<HabitFormProps> = ({ onSave, onCancel, initialHabit }) => {
  const [name, setName] = useState(initialHabit?.name || '');
  const [goal, setGoal] = useState(initialHabit?.goal || 30);
  const [frequency, setFrequency] = useState<Frequency>(initialHabit?.frequency || 'daily');
  const [remindersEnabled, setRemindersEnabled] = useState(initialHabit?.remindersEnabled ?? true);
  const [reminders, setReminders] = useState<Reminder[]>(initialHabit?.reminders || [
    { id: Math.random().toString(), time: '08:00 AM' }
  ]);
  const [selectedColor, setSelectedColor] = useState(initialHabit?.color || COLORS[0]);

  const handleAddReminder = () => {
    setReminders([...reminders, { id: Math.random().toString(), time: '09:00 AM' }]);
  };

  const handleRemoveReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    
    const habit: Habit = {
      id: initialHabit?.id || Math.random().toString(36).substr(2, 9),
      name,
      goal,
      unit: 'minutes',
      frequency,
      remindersEnabled,
      reminders,
      color: selectedColor,
      createdAt: initialHabit?.createdAt || Date.now(),
      completedDates: initialHabit?.completedDates || [],
    };
    
    onSave(habit);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-2">
        <h2 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight">
          Plant a New Seed
        </h2>
        <p className="text-on-surface-variant font-medium leading-relaxed opacity-80">
          Define the rhythm of your growth. Small steps leads to lasting transformation.
        </p>
      </section>

      <div className="space-y-8">
        {/* Habit Name Input */}
        <div className="space-y-4">
          <label className="font-headline font-semibold text-lg ml-2" htmlFor="habit-name">
            What is your habit?
          </label>
          <div className="relative group">
            <input
              className="w-full bg-surface-container-highest border-none rounded-xl px-6 py-5 text-xl font-medium focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all placeholder:text-on-surface-variant/40 outline-none"
              id="habit-name"
              placeholder="e.g., Morning Meditation"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-40">
              <Edit3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Bento Style Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Goal Card */}
          <div className="bg-surface-container-low p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Timer className="w-5 h-5" />
              <span className="font-headline font-bold text-xs uppercase tracking-wider">Daily Goal</span>
            </div>
            <div className="flex items-end gap-3">
              <input
                className="w-24 bg-surface-container-lowest border-none rounded-xl px-4 py-3 text-2xl font-bold text-on-surface focus:ring-2 focus:ring-primary/20 outline-none"
                type="number"
                value={goal}
                onChange={(e) => setGoal(parseInt(e.target.value) || 0)}
              />
              <span className="text-on-surface-variant font-medium mb-3">minutes</span>
            </div>
          </div>

          {/* Frequency Card */}
          <div className="bg-surface-container-low p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-secondary">
              <Repeat className="w-5 h-5" />
              <span className="font-headline font-bold text-xs uppercase tracking-wider">Frequency</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFrequency('daily')}
                className={`flex-1 font-bold py-3 rounded-full text-sm transition-all ${
                  frequency === 'daily' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-white'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setFrequency('weekly')}
                className={`flex-1 font-bold py-3 rounded-full text-sm transition-all ${
                  frequency === 'weekly' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-white'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>
        </div>

        {/* Reminder Section */}
        <div className="bg-surface-container-low p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-lg text-on-surface">Smart Reminders</h3>
              <p className="text-sm text-on-surface-variant">Gentle nudges to keep you on track.</p>
            </div>
            <button 
              onClick={() => setRemindersEnabled(!remindersEnabled)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                remindersEnabled ? 'bg-primary' : 'bg-on-surface-variant/20'
              }`}
            >
              <motion.div 
                animate={{ x: remindersEnabled ? 24 : 2 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          <AnimatePresence>
            {remindersEnabled && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-3 overflow-hidden"
              >
                {reminders.map((reminder) => (
                  <div 
                    key={reminder.id}
                    className="bg-surface-container-lowest px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm"
                  >
                    <Bell className="w-4 h-4 text-primary" />
                    <span className="font-bold text-sm">{reminder.time}</span>
                    <button 
                      onClick={() => handleRemoveReminder(reminder.id)}
                      className="text-on-surface-variant/40 hover:text-rose-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={handleAddReminder}
                  className="bg-white/50 border-2 border-dashed border-on-surface-variant/10 px-4 py-3 rounded-xl flex items-center gap-2 text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-bold text-sm">Add Time</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Color Tag Picker */}
        <div className="space-y-4">
          <label className="font-headline font-semibold text-lg ml-2">Visual Anchor</label>
          <div className="flex flex-wrap gap-4 p-2">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                  selectedColor === color 
                    ? 'ring-4 ring-primary ring-offset-4 ring-offset-surface scale-110' 
                    : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <button className="w-12 h-12 rounded-full bg-on-background/10 flex items-center justify-center transition-transform hover:scale-110">
              <Palette className="w-6 h-6 text-on-surface-variant" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 flex flex-col gap-4">
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-extrabold py-5 rounded-full text-xl shadow-cloud active:scale-95 transition-all"
          >
            Save Habit
          </button>
          <button
            onClick={onCancel}
            className="w-full py-4 text-on-surface-variant font-headline font-bold hover:text-rose-500 transition-colors"
          >
            Discard Draft
          </button>
        </div>
      </div>
    </div>
  );
};
