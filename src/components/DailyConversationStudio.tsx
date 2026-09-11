import React, { useState } from 'react';
import { CONVERSATION_SCENARIOS, type ConversationScenario } from '../data/conversationData';
import { speakText } from '../utils/speech';

interface DailyConversationStudioProps {
  onAddExp: (amount: number) => void;
}

export const DailyConversationStudio: React.FC<DailyConversationStudioProps> = ({ onAddExp }) => {
  const [selectedScenario, setSelectedScenario] = useState<ConversationScenario>(CONVERSATION_SCENARIOS[0]);
  const [activeSubTab, setActiveSubTab] = useState<'dialogue' | 'roleplay' | 'phrases'>('dialogue');
  
  // Interactive roleplay selected response
  const [roleplayAnswers, setRoleplayAnswers] = useState<Record<number, number>>({});
  const [completedRoleplay, setCompletedRoleplay] = useState<boolean>(false);

  const handleSelectRoleplayOption = (promptIndex: number, optionIndex: number) => {
    setRoleplayAnswers(prev => ({ ...prev, [promptIndex]: optionIndex }));
  };

  const handleFinishRoleplay = () => {
    setCompletedRoleplay(true);
    onAddExp(60);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-6 sm:p-8 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono-code text-[#c97a3e] font-semibold uppercase">
            Percakapan Sehari-Hari & Kontekstual (Real-World English)
          </span>
          <span className="font-mono-code text-[#6b675e]">Non-Akademik / Natural Native</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#21201c]">
          Studio Percakapan Sehari-Hari & Mengobrol dengan Orang Asing
        </h1>
        <p className="text-xs sm:text-sm text-[#6b675e] max-w-3xl leading-relaxed">
          Pelajari ungkapan natural yang dipakai penutur asli saat memesan kopi, berkenalan (small talk), traveling, meminta bantuan, hingga nongkrong dan berteman akrab.
        </p>
      </div>

      {/* Scenario Horizontal Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CONVERSATION_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              setSelectedScenario(sc);
              setRoleplayAnswers({});
              setCompletedRoleplay(false);
            }}
            className={`px-4 py-2.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
              selectedScenario.id === sc.id
                ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7] font-semibold'
                : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            {sc.topicId}
          </button>
        ))}
      </div>

      {/* Main Workspace Layout */}
      <div className="clean-surface p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
        
        {/* Context Briefing Box */}
        <div className="clean-surface-subtle p-3.5 sm:p-4 rounded-lg space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[#21201c] uppercase font-mono-code text-[11px]">Konteks Situasi:</span>
            <span className="font-mono-code text-[#c97a3e] font-semibold">{selectedScenario.level}</span>
          </div>
          <p className="text-[#21201c] leading-relaxed">{selectedScenario.contextDescriptionId}</p>
          <div className="pt-2 border-t border-[#e8e6e1] text-[#6b675e] italic">
            Tips Budaya & Tata Krama: {selectedScenario.culturalTipId}
          </div>
        </div>

        {/* Sub Navigation (Dialog vs Roleplay vs Frasa Kunci) */}
        <div className="flex gap-1.5 sm:gap-2 border-b border-[#e8e6e1] pb-3 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveSubTab('dialogue')}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              activeSubTab === 'dialogue' ? 'bg-[#21201c] text-[#faf9f7]' : 'text-[#6b675e] hover:bg-[#f4f2ee]'
            }`}
          >
            1. Contoh Percakapan
          </button>
          <button
            onClick={() => setActiveSubTab('roleplay')}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              activeSubTab === 'roleplay' ? 'bg-[#21201c] text-[#faf9f7]' : 'text-[#6b675e] hover:bg-[#f4f2ee]'
            }`}
          >
            2. Simulasi Roleplay
          </button>
          <button
            onClick={() => setActiveSubTab('phrases')}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-md font-medium transition-colors shrink-0 ${
              activeSubTab === 'phrases' ? 'bg-[#21201c] text-[#faf9f7]' : 'text-[#6b675e] hover:bg-[#f4f2ee]'
            }`}
          >
            3. Bank Frasa Penting
          </button>
        </div>

        {/* Tab 1: Full Dialogue */}
        {activeSubTab === 'dialogue' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#21201c] block">
              Alur Percakapan Alami (Klik 'Dengar' untuk mendengarkan pelafalan):
            </span>

            <div className="space-y-3">
              {selectedScenario.turns.map((turn, idx) => {
                const isUser = turn.speaker === 'Anda';
                return (
                  <div
                    key={idx}
                    className={`p-3 sm:p-4 rounded-lg border text-xs sm:text-sm space-y-2 ${
                      isUser
                        ? 'bg-white border-[#21201c]/30 ml-2 sm:ml-12'
                        : 'bg-[#f4f2ee] border-[#e8e6e1] mr-2 sm:mr-12'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-mono-code text-[11px] font-bold ${isUser ? 'text-[#c97a3e]' : 'text-[#6b675e]'}`}>
                        {turn.speaker}
                      </span>
                      <button
                        onClick={() => speakText(turn.english)}
                        className="text-xs text-[#6b675e] hover:text-[#21201c] underline font-mono-code"
                      >
                        Dengar Audio
                      </button>
                    </div>

                    <p className="font-medium text-[#21201c] text-sm sm:text-base leading-relaxed">
                      "{turn.english}"
                    </p>

                    <p className="text-xs text-[#6b675e] italic">
                      {turn.indonesian}
                    </p>

                    {turn.slangOrIdiomNote && (
                      <div className="text-[11px] bg-[#fffbf2] p-2 rounded border border-[#fae6b8] text-[#8a5d13]">
                        Catatan Native: {turn.slangOrIdiomNote}
                      </div>
                    )}

                    {turn.naturalAlternatives && (
                      <div className="text-[11px] text-[#6b675e] pt-1">
                        Variasi lain: {turn.naturalAlternatives.join(' / ')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Roleplay */}
        {activeSubTab === 'roleplay' && (
          <div className="space-y-5">
            <span className="text-xs font-semibold text-[#21201c] block">
              Latihan Menjawab Cepat: Pilih respons yang paling sesuai dengan situasi Anda:
            </span>

            <div className="space-y-4">
              {selectedScenario.interactiveRoleplay.map((rp, pIdx) => {
                const selectedOpt = roleplayAnswers[pIdx];

                return (
                  <div key={pIdx} className="bg-[#f4f2ee] p-4 sm:p-5 rounded-lg border border-[#e8e6e1] space-y-3 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono-code text-[11px] text-[#6b675e] uppercase">Lawan Bicara Berkata:</span>
                        <button
                          onClick={() => speakText(rp.partnerPrompt)}
                          className="text-xs text-[#6b675e] underline"
                        >
                          Dengar
                        </button>
                      </div>
                      <p className="font-bold text-[#21201c] text-sm sm:text-base">
                        "{rp.partnerPrompt}"
                      </p>
                      <p className="text-xs text-[#6b675e] italic">
                        ({rp.partnerPromptId})
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-semibold text-[#21201c] block">Pilihan Respons Anda:</span>
                      {rp.suggestedResponses.map((resp, oIdx) => {
                        const isChosen = selectedOpt === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectRoleplayOption(pIdx, oIdx)}
                            className={`w-full text-left p-3 rounded-md border text-xs sm:text-sm transition-all space-y-1 ${
                              isChosen
                                ? 'border-[#21201c] bg-white font-medium shadow-2xs'
                                : 'border-[#e8e6e1] bg-white/70 hover:bg-white text-[#6b675e]'
                            }`}
                          >
                            <div className="flex justify-between items-center text-[#21201c]">
                              <span>"{resp.english}"</span>
                              <span className="text-[10px] font-mono-code text-[#c97a3e] bg-[#fdf5eb] px-1.5 py-0.5 rounded">
                                {resp.nuance}
                              </span>
                            </div>
                            <div className="text-xs text-[#6b675e] italic">
                              Artinya: {resp.indonesian}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!completedRoleplay ? (
                <button
                  disabled={Object.keys(roleplayAnswers).length < selectedScenario.interactiveRoleplay.length}
                  onClick={handleFinishRoleplay}
                  className="px-5 py-2.5 bg-[#21201c] disabled:opacity-40 text-[#faf9f7] rounded-md text-xs font-semibold"
                >
                  Selesaikan Simulasi (+60 XP)
                </button>
              ) : (
                <div className="p-3 bg-[#edf7ed] border border-[#c8e8c8] rounded text-xs text-[#2f7a42] font-medium">
                  Simulasi percakapan berhasil diselesaikan! Anda sudah menguasai alur respons situasi ini.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Key Phrases Cheat Sheet */}
        {activeSubTab === 'phrases' && (
          <div className="space-y-4">
            <span className="text-xs font-semibold text-[#21201c] block">
              Frasa Praktis Siap Pakai untuk Topik Ini:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedScenario.practicalPhrases.map((phraseItem, idx) => (
                <div key={idx} className="p-4 bg-[#f4f2ee] rounded-lg border border-[#e8e6e1] space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#21201c] text-sm">{phraseItem.phrase}</span>
                    <button
                      onClick={() => speakText(phraseItem.phrase)}
                      className="text-[11px] text-[#6b675e] hover:text-[#21201c] underline"
                    >
                      Dengar
                    </button>
                  </div>
                  <div className="text-[#21201c] font-medium">
                    {phraseItem.meaningId}
                  </div>
                  <div className="text-[11px] text-[#6b675e] italic pt-1 border-t border-[#e8e6e1]">
                    Situasi: {phraseItem.situationId}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
