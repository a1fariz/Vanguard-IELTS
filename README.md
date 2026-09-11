# Vanguard IELTS — Academic Preparation & SRS Platform

Interactive, comprehensive IELTS academic preparation web platform covering CEFR A1 to C1 proficiency levels. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## Overview

Vanguard IELTS is an all-in-one preparation environment designed for candidates targeting high band scores (Band 7.5+ to 9.0). It combines structured practice across all four official IELTS modules with cognitive learning tools such as Spaced Repetition (SRS), audio shadowing, and mistake recovery.

---

## Core Features & Modules

### 1. Four-Skill IELTS Academic Labs
- **Listening Lab**: Audio comprehension drills with section-by-section checkpoints, multiple-choice questions, and transcript reviews.
- **Reading Lab**: Authentic academic passages with timed reading simulations, skimming guides, and paragraph-heading matching.
- **Writing Lab**: Structured prompt environments for Academic Task 1 (data interpretation/charts) and Task 2 (argumentative essays) with band descriptor rubrics.
- **Speaking Lab**: Speaking prompt simulations covering Part 1 (Introduction), Part 2 (Cue Card monologue), and Part 3 (Two-way discussion).

### 2. Shadowing Studio & Speech Engine
- Real-time sentence shadowing exercises using browser-native Web Speech API.
- Listen-repeat rhythm training for natural English pronunciation, intonation, and stress patterns.

### 3. Spaced Repetition (SRS) Vocabulary Deck
- SuperMemo-inspired retention algorithm scheduling reviews at optimal cognitive intervals.
- Starred vocabulary collection with CEFR level tags (A1 through C1) and academic context sentences.

### 4. Daily Adventure Map & Quests
- Progressive daily learning stages simulating an educational journey from foundational English to advanced academic discourse.
- Interactive Quest Planner with milestone achievements and daily streak tracking.

### 5. Mistake Bank & Paraphrase Studio
- Automatic logging of incorrect responses into a persistent Mistake Bank for focused remediation.
- Paraphrase Studio featuring active sentence transformation exercises to master lexical variety for IELTS Writing and Speaking.

### 6. Placement Diagnostic Test
- Calibration assessment mapping initial user proficiency to the CEFR framework (A1, A2, B1, B2, C1).

---

## Technical Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Audio Synthesis**: Native Web Speech API
- **Animations / FX**: Canvas Confetti
- **Linter**: Oxlint

---

## Project Structure

```
ielts/
├── public/
├── src/
│   ├── assets/              # Images, vectors, and UI assets
│   ├── components/          # Modular UI labs and interactive studios
│   │   ├── DailyAdventureMap.tsx
│   │   ├── DailyConversationStudio.tsx
│   │   ├── DailyExpressionCard.tsx
│   │   ├── DailyQuestPlanner.tsx
│   │   ├── Dashboard.tsx
│   │   ├── GrammarLab.tsx
│   │   ├── InteractiveChatSimulator.tsx
│   │   ├── ListeningLab.tsx
│   │   ├── MistakeBank.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParaphraseStudio.tsx
│   │   ├── PlacementTest.tsx
│   │   ├── ReadingLab.tsx
│   │   ├── SentenceBuilderGame.tsx
│   │   ├── ShadowingStudio.tsx
│   │   ├── SpeakingLab.tsx
│   │   ├── StarredVocabDeck.tsx
│   │   ├── StudySRS.tsx
│   │   └── WritingLab.tsx
│   ├── data/                # Academic datasets, stages, and question banks
│   ├── services/            # Spaced repetition (SRS) scheduling engine
│   ├── theme/               # Design system tokens and styling rules
│   ├── types/               # TypeScript data models and interfaces
│   ├── utils/               # Speech synthesis and helper utilities
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/a1fariz/Vanguard-IELTS.git
   cd Vanguard-IELTS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## Author

- Alfa Rizi
- GitHub: https://github.com/a1fariz
- Portfolio: https://alfarizi.my.id
