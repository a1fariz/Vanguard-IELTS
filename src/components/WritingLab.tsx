import React, { useState, useEffect, useMemo } from 'react';
import { WRITING_PROMPTS } from '../data/academicLessons';
import type { WritingTaskPrompt } from '../types';

interface WritingLabProps {
  onAddExp: (amount: number) => void;
  onEssayDrafted: () => void;
}

export const WritingLab: React.FC<WritingLabProps> = ({ onAddExp, onEssayDrafted }) => {
  const [selectedPrompt, setSelectedPrompt] = useState<WritingTaskPrompt>(WRITING_PROMPTS[0]);
  const [userEssay, setUserEssay] = useState<string>('');
  const [timerSeconds, setTimerSeconds] = useState<number>(selectedPrompt.timeLimitMinutes * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [showBand9Model, setShowBand9Model] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<{
    wordCount: number;
    lexicalScore: number;
    cohesionScore: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    feedback: string[];
  } | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds]);

  const handlePromptChange = (prompt: WritingTaskPrompt) => {
    setSelectedPrompt(prompt);
    setUserEssay('');
    setTimerSeconds(prompt.timeLimitMinutes * 60);
    setTimerActive(false);
    setShowBand9Model(false);
    setAnalysisResult(null);
  };

  const wordCount = userEssay.trim() ? userEssay.trim().split(/\s+/).length : 0;

  // Realtime Lexical & Cohesion Heatmap Analysis
  const heatmapData = useMemo(() => {
    if (!userEssay.trim()) return { transitions: [], awlMatches: [], repetitiveWords: [] };

    const lower = userEssay.toLowerCase();
    const transitionsList = ['furthermore', 'moreover', 'on the other hand', 'in conclusion', 'consequently', 'not only', 'whereas', 'although', 'for instance', 'in addition'];
    const foundTransitions = transitionsList.filter(t => lower.includes(t));

    const foundAWL = selectedPrompt.keyVocabulary.filter(kw => lower.includes(kw.toLowerCase()));

    // Word frequency map for repetition detection
    const wordList = lower.replace(/[^a-zA-Z\s]/g, '').split(/\s+/).filter(w => w.length > 3);
    const freq: Record<string, number> = {};
    wordList.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const overused = Object.entries(freq).filter(([_, count]) => count >= 4).map(([w, count]) => `${w} (${count}x)`);

    return {
      transitions: foundTransitions,
      awlMatches: foundAWL,
      repetitiveWords: overused,
    };
  }, [userEssay, selectedPrompt]);

  const handleAnalyzeEssay = () => {
    if (wordCount < 30) {
      alert('Tuliskan setidaknya 30 kata untuk menganalisis esai akademik Anda.');
      return;
    }

    const lowerEssay = userEssay.toLowerCase();
    const matched: string[] = [];
    const missing: string[] = [];

    selectedPrompt.keyVocabulary.forEach(kw => {
      if (lowerEssay.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    });

    const discourseMarkers = ['furthermore', 'moreover', 'on the other hand', 'in conclusion', 'consequently', 'not only', 'it is undeniable that'];
    const matchedMarkers = discourseMarkers.filter(m => lowerEssay.includes(m));

    const wordTargetMet = wordCount >= selectedPrompt.wordCountMin;
    const lexicalScore = Math.min(9.0, Number((6.0 + (matched.length / selectedPrompt.keyVocabulary.length) * 2.5).toFixed(1)));
    const cohesionScore = Math.min(9.0, Number((6.0 + (matchedMarkers.length / 4) * 2.5).toFixed(1)));

    const feedback: string[] = [];
    if (!wordTargetMet) {
      feedback.push(`Jumlah kata: ${wordCount}/${selectedPrompt.wordCountMin}. Dalam ujian resmi IELTS, esai di bawah batas minimal akan terkena penalti nilai Task Response.`);
    } else {
      feedback.push(`Target jumlah kata terpenuhi (${wordCount} kata).`);
    }

    if (matched.length >= 3) {
      feedback.push(`Kosakata akademik C1 terdeteksi (${matched.length} kosakata kunci).`);
    } else {
      feedback.push(`Tambahkan variasi kosakata akademik target: ${missing.slice(0, 2).join(', ')}.`);
    }

    if (heatmapData.repetitiveWords.length > 0) {
      feedback.push(`Perhatian: Terdapat pengulangan kata berlebih (${heatmapData.repetitiveWords.join(', ')}). Gunakan parafrase sinonim.`);
    }

    setAnalysisResult({
      wordCount,
      lexicalScore,
      cohesionScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      feedback,
    });

    onAddExp(100);
    onEssayDrafted();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono-code text-[#6b675e] uppercase block">
            Evaluasi Penulisan Esai IELTS Task 1 & 2
          </span>
          <h1 className="text-xl font-bold text-[#21201c]">
            Studio Esai & Deteksi Kohesi Realtime
          </h1>
        </div>

        <button
          onClick={() => setTimerActive(!timerActive)}
          className={`px-3.5 py-1.5 rounded-md border font-mono-code text-xs font-medium transition-colors ${
            timerActive ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7]' : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
          }`}
        >
          {formatTime(timerSeconds)} ({timerActive ? 'Jeda' : 'Mulai Timer Ujian'})
        </button>
      </div>

      {/* Prompts Bar */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {WRITING_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => handlePromptChange(prompt)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 border ${
              selectedPrompt.id === prompt.id
                ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7]'
                : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            [{prompt.type.toUpperCase()}] {prompt.title}
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Prompt (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="clean-surface p-5 space-y-3 text-xs">
            <span className="font-mono-code text-[#6b675e] uppercase block">Soal Ujian Resmi:</span>
            <p className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e1] text-[#21201c] leading-relaxed">
              {selectedPrompt.prompt}
            </p>

            <div className="space-y-1 pt-1">
              <span className="font-semibold text-[#21201c] block">Kosakata Target:</span>
              <div className="flex flex-wrap gap-1">
                {selectedPrompt.keyVocabulary.map((kw, idx) => (
                  <span key={idx} className="bg-[#f4f2ee] border border-[#e8e6e1] px-2 py-0.5 rounded text-[#21201c]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Realtime Heatmap Indicator */}
            <div className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e1] space-y-1.5">
              <span className="font-semibold text-[#21201c] block text-[11px]">Indikator Realtime:</span>
              <div className="text-[#6b675e] text-[11px] space-y-0.5">
                <div>Penghubung Transisi: <strong className="text-[#21201c]">{heatmapData.transitions.length} ditemukan</strong></div>
                <div>Kosakata C1 Terpakai: <strong className="text-[#21201c]">{heatmapData.awlMatches.length} kata</strong></div>
                {heatmapData.repetitiveWords.length > 0 && (
                  <div className="text-[#8f3a3a]">Pengulangan Kata: {heatmapData.repetitiveWords.join(', ')}</div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-[#e8e6e1]">
              <button
                onClick={() => setShowBand9Model(!showBand9Model)}
                className="w-full py-2 border border-[#e8e6e1] rounded hover:bg-[#f4f2ee] text-[#21201c] text-xs font-medium"
              >
                {showBand9Model ? 'Tutup Contoh Model' : 'Lihat Contoh Model Esai Band 9.0'}
              </button>
            </div>
          </div>

          {showBand9Model && (
            <div className="clean-surface p-5 space-y-2 text-xs font-reading leading-relaxed">
              <span className="font-mono-code text-[11px] text-[#6b675e] uppercase block font-sans">Model Esai Band 9.0:</span>
              <p><strong>Introduction:</strong> {selectedPrompt.band9Sample.introduction}</p>
              <p><strong>Body 1:</strong> {selectedPrompt.band9Sample.overviewOrBody1}</p>
              <p><strong>Body 2:</strong> {selectedPrompt.band9Sample.body2}</p>
              {selectedPrompt.band9Sample.conclusion && (
                <p><strong>Conclusion:</strong> {selectedPrompt.band9Sample.conclusion}</p>
              )}
            </div>
          )}
        </div>

        {/* Right: Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="clean-surface p-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#21201c]">Lembar Menulis</span>
              <span className="font-mono-code text-[#6b675e]">
                {wordCount} / {selectedPrompt.wordCountMin} kata minimal
              </span>
            </div>

            <textarea
              rows={12}
              value={userEssay}
              onChange={(e) => setUserEssay(e.target.value)}
              placeholder="Ketik esai bahasa Inggris akademik Anda di sini..."
              className="w-full p-3 bg-white border border-[#e8e6e1] rounded-md text-xs sm:text-sm text-[#21201c] leading-relaxed focus:outline-none focus:border-[#21201c]"
            />

            <div className="flex justify-between items-center pt-1">
              <button
                onClick={() => setUserEssay('')}
                className="text-xs text-[#6b675e] hover:text-[#21201c]"
              >
                Bersihkan
              </button>

              <button
                onClick={handleAnalyzeEssay}
                className="px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
              >
                Analisis Kualitas Esai
              </button>
            </div>
          </div>

          {analysisResult && (
            <div className="clean-surface p-5 space-y-3 text-xs">
              <span className="font-mono-code text-[#6b675e] uppercase block">Hasil Penilaian Diagnostik</span>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-[#f4f2ee] rounded border border-[#e8e6e1]">
                  <span className="text-[10px] text-[#6b675e] block">Kosakata (Lexical)</span>
                  <span className="text-sm font-bold text-[#21201c]">Band {analysisResult.lexicalScore}</span>
                </div>
                <div className="p-2.5 bg-[#f4f2ee] rounded border border-[#e8e6e1]">
                  <span className="text-[10px] text-[#6b675e] block">Kohesi (Cohesion)</span>
                  <span className="text-sm font-bold text-[#21201c]">Band {analysisResult.cohesionScore}</span>
                </div>
                <div className="p-2.5 bg-[#f4f2ee] rounded border border-[#e8e6e1]">
                  <span className="text-[10px] text-[#6b675e] block">Total Kata</span>
                  <span className="text-sm font-bold text-[#21201c]">{analysisResult.wordCount}</span>
                </div>
              </div>

              <div className="space-y-1 bg-[#f4f2ee] p-3 rounded border border-[#e8e6e1] text-[#6b675e]">
                {analysisResult.feedback.map((fb, idx) => (
                  <div key={idx}>• {fb}</div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

