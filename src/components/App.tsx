import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { HabitForm } from './components/HabitForm';
import { Habit } from './types';
import { HabitService } from './services/habitService';
import { AnimatePresence, motion } from 'motion/react';

type View = 'dashboard' | 'create' | 'edit';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  useEffect(() => {
    setHabits(HabitService.getHabits());
  }, []);

  const handleSaveHabit = (habit: Habit) => {
    if (view === 'edit') {
      HabitService.updateHabit(habit);
    } else {
      HabitService.addHabit(habit);
    }
    setHabits(HabitService.getHabits());
    setView('dashboard');
    setEditingHabit(undefined);
  };

  const handleToggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    HabitService.toggleCompletion(id, today);
    setHabits(HabitService.getHabits());
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setView('edit');
  };

  const handleBack = () => {
    setView('dashboard');
    setEditingHabit(undefined);
  };

  return (
    <Layout 
      onBack={view !== 'dashboard' ? handleBack : undefined}
      title={view === 'dashboard' ? "Mindful Momentum" : "Create Habit"}
    >
      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard 
              habits={habits} 
              onAddHabit={() => setView('create')}
              onToggleHabit={handleToggleHabit}
              onEditHabit={handleEditHabit}
            />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <HabitForm 
              onSave={handleSaveHabit} 
              onCancel={handleBack}
              initialHabit={editingHabit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
