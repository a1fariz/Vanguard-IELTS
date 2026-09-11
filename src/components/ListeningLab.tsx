import React, { useState } from 'react';
import { LISTENING_ITEMS } from '../data/academicLessons';
import type { ListeningDictationItem } from '../types';
import { speakText } from '../utils/speech';

interface ListeningLabProps {
  onAddExp: (amount: number) => void;
}

export const ListeningLab: React.FC<ListeningLabProps> = ({ onAddExp }) => {
  const [selectedItem] = useState<ListeningDictationItem>(LISTENING_ITEMS[0]);
  const [userBlanks, setUserBlanks] = useState<Record<number, string>>({});
  const [isGraded, setIsGraded] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85);

  const handlePlayAudio = () => {
    speakText(selectedItem.audioPromptText, undefined, playbackSpeed);
  };

  const handleGrade = () => {
    setIsGraded(true);
    let correctCount = 0;

    selectedItem.blanks.forEach(b => {
      const userVal = (userBlanks[b.index] || '').trim().toLowerCase();
      const targetVal = b.answer.toLowerCase();
      const alts = (b.acceptedAlternatives || []).map(a => a.toLowerCase());

      if (userVal === targetVal || alts.includes(userVal)) {
        correctCount += 1;
      }
    });

    if (correctCount > 0) {
      onAddExp(correctCount * 30);
    }
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-6 space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono-code text-[#6b675e] uppercase">
            Section 4 Audio Dictation
          </span>
          <span className="font-mono-code text-[#6b675e]">{selectedItem.accent} Accent</span>
        </div>
        <h1 className="text-xl font-bold text-[#21201c]">
          Academic Listening & Dictation
        </h1>
      </div>

      {/* Audio Controller */}
      <div className="clean-surface p-4 sm:p-5 text-center space-y-3">
        <div className="text-xs">
          <span className="text-[#6b675e]">Topic: </span>
          <strong className="text-[#21201c]">{selectedItem.title}</strong>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button
            onClick={handlePlayAudio}
            className="w-full sm:w-auto px-4 py-2 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold shadow-2xs"
          >
            Play Audio Clip
          </button>

          <div className="flex items-center gap-1 bg-[#f4f2ee] border border-[#e8e6e1] p-1 rounded-md text-xs font-mono-code text-[#6b675e]">
            <span className="px-1 text-[11px]">Speed:</span>
            <button
              onClick={() => setPlaybackSpeed(0.75)}
              className={`px-2 py-0.5 rounded ${playbackSpeed === 0.75 ? 'bg-white text-[#21201c] font-bold shadow-2xs' : ''}`}
            >
              0.75x
            </button>
            <button
              onClick={() => setPlaybackSpeed(0.85)}
              className={`px-2 py-0.5 rounded ${playbackSpeed === 0.85 ? 'bg-white text-[#21201c] font-bold shadow-2xs' : ''}`}
            >
              0.85x
            </button>
            <button
              onClick={() => setPlaybackSpeed(1.0)}
              className={`px-2 py-0.5 rounded ${playbackSpeed === 1.0 ? 'bg-white text-[#21201c] font-bold shadow-2xs' : ''}`}
            >
              1.0x
            </button>
          </div>
        </div>
      </div>

      {/* Dictation Blanks */}
      <div className="clean-surface p-4 sm:p-6 space-y-4">
        <span className="text-xs font-mono-code text-[#6b675e] uppercase block">
          Transcript Fill-in-the-Blanks
        </span>

        <div className="space-y-3">
          {selectedItem.blanks.map((b) => {
            const userVal = userBlanks[b.index] || '';
            const isMatch = isGraded && (
              userVal.trim().toLowerCase() === b.answer.toLowerCase() ||
              (b.acceptedAlternatives || []).map(a => a.toLowerCase()).includes(userVal.trim().toLowerCase())
            );

            return (
              <div key={b.index} className="bg-[#f4f2ee] p-3 sm:p-3.5 rounded border border-[#e8e6e1] space-y-1.5 text-xs">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                  <span className="font-mono-code font-bold text-[#21201c]">Blank [{b.index + 1}]</span>
                  <span className="text-[#6b675e] text-[11px]">Clue: {b.hint}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={userVal}
                    disabled={isGraded}
                    onChange={(e) => setUserBlanks(prev => ({ ...prev, [b.index]: e.target.value }))}
                    placeholder="Type words heard..."
                    className={`w-full p-2 bg-white border rounded font-mono-code text-xs focus:outline-none ${
                      isGraded
                        ? isMatch
                          ? 'border-[#2f7a42] text-[#2f7a42]'
                          : 'border-[#8f3a3a] text-[#8f3a3a]'
                        : 'border-[#e8e6e1] text-[#21201c] focus:border-[#21201c]'
                    }`}
                  />
                  {isGraded && (
                    <span className={`text-xs font-mono-code font-bold shrink-0 ${isMatch ? 'text-[#2f7a42]' : 'text-[#8f3a3a]'}`}>
                      {isMatch ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                </div>

                {isGraded && !isMatch && (
                  <div className="text-[11px] font-mono-code text-[#8f3a3a]">
                    Correct answer: <u>{b.answer}</u>
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
              className="w-full py-2 bg-[#21201c] text-[#faf9f7] rounded-md font-medium text-xs"
            >
              Check Dictation Answers
            </button>
          ) : (
            <button
              onClick={() => {
                setUserBlanks({});
                setIsGraded(false);
              }}
              className="w-full py-2 border border-[#e8e6e1] bg-white text-[#21201c] rounded-md font-medium text-xs hover:bg-[#f4f2ee]"
            >
              Reset Dictation
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
