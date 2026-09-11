import React, { useState } from 'react';
import { Volume2, Mic, Square } from 'lucide-react';
import { SHADOWING_EXERCISES } from '../data/gamifiedFeaturesData';
import type { ShadowingExercise } from '../types';
import { speakText, stopSpeaking, getGlobalAccent } from '../utils/speech';
import { AudioWaveform } from './AudioWaveform';

interface ShadowingStudioProps {
  onAddExp: (amount: number) => void;
  onCompleteShadowing: () => void;
}

export const ShadowingStudio: React.FC<ShadowingStudioProps> = ({ onAddExp, onCompleteShadowing }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [userTranscript, setUserTranscript] = useState<string>('');
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const [scoreResult, setScoreResult] = useState<{
    accuracyScore: number;
    matchedWords: string[];
    missingWords: string[];
    feedbackId: string;
  } | null>(null);

  const activeExercise: ShadowingExercise = SHADOWING_EXERCISES[currentIdx];

  const handlePlayModelAudio = (slow: boolean = false) => {
    speakText(activeExercise.audioText, getGlobalAccent(), slow ? 0.6 : 0.76);
  };

  const handleStartRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Browser Anda belum mendukung Web Speech API untuk perekaman langsung. Coba di Google Chrome atau Microsoft Edge.');
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = getGlobalAccent();

      rec.onresult = (event: any) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript + ' ';
        }
        setUserTranscript(text);
      };

      rec.start();
      setIsRecording(true);
      setRecognitionInstance(rec);
      setScoreResult(null);
    } catch (e) {
      console.warn('Speech recognition error', e);
    }
  };

  const handleStopAndEvaluate = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsRecording(false);
    }

    if (!userTranscript.trim()) {
      alert('Belum ada suara yang terekam. Klik rekam dan ucapkan kalimatnya.');
      return;
    }

    const cleanModelWords = activeExercise.audioText.toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(/\s+/);
    const cleanUserWords = userTranscript.toLowerCase().replace(/[^a-zA-Z\s]/g, '').split(/\s+/);

    const matched: string[] = [];
    const missing: string[] = [];

    cleanModelWords.forEach(w => {
      if (cleanUserWords.includes(w)) {
        matched.push(w);
      } else {
        missing.push(w);
      }
    });

    const accuracy = Math.round((matched.length / cleanModelWords.length) * 100);
    let feedbackId = '';

    if (accuracy >= 80) {
      feedbackId = 'Pelafalan dan intonasi sangat jernih dan mendekati penutur asli!';
    } else if (accuracy >= 50) {
      feedbackId = 'Cukup bagus! Dengarkan ulang mode slow (0.6x) dan perhatikan artikulasi kata yang terlewat.';
    } else {
      feedbackId = 'Coba ucapkan lebih lantang dan ikuti ritme kalimat secara perlahan.';
    }

    setScoreResult({
      accuracyScore: accuracy,
      matchedWords: matched,
      missingWords: missing,
      feedbackId,
    });

    onAddExp(accuracy >= 70 ? 50 : 25);
    onCompleteShadowing();
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-4 sm:p-6 space-y-1">
        <span className="text-[11px] font-mono-code text-[#c97a3e] uppercase block">
          Voice Shadowing & Intonation Trainer
        </span>
        <h1 className="text-lg sm:text-xl font-bold text-[#21201c]">
          Studio Shadowing Intonasi Native
        </h1>
        <p className="text-xs text-[#6b675e]">
          Dengarkan audio penutur asli wanita yang pelan dan jernih, lalu langsung tirukan intonasi dan ritmenya untuk melatih artikulasi vokal alami.
        </p>
      </div>

      {/* Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {SHADOWING_EXERCISES.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => {
              setCurrentIdx(idx);
              setUserTranscript('');
              setScoreResult(null);
              stopSpeaking();
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
              currentIdx === idx
                ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7] font-semibold'
                : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            [{ex.level}] {ex.titleId}
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
        
        {/* Model Sentence Audio Player */}
        <div className="clean-surface-subtle p-3.5 sm:p-5 rounded-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <span className="font-mono-code text-[#c97a3e] font-semibold">
              Kategori: {activeExercise.category}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handlePlayModelAudio(false)}
                className="px-3 py-1.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded text-xs font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar Suara Normal</span>
              </button>
              <button
                onClick={() => handlePlayModelAudio(true)}
                className="px-3 py-1.5 bg-white border border-[#e8e6e1] hover:bg-[#eae7df] text-[#21201c] rounded text-xs font-medium flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 opacity-70" />
                <span>0.6x (Lambat)</span>
              </button>
            </div>
          </div>

          <p className="text-base sm:text-xl font-bold text-[#21201c] font-reading leading-relaxed">
            "{activeExercise.audioText}"
          </p>

          <p className="text-xs text-[#6b675e] italic">
            Artinya: {activeExercise.translationId}
          </p>

          <div className="pt-2 border-t border-[#e8e6e1] text-[11px] text-[#6b675e]">
            <strong>Tips Intonasi:</strong> {activeExercise.intonationTipId}
          </div>
        </div>

        {/* Recorder Box */}
        <div className="clean-surface-subtle p-4 sm:p-5 rounded-lg text-center space-y-3">
          <span className="text-xs font-semibold text-[#21201c] block">
            Giliran Anda: Tirukan Kalimat di Atas
          </span>

          {/* Realtime Audio Waveform Visualizer */}
          <AudioWaveform isRecording={isRecording} color="#8f3a3a" />

          <div className="flex justify-center gap-2">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="px-5 py-2.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold flex items-center gap-2 shadow-2xs transition-all active:scale-95"
              >
                <Mic className="w-4 h-4 text-[#c97a3e]" />
                <span>Mulai Rekam Suara Anda</span>
              </button>
            ) : (
              <button
                onClick={handleStopAndEvaluate}
                className="px-5 py-2.5 bg-[#8f3a3a] hover:bg-[#a64242] text-white rounded-md text-xs font-semibold flex items-center gap-2 animate-pulse shadow-md"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Hentikan & Evaluasi Pelafalan</span>
              </button>
            )}
          </div>

          {isRecording && (
            <div className="text-xs text-[#8f3a3a] font-mono-code font-medium flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8f3a3a] animate-ping" />
              <span>Merekam... Ucapkan kalimat dengan intonasi natural</span>
            </div>
          )}

          {userTranscript && (
            <div className="p-3 bg-white rounded border border-[#e8e6e1] text-xs space-y-1 text-left max-w-xl mx-auto">
              <span className="font-semibold text-[#6b675e] block text-[10px] uppercase font-mono-code">Suara Terdeteksi:</span>
              <p className="text-[#21201c] font-reading text-sm italic">
                "{userTranscript}"
              </p>
            </div>
          )}
        </div>

        {/* Score Breakdown */}
        {scoreResult && (
          <div className="clean-surface-subtle p-5 rounded-lg space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-[#e8e6e1] pb-2">
              <span className="font-bold text-sm text-[#21201c]">Hasil Evaluasi Shadowing</span>
              <span className="font-mono-code text-sm font-bold text-[#c97a3e]">
                Skor Akurasi: {scoreResult.accuracyScore}%
              </span>
            </div>

            <p className="text-[#21201c] font-medium">
              {scoreResult.feedbackId}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 bg-white rounded border border-[#e8e6e1]">
                <span className="text-[#2f7a42] font-bold block mb-1">Kata Tepat Dilafalkan:</span>
                <span className="text-[#6b675e]">{scoreResult.matchedWords.join(', ') || '-'}</span>
              </div>
              <div className="p-2.5 bg-white rounded border border-[#e8e6e1]">
                <span className="text-[#8f3a3a] font-bold block mb-1">Kata Perlu Latihan:</span>
                <span className="text-[#6b675e]">{scoreResult.missingWords.join(', ') || 'Semua tepat!'}</span>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
