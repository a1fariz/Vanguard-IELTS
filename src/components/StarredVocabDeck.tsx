import React, { useState, useMemo } from 'react';
import type { SRSCard } from '../types';
import { speakText } from '../utils/speech';

interface StarredVocabDeckProps {
  starredWords: string[];
  allCards: SRSCard[];
  onUnstar: (headword: string) => void;
  accent: 'en-US' | 'en-GB';
}

export const StarredVocabDeck: React.FC<StarredVocabDeckProps> = ({
  starredWords,
  allCards,
  onUnstar,
  accent,
}) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const starredCards = useMemo(() => {
    const starredSet = new Set(starredWords.map((w) => w.toLowerCase()));
    return allCards.filter((card) => starredSet.has(card.headword.toLowerCase()));
  }, [starredWords, allCards]);

  const toggleExpand = (cardId: string) => {
    setExpandedCardId((prev) => (prev === cardId ? null : cardId));
  };

  const handleAudioPlay = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakText(text, accent);
  };

  const handleUnstar = (e: React.MouseEvent, headword: string) => {
    e.stopPropagation();
    onUnstar(headword);
  };

  if (starredCards.length === 0) {
    return (
      <div className="clean-surface p-8 text-center space-y-3">
        <div className="w-10 h-10 mx-auto rounded-full bg-[#f4f2ee] flex items-center justify-center text-[#6b675e]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <p className="text-xs text-[#6b675e] max-w-md mx-auto leading-relaxed">
          You haven't bookmarked any words yet. Star words from the Vocab deck to build your personal review list.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-[#21201c]">
          Bookmarked Words ({starredCards.length})
        </span>
        <span className="text-[11px] text-[#6b675e]">
          Accent: {accent === 'en-GB' ? 'British (UK)' : 'American (US)'}
        </span>
      </div>

      <div className="max-h-[600px] overflow-y-auto space-y-2 pr-1">
        {starredCards.map((card) => {
          const isExpanded = expandedCardId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => toggleExpand(card.id)}
              className="clean-surface p-3.5 cursor-pointer transition-all hover:border-[#cfcbc2]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#21201c]">{card.headword}</span>
                    {card.phonetic && (
                      <span className="text-xs text-[#6b675e] font-mono-code">{card.phonetic}</span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f4f2ee] text-[#6b675e] font-medium uppercase">
                      {card.partOfSpeech}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e8e6e1] text-[#21201c] font-semibold">
                      {card.cefrLevel}
                    </span>
                  </div>
                  <p className="text-xs text-[#6b675e] mt-1 line-clamp-1">{card.definitionId}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => handleAudioPlay(e, card.headword)}
                    title="Play pronunciation"
                    aria-label="Play pronunciation"
                    className="p-1.5 text-[#6b675e] hover:text-[#21201c] hover:bg-[#f4f2ee] rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleUnstar(e, card.headword)}
                    title="Remove from bookmarks"
                    aria-label="Remove from bookmarks"
                    className="p-1.5 text-[#6b675e] hover:text-red-600 hover:bg-[#f4f2ee] rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-[#e8e6e1] space-y-2.5 text-xs">
                  {card.definition && (
                    <div className="clean-surface-subtle p-2.5">
                      <span className="font-semibold text-[#21201c] block mb-0.5">Definition:</span>
                      <span className="text-[#6b675e]">{card.definition}</span>
                    </div>
                  )}

                  {card.collocations && card.collocations.length > 0 && (
                    <div>
                      <span className="font-semibold text-[#21201c] block mb-1">Collocations:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {card.collocations.map((colloc, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#f4f2ee] text-[#21201c] text-[11px] border border-[#e8e6e1]"
                          >
                            {colloc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {card.exampleSentences && card.exampleSentences.length > 0 && (
                    <div>
                      <span className="font-semibold text-[#21201c] block mb-1">Example:</span>
                      <div className="space-y-1.5">
                        {card.exampleSentences.slice(0, 2).map((ex, idx) => (
                          <div key={idx} className="clean-surface-subtle p-2 rounded-md">
                            <div className="flex items-start justify-between gap-2">
                              <p className="italic text-[#21201c] font-reading leading-relaxed">
                                "{ex.sentence}"
                              </p>
                              <button
                                type="button"
                                onClick={(e) => handleAudioPlay(e, ex.sentence)}
                                title="Listen to example"
                                aria-label="Listen to example"
                                className="shrink-0 p-1 text-[#6b675e] hover:text-[#21201c] transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                                  />
                                </svg>
                              </button>
                            </div>
                            {ex.translation && (
                              <p className="text-[11px] text-[#6b675e] mt-1">{ex.translation}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
