'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Mic, Sparkles, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-purple-500/15 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold mb-8 animate-pulse-subtle">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Powered by Gemini AI & Real-time Speech Analysis</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
          Master Fluent English Speaking with <span className="text-gradient">Instant AI Feedback</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Speak on any topic, record your voice, and receive instant expert scoring on grammar, vocabulary, fluency, and pronunciation in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/practice">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 glow-shadow">
              <Mic className="w-5 h-5" />
              Start Speaking Free
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Trust metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-slate-200/60 dark:border-slate-800/60">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">99.4%</span>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Grammar Accuracy</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">&lt; 3 Sec</span>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Instant AI Feedback</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">100+ Topics</span>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Daily & Business Prompts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
