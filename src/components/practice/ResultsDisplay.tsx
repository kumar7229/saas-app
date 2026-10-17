'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  BookOpen, 
  Activity, 
  Lightbulb, 
  Mic, 
  RotateCcw,
  ArrowRight,
  Volume2
} from 'lucide-react';

export interface GrammarError {
  original: string;
  correction: string;
  explanation: string;
}

export interface AIAnalysisResult {
  score: number;
  grammarErrors: GrammarError[];
  vocabularyLevel: 'Basic' | 'Intermediate' | 'Advanced';
  fluencyScore: number;
  pronunciationTips: string[];
  tips: string[];
}

interface ResultsDisplayProps {
  topic: string;
  transcript: string;
  analysis: AIAnalysisResult;
  onPracticeAgain: () => void;
  onSaveSession?: () => void;
}

export function ResultsDisplay({
  topic,
  transcript,
  analysis,
  onPracticeAgain,
  onSaveSession,
}: ResultsDisplayProps) {
  // Function to highlight grammar errors in the user transcript
  const renderHighlightedTranscript = () => {
    if (!analysis.grammarErrors || analysis.grammarErrors.length === 0) {
      return (
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          "{transcript}"
        </p>
      );
    }

    let text = transcript;
    let parts: React.ReactNode[] = [];

    // Simple highlight mapper
    analysis.grammarErrors.forEach((err, idx) => {
      const regex = new RegExp(`(${err.original})`, 'gi');
      text = text.replace(regex, `___ERR_${idx}___`);
    });

    const splitParts = text.split(/(___ERR_\d+___)/g);

    splitParts.forEach((part, i) => {
      const match = part.match(/___ERR_(\d+)___/);
      if (match) {
        const errorIndex = parseInt(match[1], 10);
        const errObj = analysis.grammarErrors[errorIndex];
        parts.push(
          <span
            key={i}
            className="group relative inline-block mx-0.5 px-1 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold underline decoration-wavy decoration-rose-500 cursor-help"
          >
            {errObj.original}
            {/* Tooltip Hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl z-20 pointer-events-none">
              <span className="font-bold text-emerald-400 block mb-1">
                Correction: {errObj.correction}
              </span>
              <span className="text-slate-300 block">{errObj.explanation}</span>
            </span>
          </span>
        );
      } else {
        parts.push(<span key={i}>{part}</span>);
      }
    });

    return <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{parts}</div>;
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header & Overview */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          AI Analysis Complete
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Practice Results Dashboard
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Topic: <span className="font-semibold text-slate-700 dark:text-slate-200">"{topic}"</span>
        </p>
      </div>

      {/* Main Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score Circle */}
        <Card className="flex flex-col items-center justify-center p-6 text-center md:col-span-1">
          <CircularProgress score={analysis.score} size={170} />
          <div className="mt-4">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Performance Level
            </span>
            <p className="text-base font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {analysis.score >= 85
                ? '🌟 Excellent Speaker'
                : analysis.score >= 70
                ? '👍 Good Communication'
                : '📈 Room for Improvement'}
            </p>
          </div>
        </Card>

        {/* Breakdown Stats Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Vocabulary Card */}
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Vocabulary Usage
              </span>
              <BookOpen className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="mt-4">
              <Badge level={analysis.vocabularyLevel} className="text-sm px-3 py-1" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Evaluated from word range, collocations, and contextual depth.
              </p>
            </div>
          </Card>

          {/* Fluency Card */}
          <Card className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Fluency & Coherence
              </span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-4">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {analysis.fluencyScore} <span className="text-sm font-normal text-slate-400">/ 10</span>
                </span>
                <span className="text-xs font-semibold text-emerald-500">
                  {analysis.fluencyScore >= 8 ? 'Very Smooth' : 'Moderate Flow'}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${(analysis.fluencyScore / 10) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Grammar Errors Count Card */}
          <Card className="p-5 flex flex-col justify-between sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Grammar Status
              </span>
              {analysis.grammarErrors.length === 0 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-500" />
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {analysis.grammarErrors.length}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                  {analysis.grammarErrors.length === 0
                    ? 'No grammar errors found!'
                    : 'Grammar corrections identified'}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Transcript with Line-by-Line Grammar Annotations */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mic className="w-4 h-4 text-indigo-500" />
            Speech Transcript & Grammar Highlights
          </h3>
          <span className="text-xs text-slate-400">Hover error highlights for instant corrections</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 font-medium">
          {renderHighlightedTranscript()}
        </div>

        {/* Error Corrections List */}
        {analysis.grammarErrors.length > 0 && (
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Detailed Grammar Corrections
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {analysis.grammarErrors.map((err, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="line-through text-rose-600 dark:text-rose-400 font-semibold mr-2">
                      "{err.original}"
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 inline text-slate-400 mr-2" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      "{err.correction}"
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs italic">
                    {err.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Pronunciation & Actionable Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pronunciation Card */}
        <Card className="p-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Volume2 className="w-4 h-4 text-amber-500" />
            Pronunciation & Phonetic Advice
          </h3>
          <ul className="space-y-3">
            {analysis.pronunciationTips?.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* 3 Specific Actionable Improvement Tips */}
        <Card className="p-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-indigo-500" />
            3 Actionable Growth Tips
          </h3>
          <div className="space-y-3">
            {analysis.tips?.map((tip, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/15 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button size="lg" onClick={onPracticeAgain} className="w-full sm:w-auto px-8">
          <RotateCcw className="w-4 h-4" />
          Practice Another Topic
        </Button>
      </div>
    </div>
  );
}
