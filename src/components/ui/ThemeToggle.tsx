'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full transition-all duration-300 bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 backdrop-blur-md border border-slate-300/40 dark:border-slate-700/40"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
    </button>
  );
}
