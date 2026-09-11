import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { StudySRS } from './components/StudySRS';
import { DailyExpressionCard } from './components/DailyExpressionCard';
import { StarredVocabDeck } from './components/StarredVocabDeck';
import { GrammarLab } from './components/GrammarLab';
import { WritingLab } from './components/WritingLab';
import { SpeakingLab } from './components/SpeakingLab';
import { ReadingLab } from './components/ReadingLab';
import { ListeningLab } from './components/ListeningLab';
import { ParaphraseStudio } from './components/ParaphraseStudio';
import { PlacementTest } from './components/PlacementTest';
import { MistakeBank } from './components/MistakeBank';
import { DailyAdventureMap } from './components/DailyAdventureMap';
import { DailyConversationStudio } from './components/DailyConversationStudio';
import { ShadowingStudio } from './components/ShadowingStudio';
import { SentenceBuilderGame } from './components/SentenceBuilderGame';
import { InteractiveChatSimulator } from './components/InteractiveChatSimulator';
import { DailyQuestPlanner } from './components/DailyQuestPlanner';
import { BottomNav } from './components/BottomNav';
import { INITIAL_SRS_CARDS } from './data/cardsData';
import type { SRSCard, UserStats, BandScoreTarget, CEFRLevel, AppMode } from './types';
import { 
  loadSavedCards, 
  saveCardsToStorage, 
  loadUserStats, 
  saveUserStatsToStorage,
  addMistakeToBank
} from './services/srsEngine';
import { getGlobalAccent, setGlobalAccent } from './utils/speech';

