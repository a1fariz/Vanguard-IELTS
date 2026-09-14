import React from 'react';
import { 
  Mic, 
  PenTool, 
  BookOpen, 
  Headphones, 
  Brain, 
  Sparkles, 
  RotateCcw, 
  Layers, 
  Radio, 
  FileCheck2, 
  Bookmark,
  ArrowRight,
  Sparkle
} from 'lucide-react';
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
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
          <div className="clean-surface-subtle p-3.5 sm:p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase">A1-A2 Baseline</span>
            <div className="text-lg sm:text-xl font-bold text-[#21201c]">2 Foundational Items</div>
            <p className="text-[11px] text-[#6b675e]">Essential verbs and standard sentence structures</p>
          </div>

          <div className="clean-surface-subtle p-3.5 sm:p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase">B1-B2 Bridge</span>
            <div className="text-lg sm:text-xl font-bold text-[#21201c]">2 Intermediate Items</div>
            <p className="text-[11px] text-[#6b675e]">Urban & academic transition vocabulary</p>
          </div>

          <div className="clean-surface-subtle p-3.5 sm:p-4 rounded-lg space-y-1">
            <span className="text-[11px] font-mono-code text-[#6b675e] uppercase">C1 AWL Lexicon</span>
            <div className="text-lg sm:text-xl font-bold text-[#21201c]">{masteredCount} / {cards.length} Mastered</div>
            <p className="text-[11px] text-[#6b675e]">High-scoring collocations and inversions</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={() => onNavigate('study_srs')}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#21201c] hover:bg-[#383630] text-[#faf9f7] rounded-md text-xs font-semibold transition-colors text-center cursor-pointer shadow-2xs"
          >
            Start Vocabulary Session
          </button>
          <button
            onClick={() => onNavigate('speaking')}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#f4f2ee] border border-[#e8e6e1] text-[#21201c] rounded-md text-xs font-semibold transition-colors text-center cursor-pointer"
          >
            Practice Speaking Studio
          </button>
        </div>
      </div>

      {/* SECTION 1: 4 Core IELTS Subtests */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#21201c] uppercase tracking-wide">
              4 Core IELTS Modules
            </h2>
            <p className="text-xs text-[#6b675e]">Sub-tes resmi IELTS Academic dengan simulasi interaktif</p>
          </div>
          <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">
            Target Band {stats.targetBand}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Speaking */}
          <div
            onClick={() => onNavigate('speaking')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#e0e7ff] text-[#3730a3]">
                <Mic className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Buka <ArrowRight className="w-3 h-3 inline" />
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Speaking Lab</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed line-clamp-3">
              Simulasi Part 1-3 dengan timer persiapan 1 menit & delivery 2 menit, waveform suara, dan deteksi diskursus.
            </p>
          </div>

          {/* Writing */}
          <div
            onClick={() => onNavigate('writing')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#fef3c7] text-[#92400e]">
                <PenTool className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Buka <ArrowRight className="w-3 h-3 inline" />
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Writing Lab</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed line-clamp-3">
              Academic Task 1 & Task 2 drafting dengan target 150/250 kata, validasi kosakata C1, dan model essays.
            </p>
          </div>

          {/* Reading */}
          <div
            onClick={() => onNavigate('reading')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#dcfce7] text-[#166534]">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Buka <ArrowRight className="w-3 h-3 inline" />
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Reading Lab</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed line-clamp-3">
              Passage akademik berstandar jurnal ilmiah dengan timer 20 menit per bagian dan locator referensi paragraf.
            </p>
          </div>

          {/* Listening */}
          <div
            onClick={() => onNavigate('listening')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#fce7f3] text-[#9d174d]">
                <Headphones className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Buka <ArrowRight className="w-3 h-3 inline" />
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Listening Lab</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed line-clamp-3">
              Section 4 audio dictation dengan pengatur kecepatan (0.75x–1.0x) dan evaluasi ejaan kata transkrip.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 2: Vocabulary & Daily Expression */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#21201c] uppercase tracking-wide">
          Vocabulary & Retention Decks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          
          <div
            onClick={() => onNavigate('study_srs')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#f0ede6] text-[#21201c]">
                <Brain className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code bg-[#f0ede6] px-2 py-0.5 rounded text-[#21201c]">SRS System</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">SRS Lexicon (A1–C1)</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Flashcard interaktif dengan kurva interval pengulangan cerdas, kolokasi akademis, dan level CEFR.
            </p>
          </div>

          <div
            onClick={() => onNavigate('daily_expression')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#fef3c7] text-[#92400e]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code bg-[#fef3c7] px-2 py-0.5 rounded text-[#92400e]">Harian</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Word of the Day</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Idiom dan frasa akademis terpilih setiap hari lengkap dengan audio aksen, konteks kalimat, dan arti.
            </p>
          </div>

          <div
            onClick={() => onNavigate('starred')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#e0e7ff] text-[#3730a3]">
                <Bookmark className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code bg-[#e0e7ff] px-2 py-0.5 rounded text-[#3730a3]">
                {(stats.starredWords || []).length} Tersimpan
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Saved Bookmarks</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Koleksi kosakata yang Anda tandai bintang untuk ditinjau secara terfokus sebelum ujian.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 3: Practice Labs */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-[#21201c] uppercase tracking-wide">
          Practice & Fluency Labs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Grammar Lab */}
          <div
            onClick={() => onNavigate('grammar')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#f0ede6] text-[#21201c]">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e]">Band 7+</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Grammar Lab</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Inversi negatif, cleft sentences, dan variasi klausa kompleks untuk mendongkrak skor grammatical range.
            </p>
          </div>

          {/* Paraphrase Studio */}
          <div
            onClick={() => onNavigate('paraphrase')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#f0ede6] text-[#21201c]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e]">Lexical</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Paraphrase Studio</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Latihan reformulasi kalimat akademik dan nominalisasi untuk menghindari repetisi pada Writing.
            </p>
          </div>

          {/* Shadowing Studio */}
          <div
            onClick={() => onNavigate('shadowing')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#f0ede6] text-[#21201c]">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e]">Intonation</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Shadowing Studio</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Meniru pelafalan dan ritme penutur asli untuk meningkatkan aksen, kejelasan, dan kelancaran berbicara.
            </p>
          </div>

          {/* Sentence Builder */}
          <div
            onClick={() => onNavigate('sentence_builder')}
            className="clean-surface p-4 sm:p-5 cursor-pointer hover:border-[#21201c] hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-[#f0ede6] text-[#21201c]">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono-code text-[#6b675e]">Interactive</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#21201c]">Sentence Builder</h3>
            <p className="text-xs text-[#6b675e] leading-relaxed">
              Puzzle susun kata dan klausa bertingkat untuk melatih insting tata bahasa Inggris yang presisi.
            </p>
          </div>

        </div>
      </div>

      {/* Optional Daily English Callout Card */}
      <div className="p-4 sm:p-5 rounded-xl border border-[#e8e6e1] bg-gradient-to-r from-[#f7f5f0] to-[#ffffff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#21201c]">
            <Sparkle className="w-4 h-4 text-[#c97a3e]" />
            <span>Ingin Latihan Percakapan Santai Sehari-hari?</span>
          </div>
          <p className="text-xs text-[#6b675e]">
            Tersedia mode <strong className="text-[#21201c]">Daily English</strong> dengan Quest Map bertahap, simulasi dialog kafe/bandara, dan AI chat roleplay.
          </p>
        </div>
        <button
          onClick={() => onNavigate('daily_quest')}
          className="px-4 py-2 bg-[#21201c] hover:bg-[#383630] text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer shadow-2xs"
        >
          Lihat Daily English
        </button>
      </div>

    </div>
  );
};
