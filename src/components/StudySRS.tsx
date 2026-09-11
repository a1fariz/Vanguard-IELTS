import React, { useState, useEffect, useMemo } from 'react';
import type { SRSCard, QuizMode } from '../types';
import { calculateNextSRS, calculateExpGain } from '../services/srsEngine';
import { speakText, speakTextLoop, getStressBreakdown, getGlobalAccent } from '../utils/speech';

interface StudySRSProps {
  cards: SRSCard[];
  onUpdateCard: (updatedCard: SRSCard, expGain: number) => void;
  starredWords: string[];
  onToggleStar: (headword: string) => void;
}

export const StudySRS: React.FC<StudySRSProps> = ({ 
  cards, 
  onUpdateCard,
  starredWords,
  onToggleStar,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('flashcard');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') return cards;
    return cards.filter(c => c.category === selectedCategory);
  }, [cards, selectedCategory]);

  const currentCard: SRSCard | undefined = filteredCards[currentIndex];

  const isCurrentCardStarred = useMemo(() => {
    if (!currentCard) return false;
    const lower = currentCard.headword.toLowerCase();
    return starredWords.some(w => w.toLowerCase() === lower);
  }, [currentCard, starredWords]);

  const stressBreakdown = useMemo(() => {
    if (!currentCard) return { syllables: [], stressIndex: 0 };
    return getStressBreakdown(currentCard.headword);
  }, [currentCard]);

  useEffect(() => {
    setIsFlipped(false);
    setTypedAnswer('');
    setAnswerFeedback(null);
  }, [currentIndex, selectedCategory, quizMode]);

  const multipleChoiceOptions = useMemo(() => {
    if (!currentCard) return [];
    const pool = cards.filter(c => c.id !== currentCard.id);
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [...shuffled.map(c => c.definition), currentCard.definition];
    return options.sort(() => 0.5 - Math.random());
  }, [currentCard, cards]);

  const handleSRSGrading = (rating: 1 | 2 | 3 | 4) => {
    if (!currentCard) return;

    const srsUpdate = calculateNextSRS(currentCard, rating);
    const exp = calculateExpGain(rating);

    const updatedCard: SRSCard = {
      ...currentCard,
      srs: {
        ...srsUpdate,
        reviewsCount: currentCard.srs.reviewsCount + 1,
        lastReviewed: new Date().toISOString(),
      },
    };

    onUpdateCard(updatedCard, exp);

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleTypedCheck = () => {
    if (!currentCard) return;
    const cleanTyped = typedAnswer.trim().toLowerCase();
    const cleanTarget = currentCard.headword.trim().toLowerCase();

    if (cleanTyped === cleanTarget) {
      setAnswerFeedback('correct');
      handleSRSGrading(4);
    } else {
      setAnswerFeedback('incorrect');
    }
  };

  if (!currentCard) {
    return (
      <div className="clean-surface p-8 text-center space-y-3">
        <h3 className="text-base font-bold text-[#21201c]">Belum ada kartu di kategori ini</h3>
        <p className="text-xs text-[#6b675e]">Pilih tingkat atau kategori lain dari menu penyaring di atas.</p>
        <button
          onClick={() => setSelectedCategory('all')}
          className="px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
        >
          Tampilkan Semua Level
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      
      {/* Controls Bar */}
      <div className="clean-surface p-3 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Category / Level Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentIndex(0);
          }}
          aria-label="Pilih Kategori"
          className="w-full md:w-auto bg-[#f4f2ee] border border-[#e8e6e1] text-[#21201c] text-xs font-medium rounded-md px-3.5 py-2 focus:outline-none cursor-pointer"
        >
          <option value="all">Semua Level (A1 hingga C1) ({cards.length} kartu)</option>
          <option value="daily_home">Daily: Rumah & Dapur</option>
          <option value="daily_dining">Daily: Kafe & Restoran</option>
          <option value="foundational_a1_a2">A1-A2 Kosakata & Kalimat Dasar</option>
          <option value="intermediate_b1_b2">B1-B2 Jembatan Menengah</option>
          <option value="awl_c1">C1 Academic Word List (AWL)</option>
          <option value="collocations">Kolokasi Akademik C1</option>
        </select>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 sm:flex items-center bg-[#f4f2ee] p-1 rounded-md border border-[#e8e6e1] gap-1">
          <button
            onClick={() => setQuizMode('flashcard')}
            className={`px-2 sm:px-4 py-1.5 rounded text-[11px] sm:text-xs font-medium transition-colors text-center ${
              quizMode === 'flashcard' ? 'bg-white text-[#21201c] shadow-2xs font-semibold' : 'text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            Flashcard
          </button>
          <button
            onClick={() => setQuizMode('multiple_choice')}
            className={`px-2 sm:px-4 py-1.5 rounded text-[11px] sm:text-xs font-medium transition-colors text-center ${
              quizMode === 'multiple_choice' ? 'bg-white text-[#21201c] shadow-2xs font-semibold' : 'text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            Kuis Makna
          </button>
          <button
            onClick={() => setQuizMode('spelling_dictation')}
            className={`px-2 sm:px-4 py-1.5 rounded text-[11px] sm:text-xs font-medium transition-colors text-center truncate ${
              quizMode === 'spelling_dictation' ? 'bg-white text-[#21201c] shadow-2xs font-semibold' : 'text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            Pengejaan
          </button>
        </div>

        <span className="text-xs font-mono-code text-[#6b675e] text-center md:text-right">
          Kartu {currentIndex + 1} dari {filteredCards.length}
        </span>
      </div>

      {/* Main Flashcard Container */}
      <div className="clean-surface p-4 sm:p-8 lg:p-10 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#e8e6e1] pb-3 text-xs gap-1">
          <span className="font-mono-code font-semibold text-[#6b675e]">
            Level {currentCard.cefrLevel} • Topik: {currentCard.topic}
          </span>
          <span className="font-mono-code text-[#6b675e]">
            Retensi SRS Level {currentCard.srs.level} / 6
          </span>
        </div>

        {/* Flashcard Mode */}
        {quizMode === 'flashcard' && (
          <div className="space-y-6">
            
            {/* Word & Audio Pronunciation Section */}
            <div className="text-center space-y-3 py-2 sm:py-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-2.5 justify-center">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#21201c] tracking-tight break-words text-center">
                    {currentCard.headword}
                  </h2>

                  {/* Star / Bookmark Toggle Button */}
                  <button
                    onClick={() => onToggleStar(currentCard.headword)}
                    title={isCurrentCardStarred ? 'Hapus bookmark' : 'Simpan kata (Bookmark)'}
                    className={`p-2 rounded-md border transition-colors shrink-0 ${
                      isCurrentCardStarred
                        ? 'border-[#e0a82e] bg-[#fdf8ed] text-[#d48b0a]'
                        : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c] hover:bg-[#f4f2ee]'
                    }`}
                    aria-label="Bookmark Word"
                  >
                    <svg
                      className="w-5 h-5"
                      fill={isCurrentCardStarred ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                </div>
                
                {/* Audio Controls */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 sm:pt-0">
                  <button
                    onClick={() => speakText(currentCard.headword, getGlobalAccent(), 0.76)}
                    className="px-3 py-1.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs"
                    title={`Putar Audio Aksen ${getGlobalAccent() === 'en-GB' ? 'British' : 'American'}`}
                  >
                    <span>Putar ({getGlobalAccent() === 'en-GB' ? 'UK' : 'US'})</span>
                  </button>

                  <button
                    onClick={() => speakTextLoop(currentCard.headword, 3, getGlobalAccent(), 0.76)}
                    className="px-2.5 py-1.5 bg-white hover:bg-[#f4f2ee] border border-[#e8e6e1] text-[#21201c] rounded-md text-xs font-medium transition-colors"
                    title="Putar Audio 3 Kali Berulang"
                  >
                    <span>Play 3x</span>
                  </button>

                  <button
                    onClick={() => speakText(currentCard.headword, getGlobalAccent(), 0.58)}
                    className="px-2.5 py-1.5 bg-white hover:bg-[#f4f2ee] border border-[#e8e6e1] text-[#21201c] rounded-md text-xs font-medium transition-colors"
                    title="Putar Sangat Pelan"
                  >
                    <span>0.6x Slow</span>
                  </button>
                </div>
              </div>

              {/* Syllable Stress Breakdown */}
              {stressBreakdown.syllables.length > 0 && (
                <div className="pt-1">
                  <span className="text-sm text-[#6b675e] font-mono-code">
                    {stressBreakdown.syllables.map((syl, i) => (
                      <span key={i} className={i === stressBreakdown.stressIndex ? 'text-[#21201c] font-bold text-base' : ''}>
                        {i === stressBreakdown.stressIndex ? syl.toUpperCase() : syl}
                        {i < stressBreakdown.syllables.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              <div className="text-xs font-mono-code text-[#6b675e] space-x-2">
                {currentCard.phonetic && <span className="text-[#21201c] font-semibold">{currentCard.phonetic}</span>}
                <span>•</span>
                <span className="italic">{currentCard.partOfSpeech}</span>
                <span>•</span>
                <span className="font-semibold text-[#c97a3e]">Target Band {currentCard.bandScore}</span>
              </div>
            </div>

            {!isFlipped ? (
              <div className="text-center pt-2">
                <button
                  onClick={() => setIsFlipped(true)}
                  className="px-8 py-3 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold transition-colors"
                >
                  Buka Arti & Contoh Kalimat
                </button>
              </div>
            ) : (
              <div className="space-y-6 pt-4 border-t border-[#e8e6e1]">
                
                {/* Definition */}
                <div className="clean-surface-subtle p-4 sm:p-5 rounded-lg space-y-1.5">
                  <span className="text-[10px] font-mono-code text-[#6b675e] uppercase font-semibold">Arti Bahasa Indonesia:</span>
                  <p className="text-sm sm:text-base font-semibold text-[#21201c]">
                    {currentCard.definitionId}
                  </p>
                  <p className="text-xs text-[#6b675e] pt-1">
                    English Definition: {currentCard.definition}
                  </p>
                </div>

                {/* Collocations & Synonyms with Individual Audio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="clean-surface-subtle p-4 rounded-lg space-y-2">
                    <span className="text-xs font-semibold text-[#21201c] block">Kolokasi Berpasangan (Collocations):</span>
                    <div className="space-y-1.5">
                      {currentCard.collocations.map((col, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-[#e8e6e1] text-xs">
                          <span className="font-medium text-[#21201c]">{col}</span>
                          <button
                            onClick={() => speakText(col, getGlobalAccent(), 0.76)}
                            className="text-[11px] text-[#6b675e] hover:text-[#21201c] underline font-mono-code"
                          >
                            Dengar ({getGlobalAccent() === 'en-GB' ? 'UK' : 'US'})
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="clean-surface-subtle p-4 rounded-lg space-y-2">
                    <span className="text-xs font-semibold text-[#21201c] block">Sinonim Akademik (Synonyms):</span>
                    <div className="space-y-1.5">
                      {currentCard.synonyms.map((syn, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-[#e8e6e1] text-xs">
                          <span className="font-medium text-[#21201c]">{syn}</span>
                          <button
                            onClick={() => speakText(syn, getGlobalAccent(), 0.76)}
                            className="text-[11px] text-[#6b675e] hover:text-[#21201c] underline font-mono-code"
                          >
                            Dengar ({getGlobalAccent() === 'en-GB' ? 'UK' : 'US'})
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Example Sentences with Full Audio */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-[#21201c] block">Contoh Kalimat Kontekstual:</span>
                  {currentCard.exampleSentences.map((ex, idx) => (
                    <div key={idx} className="clean-surface-subtle p-4 rounded-lg text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6b675e] font-mono-code text-[11px] font-semibold">{ex.ieltsDomain}</span>
                        <button
                          onClick={() => speakText(ex.sentence, getGlobalAccent(), 0.78)}
                          className="px-2.5 py-1 bg-white border border-[#e8e6e1] hover:bg-[#f4f2ee] rounded text-[11px] font-medium text-[#21201c] font-mono-code"
                        >
                          Dengar Kalimat ({getGlobalAccent() === 'en-GB' ? 'UK' : 'US'})
                        </button>
                      </div>
                      <p className="text-[#21201c] font-reading text-sm sm:text-base leading-relaxed">
                        "{ex.sentence}"
                      </p>
                      <p className="text-xs text-[#6b675e] italic">
                        Terjemahan: {ex.translation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* SuperMemo-2 Recall Grading */}
                <div className="pt-4 border-t border-[#e8e6e1] space-y-2">
                  <span className="text-[11px] font-mono-code text-center text-[#6b675e] uppercase block">
                    Evaluasi Daya Ingat Anda (Jadwal Pengulangan SM-2)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <button
                      onClick={() => handleSRSGrading(1)}
                      className="p-2.5 border border-[#e8e6e1] rounded-md hover:bg-[#f4f2ee] text-[#21201c] font-medium"
                    >
                      [1] Lupa (Again)
                    </button>
                    <button
                      onClick={() => handleSRSGrading(2)}
                      className="p-2.5 border border-[#e8e6e1] rounded-md hover:bg-[#f4f2ee] text-[#21201c] font-medium"
                    >
                      [2] Sulit (Hard)
                    </button>
                    <button
                      onClick={() => handleSRSGrading(3)}
                      className="p-2.5 border border-[#e8e6e1] rounded-md hover:bg-[#f4f2ee] text-[#21201c] font-medium"
                    >
                      [3] Baik (Good)
                    </button>
                    <button
                      onClick={() => handleSRSGrading(4)}
                      className="p-2.5 border border-[#e8e6e1] rounded-md hover:bg-[#f4f2ee] text-[#21201c] font-medium"
                    >
                      [4] Mudah / Hafal
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Mode 2: Meaning Quiz */}
        {quizMode === 'multiple_choice' && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <span className="text-xs text-[#6b675e]">Dengarkan kata dan pilih arti bahasa Indonesia yang tepat:</span>
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#21201c]">{currentCard.headword}</h3>
                <button
                  onClick={() => speakText(currentCard.headword, getGlobalAccent(), 0.76)}
                  className="px-2.5 py-1 text-xs border border-[#e8e6e1] rounded bg-white hover:bg-[#f4f2ee]"
                >
                  Dengar ({getGlobalAccent() === 'en-GB' ? 'UK' : 'US'})
                </button>
              </div>
              <p className="italic text-xs text-[#6b675e]">{currentCard.partOfSpeech}</p>
            </div>

            <div className="space-y-2 pt-2">
              {multipleChoiceOptions.map((opt, i) => {
                const isCorrect = opt === currentCard.definition;
                return (
                  <button
                    key={i}
                    onClick={() => handleSRSGrading(isCorrect ? 3 : 1)}
                    className="w-full text-left p-3.5 rounded-md border border-[#e8e6e1] hover:border-[#21201c] bg-white text-xs sm:text-sm text-[#21201c] transition-colors flex items-start gap-2.5"
                  >
                    <span className="font-mono-code text-xs text-[#6b675e] shrink-0">
                      [{String.fromCharCode(65 + i)}]
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mode 3: Spelling Dictation */}
        {quizMode === 'spelling_dictation' && (
          <div className="space-y-4 max-w-md mx-auto text-center">
            <div className="p-4 bg-[#f4f2ee] rounded-lg space-y-2">
              <button
                onClick={() => speakText(currentCard.headword, getGlobalAccent(), 0.76)}
                className="px-5 py-2.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold mx-auto"
              >
                Putar Suara ({getGlobalAccent() === 'en-GB' ? 'UK' : 'US'})
              </button>
              <p className="text-xs text-[#6b675e]">
                Petunjuk Arti: "{currentCard.definitionId}"
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTypedCheck();
                }}
                placeholder="Ketik ejaan kata di sini..."
                className="w-full p-3 bg-white border border-[#e8e6e1] rounded-md text-center text-sm font-mono-code focus:outline-none focus:border-[#21201c]"
              />

              <div className="flex justify-center gap-2">
                <button
                  onClick={handleTypedCheck}
                  className="px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
                >
                  Periksa Ejaan
                </button>
                <button
                  onClick={() => setTypedAnswer(currentCard.headword)}
                  className="px-3 py-2 border border-[#e8e6e1] text-[#6b675e] rounded-md text-xs"
                >
                  Lihat Jawaban
                </button>
              </div>

              {answerFeedback === 'incorrect' && (
                <div className="text-xs text-[#b83232] font-mono-code pt-1">
                  Ejaan yang benar: {currentCard.headword}
                </div>
              )}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
