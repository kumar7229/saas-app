'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Sparkles, 
  Palmtree, 
  Clock, 
  GraduationCap, 
  Briefcase, 
  Coffee, 
  Plane, 
  Globe2, 
  Cpu, 
  BookOpen, 
  Heart, 
  PlusCircle,
  Lightbulb
} from 'lucide-react';

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
  selectedTopic: string;
}

export function TopicSelector({ onSelectTopic, selectedTopic }: TopicSelectorProps) {
  const [customTopic, setCustomTopic] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const topicPresets = [
    {
      id: 1,
      topic: 'Describe your favorite holiday or travel experience',
      category: 'Travel',
      icon: Palmtree,
      level: 'Easy',
    },
    {
      id: 2,
      topic: 'Talk about your daily routine and work-life balance',
      category: 'Daily Life',
      icon: Clock,
      level: 'Easy',
    },
    {
      id: 3,
      topic: 'Explain the importance of education in modern society',
      category: 'Education',
      icon: GraduationCap,
      level: 'Medium',
    },
    {
      id: 4,
      topic: 'Describe your ideal dream job and career ambitions',
      category: 'Career',
      icon: Briefcase,
      level: 'Medium',
    },
    {
      id: 5,
      topic: 'How artificial intelligence is changing our everyday lives',
      category: 'Tech',
      icon: Cpu,
      level: 'Hard',
    },
    {
      id: 6,
      topic: 'Share your favorite book or movie and why you love it',
      category: 'Leisure',
      icon: BookOpen,
      level: 'Easy',
    },
    {
      id: 7,
      topic: 'Talk about a memorable decision that shaped who you are',
      category: 'Personal',
      icon: Heart,
      level: 'Hard',
    },
    {
      id: 8,
      topic: 'Discuss climate change and steps to protect the environment',
      category: 'Society',
      icon: Globe2,
      level: 'Hard',
    },
  ];

  const categories = ['All', 'Daily Life', 'Travel', 'Education', 'Career', 'Tech', 'Personal'];

  const filteredTopics =
    activeCategory === 'All'
      ? topicPresets
      : topicPresets.filter((t) => t.category === activeCategory);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onSelectTopic(customTopic.trim());
    }
  };

  const handleSuggestRandom = () => {
    const random = topicPresets[Math.floor(Math.random() * topicPresets.length)];
    onSelectTopic(random.topic);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills & AI Suggestion Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                  : 'bg-slate-200/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSuggestRandom}
          className="shrink-0 w-full sm:w-auto"
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          AI Suggest Topic
        </Button>
      </div>

      {/* Preset Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedTopic === item.topic;
          return (
            <Card
              key={item.id}
              onClick={() => onSelectTopic(item.topic)}
              className={`cursor-pointer transition-all duration-300 p-5 flex items-start gap-4 ${
                isSelected
                  ? 'border-2 border-indigo-500 bg-indigo-500/10 dark:bg-indigo-950/40 shadow-lg shadow-indigo-500/10 scale-[1.01]'
                  : 'hover:border-indigo-400/50'
              }`}
            >
              <div
                className={`p-3 rounded-xl shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-indigo-500 dark:text-indigo-400'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {item.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.level === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : item.level === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {item.level}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                  {item.topic}
                </h4>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom Topic Form */}
      <Card className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-dashed border-2 border-slate-300 dark:border-slate-800">
        <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full flex-grow">
            <PlusCircle className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Or enter your own custom speaking topic..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <Button type="submit" variant="secondary" className="w-full sm:w-auto shrink-0 py-3">
            Use Custom Topic
          </Button>
        </form>
      </Card>
    </div>
  );
}
