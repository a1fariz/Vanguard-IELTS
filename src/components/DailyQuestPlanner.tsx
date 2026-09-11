import React from 'react';
import type { DailyQuestItem } from '../types';

interface DailyQuestPlannerProps {
  quests: DailyQuestItem[];
  userExp: number;
  onNavigate: (tab: string) => void;
}

export const DailyQuestPlanner: React.FC<DailyQuestPlannerProps> = ({ quests }) => {
  const completedCount = quests.filter(q => q.completed).length;

  return (
    <div className="clean-surface p-5 sm:p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-[#e8e6e1] pb-3">
        <div>
          <span className="text-[11px] font-mono-code text-[#c97a3e] uppercase font-semibold block">
            Target Belajar Harian (Daily Quests)
          </span>
          <h2 className="text-base font-bold text-[#21201c]">Rencana Konsistensi Hari Ini</h2>
        </div>
        <span className="text-xs font-mono-code text-[#6b675e]">
          {completedCount} / {quests.length} Selesai
        </span>
      </div>

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
              <span className={q.completed ? 'text-[#2f7a42]' : 'text-[#21201c]'}>
                {q.titleId}
              </span>
              <span className="font-mono-code text-[10px] text-[#c97a3e] bg-[#fdf5eb] px-1.5 py-0.5 rounded">
                +{q.rewardExp} XP
              </span>
            </div>
            <p className="text-[#6b675e] text-[11px] leading-relaxed">
              {q.descriptionId}
            </p>
            <div className="flex justify-between items-center text-[10px] font-mono-code pt-1">
              <span className="text-[#6b675e]">Status:</span>
              <span className={q.completed ? 'text-[#2f7a42] font-bold' : 'text-[#a3998b]'}>
                {q.completed ? 'Selesai' : `${q.currentCount}/${q.targetCount}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
