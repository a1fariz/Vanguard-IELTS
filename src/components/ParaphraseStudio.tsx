import React, { useState } from 'react';
import { PARAPHRASE_EXERCISES } from '../data/placementAndParaphrase';
import type { ParaphraseExercise } from '../types';

interface ParaphraseStudioProps {
  onAddExp: (amount: number) => void;
  onCompleteExercise: () => void;
}

export const ParaphraseStudio: React.FC<ParaphraseStudioProps> = ({ onAddExp, onCompleteExercise }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<{
    matchedKeywords: string[];
    isSuccessful: boolean;
    feedbackId: string;
  } | null>(null);

  const currentEx: ParaphraseExercise = PARAPHRASE_EXERCISES[currentIdx];

  const handleEvaluate = () => {
    if (userInput.trim().length < 15) {
      alert('Tuliskan kalimat parafrase yang lengkap terlebih dahulu.');
      return;
    }

    const cleanInput = userInput.toLowerCase();
    const matched = currentEx.acceptedKeywords.filter(kw => cleanInput.includes(kw.toLowerCase()));
    
    // Check whether user didn't just copy the whole sentence
    const isExactCopy = cleanInput === currentEx.sourceSentence.toLowerCase();

    const isSuccessful = matched.length >= 1 && !isExactCopy;

    let feedbackId = '';
    if (isExactCopy) {
      feedbackId = 'Kalimat yang dimasukkan sama persis dengan kalimat asli. Coba ubah struktur atau ganti beberapa kata kunci.';
    } else if (matched.length >= 2) {
      feedbackId = 'Parafrase sangat baik! Variasi kosakata dan transformasi gramatikal sesuai dengan standar akademik IELTS.';
    } else if (matched.length === 1) {
      feedbackId = 'Parafrase cukup baik. Tambahkan variasi sinonim atau coba ubah pola aktif/pasif untuk nilai lebih tinggi.';
    } else {
      feedbackId = 'Belum terdeteksi kata kunci alternatif formal. Periksa daftar kunci parafrase yang disarankan di bawah.';
    }

    setAnalysisResult({
      matchedKeywords: matched,
      isSuccessful,
      feedbackId,
    });

    if (isSuccessful) {
      onAddExp(50);
      onCompleteExercise();
    }
  };

  const handleNext = () => {
    setUserInput('');
    setAnalysisResult(null);
    if (currentIdx < PARAPHRASE_EXERCISES.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-4 sm:p-6 space-y-1">
        <span className="text-[11px] font-mono-code text-[#6b675e] uppercase block">
          Latihan Parafrase & Transformasi Kalimat
        </span>
        <h1 className="text-lg sm:text-xl font-bold text-[#21201c]">
          Studio Parafrase IELTS
        </h1>
        <p className="text-xs text-[#6b675e]">
          Kemampuan mengubah struktur kalimat tanpa mengubah makna asli adalah penentu utama skor Band 7.5+ di Writing dan Speaking.
        </p>
      </div>

      {/* Latihan Card */}
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-5">
        
        {/* Soal Asli */}
        <div className="p-3.5 sm:p-4 bg-[#f4f2ee] rounded-lg border border-[#e8e6e1] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono-code text-[#6b675e] uppercase">
              Latihan {currentIdx + 1} dari {PARAPHRASE_EXERCISES.length}
            </span>
            <span className="font-mono-code text-[#c97a3e] font-semibold">
              Level {currentEx.level}
            </span>
          </div>
          <p className="font-reading text-base sm:text-lg text-[#21201c] font-medium leading-relaxed">
            "{currentEx.sourceSentence}"
          </p>
        </div>

        {/* Input Jawaban */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#21201c] block">
            Tulis Parafrase Anda Menggunakan Variasi Struktur & Sinonim:
          </label>
          <textarea
            rows={3}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Contoh: gunakan pola inversi, passive voice, atau kata benda abstrak..."
            className="w-full p-3 bg-white border border-[#e8e6e1] rounded-md text-xs sm:text-sm text-[#21201c] leading-relaxed focus:outline-none focus:border-[#21201c]"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <span className="text-[11px] text-[#6b675e]">
              Contoh kata kunci: {currentEx.acceptedKeywords.slice(0, 3).join(', ')}
            </span>
            <button
              onClick={handleEvaluate}
              className="w-full sm:w-auto px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold text-center"
            >
              Evaluasi Parafrase (+50 XP)
            </button>
          </div>
        </div>

        {/* Hasil Evaluasi */}
        {analysisResult && (
          <div className="space-y-3 pt-3 border-t border-[#e8e6e1] text-xs">
            <div className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e1] space-y-1">
              <span className="font-semibold text-[#21201c] block">Hasil Analisis:</span>
              <p className="text-[#6b675e]">{analysisResult.feedbackId}</p>
            </div>

            {/* Rekomendasi Parafrase Band 9 */}
            <div className="space-y-1.5 pt-1">
              <span className="font-semibold text-[#21201c] block">Referensi Model Parafrase Band 8.5+:</span>
              {currentEx.idealParaphrases.map((para, i) => (
                <div key={i} className="p-2.5 bg-white border border-[#e8e6e1] rounded font-reading text-xs text-[#21201c]">
                  • "{para}"
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleNext}
                className="px-4 py-2 border border-[#e8e6e1] rounded hover:bg-[#f4f2ee] text-xs font-medium text-[#21201c]"
              >
                Lanjut ke Latihan Berikutnya
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
