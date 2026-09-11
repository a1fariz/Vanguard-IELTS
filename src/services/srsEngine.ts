import type { SRSCard, UserStats, MistakeItem } from '../types';
import { INITIAL_DAILY_QUESTS } from '../data/gamifiedFeaturesData';

const STORAGE_KEYS = {
  CARDS: 'vanguard_ielts_cards_v4',
  STATS: 'vanguard_ielts_stats_v4',
};

export const DEFAULT_USER_STATS: UserStats = {
  mode: 'daily',
  exp: 0,
  level: 1,
  dailyUnlockedStage: 1,
  ieltsUnlockedStage: 1,
  startingLevel: 'A1',
  currentLevel: 'A1',
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  totalCardsReviewed: 0,
  wordsMastered: 0,
  quizzesCompleted: 0,
  essaysDrafted: 0,
  speakingPractices: 0,
  paraphrasesCompleted: 0,
  shadowingCompleted: 0,
  sentencesBuilt: 0,
  chatMessagesSent: 0,
  targetBand: 7.5,
  dailyGoalCards: 20,
  streakFreeze: 1,
  placementTestDone: false,
  mistakeBank: [],
  dailyQuests: INITIAL_DAILY_QUESTS,
  starredWords: [],
};

export function calculateNextSRS(
  card: SRSCard,
  rating: 1 | 2 | 3 | 4
): {
  level: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string;
  consecutiveCorrect: number;
} {
  let { level, intervalDays, easeFactor, consecutiveCorrect } = card.srs;

  if (rating === 1) {
    consecutiveCorrect = 0;
    intervalDays = 1;
    level = Math.max(0, level - 1);
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    consecutiveCorrect += 1;
    const easeDelta = 0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02);
    easeFactor = Math.max(1.3, easeFactor + easeDelta);

    if (consecutiveCorrect === 1) {
      intervalDays = 1;
      level = Math.min(6, level + 1);
    } else if (consecutiveCorrect === 2) {
      intervalDays = rating === 4 ? 6 : 3;
      level = Math.min(6, level + 1);
    } else {
      const modifier = rating === 4 ? 1.3 : rating === 2 ? 0.85 : 1.0;
      intervalDays = Math.round(intervalDays * easeFactor * modifier);
      level = Math.min(6, level + 1);
    }
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);

  return {
    level,
    intervalDays,
    easeFactor: Number(easeFactor.toFixed(2)),
    nextReviewDate: nextDate.toISOString(),
    consecutiveCorrect,
  };
}

export function calculateExpGain(rating: 1 | 2 | 3 | 4): number {
  switch (rating) {
    case 1: return 5;
    case 2: return 15;
    case 3: return 25;
    case 4: return 40;
    default: return 10;
  }
}

export function calculateLevel(exp: number): { currentLevel: number; progressPercent: number; expForNext: number; expCurrent: number } {
  let level = 1;
  let remainingExp = exp;
  let expRequired = 100;

  while (remainingExp >= expRequired) {
    remainingExp -= expRequired;
    level += 1;
    expRequired = level * 120;
  }

  const progressPercent = Math.min(100, Math.round((remainingExp / expRequired) * 100));

  return {
    currentLevel: level,
    progressPercent,
    expForNext: expRequired,
    expCurrent: remainingExp,
  };
}

export function loadSavedCards(defaultCards: SRSCard[]): SRSCard[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
    if (!saved) return defaultCards;
    const parsed = JSON.parse(saved);
    const map = new Map<string, SRSCard>();
    defaultCards.forEach(c => map.set(c.id, c));
    parsed.forEach((c: SRSCard) => map.set(c.id, c));
    return Array.from(map.values());
  } catch {
    return defaultCards;
  }
}

export function saveCardsToStorage(cards: SRSCard[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
  } catch (e) {
    console.error('Storage write error', e);
  }
}

export function loadUserStats(): UserStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!saved) return DEFAULT_USER_STATS;
    return { ...DEFAULT_USER_STATS, ...JSON.parse(saved) };
  } catch {
    return DEFAULT_USER_STATS;
  }
}

export function saveUserStatsToStorage(stats: UserStats) {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Stats write error', e);
  }
}

export function addMistakeToBank(
  prevMistakes: MistakeItem[],
  newMistake: Omit<MistakeItem, 'id' | 'dateAdded' | 'resolved'>
): MistakeItem[] {
  const existing = prevMistakes.find(m => m.correctAnswer === newMistake.correctAnswer);
  if (existing) {
    return prevMistakes.map(m => m.id === existing.id ? { ...m, resolved: false, dateAdded: new Date().toISOString().split('T')[0] } : m);
  }
  const item: MistakeItem = {
    ...newMistake,
    id: `mistake-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    dateAdded: new Date().toISOString().split('T')[0],
    resolved: false,
  };
  return [item, ...prevMistakes];
}
