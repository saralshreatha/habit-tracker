import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  showProfile?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = "Mindful Momentum", 
  onBack,
  showProfile = true
}) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Ambient Decorative Elements */}
      <div className="fixed bottom-0 right-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-96 h-96 bg-primary blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="fixed top-0 left-0 -z-10 opacity-10 pointer-events-none">
        <div className="w-72 h-72 bg-secondary blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass shadow-ambient flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-primary" />
            </button>
          )}
          <h1 className="font-headline text-xl font-bold text-primary tracking-tight">
            {title}
          </h1>
        </div>
        
        {showProfile && (
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-white shadow-sm">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdq97zu0Ri36BQzkV2-qHbWwcTP4D4B68R4Qkasx_6oTdbekdg9xl363XAU80geFh1asRgk7pC48BbY7BZhSAq7od58Y-muJ0XHsVb7PmV9sAj5Gp5uMSjUMFdY_DpKJdD8kAo9P0SbvMnmmHSaqG26r0mUoKMrhdEVORbG82dL4fvGrlNfNaXVj3Cb1ZuV7MJnjvEdHDnIrCeKqomIyJ1L3cbmcaxKM9NslmgxT4y3njbNtoMcEiy00dUJc-DUWbKxHYEl-QGSLM" 
              alt="Profile"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-12 px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
