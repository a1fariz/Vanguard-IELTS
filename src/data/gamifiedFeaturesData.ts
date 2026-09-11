import type { 
  ShadowingExercise, 
  SentenceBuilderChallenge, 
  RoleplayChatScenario, 
  DailyQuestItem 
} from '../types';

export const INITIAL_DAILY_QUESTS: DailyQuestItem[] = [
  {
    id: 'quest-1',
    titleId: 'Pelajari 5 Kosakata Baru',
    descriptionId: 'Buka dan dengarkan 5 kartu kosakata atau stage dialog',
    rewardExp: 30,
    completed: false,
    targetCount: 5,
    currentCount: 0
  },
  {
    id: 'quest-2',
    titleId: 'Latihan Shadowing Intonasi',
    descriptionId: 'Tirukan pelafalan 1 kalimat di Shadowing Studio',
    rewardExp: 40,
    completed: false,
    targetCount: 1,
    currentCount: 0
  },
  {
    id: 'quest-3',
    titleId: 'Tantangan Susun Kalimat',
    descriptionId: 'Selesaikan 2 tantangan Sentence Builder dengan benar',
    rewardExp: 40,
    completed: false,
    targetCount: 2,
    currentCount: 0
  }
];

export const SHADOWING_EXERCISES: ShadowingExercise[] = [
  {
    id: 'shad-1',
    title: 'Self-Introduction & Meeting New People',
    titleId: 'Perkenalan Diri & Sapaan Santai',
    level: 'A1-A2',
    category: 'Daily Basics',
    audioText: "Hi, nice to meet you! I'm originally from Jakarta, but I currently live here for work.",
    translationId: "Hai, senang bertemu denganmu! Asalku dari Jakarta, tapi saat ini aku tinggal di sini untuk bekerja.",
    focusKeywords: ['nice to meet you', 'originally', 'currently', 'for work'],
    intonationTipId: 'Beri sedikit penekanan nada naik pada "Jakarta" dan turun dengan santai di akhir kalimat "for work".'
  },
  {
    id: 'shad-2',
    title: 'Ordering Coffee at a Cafe',
    titleId: 'Memesan Kopi di Kafe',
    level: 'A1-A2',
    category: 'Cafe & Food',
    audioText: "Can I get an iced latte with oat milk, please? To go would be great.",
    translationId: "Boleh saya pesan iced latte dengan susu oat? Untuk dibawa pulang ya.",
    focusKeywords: ['can I get', 'iced latte', 'oat milk', 'to go'],
    intonationTipId: 'Gunakan nada ramah pada "please?" dan intonasi tegas santai pada "to go".'
  },
  {
    id: 'shad-3',
    title: 'Asking for Directions on the Street',
    titleId: 'Menanyakan Arah Jalan Saat Bepergian',
    level: 'B1-B2',
    category: 'Travel & Navigation',
    audioText: "Excuse me, sorry to bother you! Do you happen to know the quickest way to the station?",
    translationId: "Permisi, maaf mengganggu! Apakah Anda kebetulan tahu jalan tercepat menuju stasiun?",
    focusKeywords: ['excuse me', 'bother you', 'do you happen to know', 'quickest way'],
    intonationTipId: 'Awali dengan nada sopan meninggi pada "Excuse me," lalu nada datar bersahabat.'
  },
  {
    id: 'shad-4',
    title: 'IELTS Band 8.0 Inverted Argument',
    titleId: 'Argumen Inversi Akademik C1 (IELTS)',
    level: 'C1',
    category: 'IELTS Academic Writing',
    audioText: "Not only does renewable energy curtail carbon emissions, but it also creates sustainable employment.",
    translationId: "Energi terbarukan tidak hanya mengurangi emisi karbon, tetapi juga menciptakan lapangan kerja berkelanjutan.",
    focusKeywords: ['not only does', 'curtail', 'carbon emissions', 'sustainable employment'],
    intonationTipId: 'Beri jeda sejenak setelah koma dan tekan kata kunci "sustainable employment".'
  }
];

export const SENTENCE_BUILDER_CHALLENGES: SentenceBuilderChallenge[] = [
  {
    id: 'sb-1',
    level: 'A1',
    category: 'daily',
    targetMeaningId: 'Di mana saya bisa menemukan kopi di dapur?',
    scrambledWords: ['find', 'can', 'Where', 'coffee', 'the', 'I', 'in', 'kitchen?'],
    correctSentence: 'Where can I find coffee in the kitchen?',
    grammarTipId: 'Pola kalimat tanya: Question Word (Where) + Modal (can) + Subject (I) + Verb (find) + Object + Preposition.'
  },
  {
    id: 'sb-2',
    level: 'A2',
    category: 'daily',
    targetMeaningId: 'Bisa tolong masukkan sisa makanan ini ke dalam kulkas?',
    scrambledWords: ['put', 'Could', 'leftovers', 'in', 'fridge,', 'please?', 'you', 'these', 'the'],
    correctSentence: 'Could you put these leftovers in the fridge, please?',
    grammarTipId: 'Gunakan "Could you + Verb 1" untuk meminta bantuan secara sopan kepada orang lain.'
  },
  {
    id: 'sb-3',
    level: 'B1',
    category: 'daily',
    targetMeaningId: 'Apakah museum tersebut dapat dijangkau dengan jalan kaki dari sini?',
    scrambledWords: ['walking', 'within', 'the', 'distance', 'Is', 'from', 'museum', 'here?'],
    correctSentence: 'Is the museum within walking distance from here?',
    grammarTipId: '"Within walking distance" adalah kolokasi umum yang artinya "bisa dijangkau jalan kaki".'
  },
  {
    id: 'sb-4',
    level: 'C1',
    category: 'ielts',
    targetMeaningId: 'Pemerintah seharusnya tidak mengabaikan penurunan kualitas lingkungan hidup dalam situasi apa pun.',
    scrambledWords: ['Under', 'circumstances', 'governments', 'no', 'overlook', 'should', 'environmental', 'degradation.'],
    correctSentence: 'Under no circumstances should governments overlook environmental degradation.',
    grammarTipId: 'Inversi formal: "Under no circumstances" + modal (should) + subject (governments) + verb (overlook).'
  }
];

