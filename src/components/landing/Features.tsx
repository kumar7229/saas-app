import React from 'react';
import { Card } from '@/components/ui/Card';
import { 
  Sparkles, 
  Mic, 
  Activity, 
  BookOpen, 
  TrendingUp, 
  CheckCircle2, 
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

export function Features() {
  const featuresList = [
    {
      icon: Mic,
      title: 'Live Waveform & Speech-to-Text',
      description: 'Record your speech with real-time visual audio frequency bars and instant browser speech recognition.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BrainCircuit,
      title: 'AI Grammar & Correction',
      description: 'Get clear, detailed highlights of grammatical slips with precise suggestions on how native speakers formulate it.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: BookOpen,
      title: 'Vocabulary Level Rating',
      description: 'Automatically evaluate whether your word choice is Basic, Intermediate, or Advanced with context suggestions.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Activity,
      title: 'Fluency & Coherence Score',
      description: 'Get scored out of 10 for speech flow, pauses, natural transition phrases, and structural clarity.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: MessageSquare,
      title: 'Diverse Conversation Topics',
      description: 'Choose from structured prompt cards or type any custom topic — from job interviews to casual travel chit-chat.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: TrendingUp,
      title: 'Progress & Streak Tracking',
      description: 'Keep a comprehensive history of every practice session, score trends over time, and maintain daily practice streaks.',
      color: 'from-violet-500 to-purple-600',
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-500 mb-3">
            Everything You Need To Speak Confidently
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Built Like Having a <span className="text-gradient">24/7 Personal Tutor</span>
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            SpeakFlow analyzes your speech holistically, helping you break through hesitation and speak fluently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="flex flex-col h-full relative overflow-hidden group">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
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
