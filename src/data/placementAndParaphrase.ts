import type { PlacementQuestion, ParaphraseExercise } from '../types';

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: 'pq-1',
    level: 'A1',
    question: 'Choose the correct word: "She _____ to the library every Monday to study."',
    options: ['go', 'goes', 'going', 'gone'],
    correctIndex: 1,
    explanationId: 'Subjek tunggal orang ketiga (She) dalam Simple Present Tense menggunakan akhiran -s/-es (goes).'
  },
  {
    id: 'pq-2',
    level: 'A2',
    question: 'Combine these sentences: "The weather was bad. We decided to stay inside."',
    options: [
      'Because the weather was bad, we decided to stay inside.',
      'The weather was bad because we decided to stay inside.',
      'We decided to stay inside although the weather was bad.',
      'Because of the weather was bad, we stayed.'
    ],
    correctIndex: 0,
    explanationId: 'Kata hubung "Because" (karena) diletakkan di depan klausa alasan (cuaca buruk).'
  },
  {
    id: 'pq-3',
    level: 'B1',
    question: 'Select the correct sentence for future trend: "Over the next decade, renewable energy adoption _____ substantially."',
    options: [
      'is projected to increase',
      'was increasing',
      'has increased already',
      'increases yesterday'
    ],
    correctIndex: 0,
    explanationId: 'Frasa "is projected to increase" (diproyeksikan meningkat) adalah pola standar B1/B2 untuk proyeksi masa depan dalam IELTS Task 1.'
  },
  {
    id: 'pq-4',
    level: 'B2',
    question: 'Choose the best academic synonym for "big problem" in an IELTS Task 2 essay:',
    options: ['pressing issue', 'bad stuff', 'huge trouble', 'massive hard'],
    correctIndex: 0,
    explanationId: '"Pressing issue" (masalah mendesak) adalah kolokasi akademik B2/C1 yang tepat menggantikan ungkapan informal "big problem".'
  },
  {
    id: 'pq-5',
    level: 'C1',
    question: 'Which inverted sentence is grammatically correct and appropriate for Band 8+ writing?',
    options: [
      'Not only does automation reduce costs, but it also minimizes human error.',
      'Not only automation reduces costs, but also it minimizes human error.',
      'Not only does reduce automation costs, but it minimizes error.',
      'Not only is automation reduce costs, but it minimizes human error.'
    ],
    correctIndex: 0,
    explanationId: 'Inversi dengan "Not only" mengharuskan kata kerja bantu (does) diletakkan sebelum subjek (automation).'
  }
];

export const PARAPHRASE_EXERCISES: ParaphraseExercise[] = [
  {
    id: 'para-1',
    level: 'A2',
    sourceSentence: 'More people are buying electric cars because fuel prices are high.',
    sourceExplanationId: 'Kalimat sederhana dengan kata hubung "because" yang perlu diubah ke kalimat pasif atau kata benda formal.',
    technique: 'Synonym Replacement',
    techniqueId: 'Penggantian Kosakata & Restrukturisasi',
    acceptedKeywords: ['electric vehicles', 'surging', 'rising fuel costs', 'growing number', 'adoption'],
    idealParaphrases: [
      'A growing number of individuals are purchasing electric vehicles due to rising fuel costs.',
      'High petroleum prices have prompted more consumers to adopt electric cars.'
    ]
  },
  {
    id: 'para-2',
    level: 'B2',
    sourceSentence: 'The government needs to spend more money on public transport to reduce traffic congestion.',
    sourceExplanationId: 'Kalimat argumen solusi yang bisa diubah menggunakan nominalisasi (investing / expenditure) atau kalimat pasif formal.',
    technique: 'Nominalisation',
    techniqueId: 'Nominalisasi (Mengubah Kata Kerja menjadi Kata Benda)',
    acceptedKeywords: ['investment', 'public transit', 'alleviate', 'congestion', 'subsidies', 'infrastructure'],
    idealParaphrases: [
      'Increased state investment in public transit infrastructure is imperative to alleviate urban road congestion.',
      'Allocating greater government funding toward public transportation could substantially mitigate urban traffic jams.'
    ]
  },
  {
    id: 'para-3',
    level: 'C1',
    sourceSentence: 'If governments do not regulate greenhouse gas emissions, global temperatures will increase rapidly.',
    sourceExplanationId: 'Pengandaian conditional tipe 1 yang dapat diubah menjadi inversi tingkat tinggi (Were governments to fail / Unless stringent...).',
    technique: 'Clause Inversion',
    techniqueId: 'Inversi Klausa Kondisional (Tanpa Kata "If")',
    acceptedKeywords: ['unless', 'stringent regulations', 'curtail', 'escalate', 'rapid increase', 'curb emissions'],
    idealParaphrases: [
      'Unless stringent regulations are enforced to curb carbon emissions, global temperatures will escalate at an alarming rate.',
      'Without rigorous governmental policies restricting industrial emissions, rapid climate warming remains inevitable.'
    ]
  }
];