export function App() {
  const [stats, setStats] = useState<UserStats>(() => loadUserStats());
  const [activeTab, setActiveTab] = useState<string>(() => stats.mode === 'daily' ? 'daily_quest' : 'dashboard');
  const [cards, setCards] = useState<SRSCard[]>(() => loadSavedCards(INITIAL_SRS_CARDS));
  const [showPlacementModal, setShowPlacementModal] = useState<boolean>(false);
  const [currentAccent, setCurrentAccent] = useState<'en-US' | 'en-GB'>(() => getGlobalAccent());

  useEffect(() => {
    saveCardsToStorage(cards);
  }, [cards]);

  useEffect(() => {
    saveUserStatsToStorage(stats);
  }, [stats]);

  const handleSwitchAccent = (newAccent: 'en-US' | 'en-GB') => {
    setCurrentAccent(newAccent);
    setGlobalAccent(newAccent);
  };

  const handleToggleStar = (headword: string) => {
    setStats(prev => {
      const current = prev.starredWords || [];
      const newStarred = current.includes(headword)
        ? current.filter(w => w !== headword)
        : [...current, headword];
      return { ...prev, starredWords: newStarred };
    });
  };

  const handleSwitchMode = (newMode: AppMode) => {
    setStats(prev => ({
      ...prev,
      mode: newMode
    }));
    setActiveTab(newMode === 'daily' ? 'daily_quest' : 'dashboard');
  };

  const handleUpdateCard = (updatedCard: SRSCard, expGain: number) => {
    setCards(prevCards => prevCards.map(c => c.id === updatedCard.id ? updatedCard : c));

    setStats(prev => {
      const today = new Date().toISOString().split('T')[0];
      const newTotalCards = prev.totalCardsReviewed + 1;
      const mastered = cards.filter(c => c.srs.level >= 4).length;

      let updatedMistakes = prev.mistakeBank;
      if (updatedCard.srs.level === 0) {
        updatedMistakes = addMistakeToBank(prev.mistakeBank, {
          type: 'vocabulary',
          sourceTitle: updatedCard.headword,
          correctAnswer: updatedCard.definition,
          noteId: `Level ${updatedCard.cefrLevel} - Kolokasi: ${updatedCard.collocations[0] || '-'}`,
        });
      }

      // Update daily quest 1
      const updatedQuests = (prev.dailyQuests || []).map(q => {
        if (q.id === 'quest-1') {
          const newCnt = Math.min(q.targetCount, q.currentCount + 1);
          return { ...q, currentCount: newCnt, completed: newCnt >= q.targetCount };
        }
        return q;
      });

      return {
        ...prev,
        exp: prev.exp + expGain,
        lastStudyDate: today,
        totalCardsReviewed: newTotalCards,
        wordsMastered: mastered,
        mistakeBank: updatedMistakes,
        dailyQuests: updatedQuests,
      };
    });
  };

  const handleAddExp = (amount: number) => {
    setStats(prev => ({
      ...prev,
      exp: prev.exp + amount,
    }));
  };

  const handleUnlockDailyStage = (nextStageId: number) => {
    setStats(prev => ({
      ...prev,
      dailyUnlockedStage: Math.max(prev.dailyUnlockedStage || 1, nextStageId)
    }));
  };

  const handleEssayDrafted = () => {
    setStats(prev => ({
      ...prev,
      essaysDrafted: prev.essaysDrafted + 1,
    }));
  };

  const handleSpeakingComplete = () => {
    setStats(prev => ({
      ...prev,
      speakingPractices: prev.speakingPractices + 1,
    }));
  };

  const handleParaphraseComplete = () => {
    setStats(prev => ({
      ...prev,
      paraphrasesCompleted: prev.paraphrasesCompleted + 1,
    }));
  };

  const handleShadowingComplete = () => {
    setStats(prev => {
      const updatedQuests = (prev.dailyQuests || []).map(q => {
        if (q.id === 'quest-2') {
          return { ...q, currentCount: 1, completed: true };
        }
        return q;
      });
      return {
        ...prev,
        shadowingCompleted: prev.shadowingCompleted + 1,
        dailyQuests: updatedQuests,
      };
    });
  };

  const handleSentenceComplete = () => {
    setStats(prev => {
      const updatedQuests = (prev.dailyQuests || []).map(q => {
        if (q.id === 'quest-3') {
          const newCnt = Math.min(q.targetCount, q.currentCount + 1);
          return { ...q, currentCount: newCnt, completed: newCnt >= q.targetCount };
        }
        return q;
      });
      return {
        ...prev,
        sentencesBuilt: prev.sentencesBuilt + 1,
        dailyQuests: updatedQuests,
      };
    });
  };

  const handleChatComplete = () => {
    setStats(prev => ({
      ...prev,
      chatMessagesSent: prev.chatMessagesSent + 1,
    }));
  };

  const handleAddMistake = (type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'daily' | 'shadowing', title: string, answer: string, noteId: string) => {
    setStats(prev => ({
      ...prev,
      mistakeBank: addMistakeToBank(prev.mistakeBank, {
        type,
        sourceTitle: title,
        correctAnswer: answer,
        noteId,
      })
    }));
  };

  const handleResolveMistake = (id: string) => {
    setStats(prev => ({
      ...prev,
      mistakeBank: prev.mistakeBank.map(m => m.id === id ? { ...m, resolved: true } : m)
    }));
  };

  const handleClearAllMistakes = () => {
    setStats(prev => ({
      ...prev,
      mistakeBank: []
    }));
  };

  const handlePlacementComplete = (determinedLevel: CEFRLevel) => {
    setStats(prev => ({
      ...prev,
      startingLevel: determinedLevel,
      currentLevel: determinedLevel,
      placementTestDone: true,
    }));
    setShowPlacementModal(false);
    setActiveTab(stats.mode === 'daily' ? 'daily_quest' : 'dashboard');
  };

  const handleUpdateTargetBand = (band: BandScoreTarget) => {
    setStats(prev => ({
      ...prev,
      targetBand: band,
    }));
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#21201c] flex flex-col selection:bg-[#21201c] selection:text-white pb-16 md:pb-0">
      
      {/* Navigation */}
      <Navbar
        stats={stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSwitchMode={handleSwitchMode}
        accent={currentAccent}
        onSwitchAccent={handleSwitchAccent}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3.5 sm:py-8 space-y-5 sm:space-y-6 overflow-x-hidden">
        
        {/* Daily Quests Summary */}
        <DailyQuestPlanner
          quests={stats.dailyQuests || []}
          userExp={stats.exp}
          onNavigate={setActiveTab}
        />

        {/* Placement Test Prompt for IELTS mode */}
        {!stats.placementTestDone && stats.mode === 'ielts' && activeTab === 'dashboard' && (
          <div className="clean-surface p-3.5 sm:p-4 bg-[#f4f2ee] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-[#21201c]">Mulai dari mana kemampuan IELTS Anda?</span>
              <p className="text-[#6b675e]">Ikuti tes penempatan singkat (A1 hingga C1) untuk menentukan titik awal Anda.</p>
            </div>
            <button
              onClick={() => setShowPlacementModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-[#21201c] text-[#faf9f7] rounded-md font-medium shrink-0 text-center"
            >
              Mulai Placement Test
            </button>
          </div>
        )}

        {/* Modal / View for Placement Test */}
        {showPlacementModal && (
          <PlacementTest
            onComplete={handlePlacementComplete}
            onCancel={() => setShowPlacementModal(false)}
          />
        )}

        {/* --- DAILY MODE VIEWS --- */}
        {!showPlacementModal && stats.mode === 'daily' && (
          <>
            {activeTab === 'daily_quest' && (
              <DailyAdventureMap
                unlockedStage={stats.dailyUnlockedStage || 1}
                userExp={stats.exp}
                onAddExp={handleAddExp}
                onUnlockNextStage={handleUnlockDailyStage}
              />
            )}

            {activeTab === 'daily_scenarios' && (
              <DailyConversationStudio
                onAddExp={handleAddExp}
              />
            )}

            {activeTab === 'daily_vocab' && (
              <StudySRS
                cards={cards.filter(c => c.category.startsWith('daily_') || c.category === 'foundational_a1_a2')}
                onUpdateCard={handleUpdateCard}
                starredWords={stats.starredWords || []}
                onToggleStar={handleToggleStar}
              />
            )}

            {activeTab === 'shadowing' && (
              <ShadowingStudio
                onAddExp={handleAddExp}
                onCompleteShadowing={handleShadowingComplete}
              />
            )}

            {activeTab === 'sentence_builder' && (
              <SentenceBuilderGame
                onAddExp={handleAddExp}
                onCompleteSentence={handleSentenceComplete}
              />
            )}

            {activeTab === 'chat_roleplay' && (
              <InteractiveChatSimulator
                onAddExp={handleAddExp}
                onCompleteChat={handleChatComplete}
              />
            )}
          </>
        )}

        {/* --- IELTS MODE VIEWS --- */}
        {!showPlacementModal && stats.mode === 'ielts' && (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                stats={stats}
                cards={cards}
                onNavigate={setActiveTab}
                onUpdateTargetBand={handleUpdateTargetBand}
              />
            )}

            {activeTab === 'study_srs' && (
              <StudySRS
                cards={cards}
                onUpdateCard={handleUpdateCard}
                starredWords={stats.starredWords || []}
                onToggleStar={handleToggleStar}
              />
            )}

            {activeTab === 'paraphrase' && (
              <ParaphraseStudio
                onAddExp={handleAddExp}
                onCompleteExercise={handleParaphraseComplete}
              />
            )}

            {activeTab === 'shadowing' && (
              <ShadowingStudio
                onAddExp={handleAddExp}
                onCompleteShadowing={handleShadowingComplete}
              />
            )}

            {activeTab === 'sentence_builder' && (
              <SentenceBuilderGame
                onAddExp={handleAddExp}
                onCompleteSentence={handleSentenceComplete}
              />
            )}

            {activeTab === 'grammar' && (
              <GrammarLab
                onAddExp={handleAddExp}
              />
            )}

            {activeTab === 'writing' && (
              <WritingLab
                onAddExp={handleAddExp}
                onEssayDrafted={handleEssayDrafted}
              />
            )}

            {activeTab === 'speaking' && (
              <SpeakingLab
                onAddExp={handleAddExp}
                onSpeakingComplete={handleSpeakingComplete}
                onAddMistake={handleAddMistake}
              />
            )}

            {activeTab === 'reading' && (
              <ReadingLab
                onAddExp={handleAddExp}
              />
            )}

            {activeTab === 'listening' && (
              <ListeningLab
                onAddExp={handleAddExp}
              />
            )}
          </>
        )}

        {/* Daily Expression / Idiom of the Day Tab */}
        {!showPlacementModal && activeTab === 'daily_expression' && (
          <DailyExpressionCard onAddExp={handleAddExp} />
        )}

        {/* Bookmarked / Starred Words Tab */}
        {!showPlacementModal && activeTab === 'starred' && (
          <StarredVocabDeck
            starredWords={stats.starredWords || []}
            allCards={cards}
            onUnstar={handleToggleStar}
            accent={currentAccent}
          />
        )}

        {/* Shared Mistakes Tab */}
        {!showPlacementModal && activeTab === 'mistakes' && (
          <MistakeBank
            mistakes={stats.mistakeBank}
            onResolve={handleResolveMistake}
            onClearAll={handleClearAllMistakes}
          />
        )}

      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[#e8e6e1] py-6 text-center text-xs text-[#6b675e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>{stats.mode === 'daily' ? 'Daily English Quest — Gamified Situational Learning' : 'Vanguard IELTS — A1 to C1 Academic Track'}</span>
          <div className="flex gap-4">
            <button onClick={() => handleSwitchMode(stats.mode === 'daily' ? 'ielts' : 'daily')} className="hover:underline font-semibold text-[#21201c]">
              Switch to {stats.mode === 'daily' ? 'IELTS Academic' : 'Daily English'}
            </button>
            <button onClick={() => setActiveTab('mistakes')} className="hover:underline">
              Mistake Bank ({stats.mistakeBank.filter(m => !m.resolved).length})
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        mode={stats.mode}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        unmasteredMistakes={(stats.mistakeBank || []).filter((m) => !m.resolved).length}
      />

    </div>
  );
}

export default App;
