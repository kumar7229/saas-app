'use client';

import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isRecording: boolean;
  analyserNode: AnalyserNode | null;
}

export function WaveformVisualizer({ isRecording, analyserNode }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bufferLength = analyserNode ? analyserNode.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationId = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (isRecording && analyserNode) {
        analyserNode.getByteFrequencyData(dataArray);
      } else if (isRecording) {
        // Fallback synthetic wave simulation if Web Audio Analyser is unavailable
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.floor(Math.sin(Date.now() / 200 + i) * 60 + 80);
        }
      } else {
        // Idle flat bars
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = 12;
        }
      }

      const barWidth = (width / bufferLength) * 1.5;
      let x = (width - barWidth * bufferLength) / 2;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.85 + 4;

        // Gradient styling
        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(0.5, '#8b5cf6');
        gradient.addColorStop(1, '#ec4899');

        ctx.fillStyle = isRecording ? gradient : '#64748b33';
        ctx.beginPath();
        ctx.roundRect(x, (height - barHeight) / 2, barWidth - 3, barHeight, 4);
        ctx.fill();

        x += barWidth;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRecording, analyserNode]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <canvas
        ref={canvasRef}
        width={480}
        height={90}
        className="w-full max-w-lg h-24 rounded-2xl glass-card border border-indigo-500/20"
      />
    </div>
  );
}
