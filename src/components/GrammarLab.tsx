import React, { useState } from 'react';
import { GRAMMAR_LESSONS } from '../data/academicLessons';
import type { GrammarLesson } from '../types';

interface GrammarLabProps {
  onAddExp: (amount: number) => void;
}

export const GrammarLab: React.FC<GrammarLabProps> = ({ onAddExp }) => {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson>(GRAMMAR_LESSONS[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    selectedLesson.quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    if (correctCount > 0) {
      onAddExp(correctCount * 35);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Grammar Header */}
      <div className="clean-surface p-6 space-y-1">
        <span className="text-[11px] font-mono-code text-[#6b675e] uppercase block">
          Grammar Curriculum • Sentence Range & Accuracy
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-[#21201c]">
          Academic Sentence Structures
        </h1>
        <p className="text-xs text-[#6b675e]">
          Learn how to connect clauses, avoid repetitive simple sentences, and construct C1 inversions.
        </p>
      </div>

      {/* Lesson Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {GRAMMAR_LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => {
              setSelectedLesson(lesson);
              resetQuiz();
            }}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 border ${
              selectedLesson.id === lesson.id
                ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7]'
                : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            [{lesson.level}] {lesson.title}
          </button>
        ))}
      </div>

      {/* Main Lesson Content */}
      <div className="clean-surface p-6 sm:p-8 space-y-6">
        
        <div className="border-b border-[#e8e6e1] pb-4 space-y-1">
          <h2 className="text-lg font-bold text-[#21201c]">{selectedLesson.title}</h2>
          <p className="text-xs text-[#6b675e] leading-relaxed">{selectedLesson.overview}</p>
        </div>

        {/* Formula */}
        <div className="p-3 bg-[#f4f2ee] border border-[#e8e6e1] rounded-md font-mono-code text-xs text-[#21201c]">
          <span className="font-bold">Formula: </span>
          {selectedLesson.formula}
        </div>

        {/* Comparison Matrix */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-[#21201c] block">
            Sentence Comparison:
          </span>
          {selectedLesson.bandComparison.map((comp, idx) => (
            <div key={idx} className="border border-[#e8e6e1] bg-[#faf9f7] rounded-md p-3.5 space-y-1.5 text-xs">
              <div>
                <span className="font-mono-code text-[#8f3a3a] font-semibold mr-1">[Basic]:</span>
                <span className="text-[#6b675e]">"{comp.basic}"</span>
              </div>
              <div>
                <span className="font-mono-code text-[#2f7a42] font-semibold mr-1">[Advanced]:</span>
                <span className="text-[#21201c] font-medium">"{comp.advanced}"</span>
              </div>
              <p className="text-[11px] text-[#6b675e] pt-1 border-t border-[#e8e6e1]">
                Explanation: {comp.explanation}
              </p>
            </div>
          ))}
        </div>

        {/* Quiz Section */}
        <div className="space-y-4 pt-4 border-t border-[#e8e6e1]">
          <span className="text-xs font-bold text-[#21201c] uppercase block">
            Practice Exercise
          </span>

          <div className="space-y-3">
            {selectedLesson.quizQuestions.map((q, qIndex) => {
              const selectedOption = quizAnswers[q.id];
              const isCorrect = selectedOption === q.correctIndex;

              return (
                <div key={q.id} className="space-y-2 bg-[#f4f2ee] p-4 rounded-md border border-[#e8e6e1]">
                  <p className="text-xs sm:text-sm font-medium text-[#21201c]">
                    {qIndex + 1}. {q.prompt}
                  </p>

                  <div className="space-y-1 pt-1">
                    {q.options.map((opt, optIndex) => {
                      const isThisSelected = selectedOption === optIndex;
                      let btnClass = 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]';

                      if (isThisSelected && !quizSubmitted) {
                        btnClass = 'border-[#21201c] text-[#21201c] font-semibold bg-white';
                      }

                      if (quizSubmitted) {
                        if (optIndex === q.correctIndex) {
                          btnClass = 'border-[#2f7a42] text-[#2f7a42] font-semibold bg-white';
                        } else if (isThisSelected && !isCorrect) {
                          btnClass = 'border-[#8f3a3a] text-[#8f3a3a] bg-white';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={`w-full text-left p-2.5 rounded border text-xs transition-colors flex items-start gap-2 ${btnClass}`}
                        >
                          <span className="font-mono-code text-[11px] shrink-0">
                            [{String.fromCharCode(65 + optIndex)}]
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="text-xs text-[#6b675e] pt-1">
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            {!quizSubmitted ? (
              <button
                onClick={handleGradeQuiz}
                disabled={Object.keys(quizAnswers).length < selectedLesson.quizQuestions.length}
                className="w-full py-2.5 bg-[#21201c] text-[#faf9f7] rounded-md font-medium text-xs disabled:opacity-40"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="w-full py-2.5 border border-[#e8e6e1] bg-white text-[#21201c] rounded-md font-medium text-xs hover:bg-[#f4f2ee]"
              >
                Try Again
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
