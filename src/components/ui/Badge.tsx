import React from 'react';

interface BadgeProps {
  level: 'Basic' | 'Intermediate' | 'Advanced' | string;
  className?: string;
}

export function Badge({ level, className = '' }: BadgeProps) {
  let colorClasses = 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
  
  if (level === 'Basic') {
    colorClasses = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
  } else if (level === 'Intermediate') {
    colorClasses = 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30';
  } else if (level === 'Advanced') {
    colorClasses = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${colorClasses} ${className}`}
    >
      {level}
    </span>
  );
}
