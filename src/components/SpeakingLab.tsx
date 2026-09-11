import React, { useState, useEffect } from 'react';
import { SPEAKING_CUE_CARDS } from '../data/academicLessons';
import type { SpeakingCueCard } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

interface SpeakingLabProps {
  onAddExp: (amount: number) => void;
  onSpeakingComplete: () => void;
  onAddMistake: (type: 'vocabulary' | 'grammar' | 'reading' | 'listening', title: string, answer: string, noteId: string) => void;
}

export const SpeakingLab: React.FC<SpeakingLabProps> = ({ onAddExp, onSpeakingComplete }) => {
  const [selectedCard, setSelectedCard] = useState<SpeakingCueCard>(SPEAKING_CUE_CARDS[0]);
  const [prepSeconds, setPrepSeconds] = useState<number>(60);
  const [speakSeconds, setSpeakSeconds] = useState<number>(120);
  const [phase, setPhase] = useState<'idle' | 'prep' | 'speaking' | 'review'>('idle');
  const [showSample, setShowSample] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  // Live Speech Recognition States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);

  // Timer Tick
  useEffect(() => {
    let timer: any = null;
    if (phase === 'prep') {
      if (prepSeconds > 0) {
        timer = setInterval(() => setPrepSeconds(s => s - 1), 1000);
      } else {
        setPhase('speaking');
        startSpeechRecognition();
      }
    } else if (phase === 'speaking') {
      if (speakSeconds > 0) {
        timer = setInterval(() => setSpeakSeconds(s => s - 1), 1000);
      } else {
        finishSpeaking();
      }
    }
    return () => clearInterval(timer);
  }, [phase, prepSeconds, speakSeconds]);

  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentText);
      };

      rec.start();
      setIsRecording(true);
      setRecognitionInstance(rec);
    } catch (e) {
      console.warn('Speech recognition not available or active', e);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionInstance) {
      recognitionInstance.stop();
      setIsRecording(false);
    }
  };

  const startPreparation = () => {
    setPrepSeconds(60);
    setSpeakSeconds(120);
    setTranscript('');
    setPhase('prep');
    setShowSample(false);
  };

  const finishSpeaking = () => {
    stopSpeechRecognition();
    setPhase('review');
    onAddExp(80);
    onSpeakingComplete();
  };

  const handlePronouncePhrase = (phrase: string) => {
    speakText(phrase);
  };

  const handleReadSampleAloud = () => {
    if (isSynthesizing) {
      stopSpeaking();
      setIsSynthesizing(false);
    } else {
      setIsSynthesizing(true);
      speakText(selectedCard.band8SampleAnswer);
    }
  };

  // Filler words analysis
  const words = transcript.trim() ? transcript.trim().split(/\s+/) : [];
  const fillerPatterns = ['um', 'uh', 'like', 'actually', 'basically', 'you know', 'sort of'];
  const detectedFillers = words.filter(w => fillerPatterns.includes(w.toLowerCase()));
  const elapsedMinutes = (120 - speakSeconds) / 60;
  const wpm = elapsedMinutes > 0 ? Math.round(words.length / elapsedMinutes) : 0;

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-6 space-y-1">
        <span className="text-[11px] font-mono-code text-[#6b675e] uppercase block">
          Studio Latihan Speaking Part 2 & 3
        </span>
        <h1 className="text-xl font-bold text-[#21201c]">
          Simulasi Kartu Soal & Deteksi Kelancaran Suara
        </h1>
        <p className="text-xs text-[#6b675e]">
          Latihan 1 menit persiapan catatan dan 2 menit berbicara dengan transkrip suara langsung dan deteksi kata jeda (filler words).
        </p>
      </div>

      {/* Topics */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SPEAKING_CUE_CARDS.map((card) => (
          <button
            key={card.id}
            onClick={() => {
              setSelectedCard(card);
              setPhase('idle');
              setShowSample(false);
              stopSpeechRecognition();
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 border ${
              selectedCard.id === card.id
                ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7]'
                : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            Part {card.part} • {card.topic}
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Cue Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="clean-surface p-6 space-y-4">
            <div className="border-b border-[#e8e6e1] pb-2 text-xs">
              <span className="font-mono-code text-[#6b675e] uppercase">
                Kartu Soal Ujian (Part {selectedCard.part})
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-base font-bold text-[#21201c]">
                {selectedCard.title}
              </h2>
              <div className="p-3.5 bg-[#f4f2ee] rounded border border-[#e8e6e1] text-xs sm:text-sm text-[#21201c] whitespace-pre-line leading-relaxed">
                {selectedCard.prompt}
              </div>
            </div>

            {/* Bullet Points */}
            {selectedCard.bulletPoints && (
              <div className="space-y-1 pt-1 text-xs">
                <span className="font-semibold text-[#21201c] block">Poin-poin yang wajib disampaikan:</span>
                <ul className="text-[#6b675e] space-y-1">
                  {selectedCard.bulletPoints.map((bp, i) => (
                    <li key={i}>[{i + 1}] {bp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Controls */}
            <div className="pt-4 border-t border-[#e8e6e1]">
              {phase === 'idle' && (
                <button
                  onClick={startPreparation}
                  className="w-full py-2.5 bg-[#21201c] text-[#faf9f7] rounded-md font-medium text-xs transition-colors"
                >
                  Mulai 1 Menit Waktu Persiapan
                </button>
              )}

              {phase === 'prep' && (
                <div className="p-4 bg-[#f4f2ee] rounded border border-[#e8e6e1] text-center space-y-2">
                  <span className="text-xs font-mono-code uppercase text-[#6b675e] block">
                    Waktu Persiapan Catatan:
                  </span>
                  <div className="font-mono-code text-2xl font-bold text-[#21201c]">
                    00:{prepSeconds < 10 ? '0' : ''}{prepSeconds}
                  </div>
                  <button
                    onClick={() => {
                      setPhase('speaking');
                      startSpeechRecognition();
                    }}
                    className="px-3 py-1 bg-white border border-[#e8e6e1] text-xs font-medium text-[#21201c] rounded"
                  >
                    Mulai Berbicara Sekarang
                  </button>
                </div>
              )}

              {phase === 'speaking' && (
                <div className="p-4 bg-[#f4f2ee] rounded border border-[#21201c] text-center space-y-2">
                  <span className="text-xs font-mono-code uppercase text-[#21201c] block font-semibold">
                    Waktu Berbicara (Target 2 Menit):
                  </span>
                  <div className="font-mono-code text-2xl font-bold text-[#21201c]">
                    {Math.floor(speakSeconds / 60)}:{speakSeconds % 60 < 10 ? '0' : ''}{speakSeconds % 60}
                  </div>
                  <div className="text-[11px] text-[#6b675e]">
                    {isRecording ? 'Mendengarkan suara mikrofon Anda...' : 'Bicaralah dengan lantang di depan perangkat.'}
                  </div>
                  <button
                    onClick={finishSpeaking}
                    className="px-4 py-1.5 bg-[#21201c] text-[#faf9f7] text-xs font-medium rounded mx-auto"
                  >
                    Selesaikan Latihan Bicara
                  </button>
                </div>
              )}

              {phase === 'review' && (
                <div className="p-4 bg-[#f4f2ee] rounded border border-[#e8e6e1] space-y-3 text-xs">
                  <div className="text-center font-medium text-[#21201c]">
                    Latihan selesai (+80 XP tercatat)
                  </div>

                  {/* Live Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-white rounded border border-[#e8e6e1]">
                      <span className="text-[10px] text-[#6b675e] block">Kecepatan Bicara</span>
                      <span className="font-bold text-[#21201c]">{wpm} WPM</span>
                    </div>
                    <div className="p-2 bg-white rounded border border-[#e8e6e1]">
                      <span className="text-[10px] text-[#6b675e] block">Kata Jeda (Filler)</span>
                      <span className="font-bold text-[#21201c]">{detectedFillers.length} kali</span>
                    </div>
                  </div>

                  {transcript && (
                    <div className="space-y-1">
                      <span className="font-semibold text-[#21201c] block">Transkrip Suara Anda:</span>
                      <p className="p-2.5 bg-white rounded border border-[#e8e6e1] text-[#6b675e] italic">
                        "{transcript}"
                      </p>
                    </div>
                  )}

                  <button
                    onClick={startPreparation}
                    className="w-full py-2 bg-white border border-[#e8e6e1] text-xs font-medium text-[#21201c] rounded hover:bg-[#eae7df]"
                  >
                    Latihan Ulang
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right: Lexicon & Sample (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="clean-surface p-5 space-y-3 text-xs">
            <span className="font-mono-code text-[#6b675e] uppercase block">
              Frasa Kelancaran Band 7.5+
            </span>

            <div className="space-y-2">
              {selectedCard.highlightedVocabulary.map((vocab, idx) => (
                <div key={idx} className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e1] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#21201c]">{vocab.phrase}</span>
                    <button
                      onClick={() => handlePronouncePhrase(vocab.phrase)}
                      className="text-[#6b675e] hover:text-[#21201c] underline"
                    >
                      Dengar
                    </button>
                  </div>
                  <p className="text-[#6b675e]">{vocab.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="clean-surface p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-[#e8e6e1] pb-2">
              <span className="font-mono-code text-[#6b675e] uppercase">Referensi Jawaban Band 8.5</span>
              <button
                onClick={() => setShowSample(!showSample)}
                className="text-[#21201c] underline font-medium"
              >
                {showSample ? 'Tutup' : 'Lihat'}
              </button>
            </div>

            {showSample && (
              <div className="space-y-3 font-reading text-xs sm:text-sm leading-relaxed">
                <p className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e1] text-[#21201c] whitespace-pre-line">
                  {selectedCard.band8SampleAnswer}
                </p>

                <button
                  onClick={handleReadSampleAloud}
                  className="w-full py-2 border border-[#e8e6e1] hover:bg-[#f4f2ee] rounded text-xs font-medium text-[#21201c]"
                >
                  {isSynthesizing ? 'Hentikan Audio' : 'Dengarkan Pelafalan Aksen British'}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
