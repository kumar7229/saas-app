import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = true, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
