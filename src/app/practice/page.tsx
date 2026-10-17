'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TopicSelector } from '@/components/practice/TopicSelector';
import { WaveformVisualizer } from '@/components/practice/WaveformVisualizer';
import { ResultsDisplay, AIAnalysisResult } from '@/components/practice/ResultsDisplay';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Mic, Square, Sparkles, AlertCircle, ArrowLeft, Volume2, Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function PracticePage() {
  const [step, setStep] = useState<'topic' | 'recording' | 'results'>('topic');
  const [selectedTopic, setSelectedTopic] = useState('Describe your favorite holiday or travel experience');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [manualTranscript, setManualTranscript] = useState('');
  const [recordingError, setRecordingError] = useState('');

  // Practice countdown timer states
  const [selectedMinutes, setSelectedMinutes] = useState(2);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const handleSelectPreset = (minutes: number) => {
    setIsTimerRunning(false);
    setSelectedMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const handleStartTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(selectedMinutes * 60);
    }
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(selectedMinutes * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const supabase = createClient();

  const {
    isRecording,
    recordingTime,
    audioBlob,
    audioUrl,
    analyserNode,
    startRecording,
    stopRecording,
  } = useAudioRecorder();

  const {
    transcript,
    setTranscript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const handleTopicSelected = (topic: string) => {
    setSelectedTopic(topic);
    setStep('recording');
    setRecordingError('');
  };

  const handleStartSpeaking = () => {
    setRecordingError('');
    resetTranscript();
    startRecording();
    startListening();
  };

  const handleStopSpeaking = async () => {
    stopRecording();
    stopListening();
  };

  const handleAnalyze = async () => {
    const finalSpeechText = transcript || manualTranscript;
    if (!finalSpeechText || finalSpeechText.trim().length < 5) {
      setRecordingError('Please speak or type a longer transcript before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    setRecordingError('');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          transcript: finalSpeechText,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      setAnalysisResult(data);
      setStep('results');

      // Attempt to save to Supabase if authenticated
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          await supabase.from('sessions').insert({
            user_id: userData.user.id,
            topic: selectedTopic,
            transcript: finalSpeechText,
            score: data.score,
            grammar_errors: data.grammarErrors,
            vocabulary_level: data.vocabularyLevel,
            fluency_score: data.fluencyScore,
            tips: data.tips,
            pronunciation_tips: data.pronunciationTips,
            duration_seconds: recordingTime,
          });
        }
      } catch (err) {
        console.log('Session save skipped:', err);
      }
    } catch (err: any) {
      setRecordingError(err.message || 'Failed to generate AI analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePracticeAgain = () => {
    setStep('topic');
    setAnalysisResult(null);
    resetTranscript();
    setManualTranscript('');
  };

  return (
    <main className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Topic Selection Step */}
      {step === 'topic' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Choose a Conversation Topic
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Select a suggested topic card below or type your custom prompt to begin.
            </p>
          </div>

          {/* Practice Countdown Timer Card */}
          <Card className="p-4 sm:p-5 border border-indigo-500/20 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isTimerRunning
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/30 animate-pulse'
                      : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                  }`}
                >
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Practice Timer
                    </span>
                    {timeLeft === 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Time's Up!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Set your speech duration & challenge yourself
                  </p>
                </div>
              </div>

              {/* Presets: 1 Min, 2 Min, 5 Min */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                {[1, 2, 5].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => handleSelectPreset(mins)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedMinutes === mins
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {mins} Min
                  </button>
                ))}
              </div>

              {/* Countdown Display & Action Controls */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl font-mono font-black tracking-wider transition-colors ${
                    timeLeft <= 10 && timeLeft > 0
                      ? 'text-rose-500 animate-pulse'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {formatTimer(timeLeft)}
                </span>

                <div className="flex items-center gap-1.5">
                  {!isTimerRunning ? (
                    <Button
                      size="sm"
                      onClick={handleStartTimer}
                      className="px-3.5 py-1.5 text-xs flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handlePauseTimer}
                      className="px-3.5 py-1.5 text-xs border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 flex items-center gap-1.5"
                    >
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      Pause
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleResetTimer}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <TopicSelector
            selectedTopic={selectedTopic}
            onSelectTopic={handleTopicSelected}
          />
        </div>
      )}

      {/* Recording Step */}
      {step === 'recording' && (
        <div className="max-w-3xl mx-auto space-y-8">
          <button
            onClick={() => setStep('topic')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Topic Selection
          </button>

          <Card className="p-8 text-center space-y-6 relative overflow-hidden">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
                Selected Topic
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                "{selectedTopic}"
              </h2>
            </div>

            {/* Waveform Visualizer */}
            <WaveformVisualizer isRecording={isRecording} analyserNode={analyserNode} />

            {/* Timer Display */}
            <div className="text-3xl font-mono font-bold text-slate-800 dark:text-slate-200">
              00:{recordingTime < 10 ? `0${recordingTime}` : recordingTime}
            </div>

            {/* Record / Stop Button */}
            <div className="flex flex-col items-center justify-center gap-4">
              {!isRecording ? (
                <Button
                  size="lg"
                  onClick={handleStartSpeaking}
                  className="rounded-full w-20 h-20 flex items-center justify-center p-0 shadow-xl shadow-indigo-500/30 glow-shadow scale-105"
                >
                  <Mic className="w-8 h-8" />
                </Button>
              ) : (
                <Button
                  variant="danger"
                  size="lg"
                  onClick={handleStopSpeaking}
                  className="rounded-full w-20 h-20 flex items-center justify-center p-0 shadow-xl shadow-rose-500/30 animate-pulse"
                >
                  <Square className="w-8 h-8 fill-current" />
                </Button>
              )}
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {isRecording ? 'Recording live... Click square to stop' : 'Click microphone to start speaking'}
              </span>
            </div>

            {/* Audio Preview playback */}
            {audioUrl && !isRecording && (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-indigo-500" />
                  Your Audio Playback
                </span>
                <audio src={audioUrl} controls className="h-8 max-w-xs" />
              </div>
            )}

            {/* Transcript Box */}
            <div className="text-left space-y-2 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Live Speech Transcript
                </label>
                <span className="text-[10px] text-slate-400">Edit or type directly if needed</span>
              </div>
              <textarea
                rows={4}
                value={transcript || manualTranscript}
                onChange={(e) => {
                  setManualTranscript(e.target.value);
                  if (transcript) setTranscript(e.target.value);
                }}
                placeholder="Your spoken words will automatically transcribe here as you speak..."
                className="w-full p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {recordingError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center justify-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4" />
                {recordingError}
              </div>
            )}

            {/* Analyze Button */}
            <Button
              size="lg"
              disabled={isAnalyzing || isRecording}
              onClick={handleAnalyze}
              className="w-full py-4 text-base glow-shadow"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Analyzing with Gemini AI...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Analyze Speech & Get Feedback
                </span>
              )}
            </Button>
          </Card>
        </div>
      )}

      {/* Results Step */}
      {step === 'results' && analysisResult && (
        <ResultsDisplay
          topic={selectedTopic}
          transcript={transcript || manualTranscript}
          analysis={analysisResult}
          onPracticeAgain={handlePracticeAgain}
        />
      )}
    </main>
  );
}
