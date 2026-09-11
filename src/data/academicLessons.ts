import type { GrammarLesson, WritingTaskPrompt, SpeakingCueCard, ReadingPassageItem, ListeningDictationItem } from '../types';

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'gram-a1-complex',
    title: 'Compound & Complex Sentences (Cohesion)',
    titleId: 'Kalimat Majemuk Bertingkat (Kohesi)',
    level: 'A2',
    targetBand: 6.5,
    category: 'Sentence Structures',
    overview: 'Menghubungkan klausa independen dengan kata hubung koordinatif dan subordinatif agar tidak membuat kalimat sederhana yang repetitif.',
    formula: 'Independent Clause + Conjunction (although, whereas, since, because) + Dependent Clause',
    bandComparison: [
      {
        basic: 'Air pollution is high. Many people still drive cars to work.',
        advanced: 'Although air pollution has reached critical levels, a substantial proportion of commuters continue to drive private vehicles.',
        explanation: 'Kalimat lanjutan menggunakan klausa subordinatif "Although..." serta kosakata akademik formal.'
      }
    ],
    rules: [
      {
        title: 'Penanda Kontras (Although, Whereas, While)',
        explanation: 'Gunakan kata hubung kontras untuk menggabungkan dua sudut pandang berlawanan dalam satu kalimat yang padu.',
        examples: [
          'Whereas fossil fuels are finite, renewable energy offers an inexhaustible supply.',
          'While online learning provides flexibility, classroom interaction fosters better collaboration.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q-a1-1',
        prompt: 'Pilih kalimat yang menggabungkan dua ide menjadi kalimat majemuk bertingkat yang kohesif:',
        options: [
          'Although tuition fees have increased, university enrollment remains at a historic high.',
          'Tuition fees have increased and so university enrollment remains high too.',
          'Tuition fees increased, but enrollment is high because it is good.',
          'Because tuition fees increased although enrollment is high.'
        ],
        correctIndex: 0,
        explanation: 'Kalimat ini menggunakan kata hubung "Although" secara tepat untuk menyatakan kontras logis.',
        bandTip: 'Pastikan setiap paragraf isi esai memiliki minimal dua kalimat majemuk bertingkat.'
      }
    ]
  },
  {
    id: 'gram-inv-01',
    title: 'Negative & Restrictive Inversion',
    titleId: 'Inversi Negatif & Restriktif Formal',
    level: 'C1',
    targetBand: 8.0,
    category: 'Grammatical Range & Accuracy',
    overview: 'Memindahkan kata keterangan negatif/restriktif ke depan kalimat untuk penekanan argumen formal tingkat tinggi.',
    formula: 'Negative/Restrictive Adverb + Auxiliary Verb + Subject + Main Verb',
    bandComparison: [
      {
        basic: 'Governments should not ignore climate change, and they cannot delay subsidies either.',
        advanced: 'Under no circumstances should governments overlook environmental degradation; nor can they delay green subsidies.',
        explanation: 'Sintaksis lanjutan menerapkan inversi kata kerja bantu modal "should governments overlook" dan "nor can they".'
      }
    ],
    rules: [
      {
        title: 'Kata Keterangan Negatif (Seldom, Rarely, Under no circumstances)',
        explanation: 'Letakkan kata kerja bantu (auxiliary verb) langsung setelah frasa keterangan negatif.',
        examples: [
          'Rarely have modern economies experienced such rapid technological transitions.',
          'Under no circumstances should educational standards be compromised.'
        ]
      }
    ],
    quizQuestions: [
      {
        id: 'q1',
        prompt: 'Pilih kalimat inversi yang tepat untuk penulisan akademik resmi:',
        options: [
          'Not only does automation increase productivity, but it also reduces human error.',
          'Not only automation increases productivity, but also it reduces error.',
          'Not only does increase automation productivity, but it reduces error.',
          'Not only is automation increase productivity, but it reduces error.'
        ],
        correctIndex: 0,
        explanation: '"Not only" membutuhkan inversi kata bantu "does" yang diikuti subjek "automation" dan kata kerja dasar "increase".',
        bandTip: 'Gunakan satu kalimat inversi di Paragraf Isi 2 untuk menunjukkan rentang tata bahasa Band 8+.'
      }
    ]
  }
];

