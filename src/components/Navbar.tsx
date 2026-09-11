import React from 'react';
import { Mic, AlertCircle, Flame, Sparkles } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-16 gap-1.5 sm:gap-4">
          
          {/* Logo & Status Badge */}
          <div
            className="flex items-center gap-1 sm:gap-2.5 cursor-pointer select-none shrink-0 min-w-0"
            onClick={() => setActiveTab(isDaily ? 'daily_quest' : 'dashboard')}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#21201c] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
              {isDaily ? 'DE' : 'VI'}
            </div>
            <span className="font-bold text-xs sm:text-base text-[#21201c] tracking-tight truncate">
              {isDaily ? 'Daily English' : 'Vanguard IELTS'}
            </span>
            <span className="hidden md:inline-flex text-[10px] sm:text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#f0ede6] text-[#6b675e] border border-[#e2ded5] shrink-0">
              {isDaily ? `Stage ${stats.dailyUnlockedStage || 1}` : `Band ${stats.targetBand}`}
            </span>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {currentNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
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

          {/* Quick Actions & Mode Switchers */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Voice Accent Switcher - Single toggle on mobile, segmented on desktop */}
            <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-lg border border-[#e2ded5] text-xs">
              <button
                onClick={() => onSwitchAccent(accent === 'en-US' ? 'en-GB' : 'en-US')}
                className="sm:hidden px-2 py-1 rounded-md text-[10px] font-mono-code font-bold bg-white text-[#21201c] shadow-2xs flex items-center gap-1"
                title="Tekan untuk berganti aksen suara (US / UK)"
              >
                <Mic className="w-3 h-3 text-[#c97a3e]" />
                {accent === 'en-US' ? 'US' : 'UK'}
              </button>

              <button
                onClick={() => onSwitchAccent('en-US')}
                className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  accent === 'en-US'
                    ? 'bg-white text-[#21201c] font-bold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                <Mic className="w-3 h-3 opacity-75" />
                US Voice
              </button>
              <button
                onClick={() => onSwitchAccent('en-GB')}
                className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  accent === 'en-GB'
                    ? 'bg-white text-[#21201c] font-bold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                <Mic className="w-3 h-3 opacity-75" />
                UK Voice
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-lg border border-[#e2ded5] text-xs">
              <button
                onClick={() => onSwitchMode('daily')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md transition-all text-[10px] sm:text-xs font-medium ${
                  isDaily
                    ? 'bg-[#21201c] text-white font-semibold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => onSwitchMode('ielts')}
                className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md transition-all text-[10px] sm:text-xs font-medium ${
                  !isDaily
                    ? 'bg-[#21201c] text-white font-semibold shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                IELTS
              </button>
            </div>

            {/* Mistakes Button */}
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium border transition-colors shrink-0 flex items-center gap-1 ${
                activeTab === 'mistakes'
                  ? 'border-[#21201c] bg-[#21201c] text-white'
                  : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
              }`}
              title="Bank Kesalahan Belajar"
            >
              <AlertCircle className="w-3 h-3 text-[#c97a3e]" />
              <span className="sm:hidden">{unmasteredMistakes > 0 ? unmasteredMistakes : 'Err'}</span>
              <span className="hidden sm:inline">Mistakes {unmasteredMistakes > 0 && `(${unmasteredMistakes})`}</span>
            </button>

            {/* Streak & XP Counter */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono-code text-[#6b675e] pl-2 border-l border-[#e8e6e1]">
              <span className="flex items-center gap-1 text-[#c97a3e] font-semibold" title="Daily Streak">
                <Flame className="w-3.5 h-3.5 fill-[#c97a3e] text-[#c97a3e]" />
                {stats.streakDays}d
              </span>
              <span>•</span>
              <span className="text-[#21201c] font-medium flex items-center gap-1" title="Experience Points">
                <Sparkles className="w-3 h-3 text-[#d48b0a]" />
                {stats.exp} XP
              </span>
            </div>

          </div>
        </div>

        {/* Mobile / Tablet Sub-Navigation Bar */}
        <div className="xl:hidden flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar border-t border-[#e8e6e1] -mx-2.5 px-2.5 sm:-mx-6 sm:px-6">
          {currentNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#21201c] text-[#faf9f7] font-semibold shadow-xs'
                    : 'text-[#6b675e] bg-white border border-[#e8e6e1] hover:text-[#21201c] active:bg-[#f0ede6]'
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
