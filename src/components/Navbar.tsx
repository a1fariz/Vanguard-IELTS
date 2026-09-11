import React from 'react';
import type { UserStats, AppMode } from '../types';

interface NavbarProps {
  stats: UserStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchMode: (mode: AppMode) => void;
  accent: 'en-US' | 'en-GB';
  onSwitchAccent: (accent: 'en-US' | 'en-GB') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  activeTab,
  setActiveTab,
  onSwitchMode,
  accent,
  onSwitchAccent
}) => {
  const isDaily = stats.mode === 'daily';
  const unmasteredMistakes = (stats.mistakeBank || []).filter((m) => !m.resolved).length;

  const dailyNavItems = [
    { id: 'daily_quest', label: 'Quest Map' },
    { id: 'daily_expression', label: 'Word of Day' },
    { id: 'shadowing', label: 'Shadowing' },
    { id: 'sentence_builder', label: 'Sentences' },
    { id: 'chat_roleplay', label: 'Chat Sim' },
    { id: 'daily_scenarios', label: 'Dialogues' },
    { id: 'daily_vocab', label: 'Vocab' },
    { id: 'starred', label: 'Bookmarks' },
  ];

  const ieltsNavItems = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'daily_expression', label: 'Word of Day' },
    { id: 'study_srs', label: 'Lexicon' },
    { id: 'paraphrase', label: 'Paraphrase' },
    { id: 'shadowing', label: 'Shadowing' },
    { id: 'sentence_builder', label: 'Sentences' },
    { id: 'grammar', label: 'Grammar' },
    { id: 'writing', label: 'Writing' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'reading', label: 'Reading' },
    { id: 'listening', label: 'Listening' },
    { id: 'starred', label: 'Bookmarks' },
  ];

  const currentNavItems = isDaily ? dailyNavItems : ieltsNavItems;

  return (
    <header className="sticky top-0 z-50 bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#e8e6e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab(isDaily ? 'daily_quest' : 'dashboard')}
          >
            <span className="font-bold text-base text-[#21201c] tracking-tight">
              {isDaily ? 'Daily English Quest' : 'Vanguard IELTS'}
            </span>
            <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#f0ede6] text-[#6b675e] border border-[#e2ded5]">
              {isDaily ? `Stage ${stats.dailyUnlockedStage || 1} Unlocked` : `Target Band ${stats.targetBand}`}
            </span>
          </div>

          <nav className="hidden xl:flex items-center gap-1.5">
            {currentNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#21201c] text-[#faf9f7] shadow-2xs font-semibold'
                      : 'text-[#6b675e] hover:text-[#21201c] hover:bg-[#eae7df]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-lg border border-[#e2ded5] text-xs">
              <button
                onClick={() => onSwitchAccent('en-US')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  accent === 'en-US'
                    ? 'bg-white text-[#21201c] font-bold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                US Voice
              </button>
              <button
                onClick={() => onSwitchAccent('en-GB')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  accent === 'en-GB'
                    ? 'bg-white text-[#21201c] font-bold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                UK Voice
              </button>
            </div>

            <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-lg border border-[#e2ded5] text-xs">
              <button
                onClick={() => onSwitchMode('daily')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  isDaily
                    ? 'bg-[#21201c] text-white font-semibold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                Daily Mode
              </button>
              <button
                onClick={() => onSwitchMode('ielts')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  !isDaily
                    ? 'bg-[#21201c] text-white font-semibold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                IELTS Academic
              </button>
            </div>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`hidden sm:block px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                activeTab === 'mistakes'
                  ? 'border-[#21201c] bg-[#21201c] text-white'
                  : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
              }`}
            >
              Mistakes {unmasteredMistakes > 0 && `(${unmasteredMistakes})`}
            </button>

            <div className="hidden 2xl:flex items-center gap-2 text-xs font-mono-code text-[#6b675e] pl-1 border-l border-[#e8e6e1]">
              <span className="text-[#c97a3e] font-semibold">{stats.streakDays}d</span>
              <span>•</span>
              <span className="text-[#21201c] font-medium">{stats.exp} XP</span>
            </div>
          </div>
        </div>

        <div className="xl:hidden flex items-center gap-2 py-2.5 overflow-x-auto no-scrollbar border-t border-[#e8e6e1]">
          {currentNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#21201c] text-[#faf9f7] font-semibold'
                    : 'text-[#6b675e] bg-white border border-[#e8e6e1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
