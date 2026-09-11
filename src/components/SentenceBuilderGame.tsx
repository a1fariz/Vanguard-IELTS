import React, { useState } from 'react';
import { SENTENCE_BUILDER_CHALLENGES } from '../data/gamifiedFeaturesData';
import type { SentenceBuilderChallenge } from '../types';
import { speakText, getGlobalAccent } from '../utils/speech';

interface SentenceBuilderGameProps {
  onAddExp: (amount: number) => void;
  onCompleteSentence: () => void;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({ onAddExp, onCompleteSentence }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(() => [...SENTENCE_BUILDER_CHALLENGES[0].scrambledWords].sort(() => 0.5 - Math.random()));
  const [isGraded, setIsGraded] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const activeChallenge: SentenceBuilderChallenge = SENTENCE_BUILDER_CHALLENGES[currentIdx];

  const handlePickWord = (word: string, index: number) => {
    if (isGraded) return;
    setPlacedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isGraded) return;
    setPlacedWords(prev => prev.filter((_, i) => i !== index));
    setAvailableWords(prev => [...prev, word]);
  };

  const handleReset = () => {
    setPlacedWords([]);
    setAvailableWords([...activeChallenge.scrambledWords].sort(() => 0.5 - Math.random()));
    setIsGraded(false);
    setIsCorrect(false);
  };

  const handleCheckSentence = () => {
    const built = placedWords.join(' ').trim();
    const target = activeChallenge.correctSentence.trim();

    const cleanBuilt = built.replace(/\s+([?,.])/g, '$1');
    const cleanTarget = target.replace(/\s+([?,.])/g, '$1');

    const correct = cleanBuilt.toLowerCase() === cleanTarget.toLowerCase();
    setIsCorrect(correct);
    setIsGraded(true);

    if (correct) {
      onAddExp(40);
      onCompleteSentence();
      speakText(activeChallenge.correctSentence, getGlobalAccent(), 0.78);
    }
  };

  const handleNextChallenge = () => {
    const nextIdx = currentIdx < SENTENCE_BUILDER_CHALLENGES.length - 1 ? currentIdx + 1 : 0;
    setCurrentIdx(nextIdx);
    setPlacedWords([]);
    setAvailableWords([...SENTENCE_BUILDER_CHALLENGES[nextIdx].scrambledWords].sort(() => 0.5 - Math.random()));
    setIsGraded(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-4 sm:p-6 space-y-1">
        <span className="text-[11px] font-mono-code text-[#c97a3e] uppercase block">
          Sentence Builder & Grammar Refinement Game
        </span>
        <h1 className="text-lg sm:text-xl font-bold text-[#21201c]">
          Tantangan Susun Kalimat (Daily & IELTS)
        </h1>
        <p className="text-xs text-[#6b675e]">
          Susun kata-kata acak menjadi struktur kalimat yang tepat dan alami untuk melatih refleks tata bahasa secara cepat.
        </p>
      </div>

      {/* Workspace */}
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
        
        {/* Challenge Target */}
        <div className="clean-surface-subtle p-3.5 sm:p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono-code text-[#c97a3e] font-semibold">
              Tingkat: {activeChallenge.level} • Kategori: {activeChallenge.category.toUpperCase()}
            </span>
            <span className="font-mono-code text-[#6b675e]">
              Soal {currentIdx + 1} dari {SENTENCE_BUILDER_CHALLENGES.length}
            </span>
          </div>

          <div className="text-xs text-[#6b675e]">Maksud Kalimat yang Diinginkan:</div>
          <p className="text-sm sm:text-lg font-bold text-[#21201c]">
            "{activeChallenge.targetMeaningId}"
          </p>
        </div>

        {/* Sentence Assembly Drop Area */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#21201c] block">
            Susunan Kalimat Anda (Klik kata untuk membatalkan):
          </span>
          <div className="min-h-[54px] p-3 sm:p-3.5 bg-white border border-[#e8e6e1] rounded-lg flex flex-wrap gap-2 items-center">
            {placedWords.length === 0 ? (
              <span className="text-xs text-[#a3998b] italic">
                Klik kata-kata acak di bawah untuk menyusun kalimat...
              </span>
            ) : (
              placedWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(word, idx)}
                  className="px-3 sm:px-3.5 py-2 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Word Pool (Scrambled Words) */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#6b675e] block">
            Pilihan Kata:
          </span>
          <div className="flex flex-wrap gap-2">
            {availableWords.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handlePickWord(word, idx)}
                className="px-3 sm:px-3.5 py-2 bg-[#f4f2ee] hover:bg-[#eae7df] border border-[#e8e6e1] text-[#21201c] rounded-md text-xs sm:text-sm font-medium transition-colors active:scale-95"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-[#e8e6e1]">
          <button
            onClick={handleReset}
            className="px-3 py-2 text-xs text-[#6b675e] hover:text-[#21201c] order-2 sm:order-1 text-center"
          >
            Susun Ulang
          </button>

          {!isGraded ? (
            <button
              disabled={placedWords.length === 0}
              onClick={handleCheckSentence}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#21201c] disabled:opacity-30 text-[#faf9f7] rounded-md text-xs font-semibold order-1 sm:order-2 text-center"
            >
              Periksa Susunan (+40 XP)
            </button>
          ) : (
            <button
              onClick={handleNextChallenge}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold order-1 sm:order-2 text-center"
            >
              Lanjut ke Tantangan Berikutnya
            </button>
          )}
        </div>

        {/* Result & Grammar Explanation */}
        {isGraded && (
          <div className={`p-4 rounded-lg border space-y-2 text-xs ${
            isCorrect ? 'bg-[#f0f9f2] border-[#c8e8c8]' : 'bg-[#faf0f0] border-[#e8c8c8]'
          }`}>
            <div className="flex justify-between items-center font-bold">
              <span className={isCorrect ? 'text-[#2f7a42]' : 'text-[#8f3a3a]'}>
                {isCorrect ? 'Susunan Tepat!' : 'Belum Tepat!'}
              </span>
              <button
                onClick={() => speakText(activeChallenge.correctSentence)}
                className="text-xs text-[#21201c] underline font-mono-code"
              >
                Dengar Pelafalan
              </button>
            </div>

            <div className="text-[#21201c]">
              <strong>Kalimat Benar: </strong>"{activeChallenge.correctSentence}"
            </div>

            <p className="text-[#6b675e] pt-1 border-t border-[#e8e6e1]">
              <strong>Aturan Tata Bahasa: </strong>{activeChallenge.grammarTipId}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
