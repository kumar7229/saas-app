import React from 'react';
import { Card } from '@/components/ui/Card';
import { MessageSquare, Mic, Sparkles } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: MessageSquare,
      title: 'Choose or Create a Topic',
      description: 'Select from recommended topics like "Describe your favorite holiday" or enter a custom prompt you want to practice.',
    },
    {
      step: '02',
      icon: Mic,
      title: 'Record Your Speech',
      description: 'Click "Start Speaking" and talk freely for 30–120 seconds while watching the live waveform animation process your speech.',
    },
    {
      step: '03',
      icon: Sparkles,
      title: 'Get AI Score & Corrections',
      description: 'Receive an overall score out of 100, grammar line-by-line corrections, fluency rating, and 3 actionable tips to improve.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-100/50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 mb-3">
            Simple 3-Step Process
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            How SpeakFlow Works
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="relative flex flex-col items-center text-center p-8">
                <span className="text-5xl font-black text-slate-200 dark:text-slate-800 absolute top-4 right-6 pointer-events-none select-none">
                  {item.step}
                </span>
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/20">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
