'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Mic,
  Flame,
  Trophy,
  Activity,
  ArrowRight,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Lightbulb,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { createClient } from '@/lib/supabase/client';

const SPEAKING_TIPS = [
  {
    tag: 'धाराप्रवाह और आत्मविश्वास',
    highlight: 'बोलते समय शांत ठहराव लें',
    text: 'जब भी सही शब्द याद न आए, तो "umm" या "ahh" कहने के बजाय 1 सेकंड का मौन (pause) लें। इससे सोचने का समय मिलता है और आप शांत व आत्मविश्वासी लगते हैं।',
  },
  {
    tag: 'उच्चारण और लहजा',
    highlight: 'शैडोइंग तकनीक अपनाएं',
    text: 'अंग्रेजी पॉडकास्ट या वीडियो सुनते समय वक्ता के ठीक पीछे-पीछे वाक्यों को ज़ोर से दोहराएं। इससे आपकी जुबान को अंग्रेजी की लय और सही टोन की आदत पड़ती है।',
  },
  {
    tag: 'अंग्रेजी में सोचना',
    highlight: 'दिनभर के कामों को मन में बोलें',
    text: 'रोजाना 5 मिनट अपने छोटे-छोटे कामों को मन में अंग्रेजी में बयां करें (जैसे: "I am having lunch")। इससे दिमाग की हिंदी से अंग्रेजी ट्रांसलेशन करने की निर्भरता खत्म होती है।',
  },
  {
    tag: 'शब्दकोश मजबूत करें',
    highlight: '3 वाक्यों का नियम',
    text: 'जब भी कोई नया शब्द या मुहावरा सीखें, उसी दिन उसके 3 अलग-अलग वाक्य बोलकर अभ्यास करें। बोलकर इस्तेमाल करने से शब्द हमेशा के लिए याद हो जाते हैं।',
  },
  {
    tag: 'स्पष्टता और गति',
    highlight: 'बोलने की गति थोड़ी धीमी रखें',
    text: 'तेज बोलने से अक्सर जबान लड़खड़ाती है। अपनी गति 10% धीमी करें; इससे उच्चारण साफ निकलता है, गलतियां कम होती हैं और बात प्रभावशाली लगती है।',
  },
];

export default function DashboardPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [stats, setStats] = useState({
    totalSessions: 14,
    avgScore: 82,
    streakDays: 4,
    bestScore: 94,
  });

  const supabase = createClient();

  useEffect(() => {
    async function loadSessions() {
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const { data } = await supabase
            .from('sessions')
            .select('*')
            .order('created_at', { ascending: false });

          if (data && data.length > 0) {
            setSessions(data);
            const total = data.length;
            const avg = Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / total);
            const best = Math.max(...data.map((d) => d.score));
            setStats((prev) => ({
              ...prev,
              totalSessions: total,
              avgScore: avg,
              bestScore: best,
            }));
          }
        }
      } catch (err) {
        console.log('Error loading sessions:', err);
      }
    }
    loadSessions();
  }, []);

  // Mock progress chart data if sessions are empty or for preview
  const chartData = sessions.length > 0
    ? sessions.slice(0, 10).reverse().map((s, idx) => ({
      name: `S${idx + 1}`,
      score: s.score,
      date: new Date(s.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    }))
    : [
      { name: 'Mon', score: 68, date: 'Sep 11' },
      { name: 'Tue', score: 74, date: 'Sep 12' },
      { name: 'Wed', score: 78, date: 'Sep 13' },
      { name: 'Thu', score: 81, date: 'Sep 14' },
      { name: 'Fri', score: 85, date: 'Sep 15' },
      { name: 'Sat', score: 88, date: 'Sep 16' },
      { name: 'Sun', score: 92, date: 'Sep 17' },
    ];

  const recentList = sessions.length > 0
    ? sessions.slice(0, 4)
    : [
      {
        id: '1',
        topic: 'Describe your favorite holiday or travel experience',
        score: 88,
        vocabulary_level: 'Advanced',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        topic: 'Talk about your daily routine and work-life balance',
        score: 82,
        vocabulary_level: 'Intermediate',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        topic: 'Explain the importance of education in modern society',
        score: 76,
        vocabulary_level: 'Intermediate',
        created_at: new Date(Date.now() - 172800000).toISOString(),
      },
    ];

  return (
    <main className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Welcome, Naresh Kumar! to your <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your speaking progress, practice trends, and session history
          </p>
        </div>

        <Link href="/practice">
          <Button size="lg" className="glow-shadow">
            <Mic className="w-5 h-5" />
            Start New Practice
          </Button>
        </Link>
      </div>

      {/* Daily Tip for Speaking Banner */}
      <Card className="relative overflow-hidden p-5 sm:p-6 border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/[0.03] to-transparent dark:from-amber-500/15 dark:via-amber-500/[0.04] dark:to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20 shadow-sm shadow-amber-500/10">
              <Lightbulb className="w-5 h-5 fill-amber-500/20 text-amber-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                  दैनिक स्पीकिंग टिप
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  • {SPEAKING_TIPS[currentTipIndex].tag}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-white">
                  "{SPEAKING_TIPS[currentTipIndex].highlight}:
                </span>{' '}
                {SPEAKING_TIPS[currentTipIndex].text}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <span className="text-xs text-slate-400 font-medium">
              {currentTipIndex + 1}/{SPEAKING_TIPS.length}
            </span>
            <button
              type="button"
              onClick={() => setCurrentTipIndex((prev) => (prev + 1) % SPEAKING_TIPS.length)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              अगली टिप
            </button>
          </div>
        </div>
      </Card>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Sessions
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.totalSessions}
            </p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Average Score
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.avgScore} <span className="text-xs font-semibold text-slate-400">/100</span>
            </p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Daily Streak
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.streakDays} Days
            </p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Best Score
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {stats.bestScore} <span className="text-xs font-semibold text-slate-400">/100</span>
            </p>
          </div>
        </Card>
      </div>

      {/* Progress Chart & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Card */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Speaking Score Trend Over Time
            </h2>
            <span className="text-xs text-slate-400">Last 7 Sessions</span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#6366f1' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Level & Target Card */}
        <Card className="p-6 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
              Current Fluency Tier
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              B2 — Upper Intermediate
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              You are communicating smoothly! 3 more sessions with score &gt; 85 will unlock C1 Advanced status.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Goal to C1 Tier</span>
              <span className="text-indigo-500">75%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-3/4 rounded-full" />
            </div>
          </div>

          <Link href="/practice" className="w-full">
            <Button variant="outline" className="w-full">
              Practice Next Goal
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </Card>
      </div>

      {/* Recent Practice Sessions */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            Recent Practice Sessions
          </h2>
          <Link href="/history" className="text-xs font-semibold text-indigo-500 hover:underline">
            View All History &rarr;
          </Link>
        </div>

        <div className="space-y-3">
          {recentList.map((session) => (
            <div
              key={session.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/30 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    "{session.topic}"
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(session.created_at).toLocaleDateString()}
                  </span>
                  <Badge level={session.vocabulary_level || 'Intermediate'} />
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    {session.score}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold block">Score</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
