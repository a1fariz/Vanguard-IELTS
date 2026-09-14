import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  AlertCircle, 
  Flame, 
  Sparkles, 
  ChevronDown, 
  Menu, 
  LayoutGrid,
  Bookmark,
  Radio,
  Layers,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import type { UserStats, AppMode } from '../types';

interface NavbarProps {
  stats: UserStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchMode: (mode: AppMode) => void;
  accent: 'en-US' | 'en-GB';
  onSwitchAccent: (accent: 'en-US' | 'en-GB') => void;
  onOpenMenuDrawer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  activeTab,
  setActiveTab,
  onSwitchMode,
  accent,
  onSwitchAccent,
  onOpenMenuDrawer,
}) => {
  const isDaily = stats.mode === 'daily';
  const unmasteredMistakes = (stats.mistakeBank || []).filter((m) => !m.resolved).length;
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary navigation tabs shown directly on desktop navbar
  const ieltsPrimary = [
    { id: 'dashboard', label: 'Overview' },
    { id: 'speaking', label: 'Speaking' },
    { id: 'writing', label: 'Writing' },
    { id: 'reading', label: 'Reading' },
    { id: 'listening', label: 'Listening' },
    { id: 'study_srs', label: 'Lexicon' },
  ];

  // Secondary items tucked neatly inside "More Labs" on desktop
  const ieltsMore = [
    { id: 'grammar', label: 'Grammar Lab', desc: 'Complex structures & band 7+', icon: FileCheck2 },
    { id: 'paraphrase', label: 'Paraphrase Studio', desc: 'Sentence rephrasing exercises', icon: RotateCcw },
    { id: 'shadowing', label: 'Shadowing Studio', desc: 'Native accent repetition', icon: Radio },
    { id: 'sentence_builder', label: 'Sentence Builder', desc: 'Syntax & clause order game', icon: Layers },
    { id: 'daily_expression', label: 'Word of the Day', desc: 'Daily academic idioms & phrases', icon: Sparkles },
    { id: 'starred', label: 'Saved Bookmarks', desc: `${(stats.starredWords || []).length} saved vocabulary`, icon: Bookmark },
  ];

  const dailyPrimary = [
    { id: 'daily_quest', label: 'Quest Map' },
    { id: 'daily_scenarios', label: 'Dialogues' },
    { id: 'chat_roleplay', label: 'Chat Sim' },
    { id: 'daily_vocab', label: 'Vocab' },
    { id: 'shadowing', label: 'Shadowing' },
  ];

  const dailyMore = [
    { id: 'sentence_builder', label: 'Sentences', desc: 'Build sentences with proper syntax', icon: Layers },
    { id: 'daily_expression', label: 'Word of Day', desc: 'Idiom & conversational phrase', icon: Sparkles },
    { id: 'starred', label: 'Bookmarks', desc: `${(stats.starredWords || []).length} saved cards`, icon: Bookmark },
  ];

  const primaryItems = isDaily ? dailyPrimary : ieltsPrimary;
  const moreItems = isDaily ? dailyMore : ieltsMore;
  const isMoreActive = moreItems.some((item) => item.id === activeTab);
  const activeMoreItem = moreItems.find((item) => item.id === activeTab);

  // Full item list for the horizontal mobile/tablet quick-bar
  const allNavItems = [
    ...primaryItems,
    ...moreItems.map((m) => ({ id: m.id, label: m.label })),
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f7]/95 backdrop-blur-md border-b border-[#e8e6e1]">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-8">
        
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          
          {/* Left: Brand Logo & Mode Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setActiveTab(isDaily ? 'daily_quest' : 'dashboard')}
            >
              <div className="w-8 h-8 rounded-lg bg-[#21201c] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs shrink-0">
                {isDaily ? 'DE' : 'VI'}
              </div>
              <div className="hidden min-[380px]:block">
                <span className="font-bold text-xs sm:text-sm text-[#21201c] tracking-tight block leading-tight">
                  {isDaily ? 'Daily English' : 'Vanguard IELTS'}
                </span>
                <span className="text-[10px] text-[#6b675e] hidden sm:block">
                  {isDaily ? `Stage ${stats.dailyUnlockedStage || 1} • Gamified` : `Academic Track • Band ${stats.targetBand}`}
                </span>
              </div>
            </div>

            <span className="hidden lg:inline-flex text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#f0ede6] text-[#6b675e] border border-[#e2ded5] shrink-0">
              {isDaily ? `Stage ${stats.dailyUnlockedStage || 1}` : `Target Band ${stats.targetBand}`}
            </span>
          </div>

          {/* Center: Desktop Navigation (Hidden on Tablet / Mobile) */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#21201c] text-[#faf9f7] shadow-2xs'
                      : 'text-[#6b675e] hover:text-[#21201c] hover:bg-[#eae7df]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* "More Modules" Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isMoreActive
                    ? 'bg-[#21201c] text-white shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c] hover:bg-[#eae7df]'
                }`}
              >
                <span>{isMoreActive && activeMoreItem ? activeMoreItem.label : 'More Labs'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white border border-[#e8e6e1] rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-[#f0ede6] text-[10px] font-mono-code uppercase font-semibold text-[#8a857b]">
                    {isDaily ? 'Additional Activities' : 'Supplementary IELTS Labs'}
                  </div>
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMoreOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#f4f2ee] text-[#21201c] font-bold'
                            : 'text-[#4a4741] hover:bg-[#faf9f7] hover:text-[#21201c]'
                        }`}
                      >
                        <div className={`p-1.5 rounded-md ${isActive ? 'bg-[#21201c] text-white' : 'bg-[#f0ede6] text-[#6b675e]'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold leading-tight">{item.label}</div>
                          <div className="text-[10px] text-[#8a857b] truncate">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right: Quick Controls, Streak, & Menu Toggle */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            
            {/* Voice Accent Switcher */}
            <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-lg border border-[#e2ded5] text-xs">
              <button
                onClick={() => onSwitchAccent(accent === 'en-US' ? 'en-GB' : 'en-US')}
                className="px-2 py-1 rounded-md text-[10px] font-mono-code font-bold bg-white text-[#21201c] shadow-2xs flex items-center gap-1 cursor-pointer"
                title="Klik untuk beralih aksen audio (US / UK)"
              >
                <Mic className="w-3 h-3 text-[#c97a3e]" />
                <span>{accent === 'en-US' ? 'US' : 'UK'}</span>
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-[#f0ede6] p-0.5 rounded-lg border border-[#e2ded5] text-xs">
              <button
                onClick={() => onSwitchMode('ielts')}
                className={`px-2 py-1 rounded-md transition-all text-[11px] font-bold cursor-pointer ${
                  !isDaily
                    ? 'bg-[#21201c] text-white shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                IELTS
              </button>
              <button
                onClick={() => onSwitchMode('daily')}
                className={`px-2 py-1 rounded-md transition-all text-[11px] font-bold cursor-pointer ${
                  isDaily
                    ? 'bg-[#21201c] text-white shadow-2xs'
                    : 'text-[#6b675e] hover:text-[#21201c]'
                }`}
              >
                Daily
              </button>
            </div>

            {/* Mistakes Shortcut */}
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-semibold border transition-colors shrink-0 flex items-center gap-1 cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'border-[#21201c] bg-[#21201c] text-white shadow-xs'
                  : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c] hover:border-[#21201c]'
              }`}
              title="Bank Kesalahan Belajar"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#c97a3e]" />
              <span className="hidden sm:inline">Errors</span>
              {unmasteredMistakes > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#c97a3e] text-white text-[9px] font-mono-code font-bold">
                  {unmasteredMistakes}
                </span>
              )}
            </button>

            {/* Streak & XP - Desktop */}
            <div className="hidden xl:flex items-center gap-2 text-xs font-mono-code text-[#6b675e] pl-2 border-l border-[#e8e6e1]">
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

            {/* All Modules Drawer Toggle Button */}
            {onOpenMenuDrawer && (
              <button
                onClick={onOpenMenuDrawer}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#21201c] hover:bg-[#383630] text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer ml-0.5"
                title="Buka semua menu & modul"
                aria-label="Open all modules menu"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">All Modules</span>
                <span className="md:hidden">Menu</span>
              </button>
            )}

          </div>
        </div>

        {/* Responsive Quick Navigation Sub-Bar (Visible across Tablet & Mobile) */}
        <div className="lg:hidden flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar border-t border-[#e8e6e1] -mx-2.5 px-2.5 sm:-mx-4 sm:px-4">
          {/* Quick All Modules Trigger Button */}
          {onOpenMenuDrawer && (
            <button
              onClick={onOpenMenuDrawer}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-bold bg-[#f0ede6] hover:bg-[#21201c] hover:text-white text-[#21201c] border border-[#e2ded5] flex items-center gap-1.5 shrink-0 transition-colors shadow-2xs"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Semua ({allNavItems.length})</span>
            </button>
          )}

          {/* Quick Access Horizontal Pills */}
          {allNavItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#21201c] text-[#faf9f7] shadow-xs'
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
