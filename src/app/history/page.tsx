'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  History, 
  Search, 
  Filter, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Mic, 
  RotateCcw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const { data } = await supabase
            .from('sessions')
            .select('*')
            .order('created_at', { ascending: false });

          if (data && data.length > 0) {
            setSessions(data);
            return;
          }
        }
      } catch (err) {
        console.log('Error fetching history:', err);
      }

      // Default mock session list if DB is empty or user is in demo mode
      setSessions([
        {
          id: '1',
          topic: 'Describe your favorite holiday or travel experience',
          transcript:
            'Last summer I traveled to Kyoto in Japan. The temples were very peaceful and the local food was delicious. I enjoyed walking around the old bamboo forest.',
          score: 88,
          vocabulary_level: 'Advanced',
          fluency_score: 9,
          grammar_errors: [
            {
              original: 'traveled to',
              correction: 'visited',
              explanation: 'Slightly more natural phrasing.',
            },
          ],
          tips: [
            'Great use of descriptive adjectives like peaceful and delicious.',
            'Try using more complex sentence connectors like "While walking through..."',
            'Maintain steady intonation at the end of sentences.',
          ],
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          topic: 'Talk about your daily routine and work-life balance',
          transcript:
            'I usually wake up at 7 AM in the morning. Then I make coffee and check my emails before going to work.',
          score: 82,
          vocabulary_level: 'Intermediate',
          fluency_score: 8,
          grammar_errors: [],
          tips: [
            'Notice that "7 AM in the morning" is redundant (AM already means morning).',
            'Good basic sentence structures!',
            'Try adding variety to transition words.',
          ],
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '3',
          topic: 'Explain the importance of education in modern society',
          transcript:
            'Education helps people get better jobs and learn skills. It allows society to innovate and grow faster.',
          score: 79,
          vocabulary_level: 'Intermediate',
          fluency_score: 7,
          grammar_errors: [],
          tips: [
            'Incorporate topic vocabulary like "critical thinking" and "socioeconomic mobility".',
            'Elaborate slightly more on key points.',
          ],
          created_at: new Date(Date.now() - 172800000).toISOString(),
        },
      ]);
    }
    fetchHistory();
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch = s.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      levelFilter === 'All' || s.vocabulary_level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <main className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <History className="w-8 h-8 text-indigo-500" />
            Practice <span className="text-gradient">Session History</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review past topics, transcripts, AI scores, and actionable feedback
          </p>
        </div>

        <Link href="/practice">
          <Button size="md">
            <Mic className="w-4 h-4" />
            Start Practice
          </Button>
        </Link>
      </div>

      {/* Search & Filters bar */}
      <Card className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-semibold">Level:</span>
          {['All', 'Basic', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                levelFilter === lvl
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </Card>

      {/* Session Cards List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 dark:text-slate-400">
            No practice sessions found matching your filter.
          </Card>
        ) : (
          filteredSessions.map((session) => {
            const isExpanded = expandedId === session.id;
            return (
              <Card
                key={session.id}
                className="p-6 space-y-4 transition-all duration-300 hover:border-indigo-500/40"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : session.id)}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      "{session.topic}"
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        {new Date(session.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <Badge level={session.vocabulary_level || 'Intermediate'} />
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                        {session.score}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold block">/ 100</span>
                    </div>

                    <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details view */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-200">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Transcript
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic mt-1 p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
                        "{session.transcript}"
                      </p>
                    </div>

                    {session.tips && session.tips.length > 0 && (
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                          AI Tips for Improvement
                        </span>
                        <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {session.tips.map((t: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </main>
  );
}
