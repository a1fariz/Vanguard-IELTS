import React, { useState } from 'react';
import { PLACEMENT_QUESTIONS } from '../data/placementAndParaphrase';
import type { CEFRLevel } from '../types';

interface PlacementTestProps {
  onComplete: (determinedLevel: CEFRLevel) => void;
  onCancel?: () => void;
}

export const PlacementTest: React.FC<PlacementTestProps> = ({ onComplete, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [calculatedLevel, setCalculatedLevel] = useState<CEFRLevel>('A1');

  const currentQ = PLACEMENT_QUESTIONS[currentIdx];

  const handleSelectOption = (qId: string, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleNext = () => {
    if (currentIdx < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Calculate score
      let correct = 0;
      PLACEMENT_QUESTIONS.forEach(q => {
        if (selectedAnswers[q.id] === q.correctIndex) {
          correct += 1;
        }
      });

      let finalLevel: CEFRLevel = 'A1';
      if (correct === 5) finalLevel = 'C1';
      else if (correct >= 4) finalLevel = 'B2';
      else if (correct >= 3) finalLevel = 'B1';
      else if (correct >= 2) finalLevel = 'A2';
      else finalLevel = 'A1';

      setCalculatedLevel(finalLevel);
      setIsCompleted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-4">
        
        {!isCompleted ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e8e6e1] pb-3 text-xs gap-1">
              <span className="font-mono-code text-[#6b675e] uppercase">
                Tes Penempatan Kemampuan (A1 hingga C1)
              </span>
              <span className="font-mono-code text-[#6b675e]">
                Soal {currentIdx + 1} dari {PLACEMENT_QUESTIONS.length}
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono-code text-[#c97a3e] font-semibold">
                  Tingkat Soal: {currentQ.level}
                </span>
                <p className="text-sm sm:text-base font-semibold text-[#21201c]">
                  {currentQ.question}
                </p>
              </div>

              <div className="space-y-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                      className={`w-full text-left p-3 rounded-md border text-xs sm:text-sm transition-colors flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-[#21201c] bg-[#f4f2ee] font-semibold text-[#21201c]'
                          : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
                      }`}
                    >
                      <span className="font-mono-code text-xs text-[#6b675e]">
                        [{String.fromCharCode(65 + idx)}]
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#e8e6e1]">
              {onCancel ? (
                <button
                  onClick={onCancel}
                  className="px-3 py-1.5 text-xs text-[#6b675e] hover:text-[#21201c]"
                >
                  Batal / Lewati
                </button>
              ) : <div />}

              <button
                disabled={selectedAnswers[currentQ.id] === undefined}
                onClick={handleNext}
                className="px-5 py-2 bg-[#21201c] disabled:opacity-30 text-[#faf9f7] rounded-md text-xs font-semibold"
              >
                {currentIdx < PLACEMENT_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Selesaikan Tes'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase block">
              Hasil Evaluasi Penempatan
            </span>
            <h2 className="text-2xl font-bold text-[#21201c]">
              Tingkat Awal Anda: {calculatedLevel}
            </h2>
            <p className="text-xs text-[#6b675e] max-w-md mx-auto leading-relaxed">
              Materi dan rekomendasi kartu kuis akan diprioritaskan mulai dari tingkat {calculatedLevel} hingga mencapai target IELTS Band 7.5+ (C1).
            </p>

            <button
              onClick={() => onComplete(calculatedLevel)}
              className="px-6 py-2.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold"
            >
              Mulai Belajar dari Tingkat {calculatedLevel}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
