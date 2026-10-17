import React from 'react';
import Link from 'next/link';
import { Mic, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-glow flex items-center justify-center text-white">
                <Mic className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                Speak<span className="text-gradient">Flow</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
              Your personal AI English speaking coach. Practice daily, get instant feedback, and speak with confidence.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/practice" className="hover:text-indigo-500 transition-colors">
              Practice
            </Link>
            <Link href="/dashboard" className="hover:text-indigo-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/history" className="hover:text-indigo-500 transition-colors">
              History
            </Link>
            <Link href="/profile" className="hover:text-indigo-500 transition-colors">
              Profile
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>&copy; {new Date().getFullYear()} SpeakFlow SaaS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