export const ROLEPLAY_CHAT_SCENARIOS: RoleplayChatScenario[] = [
  {
    id: 'chat-coffee',
    title: 'Ordering at a Busy London Cafe',
    titleId: 'Memesan Minuman di Kafe Ramai',
    characterName: 'Emma',
    characterRole: 'Barista di Kafe',
    situationId: 'Anda sedang berdiri di depan kasir kafe untuk memesan minuman dan menanyakan rekomendasi.',
    starterMessage: "Hi there! Welcome to Central Roast. What can I get started for you today?",
    starterMessageId: "Halo! Selamat datang di Central Roast. Mau pesan apa hari ini?",
    suggestedQuickReplies: [
      { text: "Hi! Can I get an iced oat latte, please?", translationId: "Halo! Boleh pesan iced oat latte?" },
      { text: "What do you recommend for something not too sweet?", translationId: "Apa rekomendasi minuman yang tidak terlalu manis?" }
    ],
    dialogueTree: [
      {
        triggerKeyword: 'latte',
        botReply: "Sure thing! An iced oat latte. Would you like a regular or large size? And is that for here or to go?",
        botReplyId: "Tentu! Iced oat latte. Mau ukuran sedang atau besar? Mau minum di sini atau bawa pulang?",
        suggestedNext: [
          { text: "Regular size to go, please. Can I pay by card?", translationId: "Ukuran biasa untuk bawa pulang. Bisa bayar pakai kartu?" },
          { text: "Large for here, please. Do you have WiFi?", translationId: "Ukuran besar untuk minum di sini. Apakah ada WiFi?" }
        ]
      },
      {
        triggerKeyword: 'recommend',
        botReply: "Our iced matcha latte with almond milk is really popular, or our cold brew if you like strong coffee!",
        botReplyId: "Iced matcha latte kami sangat populer, atau cold brew jika Anda suka kopi pekat!",
        suggestedNext: [
          { text: "I'll try the cold brew, please!", translationId: "Saya coba cold brew-nya saja ya!" },
          { text: "Sounds great, I'll have the matcha latte!", translationId: "Kedengarannya enak, saya pesan matcha latte!" }
        ]
      },
      {
        triggerKeyword: 'card',
        botReply: "Yes, contactless is perfect! Just tap your card right here on the terminal.",
        botReplyId: "Bisa, pembayaran tap kartu sangat bisa! Cukup tap kartu Anda di mesin ini.",
        suggestedNext: [
          { text: "All done! Thank you so much, have a great day!", translationId: "Sudah! Terima kasih banyak, semoga harimu menyenangkan!" }
        ]
      }
    ]
  },
  {
    id: 'chat-roommate',
    title: 'Talking to an International Roommate',
    titleId: 'Mengobrol dengan Teman Serumah Asing',
    characterName: 'Alex',
    characterRole: 'Teman Serumah (Australia)',
    situationId: 'Berbagi tugas belanja dapur dan merencanakan makan malam bersama di apartemen.',
    starterMessage: "Hey! I'm heading out to the supermarket in a few minutes. Do we need anything for the house?",
    starterMessageId: "Hei! Aku mau berangkat ke supermarket sebentar lagi. Ada barang rumah yang perlu kubeli?",
    suggestedQuickReplies: [
      { text: "Hey! We're actually running out of milk and eggs.", translationId: "Hei! Kita sebenarnya lagi kehabisan susu dan telur." },
      { text: "Could you grab some olive oil and dish soap, please?", translationId: "Bisa tolong belikan minyak zaitun dan sabun cuci piring?" }
    ],
    dialogueTree: [
      {
        triggerKeyword: 'milk',
        botReply: "Got it, adding milk and eggs to the list! Are you cooking dinner tonight or should we grab pizza together?",
        botReplyId: "Paham, kutulis di daftar belanja! Kamu mau masak malam ini atau kita pesan pizza bareng?",
        suggestedNext: [
          { text: "Pizza sounds amazing, count me in!", translationId: "Pizza ide bagus banget, aku ikut!" },
          { text: "I can cook some pasta for both of us if you'd like!", translationId: "Aku bisa masak pasta untuk kita berdua kalau kamu mau!" }
        ]
      },
      {
        triggerKeyword: 'pizza',
        botReply: "Awesome! I'll pick up the groceries and then order from that Italian place down the street.",
        botReplyId: "Keren! Aku belanja dulu lalu pesan dari resto Italia di ujung jalan itu.",
        suggestedNext: [
          { text: "Sounds like a plan! Let me transfer you my share.", translationId: "Setuju! Nanti aku transfer bagian bayarku ya." }
        ]
      }
    ]
  }
];
