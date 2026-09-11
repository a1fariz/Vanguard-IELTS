import type { DailyStageLevel } from '../types';

export const DAILY_STAGES: DailyStageLevel[] = [
  {
    id: 1,
    title: 'Stage 1: Everyday Greetings, Introductions & Common Items',
    titleId: 'Level 1: Sapaan, Perkenalan Diri & Benda di Sekitar Kita',
    cefrLevel: 'A1',
    category: 'Absolute Basics (No Alphabet/Numbers)',
    descriptionId: 'Mulai dari kalimat paling dasar sehari-hari: menyapa orang baru, memperkenalkan diri, menanyakan kabar, dan menyebut benda-benda nyata yang kita pakai setiap hari.',
    requiredExpToUnlock: 0,
    vocabularies: [
      {
        word: 'nice to meet you',
        phonetic: '/naɪs tuː miːt juː/',
        partOfSpeech: 'phrase',
        meaningId: 'Senang berkenalan / bertemu denganmu',
        example: "Hi, I'm Sarah. Nice to meet you!",
        exampleId: 'Hai, aku Sarah. Senang berkenalan denganmu!',
        category: 'basics'
      },
      {
        word: 'water bottle',
        phonetic: '/ˈwɔːtə ˈbɒtl/',
        partOfSpeech: 'noun',
        meaningId: 'Botol minum',
        example: 'Is this water bottle yours?',
        exampleId: 'Apakah botol minum ini punyamu?',
        category: 'household'
      },
      {
        word: 'keys',
        phonetic: '/kiːz/',
        partOfSpeech: 'noun',
        meaningId: 'Kunci (kunci rumah / kunci motor)',
        example: "I can't find my house keys anywhere.",
        exampleId: 'Aku tidak bisa menemukan kunci rumahku di mana pun.',
        category: 'household'
      },
      {
        word: 'where is / where are',
        phonetic: '/weər ɪz/',
        partOfSpeech: 'phrase',
        meaningId: 'Di mana (untuk menanyakan lokasi barang/tempat)',
        example: 'Where is my charger?',
        exampleId: 'Di mana pengisi daya (charger) ponselku?',
        category: 'basics'
      },
      {
        word: 'have a great day',
        phonetic: '/hæv ə ɡreɪt deɪ/',
        partOfSpeech: 'phrase',
        meaningId: 'Semoga harimu menyenangkan (salam perpisahan ramah)',
        example: 'Thanks for the help! Have a great day!',
        exampleId: 'Terima kasih atas bantuannya! Semoga harimu menyenangkan!',
        category: 'basics'
      },
      {
        word: 'how are you doing?',
        phonetic: '/haʊ ɑː juː ˈduːɪŋ/',
        partOfSpeech: 'phrase',
        meaningId: 'Bagaimana kabarmu? (sapaan santai natural)',
        example: 'Hey Rizky, how are you doing today?',
        exampleId: 'Hei Rizky, bagaimana kabarmu hari ini?',
        category: 'basics'
      },
      {
        word: 'backpack',
        phonetic: '/ˈbækpæk/',
        partOfSpeech: 'noun',
        meaningId: 'Tas ransel / tas punggung',
        example: 'Did you leave your backpack on the chair?',
        exampleId: 'Apakah kamu meninggalkan tas ranselmu di kursi?',
        category: 'household'
      },
      {
        word: 'umbrella',
        phonetic: '/ʌmˈbrelə/',
        partOfSpeech: 'noun',
        meaningId: 'Payung',
        example: "Take an umbrella with you, it looks like rain.",
        exampleId: 'Bawalah payung, sepertinya akan hujan.',
        category: 'household'
      },
      {
        word: 'wallet',
        phonetic: '/ˈwɒlɪt/',
        partOfSpeech: 'noun',
        meaningId: 'Dompet',
        example: 'I always keep my ID card in my wallet.',
        exampleId: 'Aku selalu menyimpan kartu identitasku di dalam dompet.',
        category: 'household'
      },
      {
        word: 'see you later',
        phonetic: '/siː juː ˈleɪtə/',
        partOfSpeech: 'phrase',
        meaningId: 'Sampai jumpa nanti',
        example: "I have to go to class now, see you later!",
        exampleId: 'Aku harus pergi ke kelas sekarang, sampai jumpa nanti!',
        category: 'basics'
      },
      {
        word: 'take care',
        phonetic: '/teɪk keə/',
        partOfSpeech: 'phrase',
        meaningId: 'Hati-hati ya / jaga diri',
        example: 'Have a safe trip home and take care!',
        exampleId: 'Semoga selamat di perjalanan pulang dan hati-hati ya!',
        category: 'basics'
      }
    ],
    dialogueScript: [
      {
        speaker: 'New Friend',
        english: 'Hi there! Are you new around here?',
        indonesian: 'Halo! Apakah kamu baru di sekitar sini?'
      },
      {
        speaker: 'You',
        english: "Yes, I just moved in yesterday! Nice to meet you, I'm Rizky.",
        indonesian: 'Iya, aku baru pindah kemarin! Senang berkenalan denganmu, aku Rizky.'
      },
      {
        speaker: 'New Friend',
        english: 'Nice to meet you too! Let me know if you need help finding anything.',
        indonesian: 'Senang berkenalan juga! Beritahu aku kalau kamu butuh bantuan mencari sesuatu ya.'
      },
      {
        speaker: 'You',
        english: 'Thank you so much! Have a great day!',
        indonesian: 'Terima kasih banyak! Semoga harimu menyenangkan!'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Cara paling natural untuk memperkenalkan nama Anda kepada teman baru:',
        question: 'How do you politely introduce yourself to a new acquaintance?',
        options: [
          "Hi, nice to meet you! My name is Sarah.",
          "I call Sarah to you now.",
          "You must know I am Sarah.",
          "Sarah is living here today."
        ],
        correctIndex: 0,
        explanationId: '"Hi, nice to meet you! My name is [Nama]" adalah standar perkenalan paling sopan dan natural.'
      },
      {
        promptId: 'Pilih cara bertanya lokasi barang yang hilang (misal kacamata atau kunci):',
        question: 'How do you ask someone where your keys are?',
        options: [
          "Excuse me, do you know where my keys are?",
          "Where goes key in this room now?",
          "Is key walking around here?",
          "Give location key fast please."
        ],
        correctIndex: 0,
        explanationId: '"Do you know where my [item] are/is?" adalah bentuk tanya sopan.'
      }
    ]
  },
  {
    id: 2,
    title: 'Stage 2: Kitchen, Cooking & Morning Habits',
    titleId: 'Level 2: Dapur, Memasak & Kebiasaan Pagi',
    cefrLevel: 'A1',
    category: 'Home & Daily Habits',
    descriptionId: 'Belajar kosakata peralatan dapur, memasak sarapan, kebiasaan pagi, dan meminta bantuan teman serumah / keluarga.',
    requiredExpToUnlock: 60,
    vocabularies: [
      {
        word: 'refrigerator / fridge',
        phonetic: '/rɪˈfrɪdʒəreɪtə/',
        partOfSpeech: 'noun',
        meaningId: 'Kulkas / lemari pendingin',
        example: 'Could you put the leftover milk in the fridge, please?',
        exampleId: 'Bisa tolong masukkan sisa susu ke dalam kulkas?',
        category: 'household'
      },
      {
        word: 'tidy up',
        phonetic: '/ˈtaɪdi ʌp/',
        partOfSpeech: 'phrasal verb',
        meaningId: 'Merapikan / membereskan ruangan',
        example: "Let's tidy up the living room before the guests arrive.",
        exampleId: 'Ayo bereskan ruang tamu sebelum tamu-tamu datang.',
        category: 'daily_actions'
      },
      {
        word: 'run out of',
        phonetic: '/rʌn aʊt əv/',
        partOfSpeech: 'phrasal verb',
        meaningId: 'Kehabisan (stok barang/makanan)',
        example: "We've run out of eggs. I'll buy some later.",
        exampleId: 'Kita sudah kehabisan telur. Nanti aku akan beli.',
        category: 'daily_actions'
      },
      {
        word: 'do the dishes',
        phonetic: '/duː ðə ˈdɪʃɪz/',
        partOfSpeech: 'phrase',
        meaningId: 'Mencuci piring',
        example: 'I will cook dinner if you can do the dishes.',
        exampleId: 'Aku yang masak makan malam kalau kamu yang cuci piring ya.',
        category: 'household'
      },
      {
        word: 'microwave',
        phonetic: '/ˈmaɪkrəweɪv/',
        partOfSpeech: 'noun',
        meaningId: 'Oven microwave / memanaskan di microwave',
        example: 'Just heat the soup in the microwave for two minutes.',
        exampleId: 'Cukup panaskan sup di microwave selama dua menit.',
        category: 'household'
      },
      {
        word: 'kettle',
        phonetic: '/ˈketl/',
        partOfSpeech: 'noun',
        meaningId: 'Ketel / teko pemanas air',
        example: 'Can you turn on the kettle for some tea?',
        exampleId: 'Bisa tolong nyalakan ketel untuk membuat teh?',
        category: 'household'
      },
      {
        word: 'fry / boil',
        phonetic: '/fraɪ / bɔɪl/',
        partOfSpeech: 'verb',
        meaningId: 'Menggoreng / merebus',
        example: 'Do you want me to fry or boil the eggs for breakfast?',
        exampleId: 'Kamu mau aku goreng atau rebus telurnya untuk sarapan?',
        category: 'daily_actions'
      },
      {
        word: 'trash bin / rubbish bin',
        phonetic: '/træʃ bɪn/',
        partOfSpeech: 'noun',
        meaningId: 'Tempat sampah',
        example: 'Please throw empty cans into the recycling trash bin.',
        exampleId: 'Tolong buang kaleng kosong ke tempat sampah daur ulang.',
        category: 'household'
      },
      {
        word: 'wipe down',
        phonetic: '/waɪp daʊn/',
        partOfSpeech: 'phrasal verb',
        meaningId: 'Mengelap / membersihkan permukaan meja',
        example: 'Could you wipe down the kitchen counter after cooking?',
        exampleId: 'Bisa tolong lap meja dapur setelah selesai memasak?',
        category: 'daily_actions'
      },
      {
        word: 'take out the trash',
        phonetic: '/teɪk aʊt ðə træʃ/',
        partOfSpeech: 'phrase',
        meaningId: 'Membuang sampah ke luar rumah',
        example: "It's your turn to take out the trash tonight.",
        exampleId: 'Giliranmu membuang sampah ke luar malam ini.',
        category: 'daily_actions'
      }
    ],
    dialogueScript: [
      {
        speaker: 'Housemate',
        english: 'Morning! Did you sleep well?',
        indonesian: 'Selamat pagi! Tidurmu nyenyak semalam?'
      },
      {
        speaker: 'You',
        english: 'Pretty good, thanks! Are you making coffee?',
        indonesian: 'Cukup nyenyak, makasih! Kamu lagi buat kopi ya?'
      },
      {
        speaker: 'Housemate',
        english: "Yeah, but I think we're running out of sugar. Do you want me to grab some?",
        indonesian: 'Iya, tapi kayaknya kita kehabisan gula. Mau aku belikan sekalian?',
        noteId: '"Running out of" sering dipakai untuk barang dapur yang habis.'
      },
      {
        speaker: 'You',
        english: "That would be awesome! Also, could you check if we need more butter?",
        indonesian: 'Bagus banget kalau gitu! Sekalian tolong cek apakah kita butuh mentega juga ya?'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Pilih kalimat bertanya yang paling tepat saat meminta teman serumah memeriksa stok makanan:',
        question: 'How do you ask if there is any milk left in the fridge?',
        options: [
          'Do we have any milk left in the fridge?',
          'Is milk inside the house refrigerator now?',
          'Where milk goes in fridge please?',
          'Have we got run out of milk?'
        ],
        correctIndex: 0,
        explanationId: '"Do we have any milk left in the fridge?" adalah bentuk bertanya natural yang paling umum.'
      },
      {
        promptId: 'Pilih frasa yang tepat untuk meminta seseorang membersihkan meja makan:',
        question: 'How do you politely ask your roommate to clean the table?',
        options: [
          'Could you wipe down the table after eating, please?',
          'Do table cleaning immediately now.',
          'Throw away table surface please.',
          'Wipe out food onto ground.'
        ],
        correctIndex: 0,
        explanationId: '"Could you wipe down the table, please?" adalah permintaan sopan dan wajar.'
      }
    ]
  },
  {
    id: 3,
    title: 'Stage 3: Supermarket, Shopping & Prices',
    titleId: 'Level 3: Belanja di Supermarket, Menawar & Harga',
    cefrLevel: 'A2',
    category: 'Shopping & Asking Prices',
    descriptionId: 'Belajar cara menanyakan lokasi barang di supermarket, ketersediaan stok, harga, promo diskon, dan membayar di kasir.',
    requiredExpToUnlock: 120,
    vocabularies: [
      {
        word: 'aisle',
        phonetic: '/aɪl/',
        partOfSpeech: 'noun',
        meaningId: 'Lorong / deretan rak di supermarket',
        example: 'Excuse me, which aisle can I find olive oil in?',
        exampleId: 'Permisi, di lorong mana saya bisa menemukan minyak zaitun?',
        category: 'household'
      },
      {
        word: 'in stock',
        phonetic: '/ɪn stɒk/',
        partOfSpeech: 'phrase',
        meaningId: 'Tersedia / ada stoknya',
        example: 'Do you have this jacket in stock in size medium?',
        exampleId: 'Apakah jaket ini ada stoknya untuk ukuran sedang (M)?',
        category: 'household'
      },
      {
        word: 'on sale / discount',
        phonetic: '/ɒn seɪl/',
        partOfSpeech: 'phrase',
        meaningId: 'Sedang diskon / promo potongan harga',
        example: 'These organic apples are on sale for half price today.',
        exampleId: 'Apel organik ini sedang diskon setengah harga hari ini.',
        category: 'household'
      },
      {
        word: 'receipt',
        phonetic: '/rɪˈsiːt/',
        partOfSpeech: 'noun',
        meaningId: 'Struk / bukti pembayaran (huruf "p" tidak dibaca)',
        example: 'Would you like your receipt in the bag or with you?',
        exampleId: 'Struknya mau dimasukkan ke dalam kantong atau dibawa?',
        category: 'household'
      },
      {
        word: 'shopping cart / trolley',
        phonetic: '/ˈʃɒpɪŋ kɑːt/',
        partOfSpeech: 'noun',
        meaningId: 'Troli / keranjang dorong belanja',
        example: 'Grab a shopping cart at the entrance if you are buying a lot.',
        exampleId: 'Ambil troli belanja di pintu masuk kalau kamu belanja banyak.',
        category: 'household'
      },
      {
        word: 'checkout counter / cashier',
        phonetic: '/ˈtʃekaʊt ˈkaʊntə/',
        partOfSpeech: 'noun',
        meaningId: 'Meja kasir / tempat pembayaran',
        example: 'There is a shorter line at the self-checkout counter.',
        exampleId: 'Antreannya lebih pendek di kasir mandiri (self-checkout).',
        category: 'household'
      },
      {
        word: 'expiration date',
        phonetic: '/ˌekspəˈreɪʃn deɪt/',
        partOfSpeech: 'noun',
        meaningId: 'Tanggal kedaluwarsa / masa berlaku',
        example: 'Always check the expiration date on fresh yogurt before buying.',
        exampleId: 'Selalu periksa tanggal kedaluwarsa pada yogurt segar sebelum membeli.',
        category: 'household'
      },
      {
        word: 'refund / exchange',
        phonetic: '/ˈriːfʌnd / ɪksˈtʃeɪndʒ/',
        partOfSpeech: 'noun / verb',
        meaningId: 'Pengembalian dana / penukaran barang',
        example: 'Can I get a refund or exchange if the shirt does not fit?',
        exampleId: 'Bisakah saya meminta pengembalian dana atau tukar jika bajunya tidak muat?',
        category: 'household'
      },
      {
        word: 'pay by card / cash',
        phonetic: '/peɪ baɪ kɑːd/',
        partOfSpeech: 'phrase',
        meaningId: 'Membayar dengan kartu / tunai',
        example: 'Do you prefer to pay by card or in cash?',
        exampleId: 'Apakah Anda ingin membayar dengan kartu atau uang tunai?',
        category: 'household'
      },
      {
        word: 'how much is this?',
        phonetic: '/haʊ mʌtʃ ɪz ðɪs/',
        partOfSpeech: 'phrase',
        meaningId: 'Berapa harga barang ini?',
        example: 'Excuse me, there is no price tag. How much is this?',
        exampleId: 'Permisi, tidak ada label harganya. Berapa harga barang ini?',
        category: 'household'
      }
    ],
    dialogueScript: [
      {
        speaker: 'Staff',
        english: 'Hi! Can I help you find anything today?',
        indonesian: 'Halo! Ada yang bisa saya bantu carikan hari ini?'
      },
      {
        speaker: 'You',
        english: 'Yes, please. Which aisle is the pasta sauce in?',
        indonesian: 'Iya tolong. Di lorong mana saus pasta berada?'
      },
      {
        speaker: 'Staff',
        english: "It's right down aisle 4, on your left-hand side next to the canned tomatoes.",
        indonesian: 'Tepat di lorong 4, di sebelah kiri dekat tomat kaleng.'
      },
      {
        speaker: 'You',
        english: 'Great! Also, are these items included in the buy-one-get-one promotion?',
        indonesian: 'Bagus! Sekalian tanya, apakah barang ini termasuk dalam promo beli satu gratis satu?'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Cara menanyakan lokasi barang di supermarket secara sopan:',
        question: 'How do you ask a supermarket clerk where an item is located?',
        options: [
          'Excuse me, where can I find the dairy products?',
          'Give me dairy aisle now please.',
          'Is dairy product living in this shop?',
          'Where goes milk and cheese here?'
        ],
        correctIndex: 0,
        explanationId: '"Excuse me, where can I find [item]?" adalah kalimat paling natural dan sopan.'
      },
      {
        promptId: 'Cara menanyakan kebijakan penukaran barang belanjaan:',
        question: 'How do you ask if you can exchange an item if it does not fit?',
        options: [
          'Can I exchange this for a different size if needed?',
          'Change cloth fast if big or small.',
          'Do you take back goods forever?',
          'Size error give me next one.'
        ],
        correctIndex: 0,
        explanationId: '"Can I exchange this for a different size...?" adalah cara bertanya yang baku dan sopan.'
      }
    ]
  },
  {
    id: 4,
    title: 'Stage 4: Cafes, Restaurants & Ordering Food',
    titleId: 'Level 4: Kafe, Restoran, Memesan & Split Bill',
    cefrLevel: 'A2',
    category: 'Dining & Social Ordering',
    descriptionId: 'Belajar cara memesan kopi dan makanan, modifikasi pesanan (tanpa gula / susu nabati), menanyakan menu rekomendasi, dan meminta tagihan terpisah.',
    requiredExpToUnlock: 200,
    vocabularies: [
      {
        word: 'for here or to go',
        phonetic: '/fɔː hɪə ɔː tuː ɡəʊ/',
        partOfSpeech: 'phrase',
        meaningId: 'Untuk makan di tempat atau dibawa pulang',
        example: 'One iced americano, please. Make it to go!',
        exampleId: 'Satu iced americano. Tolong dibuat untuk bawa pulang!',
        category: 'food'
      },
      {
        word: 'split the bill',
        phonetic: '/splɪt ðə bɪl/',
        partOfSpeech: 'phrase',
        meaningId: 'Bayar masing-masing / patungan',
        example: 'Could we split the bill evenly on three cards?',
        exampleId: 'Bisakah tagihannya dibagi rata ke tiga kartu?',
        category: 'food'
      },
      {
        word: 'dairy-free / vegan',
        phonetic: '/ˈdeəri friː/',
        partOfSpeech: 'adjective',
        meaningId: 'Bebas susu hewani / produk nabati',
        example: 'Do you have dairy-free milk options like oat or almond?',
        exampleId: 'Apakah ada pilihan susu bebas dairy seperti oat atau almond?',
        category: 'food'
      },
      {
        word: 'keep the change',
        phonetic: '/kiːp ðə tʃeɪndʒ/',
        partOfSpeech: 'phrase',
        meaningId: 'Ambil saja kembaliannya (tip)',
        example: 'Here is twenty dollars, keep the change!',
        exampleId: 'Ini dua puluh dolar, kembaliannya ambil saja ya!',
        category: 'food'
      },
      {
        word: 'table for two',
        phonetic: '/ˈteɪbl fɔː tuː/',
        partOfSpeech: 'phrase',
        meaningId: 'Meja untuk dua orang',
        example: 'Good evening! We would like a table for two by the window.',
        exampleId: 'Selamat malam! Kami ingin meja untuk dua orang dekat jendela.',
        category: 'food'
      },
      {
        word: 'appetizer / starter',
        phonetic: '/ˈæpɪtaɪzə / ˈstɑːtə/',
        partOfSpeech: 'noun',
        meaningId: 'Makanan pembuka',
        example: 'Shall we order garlic bread as an appetizer?',
        exampleId: 'Bagaimana kalau kita pesan roti bawang putih sebagai hidangan pembuka?',
        category: 'food'
      },
      {
        word: 'main course / entree',
        phonetic: '/meɪn kɔːs/',
        partOfSpeech: 'noun',
        meaningId: 'Hidangan utama',
        example: 'For my main course, I would love the grilled salmon.',
        exampleId: 'Untuk hidangan utama saya, saya ingin salmon panggang.',
        category: 'food'
      },
      {
        word: 'napkin / cutlery',
        phonetic: '/ˈnæpkɪn / ˈkʌtləri/',
        partOfSpeech: 'noun',
        meaningId: 'Serbet / peralatan makan (sendok garpu pisau)',
        example: 'Excuse me, could we have extra napkins and a fork?',
        exampleId: 'Permisi, bisakah kami meminta serbet ekstra dan sebuah garpu?',
        category: 'food'
      },
      {
        word: "what do you recommend?",
        phonetic: "/wɒt duː juː ˌrekəˈmend/",
        partOfSpeech: "phrase",
        meaningId: "Apa yang Anda rekomendasikan? (menu andalan)",
        example: "It's our first time here. What do you recommend?",
        exampleId: "Ini kali pertama kami ke sini. Apa yang Anda rekomendasikan?",
        category: "food"
      },
      {
        word: "can we have the check / bill?",
        phonetic: "/kæn wiː hæv ðə bɪl/",
        partOfSpeech: "phrase",
        meaningId: "Bolehkah kami minta nota / bon tagihannya?",
        example: "We are finished with our meal. Can we have the check, please?",
        exampleId: "Kami sudah selesai makan. Boleh kami minta tagihannya?",
        category: "food"
      }
    ],
    dialogueScript: [
      {
        speaker: 'Barista',
        english: 'Hey there! What can I get started for you today?',
        indonesian: 'Halo! Mau pesan apa hari ini?'
      },
      {
        speaker: 'You',
        english: "Hi! Can I get an iced latte with oat milk and less ice, please?",
        indonesian: 'Halo! Boleh pesan iced latte dengan susu oat dan sedikit es?'
      },
      {
        speaker: 'Barista',
        english: 'Sure thing! Any pastry with that today? Our croissants just came out fresh.',
        indonesian: 'Tentu! Mau sekalian kue? Croissant kami baru saja matang hangat.'
      },
      {
        speaker: 'You',
        english: "I'll pass for now, just the coffee. Can I tap my card here?",
        indonesian: 'Nanti dulu deh, kopinya saja. Bisa tap kartu di sini ya?'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Pilih cara paling sopan untuk memesan kopi di kafe:',
        question: 'Which is the most natural way to order a coffee?',
        options: [
          'Can I get an iced Americano, please?',
          'I want an iced Americano immediately.',
          'Give me iced Americano fast.',
          'Make coffee iced Americano for me.'
        ],
        correctIndex: 0,
        explanationId: '"Can I get [item], please?" atau "Could I have [item], please?" adalah pola paling natural bagi penutur asli.'
      },
      {
        promptId: 'Cara meminta tagihan makanan di restoran saat selesai makan:',
        question: 'How do you ask the server for the bill at the end of a meal?',
        options: [
          'Could we get the check, please?',
          'Bring money document to table.',
          'How much money you take from me now?',
          'Finish eating give price note.'
        ],
        correctIndex: 0,
        explanationId: '"Could we get the check / bill, please?" adalah ungkapan standar di restoran.'
      }
    ]
  },
  {
    id: 5,
    title: 'Stage 5: Asking Directions, Commuting & Transit',
    titleId: 'Level 5: Tanya Arah Jalan, Naik Kereta & Taksi',
    cefrLevel: 'B1',
    category: 'Travel & Public Transport',
    descriptionId: 'Belajar cara bertanya arah ketika tersesat di luar negeri, membeli tiket kereta/subway, dan memberi tahu rute ke sopir taksi.',
    requiredExpToUnlock: 280,
    vocabularies: [
      {
        word: "within walking distance",
        phonetic: "/wɪˈðɪn ˈwɔːkɪŋ ˈdɪstəns/",
        partOfSpeech: "phrase",
        meaningId: "Dapat dijangkau dengan jalan kaki (dekat)",
        example: "The museum is definitely within walking distance from our hotel.",
        exampleId: "Museumnya jelas bisa dijangkau dengan jalan kaki dari hotel kita.",
        category: "directions"
      },
      {
        word: "hop on / hop off",
        phonetic: "/hɒp ɒn/",
        partOfSpeech: "phrasal verb",
        meaningId: "Naik / turun dari bus atau kereta secara cepat",
        example: "You can just hop on the red line at platform 2.",
        exampleId: "Kamu tinggal naik kereta jalur merah di peron 2.",
        category: "directions"
      },
      {
        word: "drop off",
        phonetic: "/drɒp ɒf/",
        partOfSpeech: "phrasal verb",
        meaningId: "Menurunkan penumpang di suatu titik",
        example: "Could you drop me off right at the corner, please?",
        exampleId: "Bisa tolong turunkan saya tepat di tikungan jalan itu?",
        category: "directions"
      },
      {
        word: "fare / transit card",
        phonetic: "/feə / ˈtrænzɪt kɑːd/",
        partOfSpeech: "noun",
        meaningId: "Tarif ongkos / kartu transportasi umum",
        example: "You can top up your transit card at any station machine.",
        exampleId: "Kamu bisa isi ulang kartu transportasimu di mesin stasiun mana pun.",
        category: "directions"
      },
      {
        word: "transfer / change trains",
        phonetic: "/trænsˈfɜː/",
        partOfSpeech: "verb / noun",
        meaningId: "Pindah / transit jalur kereta atau bus",
        example: "You will need to transfer to Line 2 at Central Station.",
        exampleId: "Anda perlu transit berpindah ke Jalur 2 di Stasiun Pusat.",
        category: "directions"
      },
      {
        word: "turn left / turn right",
        phonetic: "/tɜːn left / tɜːn raɪt/",
        partOfSpeech: "phrase",
        meaningId: "Belok kiri / belok kanan",
        example: "Go straight for two blocks, then turn left at the traffic light.",
        exampleId: "Jalan lurus sejauh dua blok, lalu belok kiri di lampu merah.",
        category: "directions"
      },
      {
        word: "cross the street",
        phonetic: "/krɒs ðə striːt/",
        partOfSpeech: "phrase",
        meaningId: "Menyeberang jalan",
        example: "Cross the street at the pedestrian crossing for safety.",
        exampleId: "Menyeberanglah jalan di penyeberangan pejalan kaki demi keamanan.",
        category: "directions"
      },
      {
        word: "lost / get lost",
        phonetic: "/ɡet lɒst/",
        partOfSpeech: "phrase",
        meaningId: "Tersesat / hilang arah",
        example: "I think I am lost. Could you point me toward the city center?",
        exampleId: "Sepertinya saya tersesat. Bisakah Anda menunjukkan arah ke pusat kota?",
        category: "directions"
      },
      {
        word: "platform",
        phonetic: "/ˈplætfɔːm/",
        partOfSpeech: "noun",
        meaningId: "Peron stasiun kereta api",
        example: "The airport express train will depart from platform 5.",
        exampleId: "Kereta express bandara akan berangkat dari peron 5.",
        category: "directions"
      }
    ],
    dialogueScript: [
      {
        speaker: 'You',
        english: 'Excuse me, sorry to bother you! Do you know which train goes to the airport?',
        indonesian: 'Permisi, maaf mengganggu! Apakah Anda tahu kereta mana yang menuju bandara?'
      },
      {
        speaker: 'Local',
        english: "You'll want the Express line on platform 3. It leaves every fifteen minutes.",
        indonesian: 'Anda perlu naik jalur Express di peron 3. Keretanya berangkat setiap lima belas menit.'
      },
      {
        speaker: 'You',
        english: 'Got it. Do I need to buy a separate ticket, or can I just tap in with my card?',
        indonesian: 'Paham. Apakah saya perlu beli tiket terpisah, atau bisa langsung tap kartu saja?'
      },
      {
        speaker: 'Local',
        english: "Just tap your card at the gate, it's super convenient!",
        indonesian: 'Cukup tap kartu Anda di gerbang masuk, sangat praktis!'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Ungkapan sopan saat meminta sopir taksi menurunkan Anda:',
        question: 'What do you say to a taxi driver to stop at a specific building?',
        options: [
          'Could you drop me off right in front of that building, please?',
          'Stop your car right now here.',
          'Throw me out at building front.',
          'Exit me here driver.'
        ],
        correctIndex: 0,
        explanationId: '"Could you drop me off..." adalah frasa standar paling tepat.'
      },
      {
        promptId: 'Cara menanyakan arah jalan ketika Anda tersesat di kota baru:',
        question: 'How do you politely ask a pedestrian for directions to the metro station?',
        options: [
          'Excuse me, could you tell me how to get to the nearest metro station?',
          'Where is train station go there now?',
          'I am lost you must lead my walk.',
          'Metro position show me fast.'
        ],
        correctIndex: 0,
        explanationId: '"Excuse me, could you tell me how to get to [place]?" adalah pola bertanya arah yang paling sopan.'
      }
    ]
  },
  {
    id: 6,
    title: 'Stage 6: Casual Hangouts & Making Foreign Friends',
    titleId: 'Level 6: Nongkrong Santai, Berteman & Bertukar Cerita',
    cefrLevel: 'B1',
    category: 'Socializing & Friendship',
    descriptionId: 'Belajar ungkapan gaul santai untuk merespons cerita seru, mengajak nongkrong akhir pekan, dan bertukar akun media sosial.',
    requiredExpToUnlock: 360,
    vocabularies: [
      {
        word: "count me in",
        phonetic: "/kaʊnt miː ɪn/",
        partOfSpeech: "phrase",
        meaningId: "Aku ikut! / Ajak aku!",
        example: "Are you guys going for pizza? Count me in!",
        exampleId: "Kalian mau beli pizza? Aku ikut dong!",
        category: "social_phrases"
      },
      {
        word: "hang out",
        phonetic: "/hæŋ aʊt/",
        partOfSpeech: "phrasal verb",
        meaningId: "Nongkrong / menghabiskan waktu santai bersama",
        example: "Let's hang out this Saturday if you're free.",
        exampleId: "Yuk kita nongkrong Sabtu ini kalau kamu ada waktu luang.",
        category: "social_phrases"
      },
      {
        word: "I know, right?",
        phonetic: "/aɪ nəʊ raɪt/",
        partOfSpeech: "phrase",
        meaningId: "Iya banget kan! (Menyetujui omongan teman)",
        example: "That movie was mind-blowing! — I know, right?",
        exampleId: "Film itu luar biasa keren banget! — Iya banget kan!",
        category: "social_phrases"
      },
      {
        word: "catch up",
        phonetic: "/kætʃ ʌp/",
        partOfSpeech: "phrasal verb",
        meaningId: "Ngobrol kabar terbaru setelah lama tidak bertemu",
        example: "We should grab coffee sometime and catch up on everything.",
        exampleId: "Kita harus ngopi kapan-kapan dan saling cerita kabar terbaru.",
        category: "social_phrases"
      },
      {
        word: "tag along",
        phonetic: "/tæɡ əˈlɒŋ/",
        partOfSpeech: "phrasal verb",
        meaningId: "Ikut pergi bersama rombongan teman",
        example: "We're going to the beach; do you want to tag along?",
        exampleId: "Kami mau ke pantai; kamu mau ikut gabung jalan bersama?",
        category: "social_phrases"
      },
      {
        word: "chill out",
        phonetic: "/tʃɪl aʊt/",
        partOfSpeech: "phrasal verb",
        meaningId: "Bersantai / melepas lelah tanpa beban",
        example: "I just want to stay home and chill out this evening.",
        exampleId: "Aku cuma ingin di rumah dan bersantai malam ini.",
        category: "social_phrases"
      },
      {
        word: "keep in touch",
        phonetic: "/kiːp ɪn tʌtʃ/",
        partOfSpeech: "phrase",
        meaningId: "Tetap saling kontak / memberi kabar",
        example: "It was awesome meeting you, let's definitely keep in touch!",
        exampleId: "Senang sekali bisa bertemu denganmu, pastikan kita tetap saling kontak ya!",
        category: "social_phrases"
      },
      {
        word: "grab a bite",
        phonetic: "/ɡræb ə baɪt/",
        partOfSpeech: "phrase",
        meaningId: "Makan cepat / cari cemilan santai bersama",
        example: "Do you have time to grab a quick bite before the movie?",
        exampleId: "Apakah kamu ada waktu untuk makan santai sebentar sebelum nonton film?",
        category: "social_phrases"
      },
      {
        word: "what have you been up to?",
        phonetic: "/wɒt hæv juː biːn ʌp tuː/",
        partOfSpeech: "phrase",
        meaningId: "Lagi sibuk apa saja akhir-akhir ini?",
        example: "Long time no see! What have you been up to recently?",
        exampleId: "Lama tidak bertemu! Lagi sibuk apa saja kamu akhir-akhir ini?",
        category: "social_phrases"
      }
    ],
    dialogueScript: [
      {
        speaker: 'Friend',
        english: 'Are you doing anything fun this weekend, or just chilling at home?',
        indonesian: 'Ada rencana seru akhir pekan ini, atau cuma santai di rumah?'
      },
      {
        speaker: 'You',
        english: "A couple of us are going to check out that new rooftop place. Wanna tag along?",
        indonesian: 'Beberapa teman mau cek tempat rooftop baru itu. Mau ikut jalan bareng?'
      },
      {
        speaker: 'Friend',
        english: 'Sounds awesome, count me in! Let me grab your WhatsApp so you can send the time.',
        indonesian: 'Kedengarannya asyik, aku ikut! Boleh minta WhatsApp-mu biar kamu bisa kabari jamnya.'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Pilih respon saat diajak nongkrong dan Anda mau ikut:',
        question: 'How do you enthusiastically agree to join a friend for dinner?',
        options: [
          "Sounds great, count me in!",
          "I will calculate you.",
          "I add myself into you.",
          "Yes I enter the group now."
        ],
        correctIndex: 0,
        explanationId: '"Count me in!" adalah idiom sehari-hari yang artinya "Aku ikut!".'
      },
      {
        promptId: 'Cara santai mengajak teman lama ngobrol kabar terkini sambil ngopi:',
        question: 'How do you casually invite an old friend to update each other on life?',
        options: [
          "Let's grab a coffee and catch up soon!",
          "Come to cafe to speak biography words.",
          "We must run after each other with drink.",
          "Order coffee and report your events."
        ],
        correctIndex: 0,
        explanationId: '"Catch up" adalah phrasal verb umum untuk saling berbagi kabar terbaru.'
      }
    ]
  },
  {
    id: 7,
    title: 'Stage 7: At the Doctor, Clinic & Health',
    titleId: 'Level 7: Di Klinik Dokter, Gejala Penyakit & Obat',
    cefrLevel: 'B1',
    category: 'Health & Wellbeing',
    descriptionId: 'Belajar kosakata medis sehari-hari, cara menjelaskan gejala sakit ke dokter, menebus resep obat di apotek, dan menanyakan dosis obat.',
    requiredExpToUnlock: 450,
    vocabularies: [
      {
        word: 'appointment',
        phonetic: '/əˈpɔɪntmənt/',
        partOfSpeech: 'noun',
        meaningId: 'Janji temu / jadwal konsultasi dokter',
        example: 'I would like to book an appointment with Dr. Williams for tomorrow morning.',
        exampleId: 'Saya ingin membuat janji temu dengan Dokter Williams untuk besok pagi.',
        category: 'health'
      },
      {
        word: 'prescription',
        phonetic: '/prɪˈskrɪpʃn/',
        partOfSpeech: 'noun',
        meaningId: 'Resep obat tertulis dari dokter',
        example: 'The doctor wrote me a prescription for antibiotics.',
        exampleId: 'Dokter menuliskan resep antibiotik untuk saya.',
        category: 'health'
      },
      {
        word: 'pharmacy',
        phonetic: '/ˈfɑːməsi/',
        partOfSpeech: 'noun',
        meaningId: 'Apotek / toko obat',
        example: 'Is there a 24-hour pharmacy near this hospital?',
        exampleId: 'Apakah ada apotek 24 jam di dekat rumah sakit ini?',
        category: 'health'
      },
      {
        word: 'fever',
        phonetic: '/ˈfiːvə/',
        partOfSpeech: 'noun',
        meaningId: 'Demam / suhu tubuh tinggi',
        example: 'I have had a high fever and chills since last night.',
        exampleId: 'Saya mengalami demam tinggi dan menggigil sejak tadi malam.',
        category: 'health'
      },
      {
        word: 'headache',
        phonetic: '/ˈhedeɪk/',
        partOfSpeech: 'noun',
        meaningId: 'Sakit kepala / pusing',
        example: 'I have a throbbing headache that will not go away.',
        exampleId: 'Saya sakit kepala berdenyut yang tidak kunjung hilang.',
        category: 'health'
      },
      {
        word: 'symptoms',
        phonetic: '/ˈsɪmptəmz/',
        partOfSpeech: 'noun',
        meaningId: 'Gejala penyakit yang dirasakan',
        example: 'What other symptoms have you been experiencing besides fatigue?',
        exampleId: 'Gejala apa lagi yang Anda rasakan selain rasa lelah?',
        category: 'health'
      },
      {
        word: 'infection',
        phonetic: '/ɪnˈfekʃn/',
        partOfSpeech: 'noun',
        meaningId: 'Infeksi kuman atau bakteri',
        example: 'The blood test showed a mild bacterial infection in the throat.',
        exampleId: 'Tes darah menunjukkan adanya infeksi bakteri ringan di tenggorokan.',
        category: 'health'
      },
      {
        word: 'bandage',
        phonetic: '/ˈbændɪdʒ/',
        partOfSpeech: 'noun / verb',
        meaningId: 'Perban pembalut luka',
        example: 'The nurse cleaned the wound and applied a clean bandage.',
        exampleId: 'Perawat membersihkan lukanya dan memasang perban yang bersih.',
        category: 'health'
      },
      {
        word: 'rest',
        phonetic: '/rest/',
        partOfSpeech: 'noun / verb',
        meaningId: 'Istirahat total untuk memulihkan tubuh',
        example: 'You need plenty of bed rest and fluids to recover quickly.',
        exampleId: 'Anda butuh banyak istirahat di tempat tidur dan minum cairan agar cepat sembuh.',
        category: 'health'
      },
      {
        word: 'cough',
        phonetic: '/kɒf/',
        partOfSpeech: 'noun / verb',
        meaningId: 'Batuk',
        example: 'I have a persistent dry cough that gets worse at night.',
        exampleId: 'Saya mengalami batuk kering terus-menerus yang memburuk di malam hari.',
        category: 'health'
      },
      {
        word: 'flu',
        phonetic: '/fluː/',
        partOfSpeech: 'noun',
        meaningId: 'Flu / influenza',
        example: 'Many students caught the seasonal flu this week.',
        exampleId: 'Banyak murid terkena flu musiman minggu ini.',
        category: 'health'
      },
      {
        word: 'vaccine',
        phonetic: '/ˈvæksiːn/',
        partOfSpeech: 'noun',
        meaningId: 'Vaksin imunisasi',
        example: 'Did you get your annual flu vaccine this year?',
        exampleId: 'Apakah Anda sudah mendapatkan vaksin flu tahunan tahun ini?',
        category: 'health'
      },
      {
        word: 'allergic',
        phonetic: '/əˈlɜːdʒɪk/',
        partOfSpeech: 'adjective',
        meaningId: 'Alergi terhadap makanan atau zat tertentu',
        example: 'I am allergic to penicillin and seafood.',
        exampleId: 'Saya alergi terhadap penisilin dan makanan laut.',
        category: 'health'
      },
      {
        word: 'ambulance',
        phonetic: '/ˈæmbjələns/',
        partOfSpeech: 'noun',
        meaningId: 'Mobil ambulans gawat darurat',
        example: 'Call an ambulance immediately if someone loses consciousness.',
        exampleId: 'Segera telepon ambulans jika ada seseorang yang kehilangan kesadaran.',
        category: 'health'
      }
    ],
    dialogueScript: [
      {
        speaker: 'Doctor',
        english: 'Good morning! What brings you in to see me today?',
        indonesian: 'Selamat pagi! Ada keluhan apa yang membawa Anda ke sini hari ini?'
      },
      {
        speaker: 'You',
        english: "Doctor, I've had a severe headache and a high fever for the past two days, along with a sore throat.",
        indonesian: 'Dokter, saya mengalami sakit kepala hebat dan demam tinggi selama dua hari terakhir, disertai sakit tenggorokan.'
      },
      {
        speaker: 'Doctor',
        english: "I see. Let me check your temperature and throat. Are you allergic to any medications?",
        indonesian: 'Baik. Saya periksa suhu tubuh dan tenggorokan Anda dulu ya. Apakah Anda punya alergi obat tertentu?'
      },
      {
        speaker: 'You',
        english: "No allergies that I know of. Could you prescribe something to relieve the fever and cough?",
        indonesian: 'Tidak ada alergi yang saya tahu. Bisakah Dokter meresepkan obat untuk meredakan demam dan batuknya?'
      },
      {
        speaker: 'Doctor',
        english: "Certainly. I'll write a prescription for paracetamol and a cough syrup. Take them three times daily after meals, and make sure to get plenty of rest.",
        indonesian: 'Tentu. Saya akan tuliskan resep paracetamol dan sirup obat batuk. Minum tiga kali sehari sesudah makan, dan pastikan banyak istirahat.'
      },
      {
        speaker: 'You',
        english: 'Thank you, Doctor. Where is the nearest pharmacy to pick these up?',
        indonesian: 'Terima kasih, Dok. Di mana apotek terdekat untuk menebus obat ini?'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Cara menjelaskan keluhan gejala demam dan pusing kepada dokter:',
        question: 'How do you accurately describe your symptoms to a doctor?',
        options: [
          "I have had a high fever and a persistent headache for two days.",
          "My head is breaking fire since yesterday morning.",
          "I produce very hot body temperature help me now.",
          "Sick inside brain and warm skin please cure."
        ],
        correctIndex: 0,
        explanationId: '"I have had a high fever and a persistent headache..." adalah cara medis natural mendeskripsikan gejala.'
      },
      {
        promptId: 'Cara memberi tahu dokter mengenai alergi obat yang Anda miliki:',
        question: 'How do you inform medical staff about your drug allergies?',
        options: [
          "Please note that I am allergic to penicillin and aspirin.",
          "My body hates pills of antibiotics.",
          "I reject medicine because of danger blood.",
          "Doctor don't inject bad poison into me."
        ],
        correctIndex: 0,
        explanationId: '"I am allergic to [substance]" adalah bentuk baku internasional dalam dunia medis.'
      }
    ]
  },
  {
    id: 8,
    title: 'Stage 8: Job Interview & Professional Settings',
    titleId: 'Level 8: Wawancara Kerja & Lingkungan Profesional',
    cefrLevel: 'B2',
    category: 'Work & Career',
    descriptionId: 'Belajar kosakata dunia kerja profesional, cara menjawab pertanyaan wawancara kerja, mendiskusikan kualifikasi, gaji, dan fleksibilitas kerja.',
    requiredExpToUnlock: 550,
    vocabularies: [
      {
        word: 'resume / CV',
        phonetic: '/ˈrezjuːmeɪ / ˌsiːˈviː/',
        partOfSpeech: 'noun',
        meaningId: 'Daftar riwayat hidup / profil karier ringkas',
        example: 'Please bring a printed copy of your updated resume to the interview.',
        exampleId: 'Harap bawa salinan cetak CV terbaru Anda ke sesi wawancara.',
        category: 'career'
      },
      {
        word: 'interview',
        phonetic: '/ˈɪntəvjuː/',
        partOfSpeech: 'noun / verb',
        meaningId: 'Wawancara kerja / mewawancarai',
        example: 'I have a second-round interview with the department manager tomorrow.',
        exampleId: 'Saya memiliki wawancara putaran kedua dengan manajer departemen besok.',
        category: 'career'
      },
      {
        word: 'position',
        phonetic: '/pəˈzɪʃn/',
        partOfSpeech: 'noun',
        meaningId: 'Posisi jabatan pekerjaan yang dilamar',
        example: 'Why are you interested in applying for this position at our company?',
        exampleId: 'Mengapa Anda tertarik untuk melamar posisi ini di perusahaan kami?',
        category: 'career'
      },
      {
        word: 'qualification',
        phonetic: '/ˌkwɒlɪfɪˈkeɪʃn/',
        partOfSpeech: 'noun',
        meaningId: 'Kualifikasi / syarat keahlian dan pendidikan',
        example: 'Your academic background and qualifications match our requirements perfectly.',
        exampleId: 'Latar belakang pendidikan dan kualifikasi Anda sangat cocok dengan kebutuhan kami.',
        category: 'career'
      },
      {
        word: 'salary',
        phonetic: '/ˈsæləri/',
        partOfSpeech: 'noun',
        meaningId: 'Gaji pokok / penghasilan bulanan atau tahunan',
        example: 'What are your salary expectations for this full-time role?',
        exampleId: 'Berapa ekspektasi gaji Anda untuk peran purnawaktu ini?',
        category: 'career'
      },
      {
        word: 'deadline',
        phonetic: '/ˈdedlaɪn/',
        partOfSpeech: 'noun',
        meaningId: 'Batas akhir pengumpulan / tenggat waktu tugas',
        example: 'I have a proven track record of consistently meeting tight project deadlines.',
        exampleId: 'Saya memiliki rekam jejak terbukti selalu memenuhi tenggat waktu proyek yang ketat.',
        category: 'career'
      },
      {
        word: 'flexible',
        phonetic: '/ˈfleksəbl/',
        partOfSpeech: 'adjective',
        meaningId: 'Fleksibel / mudah beradaptasi dengan perubahan',
        example: 'We offer flexible working hours to promote work-life balance.',
        exampleId: 'Kami menawarkan jam kerja fleksibel untuk mendukung keseimbangan kerja-kehidupan.',
        category: 'career'
      },
      {
        word: 'remote work',
        phonetic: '/rɪˈməʊt wɜːk/',
        partOfSpeech: 'noun',
        meaningId: 'Kerja jarak jauh / kerja dari mana saja (WFH)',
        example: 'This position offers a hybrid model with two days of remote work per week.',
        exampleId: 'Posisi ini menawarkan model kerja hybrid dengan dua hari kerja jarak jauh per minggu.',
        category: 'career'
      },
      {
        word: 'team player',
        phonetic: '/tiːm ˈpleɪə/',
        partOfSpeech: 'noun',
        meaningId: 'Pribadi yang mampu bekerja sama dengan baik dalam tim',
        example: 'She is a proactive team player who readily supports her colleagues.',
        exampleId: 'Dia adalah rekan kerja tim yang proaktif dan siap mendukung rekan kerjanya.',
        category: 'career'
      },
      {
        word: 'experience',
        phonetic: '/ɪkˈspɪəriəns/',
        partOfSpeech: 'noun',
        meaningId: 'Pengalaman kerja di bidang terkait',
        example: 'I have over five years of hands-on experience in digital marketing.',
        exampleId: 'Saya memiliki lebih dari lima tahun pengalaman langsung di bidang pemasaran digital.',
        category: 'career'
      },
      {
        word: 'expertise',
        phonetic: '/ˌekspɜːˈtiːz/',
        partOfSpeech: 'noun',
        meaningId: 'Keahlian mendalam / kepakaran khusus',
        example: 'His technical expertise in cloud infrastructure is invaluable to our team.',
        exampleId: 'Keahlian teknisnya dalam infrastruktur cloud sangat berharga bagi tim kami.',
        category: 'career'
      },
      {
        word: 'recommendation',
        phonetic: '/ˌrekəmenˈdeɪʃn/',
        partOfSpeech: 'noun',
        meaningId: 'Surat rekomendasi / referensi profesional',
        example: 'I can provide stellar letters of recommendation from my previous supervisors.',
        exampleId: 'Saya dapat memberikan surat rekomendasi yang sangat baik dari atasan saya sebelumnya.',
        category: 'career'
      },
      {
        word: 'professional development',
        phonetic: '/prəˈfeʃənl dɪˈveləpmənt/',
        partOfSpeech: 'noun',
        meaningId: 'Pengembangan profesional / pelatihan peningkatan karier',
        example: 'Our company actively invests in continuous professional development for all staff.',
        exampleId: 'Perusahaan kami secara aktif berinvestasi dalam pengembangan profesional berkelanjutan untuk semua staf.',
        category: 'career'
      }
    ],
    dialogueScript: [
      {
        speaker: 'Interviewer',
        english: 'Welcome, Rizky. Could you briefly tell me about yourself and your background?',
        indonesian: 'Selamat datang, Rizky. Bisakah Anda menceritakan secara singkat tentang diri dan latar belakang Anda?'
      },
      {
        speaker: 'You',
        english: 'Thank you. I have four years of experience in project management, where I successfully led cross-functional teams to deliver software solutions on tight deadlines.',
        indonesian: 'Terima kasih. Saya memiliki pengalaman empat tahun di manajemen proyek, di mana saya berhasil memimpin tim lintas fungsi untuk merilis solusi perangkat lunak tepat waktu.'
      },
      {
        speaker: 'Interviewer',
        english: 'Impressive. Why do you want to join our organization specifically for this position?',
        indonesian: 'Mengesankan. Mengapa Anda secara khusus ingin bergabung dengan organisasi kami untuk posisi ini?'
      },
      {
        speaker: 'You',
        english: "I admire your company's focus on innovation and professional development. My expertise in agile workflows aligns directly with your goals.",
        indonesian: 'Saya mengagumi fokus perusahaan Anda pada inovasi dan pengembangan profesional. Keahlian saya dalam alur kerja agile selaras langsung dengan sasaran Anda.'
      },
      {
        speaker: 'Interviewer',
        english: 'That sounds great. What are your thoughts regarding remote work and salary expectations?',
        indonesian: 'Kedengarannya bagus. Bagaimana pandangan Anda mengenai kerja jarak jauh dan ekspektasi gaji?'
      },
      {
        speaker: 'You',
        english: "I am comfortable with either a hybrid or remote setup, and my salary expectations are open to negotiation based on the total compensation package.",
        indonesian: 'Saya nyaman dengan skema hybrid maupun jarak jauh, dan ekspektasi gaji saya terbuka untuk negosiasi sesuai paket kompensasi keseluruhan.'
      }
    ],
    checkpointQuiz: [
      {
        promptId: 'Cara profesional memperkenalkan ringkasan kualifikasi dan pengalaman saat wawancara:',
        question: 'How do you professionally introduce your background in an interview?',
        options: [
          "I have over four years of experience leading projects and collaborating in fast-paced teams.",
          "I work many places before and want money here now.",
          "My life is working very hard every day look at me.",
          "Hire me because I have big power to finish job."
        ],
        correctIndex: 0,
        explanationId: '"I have over [X] years of experience in [field]..." adalah format pembuka wawancara profesional yang baku.'
      },
      {
        promptId: 'Cara menjawab pertanyaan mengenai ekspektasi gaji secara diplomatis dan profesional:',
        question: 'How do you diplomatically state your salary expectations?',
        options: [
          "My salary expectations are flexible and open to discussion based on the total compensation package.",
          "Give me maximum salary immediately without bargaining.",
          "I want very much money for this position.",
          "Pay whatever you want I have no standard."
        ],
        correctIndex: 0,
        explanationId: '"My salary expectations are flexible and open to discussion based on..." adalah jawaban paling diplomatis dan profesional.'
      }
    ]
  }
];
