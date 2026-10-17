'use client';

import React from 'react';

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  subtitle?: string;
}

export function CircularProgress({
  score,
  size = 180,
  strokeWidth = 14,
  subtitle = 'Overall Score',
}: CircularProgressProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  let scoreColor = '#3b82f6'; // Blue
  if (score >= 80) scoreColor = '#10b981'; // Emerald
  else if (score >= 60) scoreColor = '#8b5cf6'; // Violet
  else if (score < 50) scoreColor = '#f59e0b'; // Amber

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-200 dark:text-slate-800"
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {score}
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
