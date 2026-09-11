import React, { useState } from 'react';
import { DAILY_STAGES } from '../data/dailyStagesData';
import type { DailyStageLevel } from '../types';
import { speakText } from '../utils/speech';

interface DailyAdventureMapProps {
  unlockedStage: number;
  userExp: number;
  onAddExp: (amount: number) => void;
  onUnlockNextStage: (nextStageId: number) => void;
}

export const DailyAdventureMap: React.FC<DailyAdventureMapProps> = ({
  unlockedStage,
  onAddExp,
  onUnlockNextStage
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'vocab' | 'dialogue' | 'quiz'>('vocab');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const activeStage: DailyStageLevel = DAILY_STAGES.find(s => s.id === selectedStageId) || DAILY_STAGES[0];
  const isStageUnlocked = selectedStageId <= unlockedStage;

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (quizFinished) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleGradeCheckpoint = () => {
    let score = 0;
    activeStage.checkpointQuiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setQuizFinished(true);

    const isAllCorrect = score === activeStage.checkpointQuiz.length;
    if (isAllCorrect) {
      onAddExp(80);
      if (selectedStageId === unlockedStage && selectedStageId < DAILY_STAGES.length) {
        onUnlockNextStage(selectedStageId + 1);
      }
    } else {
      onAddExp(score * 20);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizFinished(false);
    setQuizScore(0);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
          <span className="font-mono-code text-[#c97a3e] font-semibold uppercase">
            Everyday English & Situational Fluency
          </span>
          <span className="font-mono-code text-[#6b675e]">
            Level Progress: {unlockedStage} / {DAILY_STAGES.length} Unlocked
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#21201c]">
          Daily Conversation Quest (Level by Level)
        </h1>
        <p className="text-xs sm:text-sm text-[#6b675e] max-w-3xl leading-relaxed">
          Struktur belajar bertahap seperti game: mulai dari rumah & dapur (A1), belanja di supermarket (A2), pesan kafe (A2), tanya jalan (B1), hingga berteman akrab dengan bule (B1). Selesaikan kuis level untuk membuka level berikutnya!
        </p>
      </div>

      {/* Level Roadmap Grid (Gamified Level Selector) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
        {DAILY_STAGES.map((stg) => {
          const isUnlocked = stg.id <= unlockedStage;
          const isCurrent = stg.id === selectedStageId;

          return (
            <button
              key={stg.id}
              onClick={() => {
                setSelectedStageId(stg.id);
                setActiveTab('vocab');
                resetQuiz();
              }}
              className={`p-2.5 sm:p-3.5 rounded-lg border text-left transition-all space-y-1 sm:space-y-1.5 ${
                isCurrent
                  ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7] shadow-xs'
                  : isUnlocked
                  ? 'border-[#e8e6e1] bg-white text-[#21201c] hover:border-[#b0aca2]'
                  : 'border-[#e8e6e1]/60 bg-[#f4f2ee]/50 text-[#a3998b] cursor-not-allowed'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono-code">
                <span>STAGE {stg.id}</span>
                <span>{isUnlocked ? `[${stg.cefrLevel}]` : '[LOCKED]'}</span>
              </div>
              <div className="font-bold text-xs truncate">
                {stg.titleId.split(':')[1] || stg.titleId}
              </div>
              <div className="text-[10px] opacity-75 font-mono-code">
                {isUnlocked ? 'Terbuka' : `Butuh Lv ${stg.id - 1}`}
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Workspace */}
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
        
        {/* Stage Overview Box */}
        <div className="clean-surface-subtle p-3.5 sm:p-5 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-[#21201c] uppercase font-mono-code truncate pr-2">
              {activeStage.titleId}
            </span>
            <span className="font-mono-code text-[#c97a3e] font-semibold shrink-0">
              Level {activeStage.cefrLevel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#21201c] leading-relaxed">
            {activeStage.descriptionId}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-1.5 sm:gap-2 border-b border-[#e8e6e1] pb-3 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('vocab')}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              activeTab === 'vocab' ? 'bg-[#21201c] text-[#faf9f7] font-semibold' : 'text-[#6b675e] hover:bg-[#f4f2ee]'
            }`}
          >
            1. Kosakata Kunci ({activeStage.vocabularies.length})
          </button>
          <button
            onClick={() => setActiveTab('dialogue')}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              activeTab === 'dialogue' ? 'bg-[#21201c] text-[#faf9f7] font-semibold' : 'text-[#6b675e] hover:bg-[#f4f2ee]'
            }`}
          >
            2. Contoh Dialog Nyata
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              activeTab === 'quiz' ? 'bg-[#21201c] text-[#faf9f7] font-semibold' : 'text-[#6b675e] hover:bg-[#f4f2ee]'
            }`}
          >
            3. Kuis Syarat Level Up ({activeStage.checkpointQuiz.length} Soal)
          </button>
        </div>

        {/* Tab 1: Vocabularies with pronunciation */}
        {activeTab === 'vocab' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#21201c] block">
              Kosakata & Ungkapan yang Wajib Dikuasai di Situasi Ini:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeStage.vocabularies.map((item, idx) => (
                <div key={idx} className="clean-surface-subtle p-4 rounded-lg space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#21201c]">{item.word}</span>
                    <button
                      onClick={() => speakText(item.word)}
                      className="px-2.5 py-1 bg-white border border-[#e8e6e1] hover:bg-[#f4f2ee] rounded text-[11px] font-mono-code text-[#21201c]"
                    >
                      Dengar Kata
                    </button>
                  </div>

                  <div className="font-mono-code text-[#6b675e] text-[11px]">
                    {item.phonetic} • <span className="italic">{item.partOfSpeech}</span>
                  </div>

                  <div className="text-[#21201c] font-semibold">
                    Arti: {item.meaningId}
                  </div>

                  <div className="p-2.5 bg-white rounded border border-[#e8e6e1] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#21201c]">"{item.example}"</span>
                      <button
                        onClick={() => speakText(item.example)}
                        className="text-[10px] text-[#6b675e] hover:text-[#21201c] underline"
                      >
                        Dengar
                      </button>
                    </div>
                    <div className="text-[11px] text-[#6b675e] italic">
                      {item.exampleId}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('dialogue')}
                className="px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
              >
                Lanjut ke Contoh Dialog
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Dialogue */}
        {activeTab === 'dialogue' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#21201c] block">
              Simulasi Percakapan Utuh:
            </span>

            <div className="space-y-3">
              {activeStage.dialogueScript.map((turn, idx) => {
                const isUser = turn.speaker === 'You';
                return (
                  <div
                    key={idx}
                    className={`p-3 sm:p-4 rounded-lg border text-xs sm:text-sm space-y-1.5 ${
                      isUser
                        ? 'bg-white border-[#21201c]/40 ml-2 sm:ml-10'
                        : 'bg-[#f4f2ee] border-[#e8e6e1] mr-2 sm:mr-10'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-mono-code text-[11px] font-bold ${isUser ? 'text-[#c97a3e]' : 'text-[#6b675e]'}`}>
                        {turn.speaker}
                      </span>
                      <button
                        onClick={() => speakText(turn.english)}
                        className="text-[11px] text-[#6b675e] hover:text-[#21201c] underline font-mono-code"
                      >
                        Putar Suara
                      </button>
                    </div>

                    <p className="font-medium text-[#21201c] text-sm sm:text-base leading-relaxed">
                      "{turn.english}"
                    </p>

                    <p className="text-xs text-[#6b675e] italic">
                      {turn.indonesian}
                    </p>

                    {turn.noteId && (
                      <div className="text-[11px] bg-[#fffbf2] p-2 rounded border border-[#fae6b8] text-[#8a5d13]">
                        Tips: {turn.noteId}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
              >
                Mulai Kuis Syarat Level Up
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Checkpoint Quiz to unlock next level */}
        {activeTab === 'quiz' && (
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#21201c] block">
                Uji Pemahaman Situasional (Jawab benar untuk membuka stage berikutnya):
              </span>
              <p className="text-[11px] text-[#6b675e]">
                Pilih kalimat yang paling tepat dan natural sesuai konteks budaya percakapan.
              </p>
            </div>

            <div className="space-y-4">
              {activeStage.checkpointQuiz.map((q, qIdx) => {
                const selected = quizAnswers[qIdx];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={qIdx} className="bg-[#f4f2ee] p-4 sm:p-5 rounded-lg border border-[#e8e6e1] space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="text-[11px] font-mono-code text-[#c97a3e] font-semibold block">
                        Soal [{qIdx + 1}] — {q.promptId}
                      </span>
                      <p className="font-bold text-[#21201c] text-sm mt-1">
                        {q.question}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        let btnClass = 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]';

                        if (isThisSelected && !quizFinished) {
                          btnClass = 'border-[#21201c] text-[#21201c] font-semibold bg-white';
                        }

                        if (quizFinished) {
                          if (optIdx === q.correctIndex) {
                            btnClass = 'border-[#2f7a42] text-[#2f7a42] font-semibold bg-white';
                          } else if (isThisSelected && !isCorrect) {
                            btnClass = 'border-[#8f3a3a] text-[#8f3a3a] bg-white';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizFinished}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            className={`w-full text-left p-3 rounded-md border text-xs sm:text-sm transition-colors flex items-start gap-2.5 ${btnClass}`}
                          >
                            <span className="font-mono-code text-xs shrink-0">
                              [{String.fromCharCode(65 + optIdx)}]
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizFinished && (
                      <div className="text-xs text-[#6b675e] pt-1">
                        Penjelasan: {q.explanationId}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!quizFinished ? (
                <button
                  disabled={Object.keys(quizAnswers).length < activeStage.checkpointQuiz.length}
                  onClick={handleGradeCheckpoint}
                  className="px-5 py-2.5 bg-[#21201c] disabled:opacity-30 text-[#faf9f7] rounded-md text-xs font-semibold"
                >
                  Periksa Jawaban & Naik Level
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-[#f4f2ee] rounded border border-[#e8e6e1] space-y-1 text-xs">
                    <div className="font-bold text-[#21201c]">
                      Skor Anda: {quizScore} / {activeStage.checkpointQuiz.length} Benar
                    </div>
                    <p className="text-[#6b675e]">
                      {quizScore === activeStage.checkpointQuiz.length
                        ? `Selamat! Anda berhasil menuntaskan Level ${activeStage.id} (+80 XP). Stage berikutnya telah terbuka!`
                        : 'Belum semua jawaban benar. Pelajari kembali dialog dan coba ulangi kuis.'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 border border-[#e8e6e1] bg-white text-[#21201c] rounded-md text-xs font-medium"
                    >
                      Coba Kuis Lagi
                    </button>
                    {selectedStageId < DAILY_STAGES.length && isStageUnlocked && (
                      <button
                        onClick={() => {
                          setSelectedStageId(prev => prev + 1);
                          setActiveTab('vocab');
                          resetQuiz();
                        }}
                        className="px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
                      >
                        Lanjut ke Stage {selectedStageId + 1}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