export const WRITING_PROMPTS: WritingTaskPrompt[] = [
  {
    id: 'wt2-env-01',
    type: 'task2',
    title: 'Environmental Responsibility: Individuals vs Governments',
    category: 'Environment & Policy',
    prompt: 'Some people believe that environmental problems are too big for individuals to solve, while others think that individual actions play a crucial role. Discuss both views and give your own opinion.',
    promptId: 'Sebagian orang percaya bahwa masalah lingkungan terlalu besar untuk diselesaikan oleh individu, sementara yang lain berpendapat bahwa tindakan individu memiliki peran krusial. Diskusikan kedua pandangan dan berikan opini Anda.',
    timeLimitMinutes: 40,
    wordCountMin: 250,
    keyVocabulary: ['mitigate', 'structural reforms', 'individual accountability', 'fiscal measures', 'sustainable consumption'],
    band9Sample: {
      introduction: 'Whether environmental preservation is primarily the responsibility of centralized government authority or relies on grassroots individual action remains widely debated. While state intervention is essential for structural reforms, individual lifestyle changes serve as the foundation for sustainable change.',
      overviewOrBody1: 'On the one hand, proponents of government intervention argue that the scale of contemporary ecological damage surpasses individual capabilities. National governments possess the legislative authority to enforce carbon taxation, ban single-use plastics, and subsidize renewable energy grids. Without centralized regulations, corporate entities would rarely limit profitable fossil fuel use.',
      body2: 'On the other hand, the collective power of individual choices exerts significant economic influence. Consumer habits drive market demand; when citizens choose sustainable transport, reduce waste, and consume less energy, industries must adapt. Furthermore, public concern often compels policymakers to introduce stricter environmental legislation.',
      conclusion: 'In conclusion, while government action is necessary for nationwide regulations, individual commitment provides the civic momentum required for lasting ecological restoration. A combination of both approaches is essential.',
      lexicalAnalysis: [
        'centralized government authority (frasa nomina akademik)',
        'grassroots individual action (kolokasi)',
        'legislative authority (laras bahasa administratif resmi)'
      ],
      coherenceAnalysis: [
        'Pernyataan tesis yang jelas di paragraf pengantar dan dipertahankan sepanjang esai.',
        'Struktur paragraf logis: Peran Pemerintah -> Peran Individu -> Kesimpulan.'
      ]
    }
  },
  {
    id: 'wt1-tech-01',
    type: 'task1',
    title: 'Global Renewable Energy Consumption (2000 - 2025)',
    category: 'Academic Task 1 - Line Graph',
    prompt: 'The chart below illustrates the proportion of total energy generated from solar, wind, and hydroelectric sources across four regions between 2000 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    promptId: 'Grafik garis berikut mengilustrasikan proporsi total energi yang dihasilkan dari tenaga surya, angin, dan hidroelektrik di empat wilayah antara tahun 2000 dan 2025.',
    timeLimitMinutes: 20,
    wordCountMin: 150,
    dataPoints: [
      'Europe: Solar climbed from 5% (2000) to 34% (2025)',
      'Asia: Wind energy grew from 2% to 29%',
      'Hydroelectric remained stable across all regions around 15-18%',
      'Overall renewable share more than tripled globally'
    ],
    keyVocabulary: ['witnessed exponential growth', 'hovered around', 'eclipsed', 'an upward trajectory', 'dramatic surge'],
    band9Sample: {
      introduction: 'The line graph details the percentage share of electricity generated from three renewable sources—solar, wind, and hydroelectricity—across four regions from 2000 to 2025.',
      overviewOrBody1: 'Overall, while hydroelectric power generation remained relatively constant over the period, solar and wind energy followed significant upward trends, with Europe leading in solar adoption by 2025.',
      body2: 'In detail, European solar generation started at 5% in 2000 before experiencing steady growth to reach 34% in 2025. In contrast, wind power in Asia rose from 2% in the initial year to 29% at the end of the period, surpassing hydroelectric output by 2018.',
      conclusion: 'Hydroelectric energy production in all examined regions remained stable between 15% and 18% throughout the twenty-five-year period.',
      lexicalAnalysis: [
        'followed significant upward trends (deskripsi tren)',
        'experienced steady growth (kolokasi Task 1)'
      ],
      coherenceAnalysis: [
        'Overview yang jelas merangkum tren utama tanpa menyebutkan angka mentah.',
        'Paragraf isi yang mengontraskan tren dinamis vs data stabil.'
      ]
    }
  }
];

export const SPEAKING_CUE_CARDS: SpeakingCueCard[] = [
  {
    id: 'spk-p2-01',
    part: 2,
    topic: 'Technology in Daily Life',
    title: 'Describe a software tool or application you find indispensable',
    titleId: 'Deskripsikan aplikasi atau perangkat lunak yang sangat penting bagi Anda',
    prompt: 'You should say:\n- What the tool is and how often you use it\n- How you first discovered it\n- What specific tasks it helps you complete\n- And explain why it is essential to your routine.',
    promptId: 'Jelaskan apa aplikasinya, seberapa sering Anda memakainya, bagaimana Anda menemukannya, dan mengapa aplikasi ini sangat penting.',
    bulletPoints: [
      'Nama perangkat lunak / aplikasi',
      'Frekuensi pemakaian',
      'Manfaat produktivitas atau efisiensi',
      'Refleksi pribadi terhadap teknologi tersebut'
    ],
    speakingTips: [
      'Gunakan frasa transisi: "To begin with...", "What makes it particularly useful is...", "In retrospect..."',
      'Targetkan waktu berbicara sekitar 1 menit 45 detik hingga 2 menit penuh.'
    ],
    highlightedVocabulary: [
      { phrase: 'streamline daily workflows', meaning: 'menyederhanakan dan mempercepat alur kerja harian', usageNote: 'Cocok untuk topik studi dan pekerjaan.' },
      { phrase: 'an indispensable asset', meaning: 'sesuatu yang sangat penting dan sulit tergantikan', usageNote: 'Bagus untuk mendeskripsikan alat atau metode berharga.' }
    ],
    band8SampleAnswer: `I would like to discuss a note-taking and knowledge management tool called Obsidian, which has become an indispensable part of my academic and daily routine.

I first began using this application about two years ago when I needed a structured method to organize research notes and course materials. What makes it particularly effective is its ability to link interrelated concepts using bidirectional references.

On a daily basis, I use it to organize lecture notes, outline essays, and prepare study summaries. Rather than keeping fragmented documents, I can connect related topics across different disciplines, which helps me review information more systematically.

I consider this tool essential because it saves time and reduces cognitive load during exam preparation. It allows me to concentrate on understanding concepts rather than searching for scattered information.`
  }
];

