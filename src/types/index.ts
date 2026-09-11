export type AppMode = 'daily' | 'ielts';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type BandScoreTarget = 6.5 | 7.0 | 7.5 | 8.0 | 8.5 | 9.0;

export type CardCategory = 
  | 'daily_home' // Home, kitchen, daily routine
  | 'daily_shopping' // Supermarket, grocery, asking price
  | 'daily_dining' // Cafe, restaurant, food ordering
  | 'daily_travel' // Directions, subway, airport
  | 'daily_social' // Making friends, small talk
  | 'foundational_a1_a2' // IELTS Basic
  | 'intermediate_b1_b2' // IELTS Intermediate
  | 'awl_c1' // IELTS Academic Word List
  | 'collocations' // IELTS Collocations
  | 'grammar_structures' // Grammar
  | 'speaking_lexicon' // Speaking
  | 'writing_discourse'; // Writing

export interface SRSCard {
  id: string;
  category: CardCategory;
  topic: string;
  headword: string;
  phonetic?: string;
  partOfSpeech: string;
  cefrLevel: CEFRLevel;
  bandScore: number;
  definition: string;
  definitionId: string;
  academicContext: string;
  collocations: string[];
  synonyms: string[];
  antonyms?: string[];
  exampleSentences: {
    sentence: string;
    translation: string;
    ieltsDomain: 'Writing Task 1' | 'Writing Task 2' | 'Speaking Part 2/3' | 'Reading' | 'Listening';
  }[];
  grammarNote?: string;
  
  srs: {
    level: number;
    intervalDays: number;
    easeFactor: number;
    nextReviewDate: string;
    reviewsCount: number;
    consecutiveCorrect: number;
    lastReviewed?: string;
  };
}

export interface DailyStageLevel {
  id: number;
  title: string;
  titleId: string;
  cefrLevel: CEFRLevel;
  category: string;
  descriptionId: string;
  requiredExpToUnlock: number;
  vocabularies: {
    word: string;
    phonetic: string;
    partOfSpeech: string;
    meaningId: string;
    example: string;
    exampleId: string;
    category: 'basics' | 'household' | 'daily_actions' | 'social_phrases' | 'food' | 'directions' | 'health' | 'career';
  }[];
  dialogueScript: {
    speaker: string;
    english: string;
    indonesian: string;
    noteId?: string;
  }[];
  checkpointQuiz: {
    promptId: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanationId: string;
  }[];
}

export interface GrammarLesson {
  id: string;
  title: string;
  titleId: string;
  level: CEFRLevel;
  targetBand: number;
  category: string;
  overview: string;
  formula: string;
  bandComparison: {
    basic: string;
    advanced: string;
    explanation: string;
  }[];
  rules: {
    title: string;
    explanation: string;
    examples: string[];
  }[];
  quizQuestions: {
    id: string;
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    bandTip: string;
  }[];
}

export interface WritingTaskPrompt {
  id: string;
  type: 'task1' | 'task2';
  title: string;
  category: string;
  prompt: string;
  promptId: string;
  dataPoints?: string[];
  band9Sample: {
    introduction: string;
    overviewOrBody1: string;
    body2: string;
    conclusion?: string;
    lexicalAnalysis: string[];
    coherenceAnalysis: string[];
  };
  keyVocabulary: string[];
  timeLimitMinutes: number;
  wordCountMin: number;
}

export interface SpeakingCueCard {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  title: string;
  titleId: string;
  prompt: string;
  promptId: string;
  bulletPoints?: string[];
  band8SampleAnswer: string;
  highlightedVocabulary: {
    phrase: string;
    meaning: string;
    usageNote: string;
  }[];
  speakingTips: string[];
}

export interface ReadingPassageItem {
  id: string;
  title: string;
  titleId: string;
  academicField: string;
  passage: string;
  wordCount: number;
  glossary: { term: string; definition: string }[];
  questions: {
    id: string;
    type: 'True/False/Not Given' | 'Multiple Choice' | 'Summary Completion';
    questionText: string;
    options?: string[];
    correctAnswer: string;
    paragraphReference: string;
    detailedExplanation: string;
  }[];
}

export interface ListeningDictationItem {
  id: string;
  title: string;
  accent: 'British' | 'Australian' | 'North American';
  context: string;
  fullScript: string;
  audioPromptText: string;
  blanks: {
    index: number;
    answer: string;
    acceptedAlternatives?: string[];
    hint: string;
  }[];
}

export interface ParaphraseExercise {
  id: string;
  level: CEFRLevel;
  sourceSentence: string;
  sourceExplanationId: string;
  technique: 'Nominalisation' | 'Passive Transformation' | 'Synonym Replacement' | 'Clause Inversion';
  techniqueId: string;
  acceptedKeywords: string[];
  idealParaphrases: string[];
}

export interface PlacementQuestion {
  id: string;
  level: CEFRLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanationId: string;
}

export interface ShadowingExercise {
  id: string;
  title: string;
  titleId: string;
  level: 'A1-A2' | 'B1-B2' | 'C1';
  category: string;
  audioText: string;
  translationId: string;
  focusKeywords: string[];
  intonationTipId: string;
}

export interface SentenceBuilderChallenge {
  id: string;
  level: CEFRLevel;
  category: 'daily' | 'ielts';
  targetMeaningId: string;
  scrambledWords: string[];
  correctSentence: string;
  grammarTipId: string;
}

export interface RoleplayChatScenario {
  id: string;
  title: string;
  titleId: string;
  characterName: string;
  characterRole: string;
  situationId: string;
  starterMessage: string;
  starterMessageId: string;
  suggestedQuickReplies: {
    text: string;
    translationId: string;
  }[];
  dialogueTree: {
    triggerKeyword: string;
    botReply: string;
    botReplyId: string;
    suggestedNext: {
      text: string;
      translationId: string;
    }[];
  }[];
}

export interface DailyQuestItem {
  id: string;
  titleId: string;
  descriptionId: string;
  rewardExp: number;
  completed: boolean;
  targetCount: number;
  currentCount: number;
}

export interface MistakeItem {
  id: string;
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'daily' | 'shadowing';
  sourceTitle: string;
  incorrectInput?: string;
  correctAnswer: string;
  noteId: string;
  dateAdded: string;
  resolved: boolean;
}

export interface UserStats {
  mode: AppMode;
  exp: number;
  level: number;
  dailyUnlockedStage: number;
  ieltsUnlockedStage: number;
  startingLevel: CEFRLevel;
  currentLevel: CEFRLevel;
  streakDays: number;
  lastStudyDate: string;
  totalCardsReviewed: number;
  wordsMastered: number;
  quizzesCompleted: number;
  essaysDrafted: number;
  speakingPractices: number;
  paraphrasesCompleted: number;
  shadowingCompleted: number;
  sentencesBuilt: number;
  chatMessagesSent: number;
  targetBand: BandScoreTarget;
  dailyGoalCards: number;
  streakFreeze: number;
  placementTestDone: boolean;
  mistakeBank: MistakeItem[];
  dailyQuests: DailyQuestItem[];
  starredWords: string[];
}

export type QuizMode = 'flashcard' | 'multiple_choice' | 'spelling_dictation';
