import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Mic, 
  LayoutDashboard, 
  PenTool,
  MessageSquareQuote,
  LayoutGrid
} from 'lucide-react';
import type { AppMode } from '../types';

interface BottomNavProps {
  mode: AppMode;
  activeTab: string;
  onNavigate: (tab: string) => void;
  unmasteredMistakes: number;
  onOpenMenuDrawer: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  mode,
  activeTab,
  onNavigate,
  unmasteredMistakes,
  onOpenMenuDrawer,
}) => {
  const isDaily = mode === 'daily';

  const dailyPrimaryTabs = [
    { id: 'daily_quest', label: 'Quest', icon: Compass },
    { id: 'daily_scenarios', label: 'Dialogues', icon: MessageSquareQuote },
    { id: 'daily_vocab', label: 'Vocab', icon: BookOpen },
    { id: 'shadowing', label: 'Shadowing', icon: Mic },
  ];

  const ieltsPrimaryTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'writing', label: 'Writing', icon: PenTool },
    { id: 'study_srs', label: 'Lexicon', icon: BookOpen },
  ];

  const currentTabs = isDaily ? dailyPrimaryTabs : ieltsPrimaryTabs;
  const isDirectTabActive = currentTabs.some((t) => t.id === activeTab);
  const isOtherTabActive = !isDirectTabActive;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#faf9f7]/95 backdrop-blur-lg border-t border-[#e8e6e1] shadow-lg pb-safe">
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto px-1">
        {currentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                isActive ? 'text-[#21201c]' : 'text-[#8a857b] hover:text-[#21201c]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#21201c]" />
              )}
            </button>
          );
        })}

        {/* 5th Button: Open Full Modules Drawer */}
        <button
          onClick={onOpenMenuDrawer}
          className={`relative flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
            isOtherTabActive ? 'text-[#21201c]' : 'text-[#8a857b] hover:text-[#21201c]'
          }`}
          aria-label="Open all modules menu"
        >
          <div className="relative">
            <LayoutGrid className={`w-5 h-5 transition-transform ${isOtherTabActive ? 'scale-110' : ''}`} />
            {unmasteredMistakes > 0 && (
              <span className="absolute -top-1 -right-2 min-w-[14px] h-[14px] px-1 rounded-full bg-[#c97a3e] text-[9px] font-mono-code font-bold text-white flex items-center justify-center leading-none">
                {unmasteredMistakes}
              </span>
            )}
          </div>
          <span className={`text-[10px] tracking-tight ${isOtherTabActive ? 'font-bold text-[#21201c]' : 'font-medium'}`}>
            Modules
          </span>
          {isOtherTabActive && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#21201c]" />
          )}
        </button>
      </div>
    </nav>
  );
};
