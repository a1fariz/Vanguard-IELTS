import React from 'react';
import { Target, Trophy, Flame, CheckCircle2 } from 'lucide-react';
import type { DailyQuestItem } from '../types';

interface DailyQuestPlannerProps {
  quests: DailyQuestItem[];
  userExp: number;
  onNavigate: (tab: string) => void;
}

export const DailyQuestPlanner: React.FC<DailyQuestPlannerProps> = ({ quests, userExp }) => {
  const completedCount = quests.filter(q => q.completed).length;

  // Level & XP Progression calculation
  const xpPerLevel = 200;
  const currentLevel = Math.floor(userExp / xpPerLevel) + 1;
  const currentLevelBaseXP = (currentLevel - 1) * xpPerLevel;
  const xpInCurrentLevel = userExp - currentLevelBaseXP;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / xpPerLevel) * 100));

  // 7-day streak days of week
  const daysOfWeek = [
    { label: 'Sen', active: true },
    { label: 'Sel', active: true },
    { label: 'Rab', active: true },
    { label: 'Kam', active: completedCount >= 1 },
    { label: 'Jum', active: completedCount >= 2 },
    { label: 'Sab', active: false },
    { label: 'Min', active: false },
  ];

  return (
    <div className="clean-surface p-3.5 sm:p-5 lg:p-6 space-y-4">
      
      {/* Header Banner with Quests count & Level Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8e6e1] pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-[#c97a3e] uppercase font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>Target Belajar Harian (Daily Quests)</span>
          </div>
          <h2 className="text-base font-bold text-[#21201c]">Rencana Konsistensi Hari Ini</h2>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto text-xs">
          <span className="font-mono-code text-[#6b675e] bg-[#f4f2ee] px-2 py-0.5 rounded border border-[#e8e6e1]">
            {completedCount} / {quests.length} Selesai
          </span>
        </div>
      </div>

      {/* Gamified Level Progress Bar & Weekly Streak Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-[#f4f2ee] border border-[#e8e6e1] text-xs">
        
        {/* Level XP Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center font-mono-code text-[11px]">
            <span className="font-bold text-[#21201c] flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-[#d48b0a]" />
              Level {currentLevel} Pelajar
            </span>
            <span className="text-[#6b675e]">
              {xpInCurrentLevel} / {xpPerLevel} XP ({xpPerLevel - xpInCurrentLevel} XP ke Lv {currentLevel + 1})
            </span>
          </div>
          
          <div className="w-full bg-[#e8e6e1] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#21201c] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Weekly Streak Days */}
        <div className="flex items-center justify-between md:justify-end gap-1.5">
          <div className="flex items-center gap-1 text-[11px] font-mono-code text-[#6b675e] mr-1">
            <Flame className="w-3.5 h-3.5 text-[#c97a3e] fill-[#c97a3e]" />
            <span className="font-semibold text-[#21201c]">Minggu Ini:</span>
          </div>
          <div className="flex gap-1">
            {daysOfWeek.map((day, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-md flex flex-col items-center justify-center text-[9px] font-mono-code font-bold transition-colors ${
                  day.active
                    ? 'bg-[#21201c] text-white shadow-2xs'
                    : 'bg-white border border-[#e8e6e1] text-[#a3998b]'
                }`}
                title={`${day.label}: ${day.active ? 'Selesai' : 'Belum'}`}
              >
                {day.label}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Daily Quests Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quests.map((q) => (
          <div
            key={q.id}
            className={`p-3.5 rounded-lg border text-xs space-y-1.5 transition-all ${
              q.completed
                ? 'bg-[#f0f9f2] border-[#c8e8c8]'
                : 'bg-[#faf9f7] border-[#e8e6e1]'
            }`}
          >
            <div className="flex justify-between items-center font-semibold">
              <span className={`flex items-center gap-1.5 ${q.completed ? 'text-[#2f7a42]' : 'text-[#21201c]'}`}>
                {q.completed && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#2f7a42]" />}
                <span>{q.titleId}</span>
              </span>
              <span className="font-mono-code text-[10px] text-[#c97a3e] bg-[#fdf5eb] px-1.5 py-0.5 rounded shrink-0">
                +{q.rewardExp} XP
              </span>
            </div>
            <p className="text-[#6b675e] text-[11px] leading-relaxed">
              {q.descriptionId}
            </p>
            <div className="flex justify-between items-center text-[10px] font-mono-code pt-1 border-t border-[#e8e6e1]/60">
              <span className="text-[#6b675e]">Progres:</span>
              <span className={q.completed ? 'text-[#2f7a42] font-bold' : 'text-[#a3998b]'}>
                {q.completed ? 'Selesai ✓' : `${q.currentCount} / ${q.targetCount}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
