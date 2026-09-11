import React from 'react';
import type { UserStats, SRSCard, BandScoreTarget } from '../types';

interface DashboardProps {
  stats: UserStats;
  cards: SRSCard[];
  onNavigate: (tab: string) => void;
  onUpdateTargetBand: (band: BandScoreTarget) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, cards, onNavigate, onUpdateTargetBand }) => {
  const masteredCount = cards.filter(c => c.srs.level >= 4).length;

  return (
    <div className="w-full space-y-8">
      
      {/* Header Profile Summary */}
      <div className="clean-surface p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e6e1] pb-6">
          <div className="space-y-1 max-w-2xl">
            <h1 className="text-xl sm:text-2xl font-bold text-[#21201c] tracking-tight">
              IELTS Academic Syllabus (CEFR A1 to C1)
            </h1>
            <p className="text-xs sm:text-sm text-[#6b675e]">
              A complete structured progression from foundational sentence patterns to C1 academic vocabulary and complex grammar.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#6b675e]">Target Band:</span>
            <select
              value={stats.targetBand}
              onChange={(e) => onUpdateTargetBand(parseFloat(e.target.value) as BandScoreTarget)}
              className="bg-[#f4f2ee] border border-[#e8e6e1] text-xs font-semibold rounded-md px-2.5 py-1 text-[#21201c] focus:outline-none cursor-pointer"
            >
              <option value={6.5}>Band 6.5 (B2)</option>
              <option value={7.0}>Band 7.0 (B2+)</option>
              <option value={7.5}>Band 7.5 (C1)</option>
              <option value={8.0}>Band 8.0 (C1+)</option>
              <option value={8.5}>Band 8.5 (C2)</option>
            </select>
          </div>
        </div>

        {/* Progress Metrics & Action */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="clean-surface-subtle p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase">A1-A2 Baseline</span>
            <div className="text-xl font-bold text-[#21201c]">2 Foundational Items</div>
            <p className="text-[11px] text-[#6b675e]">Essential verbs and standard sentence structures</p>
          </div>

          <div className="clean-surface-subtle p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase">B1-B2 Bridge</span>
            <div className="text-xl font-bold text-[#21201c]">2 Intermediate Items</div>
            <p className="text-[11px] text-[#6b675e]">Urban & academic transition vocabulary</p>
          </div>

          <div className="clean-surface-subtle p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase">C1 AWL Lexicon</span>
            <div className="text-xl font-bold text-[#21201c]">{masteredCount} / {cards.length} Mastered</div>
            <p className="text-[11px] text-[#6b675e]">High-scoring collocations and inversions</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => onNavigate('study_srs')}
            className="px-5 py-2.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold transition-colors"
          >
            Start Vocabulary Session
          </button>
          <button
            onClick={() => onNavigate('grammar')}
            className="px-5 py-2.5 bg-white hover:bg-[#f4f2ee] border border-[#e8e6e1] text-[#21201c] rounded-md text-xs font-semibold transition-colors"
          >
            Practice Grammar Rules
          </button>
        </div>
      </div>

      {/* Module Overview Tracks */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-[#21201c] uppercase tracking-wide">
          Learning Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div
            onClick={() => onNavigate('daily_talk')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2 border-[#21201c]/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#c97a3e] uppercase font-bold">Fitur Percakapan Nyata</span>
              <span className="text-[10px] font-mono-code bg-[#fdf5eb] px-2 py-0.5 rounded text-[#c97a3e] font-semibold">Bahasa Gaul & Native</span>
            </div>
            <h3 className="text-base font-bold text-[#21201c]">Ngobrol Sehari-hari (Daily English)</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Latihan ngobrol santai dengan bule: small talk, pesan kafe/restoran, traveling, arah jalan, dan berteman akrab.
            </p>
          </div>

          <div
            onClick={() => onNavigate('study_srs')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase">Module 01</span>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">Spaced Repetition</span>
            </div>
            <h3 className="text-base font-semibold text-[#21201c]">Vocabulary Decks (A1 to C1)</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Foundational verbs, B2 bridge words, Academic Word List (AWL), and high-frequency academic collocations.
            </p>
          </div>

          <div
            onClick={() => onNavigate('paraphrase')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase">Module 02</span>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">Sentence Transformation</span>
            </div>
            <h3 className="text-base font-semibold text-[#21201c]">Paraphrase Studio</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Train sentence transformation, nominalisation, and high-band active/passive reformulation.
            </p>
          </div>

          <div
            onClick={() => onNavigate('grammar')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase">Module 03</span>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">Grammar Engine</span>
            </div>
            <h3 className="text-base font-semibold text-[#21201c]">Sentence Structure & Inversion</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Conjunctions and compound sentences (A2) up to negative inversions and cleft sentences (C1).
            </p>
          </div>

          <div
            onClick={() => onNavigate('writing')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase">Module 04</span>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">Writing Lab</span>
            </div>
            <h3 className="text-base font-semibold text-[#21201c]">Academic Writing Tasks 1 & 2</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Timed writing environment with word count checks, C1 vocabulary validation, and model answers.
            </p>
          </div>

          <div
            onClick={() => onNavigate('speaking')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase">Module 05</span>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">Speaking Studio</span>
            </div>
            <h3 className="text-base font-semibold text-[#21201c]">Cue Card & Fluency Practice</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Timed 1-minute preparation and 2-minute speech delivery with discourse markers and live speech recognition.
            </p>
          </div>

          <div
            onClick={() => onNavigate('reading')}
            className="clean-surface p-5 cursor-pointer hover:border-[#b0aca2] transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase">Module 06</span>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">Reading Engine</span>
            </div>
            <h3 className="text-base font-semibold text-[#21201c]">Academic Texts & Questions</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Scientific journal passages with paragraph reference locators and structured reading comprehension.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
