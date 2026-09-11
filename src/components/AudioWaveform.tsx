import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
  color?: string;
  barCount?: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording,
  color = '#8f3a3a',
  barCount = 28,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isRecording) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (sourceRef.current) {
        try { sourceRef.current.disconnect(); } catch (_) {}
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (_) {}
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
      // Clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    let isCancelled = false;

    const startAudioStream = async () => {
      let dataArray: Uint8Array | null = null;

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          if (isCancelled) {
            stream.getTracks().forEach(t => t.stop());
            return;
          }
          mediaStreamRef.current = stream;

          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;

          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.8;
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          sourceRef.current = source;

          dataArray = new Uint8Array(analyser.frequencyBinCount);
        }
      } catch (err) {
        // Fallback to simulated dynamic visualizer if mic permission or context fails
        console.info('Audio visualizer falling back to dynamic simulated waveform', err);
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let tick = 0;

      const draw = () => {
        if (!isRecording || isCancelled) return;

        animationFrameId.current = requestAnimationFrame(draw);
        tick += 0.08;

        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        if (analyserRef.current && dataArray) {
          analyserRef.current.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);
        }

        const barWidth = Math.max(2, (width / barCount) - 3);
        const halfHeight = height / 2;

        for (let i = 0; i < barCount; i++) {
          let magnitude = 0.15;

          if (analyserRef.current && dataArray) {
            const dataIndex = Math.floor((i / barCount) * dataArray.length);
            magnitude = (dataArray[dataIndex] || 20) / 255;
          } else {
            // Harmonic simulated waveform
            const sinWave = Math.sin(tick + i * 0.45) * 0.4 + 0.5;
            const cosWave = Math.cos(tick * 1.5 + i * 0.2) * 0.3;
            magnitude = Math.max(0.12, Math.min(0.95, (sinWave + cosWave) * 0.7));
          }

          const barHeight = Math.max(4, magnitude * (height - 6));
          const x = i * (barWidth + 3) + 2;
          const y = halfHeight - (barHeight / 2);

          // Rounded bars
          ctx.fillStyle = color;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, barWidth, barHeight, 2);
          } else {
            ctx.rect(x, y, barWidth, barHeight);
          }
          ctx.fill();
        }
      };

      draw();
    };

    startAudioStream();

    return () => {
      isCancelled = true;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try { audioContextRef.current.close(); } catch (_) {}
      }
    };
  }, [isRecording, color, barCount]);

  return (
    <div className="w-full flex items-center justify-center py-2">
      <canvas
        ref={canvasRef}
        width={320}
        height={48}
        className="w-full max-w-xs h-12 rounded-lg bg-black/5"
      />
    </div>
  );
};