export const READING_PASSAGES: ReadingPassageItem[] = [
  {
    id: 'read-01',
    title: 'The Cognitive Mechanics of Bilingual Memory',
    titleId: 'Mekanisme Kognitif Memori Bilingual',
    academicField: 'Cognitive Science',
    wordCount: 340,
    passage: `In recent decades, cognitive researchers have examined how bilingualism affects brain function and memory organization. Rather than maintaining two completely isolated linguistic systems, the bilingual brain manages an active, continuous interaction between languages.

When a bilingual individual speaks in one language, networks for both languages remain partially active. To prevent interference from the language not in use, the brain relies on the prefrontal cortex, which governs executive function, attention control, and task switching. As a result, bilingual speakers frequently engage these cognitive control mechanisms.

Studies suggest that this regular cognitive activity supports neuroplasticity and strengthens cognitive reserve. Research led by Dr. Ellen Bialystok indicated that lifelong bilingual individuals often demonstrated symptoms of dementia several years later than monolinguals with similar underlying neuropathology. While bilingualism does not prevent physical changes in the brain, it may help the brain compensate through alternative neural pathways.`,
    glossary: [
      { term: 'Executive Function', definition: 'Fungsi eksekutif: proses kognitif otak untuk mengontrol perhatian dan keputusan.' },
      { term: 'Neuroplasticity', definition: 'Neuroplastisitas: kemampuan sistem saraf otak untuk beradaptasi dan membuat jalur baru.' }
    ],
    questions: [
      {
        id: 'q-read-1',
        type: 'True/False/Not Given',
        questionText: 'When a bilingual person speaks, the unused language is completely inactive in the brain.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctAnswer: 'FALSE',
        paragraphReference: 'Paragraph 2',
        detailedExplanation: 'Paragraf 2 menyatakan: "When a bilingual individual speaks in one language, networks for both languages remain partially active."'
      },
      {
        id: 'q-read-2',
        type: 'Multiple Choice',
        questionText: 'According to research cited in the passage, bilingualism:',
        options: [
          'Completely stops physical neuropathology from developing.',
          'May help the brain compensate for neural changes through cognitive reserve.',
          'Is only beneficial when acquired in early childhood.',
          'Reduces general executive control in older age.'
        ],
        correctAnswer: 'May help the brain compensate for neural changes through cognitive reserve.',
        paragraphReference: 'Paragraph 3',
        detailedExplanation: 'Paragraf 3 menjelaskan bahwa bilingualisme membantu otak mengompensasi perubahan saraf melalui jalur alternatif (cognitive reserve).'
      }
    ]
  }
];

export const LISTENING_ITEMS: ListeningDictationItem[] = [
  {
    id: 'list-01',
    title: 'University Research Methodology & Scientific Integrity',
    accent: 'British',
    context: 'Academic Lecture',
    audioPromptText: 'In scientific research, empirical rigor requires investigators to eliminate sampling bias and preserve verifiable data. Without reproducible results, hypotheses cannot be validated by peer reviewers.',
    fullScript: 'In scientific research, empirical rigor requires investigators to eliminate sampling bias and preserve verifiable data. Without reproducible results, hypotheses cannot be validated by peer reviewers.',
    blanks: [
      { index: 0, answer: 'empirical rigor', acceptedAlternatives: ['empirical rigour'], hint: 'Dua kata: standar observasi ketat' },
      { index: 1, answer: 'sampling bias', acceptedAlternatives: ['sample bias'], hint: 'Dua kata: bias pemilihan sampel' },
      { index: 2, answer: 'reproducible', acceptedAlternatives: ['replicable'], hint: 'Kata sifat: dapat diulang dengan hasil sama' },
      { index: 3, answer: 'validated', acceptedAlternatives: ['confirmed', 'corroborated'], hint: 'Kata kerja past participle: divalidasi/dikonfirmasi' }
    ]
  }
];
