import React, { useState } from 'react';
import { ROLEPLAY_CHAT_SCENARIOS } from '../data/gamifiedFeaturesData';
import type { RoleplayChatScenario } from '../types';
import { speakText, getGlobalAccent } from '../utils/speech';

interface ChatSimulatorProps {
  onAddExp: (amount: number) => void;
  onCompleteChat: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  translationId?: string;
}

export const InteractiveChatSimulator: React.FC<ChatSimulatorProps> = ({ onAddExp, onCompleteChat }) => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const activeScenario: RoleplayChatScenario = ROLEPLAY_CHAT_SCENARIOS[selectedScenarioIdx];

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-0',
      sender: 'bot',
      text: activeScenario.starterMessage,
      translationId: activeScenario.starterMessageId
    }
  ]);
  const [currentSuggestions, setCurrentSuggestions] = useState<{ text: string; translationId: string }[]>(
    activeScenario.suggestedQuickReplies
  );
  const [customInput, setCustomInput] = useState<string>('');

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIdx(idx);
    const newSc = ROLEPLAY_CHAT_SCENARIOS[idx];
    setMessages([
      {
        id: 'msg-0',
        sender: 'bot',
        text: newSc.starterMessage,
        translationId: newSc.starterMessageId
      }
    ]);
    setCurrentSuggestions(newSc.suggestedQuickReplies);
  };

  const handleSendMessage = (textToSend: string, translation?: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      translationId: translation
    };

    setMessages(prev => [...prev, userMsg]);
    setCustomInput('');
    onAddExp(15);

    // Find bot reaction in dialogue tree
    const lower = textToSend.toLowerCase();
    const matchedNode = activeScenario.dialogueTree.find(node => lower.includes(node.triggerKeyword));

    setTimeout(() => {
      if (matchedNode) {
        const botMsg: ChatMessage = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: matchedNode.botReply,
          translationId: matchedNode.botReplyId
        };
        setMessages(prev => [...prev, botMsg]);
        setCurrentSuggestions(matchedNode.suggestedNext);
        speakText(matchedNode.botReply, getGlobalAccent(), 0.78);
      } else {
        const defaultBotMsg: ChatMessage = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: "That sounds great! Thanks for letting me know.",
          translationId: "Bagus sekali! Terima kasih sudah memberitahuku."
        };
        setMessages(prev => [...prev, defaultBotMsg]);
        setCurrentSuggestions([]);
      }
      onCompleteChat();
    }, 600);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="clean-surface p-6 space-y-1">
        <span className="text-[11px] font-mono-code text-[#c97a3e] uppercase block">
          Interactive Roleplay Messenger (Chat Simulation)
        </span>
        <h1 className="text-xl font-bold text-[#21201c]">
          Simulasi Chat Percakapan Nyata
        </h1>
        <p className="text-xs text-[#6b675e]">
          Latih spontanitas membalas pesan dalam Bahasa Inggris sehari-hari dengan skenario kafe dan teman serumah internasional.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {ROLEPLAY_CHAT_SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => handleSelectScenario(idx)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 border ${
              selectedScenarioIdx === idx
                ? 'border-[#21201c] bg-[#21201c] text-[#faf9f7] font-semibold'
                : 'border-[#e8e6e1] bg-white text-[#6b675e] hover:text-[#21201c]'
            }`}
          >
            {sc.titleId}
          </button>
        ))}
      </div>

      {/* Chat Box Container */}
      <div className="clean-surface p-6 sm:p-8 space-y-5">
        
        {/* Chat Partner Info */}
        <div className="flex justify-between items-center border-b border-[#e8e6e1] pb-3 text-xs">
          <div>
            <span className="font-bold text-[#21201c]">{activeScenario.characterName}</span>
            <span className="text-[#6b675e] ml-2">({activeScenario.characterRole})</span>
          </div>
          <span className="text-[#6b675e] italic text-[11px]">
            Situasi: {activeScenario.situationId}
          </span>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 min-h-[260px] max-h-[400px] overflow-y-auto p-2">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  isUser ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm space-y-1 ${
                    isUser
                      ? 'bg-[#21201c] text-white rounded-br-none'
                      : 'bg-[#f4f2ee] text-[#21201c] border border-[#e8e6e1] rounded-bl-none'
                  }`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <p className="font-medium leading-relaxed">{m.text}</p>
                    {!isUser && (
                      <button
                        onClick={() => speakText(m.text, getGlobalAccent(), 0.78)}
                        className="text-[10px] text-[#6b675e] hover:text-[#21201c] underline font-mono-code shrink-0"
                      >
                        Audio
                      </button>
                    )}
                  </div>
                  {m.translationId && (
                    <p className={`text-[11px] italic ${isUser ? 'text-[#d8d4cb]' : 'text-[#6b675e]'}`}>
                      {m.translationId}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested Quick Replies */}
        {currentSuggestions.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-[#e8e6e1]">
            <span className="text-[11px] font-semibold text-[#6b675e] block">
              Pilihan Respons Cepat:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentSuggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug.text, sug.translationId)}
                  className="p-2.5 bg-[#f4f2ee] hover:bg-[#eae7df] border border-[#e8e6e1] rounded-lg text-left text-xs transition-colors space-y-0.5"
                >
                  <div className="font-medium text-[#21201c]">"{sug.text}"</div>
                  <div className="text-[10px] text-[#6b675e] italic">{sug.translationId}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Manual Input Area */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(customInput);
            }}
            placeholder="Atau ketik balasan kustom Anda dalam Bahasa Inggris..."
            className="flex-1 p-2.5 bg-white border border-[#e8e6e1] rounded-md text-xs sm:text-sm text-[#21201c] focus:outline-none focus:border-[#21201c]"
          />
          <button
            onClick={() => handleSendMessage(customInput)}
            className="px-4 py-2.5 bg-[#21201c] text-[#faf9f7] rounded-md text-xs font-semibold"
          >
            Kirim
          </button>
        </div>

      </div>

    </div>
  );
};
