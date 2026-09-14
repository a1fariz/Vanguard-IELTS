import React, { useEffect } from 'react';
import { 
  X, 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Brain, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  Flame, 
  AlertCircle, 
  Bookmark, 
  CheckCircle2, 
  LayoutDashboard,
  Compass,
  MessageSquareQuote,
  Radio,
  FileCheck2
} from 'lucide-react';
import type { AppMode, UserStats } from '../types';

interface ModuleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  mode: AppMode;
  onSwitchMode: (mode: AppMode) => void;
  accent: 'en-US' | 'en-GB';
  onSwitchAccent: (accent: 'en-US' | 'en-GB') => void;
  stats: UserStats;
}

interface ModuleItem {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  tagColor?: string;
}

export const ModuleDrawer: React.FC<ModuleDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  mode,
  onSwitchMode,
  accent,
  onSwitchAccent,
  stats,
}) => {
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isDaily = mode === 'daily';
  const unmasteredMistakes = (stats.mistakeBank || []).filter((m) => !m.resolved).length;

  const ieltsCoreSkills: ModuleItem[] = [
    {
      id: 'speaking',
      label: 'Speaking Lab',
      desc: 'AI Part 1-3 simulator, pitch waveform & audio feedback',
      icon: Mic,
      tag: 'Core 4',
      tagColor: 'bg-[#e0e7ff] text-[#3730a3]',
    },
    {
      id: 'writing',
      label: 'Writing Lab',
      desc: 'Task 1 & Task 2 drafting, word counter & model essays',
      icon: PenTool,
      tag: 'Core 4',
      tagColor: 'bg-[#fef3c7] text-[#92400e]',
    },
    {
      id: 'reading',
      label: 'Reading Lab',
      desc: 'Academic passages, timer & question navigation',
      icon: BookOpen,
      tag: 'Core 4',
      tagColor: 'bg-[#dcfce7] text-[#166534]',
    },
    {
      id: 'listening',
      label: 'Listening Lab',
      desc: 'Section 4 audio dictation with speed controller',
      icon: Headphones,
      tag: 'Core 4',
      tagColor: 'bg-[#fce7f3] text-[#9d174d]',
    },
  ];

  const ieltsVocab: ModuleItem[] = [
    {
      id: 'study_srs',
      label: 'SRS Lexicon Deck',
      desc: 'Smart spaced repetition flashcards with collocations',
      icon: Brain,
      tag: 'Spaced Rep',
    },
    {
      id: 'daily_expression',
      label: 'Word of the Day',
      desc: 'Daily curated high-band idiomatic expressions',
      icon: Sparkles,
      tag: 'Daily',
    },
    {
      id: 'starred',
      label: 'Saved Bookmarks',
      desc: `${(stats.starredWords || []).length} saved vocabulary cards`,
      icon: Bookmark,
    },
  ];

  const ieltsLabs: ModuleItem[] = [
    {
      id: 'grammar',
      label: 'Grammar Lab',
      desc: 'Inversion, conditionals & band 7+ complex structures',
      icon: FileCheck2,
      tag: 'Accuracy',
    },
    {
      id: 'paraphrase',
      label: 'Paraphrase Studio',
      desc: 'Academic sentence rephrasing exercises',
      icon: RotateCcw,
      tag: 'Vocab Range',
    },
    {
      id: 'shadowing',
      label: 'Shadowing Studio',
      desc: 'Native accent mimicry with audio playback',
      icon: Radio,
      tag: 'Pronunciation',
    },
    {
      id: 'sentence_builder',
      label: 'Sentence Builder',
      desc: 'Interactive grammar ordering & syntax puzzle',
      icon: Layers,
      tag: 'Interactive',
    },
  ];

  const dailyModules: ModuleItem[] = [
    {
      id: 'daily_quest',
      label: 'Adventure Quest Map',
      desc: `Stage ${stats.dailyUnlockedStage || 1} unlocked — situational missions`,
      icon: Compass,
      tag: 'Roadmap',
    },
    {
      id: 'daily_scenarios',
      label: 'Dialogues & Scenarios',
      desc: 'Real-world conversations: cafe, airport, office',
      icon: MessageSquareQuote,
      tag: 'Real World',
    },
    {
      id: 'chat_roleplay',
      label: 'Chat Simulator',
      desc: 'Interactive scenario-based AI conversationalist',
      icon: Sparkles,
      tag: 'AI Chat',
    },
    {
      id: 'daily_vocab',
      label: 'Everyday Lexicon',
      desc: 'A1–B2 foundational and daily vocabulary cards',
      icon: Brain,
      tag: 'Vocabulary',
    },
    {
      id: 'shadowing',
      label: 'Shadowing Studio',
      desc: 'Sentence rhythm & native speech mimicry',
      icon: Radio,
      tag: 'Speaking',
    },
    {
      id: 'sentence_builder',
      label: 'Sentence Builder',
      desc: 'Sentence rearrangement and syntax training',
      icon: Layers,
      tag: 'Grammar',
    },
    {
      id: 'daily_expression',
      label: 'Word of the Day',
      desc: 'Everyday idiom and natural phrase of the day',
      icon: Sparkles,
      tag: 'Daily',
    },
    {
      id: 'starred',
      label: 'Bookmarks Deck',
      desc: `${(stats.starredWords || []).length} bookmarked entries`,
      icon: Bookmark,
    },
  ];

  const handleSelect = (id: string) => {
    onSelectTab(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside className="relative w-full max-w-md bg-[#faf9f7] h-full shadow-2xl flex flex-col z-10 border-l border-[#e8e6e1] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#e8e6e1] bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#21201c] text-white flex items-center justify-center font-bold text-sm">
              {isDaily ? 'DE' : 'VI'}
            </div>
            <div>
              <h2 className="font-bold text-sm text-[#21201c]">
                {isDaily ? 'Daily English Modules' : 'All IELTS Modules'}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-[#6b675e]">
                <span className="flex items-center gap-1 text-[#c97a3e] font-semibold">
                  <Flame className="w-3 h-3 fill-[#c97a3e]" />
                  {stats.streakDays}d Streak
                </span>
                <span>•</span>
                <span>{stats.exp} XP</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f0ede6] text-[#6b675e] hover:text-[#21201c] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Mode & Voice Switchers Banner */}
        <div className="p-3 bg-[#f5f3ef] border-b border-[#e8e6e1] flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center bg-white p-0.5 rounded-lg border border-[#e2ded5] shadow-2xs">
            <button
              onClick={() => onSwitchMode('ielts')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                !isDaily ? 'bg-[#21201c] text-white shadow-2xs' : 'text-[#6b675e]'
              }`}
            >
              IELTS Academic
            </button>
            <button
              onClick={() => onSwitchMode('daily')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                isDaily ? 'bg-[#21201c] text-white shadow-2xs' : 'text-[#6b675e]'
              }`}
            >
              Daily English
            </button>
          </div>

          <div className="flex items-center bg-white p-0.5 rounded-lg border border-[#e2ded5] shadow-2xs">
            <button
              onClick={() => onSwitchAccent('en-US')}
              className={`px-2 py-1 rounded-md text-[11px] font-mono-code font-bold transition-all ${
                accent === 'en-US' ? 'bg-[#21201c] text-white' : 'text-[#6b675e]'
              }`}
            >
              US
            </button>
            <button
              onClick={() => onSwitchAccent('en-GB')}
              className={`px-2 py-1 rounded-md text-[11px] font-mono-code font-bold transition-all ${
                accent === 'en-GB' ? 'bg-[#21201c] text-white' : 'text-[#6b675e]'
              }`}
            >
              UK
            </button>
          </div>
        </div>

        {/* Scrollable Module List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Quick Overview & Mistakes Shortcuts */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelect(isDaily ? 'daily_quest' : 'dashboard')}
              className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                activeTab === (isDaily ? 'daily_quest' : 'dashboard')
                  ? 'bg-[#21201c] text-white border-[#21201c] shadow-xs'
                  : 'bg-white border-[#e8e6e1] text-[#21201c] hover:border-[#21201c]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0 opacity-80" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold leading-tight truncate">
                  {isDaily ? 'Quest Map' : 'Dashboard'}
                </div>
                <div className="text-[10px] opacity-70 truncate">Ringkasan Utama</div>
              </div>
            </button>

            <button
              onClick={() => handleSelect('mistakes')}
              className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                activeTab === 'mistakes'
                  ? 'bg-[#21201c] text-white border-[#21201c] shadow-xs'
                  : 'bg-white border-[#e8e6e1] text-[#21201c] hover:border-[#21201c]'
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-[#c97a3e]" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold leading-tight truncate flex items-center gap-1">
                  Mistakes
                  {unmasteredMistakes > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#c97a3e] text-white text-[9px] font-mono-code font-bold">
                      {unmasteredMistakes}
                    </span>
                  )}
                </div>
                <div className="text-[10px] opacity-70 truncate">Bank Kesalahan</div>
              </div>
            </button>
          </div>

          {!isDaily ? (
            <>
              {/* SECTION: 4 Core IELTS Skills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase font-semibold text-[#8a857b] tracking-wider">
                    4 Core IELTS Skills
                  </span>
                  <span className="text-[10px] text-[#8a857b]">Sub-tes Resmi</span>
                </div>
                <div className="space-y-1.5">
                  {ieltsCoreSkills.map((m) => {
                    const Icon = m.icon;
                    const isActive = activeTab === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleSelect(m.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                          isActive
                            ? 'bg-[#21201c] text-white border-[#21201c] shadow-sm'
                            : 'bg-white border-[#e8e6e1] hover:border-[#21201c] text-[#21201c]'
                        }`}
                      >
                        <div className={`p-2 rounded-md shrink-0 ${isActive ? 'bg-white/15' : 'bg-[#f4f2ee]'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#21201c]'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">{m.label}</span>
                            {m.tag && (
                              <span className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded font-semibold ${m.tagColor || 'bg-[#f0ede6] text-[#6b675e]'}`}>
                                {m.tag}
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-[#6b675e]'}`}>
                            {m.desc}
                          </p>
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: Vocabulary & SRS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase font-semibold text-[#8a857b] tracking-wider">
                    Vocabulary & Memory
                  </span>
                  <span className="text-[10px] text-[#8a857b]">Retensi Kata</span>
                </div>
                <div className="space-y-1.5">
                  {ieltsVocab.map((m) => {
                    const Icon = m.icon;
                    const isActive = activeTab === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleSelect(m.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                          isActive
                            ? 'bg-[#21201c] text-white border-[#21201c] shadow-sm'
                            : 'bg-white border-[#e8e6e1] hover:border-[#21201c] text-[#21201c]'
                        }`}
                      >
                        <div className={`p-2 rounded-md shrink-0 ${isActive ? 'bg-white/15' : 'bg-[#f4f2ee]'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#21201c]'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">{m.label}</span>
                            {m.tag && (
                              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded font-semibold bg-[#f0ede6] text-[#6b675e]">
                                {m.tag}
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-[#6b675e]'}`}>
                            {m.desc}
                          </p>
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: Practice Labs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono-code uppercase font-semibold text-[#8a857b] tracking-wider">
                    Practice Labs
                  </span>
                  <span className="text-[10px] text-[#8a857b]">Pelengkap Band 7+</span>
                </div>
                <div className="space-y-1.5">
                  {ieltsLabs.map((m) => {
                    const Icon = m.icon;
                    const isActive = activeTab === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleSelect(m.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                          isActive
                            ? 'bg-[#21201c] text-white border-[#21201c] shadow-sm'
                            : 'bg-white border-[#e8e6e1] hover:border-[#21201c] text-[#21201c]'
                        }`}
                      >
                        <div className={`p-2 rounded-md shrink-0 ${isActive ? 'bg-white/15' : 'bg-[#f4f2ee]'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#21201c]'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">{m.label}</span>
                            {m.tag && (
                              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded font-semibold bg-[#f0ede6] text-[#6b675e]">
                                {m.tag}
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-[#6b675e]'}`}>
                            {m.desc}
                          </p>
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* SECTION: Daily English Modules */
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono-code uppercase font-semibold text-[#8a857b] tracking-wider">
                  Daily English Modules
                </span>
                <span className="text-[10px] text-[#8a857b]">Stage {stats.dailyUnlockedStage || 1}</span>
              </div>
              <div className="space-y-1.5">
                {dailyModules.map((m) => {
                  const Icon = m.icon;
                  const isActive = activeTab === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(m.id)}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 ${
                        isActive
                          ? 'bg-[#21201c] text-white border-[#21201c] shadow-sm'
                          : 'bg-white border-[#e8e6e1] hover:border-[#21201c] text-[#21201c]'
                      }`}
                    >
                      <div className={`p-2 rounded-md shrink-0 ${isActive ? 'bg-white/15' : 'bg-[#f4f2ee]'}`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#21201c]'}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">{m.label}</span>
                          {m.tag && (
                            <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded font-semibold bg-[#f0ede6] text-[#6b675e]">
                              {m.tag}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-[#6b675e]'}`}>
                          {m.desc}
                        </p>
                      </div>
                      {isActive && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[#e8e6e1] bg-white text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#21201c] hover:bg-[#383630] text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Tutup Menu
          </button>
        </div>
      </aside>
    </div>
  );
};
