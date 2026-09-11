import React, { useState } from 'react';
import { READING_PASSAGES } from '../data/academicLessons';
import type { ReadingPassageItem } from '../types';

interface ReadingLabProps {
  onAddExp: (amount: number) => void;
}

export const ReadingLab: React.FC<ReadingLabProps> = ({ onAddExp }) => {
  const [selectedPassage] = useState<ReadingPassageItem>(READING_PASSAGES[0]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isGraded, setIsGraded] = useState<boolean>(false);

  const handleSelectAnswer = (qId: string, ans: string) => {
    if (isGraded) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: ans
    }));
  };

  const handleGrade = () => {
    setIsGraded(true);
    let correct = 0;
    selectedPassage.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct += 1;
      }
    });

    if (correct > 0) {
      onAddExp(correct * 40);
    }
  };

  const resetPractice = () => {
    setUserAnswers({});
    setIsGraded(false);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-6 space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono-code text-[#6b675e] uppercase">
            Academic Reading Engine
          </span>
          <span className="font-mono-code text-[#6b675e]">{selectedPassage.wordCount} words</span>
        </div>
        <h1 className="text-xl font-bold text-[#21201c]">
          Reading Passage & Questions
        </h1>
      </div>

      {/* Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Text (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="clean-surface p-6 space-y-4">
            
            <div className="border-b border-[#e8e6e1] pb-2 text-xs">
              <span className="font-mono-code text-[#6b675e] uppercase">{selectedPassage.academicField}</span>
              <h2 className="text-base font-bold text-[#21201c] mt-0.5">{selectedPassage.title}</h2>
            </div>

            {/* Passage Text */}
            <div className="font-reading text-sm sm:text-base text-[#21201c] leading-relaxed space-y-3">
              {selectedPassage.passage.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="p-3 bg-[#f4f2ee] rounded border border-[#e8e6e1]">
                  <span className="font-mono-code text-xs text-[#6b675e] mr-2">[{pIdx + 1}]</span>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Glossary */}
            <div className="pt-2 border-t border-[#e8e6e1] space-y-1">
              <span className="text-xs font-semibold text-[#21201c] block">Glossary:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedPassage.glossary.map((g, i) => (
                  <div key={i} className="bg-[#f4f2ee] border border-[#e8e6e1] px-2.5 py-1 rounded">
                    <strong>{g.term}:</strong> <span className="text-[#6b675e]">{g.definition}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right: Questions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="clean-surface p-5 space-y-4">
            
            <div className="flex justify-between items-center border-b border-[#e8e6e1] pb-2 text-xs">
              <span className="font-mono-code text-[#6b675e] uppercase">Questions</span>
              <span className="font-mono-code text-[#6b675e]">+40 XP / Item</span>
            </div>

            <div className="space-y-4">
              {selectedPassage.questions.map((q, qIndex) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;

                return (
                  <div key={q.id} className="space-y-2 bg-[#f4f2ee] p-3.5 rounded border border-[#e8e6e1] text-xs">
                    <div className="flex justify-between text-[11px] font-mono-code text-[#6b675e]">
                      <span>{q.type}</span>
                      <span>Ref: {q.paragraphReference}</span>
                    </div>

                    <p className="font-medium text-[#21201c]">
                      {qIndex + 1}. {q.questionText}
                    </p>

                    <div className="space-y-1 pt-1">
                      {(q.options || ['TRUE', 'FALSE', 'NOT GIVEN']).map((opt, optIdx) => {
                        const isSelected = userAns === opt;
                        let btnClass = 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]';

                        if (isSelected && !isGraded) {
                          btnClass = 'border-[#21201c] text-[#21201c] font-semibold bg-white';
                        }

                        if (isGraded) {
                          if (opt === q.correctAnswer) {
                            btnClass = 'border-[#2f7a42] text-[#2f7a42] font-semibold bg-white';
                          } else if (isSelected && !isCorrect) {
                            btnClass = 'border-[#8f3a3a] text-[#8f3a3a] bg-white';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={isGraded}
                            onClick={() => handleSelectAnswer(q.id, opt)}
                            className={`w-full text-left p-2 rounded border text-xs transition-colors flex justify-between items-center ${btnClass}`}
                          >
                            <span>{opt}</span>
                            {isGraded && opt === q.correctAnswer && (
                              <span className="font-mono-code font-bold text-[#2f7a42]">Correct</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isGraded && (
                      <div className="text-[11px] text-[#6b675e] pt-1">
                        {q.detailedExplanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!isGraded ? (
                <button
                  onClick={handleGrade}
                  disabled={Object.keys(userAnswers).length < selectedPassage.questions.length}
                  className="w-full py-2 bg-[#21201c] text-[#faf9f7] rounded-md font-medium text-xs disabled:opacity-40"
                >
                  Grade Answers
                </button>
              ) : (
                <button
                  onClick={resetPractice}
                  className="w-full py-2 border border-[#e8e6e1] bg-white text-[#21201c] rounded-md font-medium text-xs hover:bg-[#f4f2ee]"
                >
                  Reset Practice
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
