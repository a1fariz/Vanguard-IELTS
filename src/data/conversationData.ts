export interface ConversationScenario {
  id: string;
  topic: string;
  topicId: string;
  level: 'A1-A2 Dasar' | 'B1 Menengah' | 'B2 Lanjutan';
  contextDescriptionId: string;
  culturalTipId: string;
  turns: {
    speaker: 'Native Speaker' | 'Anda';
    english: string;
    indonesian: string;
    naturalAlternatives?: string[];
    slangOrIdiomNote?: string;
  }[];
  interactiveRoleplay: {
    partnerPrompt: string;
    partnerPromptId: string;
    suggestedResponses: {
      english: string;
      indonesian: string;
      nuance: string;
    }[];
  }[];
  practicalPhrases: {
    phrase: string;
    meaningId: string;
    situationId: string;
  }[];
}

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'conv-small-talk',
    topic: 'Casual Small Talk & Making Acquaintances',
    topicId: 'Obrolan Santai & Memulai Percakapan Baru',
    level: 'A1-A2 Dasar',
    contextDescriptionId: 'Situasi saat Anda menunggu antrean, duduk di sebelah orang asing di kafe, atau bertemu orang baru di acara santai.',
    culturalTipId: 'Orang asing (terutama dari negara berbahasa Inggris) sangat terbiasa dengan "small talk" ringan tentang cuaca, kesibukan, atau kopi sebelum masuk ke topik mendalam.',
    turns: [
      {
        speaker: 'Native Speaker',
        english: "Hey there! How's your day going so far?",
        indonesian: "Halo! Bagaimana harimu sejauh ini?",
        naturalAlternatives: ["How are things?", "How's it going?"],
        slangOrIdiomNote: '"So far" berarti hingga saat ini. Native jarang memakai "How do you do?" dalam obrolan santai sehari-hari.'
      },
      {
        speaker: 'Anda',
        english: "Not too bad, pretty productive actually! How about yourself?",
        indonesian: "Lumayan baik, cukup produktif sebenarnya! Bagaimana denganmu?",
        naturalAlternatives: ["Can't complain, just taking a quick break.", "Pretty good, thanks for asking!"]
      },
      {
        speaker: 'Native Speaker',
        english: "Same here! It's pretty crowded today, isn't it? Have you been waiting long?",
        indonesian: "Sama juga! Hari ini cukup ramai ya? Sudah lama mengantre?",
      },
      {
        speaker: 'Anda',
        english: "Just got here about five minutes ago. The coffee here is definitely worth the wait though.",
        indonesian: "Baru sampai sekitar lima menit lalu. Tapi kopi di sini memang sepadan dengan antreannya."
      }
    ],
    interactiveRoleplay: [
      {
        partnerPrompt: "Hey! Is anyone sitting here, or is this chair free?",
        partnerPromptId: "Hei! Apakah ada yang duduk di sini, atau kursi ini kosong?",
        suggestedResponses: [
          {
            english: "No, go right ahead! It's all yours.",
            indonesian: "Tidak ada, silakan pakai! Kursinya kosong.",
            nuance: "Sangat ramah dan alami."
          },
          {
            english: "Sorry, my friend is actually coming right back.",
            indonesian: "Maaf, teman saya sebentar lagi kembali ke sini.",
            nuance: "Penolakan sopan."
          },
          {
            english: "Help yourself!",
            indonesian: "Silakan ambil saja!",
            nuance: "Singkat dan santai."
          }
        ]
      },
      {
        partnerPrompt: "Crazy weather today, right? It was sunny an hour ago and now it's pouring!",
        partnerPromptId: "Cuacanya aneh banget hari ini ya? Sejam lalu panas terik, sekarang hujan deras!",
        suggestedResponses: [
          {
            english: "I know, right? I completely forgot to bring my umbrella.",
            indonesian: "Iya banget kan? Aku benar-benar lupa bawa payung.",
            nuance: "Respons empati akrab (I know, right?)."
          },
          {
            english: "Tell me about it! Hopefully it clears up soon.",
            indonesian: "Iya parah! Semoga segera reda ya.",
            nuance: '"Tell me about it" adalah idiom sehari-hari yang artinya "Setuju banget".'
          }
        ]
      }
    ],
    practicalPhrases: [
      { phrase: "How's it going?", meaningId: "Apa kabar? / Gimana kabarnya?", situationId: "Sapaan santai pengganti Hello." },
      { phrase: "I know, right?", meaningId: "Iya banget kan? (Menyetujui omongan orang)", situationId: "Reaksi obrolan santai." },
      { phrase: "Tell me about it!", meaningId: "Iya parah / Aku paham banget rasanya.", situationId: "Menunjukkan rasa senasib." },
      { phrase: "Take care!", meaningId: "Hati-hati ya! / Jaga diri!", situationId: "Salam perpisahan santai." }
    ]
  },
  {
    id: 'conv-cafe-dining',
    topic: 'Cafe, Restaurant & Ordering Food',
    topicId: 'Memesan Makanan, Minuman di Kafe & Restoran',
    level: 'A1-A2 Dasar',
    contextDescriptionId: 'Pola memesan makanan, menyesuaikan pesanan khusus (customization), menanyakan tagihan, dan membayar pisah (split bill).',
    culturalTipId: 'Saat memesan, gunakan "Can I get...", "I\'ll have...", atau "Could I please have..." daripada "I want..." agar terdengar sopan dan natural.',
    turns: [
      {
        speaker: 'Native Speaker',
        english: "Hi there, welcome! What can I get started for you today?",
        indonesian: "Halo, selamat datang! Mau pesan apa hari ini?",
      },
      {
        speaker: 'Anda',
        english: "Hi! Can I get an iced oat latte with an extra shot of espresso, please?",
        indonesian: "Halo! Boleh saya pesan iced oat latte dengan ekstra shot espresso?",
        naturalAlternatives: ["I'll just have a regular cappuccino, please."]
      },
      {
        speaker: 'Native Speaker',
        english: "Sure thing! For here or to go?",
        indonesian: "Tentu! Untuk minum di sini atau bawa pulang?",
        slangOrIdiomNote: '"For here or to go" (Amerika) atau "Having here or takeaway" (Inggris/Australia).'
      },
      {
        speaker: 'Anda',
        english: "For here, please. And could we also get the bill whenever you have a moment?",
        indonesian: "Minum di sini. Dan bisakah kami sekalian minta tagihan/struk kalau Anda sempat?"
      }
    ],
    interactiveRoleplay: [
      {
        partnerPrompt: "Are you ready to order, or do you need a couple more minutes with the menu?",
        partnerPromptId: "Sudah siap memesan, atau butuh waktu beberapa menit lagi untuk melihat menu?",
        suggestedResponses: [
          {
            english: "We're ready! What would you recommend for something light?",
            indonesian: "Kami sudah siap! Menu apa yang Anda rekomendasikan untuk makanan ringan?",
            nuance: "Meminta rekomendasi pelayan."
          },
          {
            english: "Could we have just a few more minutes, please?",
            indonesian: "Boleh minta waktu beberapa menit lagi?",
            nuance: "Minta waktu berpikir."
          }
        ]
      },
      {
        partnerPrompt: "All done? How would you like to take care of the bill?",
        partnerPromptId: "Sudah selesai? Bagaimana Anda ingin membayar tagihannya?",
        suggestedResponses: [
          {
            english: "Could we split the bill, please?",
            indonesian: "Bisa bayar masing-masing / patungan?",
            nuance: "Meminta split bill secara sopan."
          },
          {
            english: "I'll put it on card, please.",
            indonesian: "Saya bayar pakai kartu saja.",
            nuance: "Pembayaran langsung kartu."
          }
        ]
      }
    ],
    practicalPhrases: [
      { phrase: "Can I get a [item], please?", meaningId: "Boleh saya pesan [menu]?", situationId: "Cara paling natural memesan di kafe." },
      { phrase: "Could we split the bill?", meaningId: "Bisa bayar pisah / patungan?", situationId: "Saat membayar bersama teman." },
      { phrase: "Keep the change.", meaningId: "Kembaliannya ambil saja.", situationId: "Memberikan tip tunai." },
      { phrase: "Is this gluten-free / dairy-free?", meaningId: "Apakah ini bebas gluten / susu?", situationId: "Menanyakan alergi makanan." }
    ]
  },
  {
    id: 'conv-travel-airport',
    topic: 'Travel, Directions & Transportation',
    topicId: 'Bepergian, Bandara & Menanyakan Arah Jalan',
    level: 'B1 Menengah',
    contextDescriptionId: 'Percakapan penting saat bepergian ke luar negeri: imigrasi, hotel, taksi, dan menanyakan lokasi saat tersesat.',
    culturalTipId: 'Awali pertanyaan ke orang asing di jalan dengan "Excuse me, sorry to bother you, but do you know..." agar orang lokal dengan senang hati membantu.',
    turns: [
      {
        speaker: 'Anda',
        english: "Excuse me, sorry to bother you! Do you know how I can get to the central station from here?",
        indonesian: "Permisi, maaf mengganggu! Apakah Anda tahu bagaimana cara menuju stasiun pusat dari sini?",
      },
      {
        speaker: 'Native Speaker',
        english: "Sure! Just head straight down this road for two blocks, then take a left at the pharmacy. You can't miss it.",
        indonesian: "Tentu! Lurus saja di jalan ini melewati dua blok, lalu belok kiri di apotek. Pasti langsung kelihatan.",
        slangOrIdiomNote: '"You can\'t miss it" berarti tempatnya sangat mudah ditemukan/terlihat.'
      },
      {
        speaker: 'Anda',
        english: "Got it! Is it walkable, or should I just hop on a bus?",
        indonesian: "Paham! Apakah bisa jalan kaki, atau sebaiknya naik bus saja?",
      },
      {
        speaker: 'Native Speaker',
        english: "It's only a five-minute walk, so you're good to walk!",
        indonesian: "Hanya 5 menit jalan kaki, jadi jalan kaki saja sudah cukup!"
      }
    ],
    interactiveRoleplay: [
      {
        partnerPrompt: "Good afternoon! Checking in? Could I see your passport and booking confirmation, please?",
        partnerPromptId: "Selamat siang! Mau check-in? Boleh saya lihat paspor dan bukti booking Anda?",
        suggestedResponses: [
          {
            english: "Sure, here you go! Is breakfast included in my reservation?",
            indonesian: "Tentu, ini dia! Apakah sarapan sudah termasuk dalam pemesanan saya?",
            nuance: "Menyerahkan dokumen dan bertanya fasilitas."
          },
          {
            english: "Here is my passport. By any chance, is an early check-in available?",
            indonesian: "Ini paspor saya. Apakah memungkinkan untuk check-in lebih awal?",
            nuance: "Meminta early check-in secara sopan."
          }
        ]
      }
    ],
    practicalPhrases: [
      { phrase: "You can't miss it.", meaningId: "Tempatnya sangat gampang dicari / pasti kelihatan.", situationId: "Saat orang memberi petunjuk arah." },
      { phrase: "Is it within walking distance?", meaningId: "Apakah lokasinya bisa dijangkau jalan kaki?", situationId: "Menanyakan jarak tempuh." },
      { phrase: "Where can I catch a taxi / bus?", meaningId: "Di mana saya bisa naik taksi / bus?", situationId: "Transportasi umum." }
    ]
  },
  {
    id: 'conv-making-friends',
    topic: 'Making Friends, Hanging Out & Expressing Opinions',
    topicId: 'Berteman, Mengajak Nongkrong & Bertukar Cerita',
    level: 'B1 Menengah',
    contextDescriptionId: 'Cara mengobrol santai dengan teman sebaya internasional, merespons cerita, mengajak jalan, dan bertukar kontak media sosial.',
    culturalTipId: 'Saat berteman, gunakan frasa responsif seperti "No way!", "That sounds amazing!", atau "Are you serious?" untuk membuat obrolan terasa hangat dan antusias.',
    turns: [
      {
        speaker: 'Native Speaker',
        english: "Are you doing anything fun this weekend, or just chilling?",
        indonesian: "Ada rencana seru akhir pekan ini, atau cuma santai di rumah?",
        slangOrIdiomNote: '"Chilling" berarti bersantai tanpa rencana berat.'
      },
      {
        speaker: 'Anda',
        english: "Nothing fixed yet! A few of us might check out that new rooftop place. Are you free to join?",
        indonesian: "Belum ada rencana pasti! Beberapa teman mungkin mau cek tempat rooftop baru itu. Kamu ada waktu luang untuk gabung?",
      },
      {
        speaker: 'Native Speaker',
        english: "I'd love to! Count me in. What time are you guys heading over?",
        indonesian: "Mau banget! Ikut dong. Jam berapa kalian mau berangkat ke sana?",
        slangOrIdiomNote: '"Count me in" artinya "Hitung aku / Aku pasti ikut".'
      },
      {
        speaker: 'Anda',
        english: "Probably around seven. Let me grab your Instagram or WhatsApp so I can send you the location!",
        indonesian: "Mungkin sekitar jam tujuh. Boleh minta Instagram atau WhatsApp-mu biar kukirim lokasinya?"
      }
    ],
    interactiveRoleplay: [
      {
        partnerPrompt: "I just got back from a solo trip to Japan and it was absolutely mind-blowing!",
        partnerPromptId: "Aku baru saja pulang dari liburan solo ke Jepang dan itu luar biasa keren banget!",
        suggestedResponses: [
          {
            english: "No way, that sounds incredible! What was your favorite place you visited?",
            indonesian: "Keren banget! Tempat apa yang paling kamu sukai di sana?",
            nuance: "Menunjukkan ketertarikan tinggi dan menggali cerita."
          },
          {
            english: "I've always wanted to go there! Was it easy getting around on your own?",
            indonesian: "Aku selalu ingin ke sana! Apakah gampang jalan-jalan sendirian di sana?",
            nuance: "Mengaitkan ke pengalaman pribadi."
          }
        ]
      }
    ],
    practicalPhrases: [
      { phrase: "Count me in!", meaningId: "Aku ikut! / Ajak aku!", situationId: "Menerima ajakan nongkrong." },
      { phrase: "Let's hang out sometime.", meaningId: "Kapan-kapan kita jalan bareng yuk.", situationId: "Mengajak santai." },
      { phrase: "Let me grab your number / IG.", meaningId: "Boleh minta nomor / Instagram kamu?", situationId: "Bertukar kontak." },
      { phrase: "Sounds like a plan!", meaningId: "Setuju! / Rencana yang bagus!", situationId: "Menyetujui janji temu." }
    ]
  }
];
