import React, { useState, useMemo } from 'react';
import { speakText, getGlobalAccent } from '../utils/speech';

interface DailyExpression {
  phrase: string;
  phonetic: string;
  meaningId: string;
  exampleSentence: string;
  exampleId: string;
  usageContextId: string;
}

const EXPRESSIONS: DailyExpression[] = [
  {
    phrase: "It's on me",
    phonetic: "/ɪts ɒn miː/",
    meaningId: "Aku yang traktir / Biar aku yang bayar",
    exampleSentence: "Don't worry about the bill tonight, it's on me.",
    exampleId: "Jangan khawatir soal tagihan malam ini, aku yang traktir.",
    usageContextId: "Dipakai saat menawarkan diri membayar tagihan makanan, minuman, atau tiket untuk orang lain."
  },
  {
    phrase: "I'm swamped",
    phonetic: "/aɪm swɒmpt/",
    meaningId: "Aku lagi sibuk banget / Tugas menumpuk",
    exampleSentence: "I'd love to join the meeting, but I'm swamped with deadlines today.",
    exampleId: "Aku ingin sekali ikut rapat, tapi hari ini aku lagi kewalahan dengan tenggat waktu.",
    usageContextId: "Alternatif natural dan kolokial untuk menggantikan 'I am very busy' di tempat kerja atau IELTS Speaking."
  },
  {
    phrase: "Keep me posted",
    phonetic: "/kiːp miː ˈpəʊstɪd/",
    meaningId: "Kabari aku terus ya / Tetap beri info terbaru",
    exampleSentence: "Let me know when the exam results arrive; keep me posted!",
    exampleId: "Beri tahu aku kalau hasil ujian sudah keluar; kabari terus ya!",
    usageContextId: "Digunakan di akhir percakapan santai maupun email semi-formal untuk meminta update perkembangan."
  },
  {
    phrase: "Long story short",
    phonetic: "/lɒŋ ˈstɔːri ʃɔːt/",
    meaningId: "Ceritanya panjang, tapi singkatnya...",
    exampleSentence: "Long story short, we missed the morning flight and had to reschedule.",
    exampleId: "Singkat cerita, kami ketinggalan penerbangan pagi dan harus menjadwal ulang.",
    usageContextId: "Bagus untuk IELTS Speaking Part 2 saat ingin merangkum kronologi cerita dengan padat dan luwes."
  },
  {
    phrase: "By the way",
    phonetic: "/baɪ ðə weɪ/",
    meaningId: "Ngomong-ngomong / Sekadar info tambahan",
    exampleSentence: "By the way, have you had a chance to look over the new assignment?",
    exampleId: "Ngomong-ngomong, apa kamu sudah sempat memeriksa tugas baru itu?",
    usageContextId: "Digunakan untuk mengalihkan topik percakapan atau menyisipkan informasi baru yang baru teringat."
  },
  {
    phrase: "That rings a bell",
    phonetic: "/ðæt rɪŋz ə bɛl/",
    meaningId: "Itu terdengar familiar / Pernah dengar sebelumnya",
    exampleSentence: "Her name rings a bell, but I cannot recall where we met.",
    exampleId: "Namanya terdengar tidak asing, tapi aku tidak ingat di mana kami pernah bertemu.",
    usageContextId: "Cocok diutarakan ketika mengingat sesuatu secara samar tapi belum ingat detail pastinya."
  },
  {
    phrase: "I'm on the fence",
    phonetic: "/aɪm ɒn ðə fɛns/",
    meaningId: "Aku masih ragu-ragu / Belum bisa menentukan pilihan",
    exampleSentence: "I'm still on the fence about whether to take the Academic or General IELTS module.",
    exampleId: "Aku masih ragu apakah mau mengambil modul IELTS Academic atau General.",
    usageContextId: "Idiom populer untuk menyatakan posisi netral atau kebimbangan antara dua pilihan."
  },
  {
    phrase: "Cut to the chase",
    phonetic: "/kʌt tuː ðə tʃeɪs/",
    meaningId: "Langsung ke intinya / Jangan bertele-tele",
    exampleSentence: "We only have ten minutes left, so let's cut to the chase.",
    exampleId: "Waktu kita sisa sepuluh menit, jadi mari langsung ke inti permasalahannya.",
    usageContextId: "Biasa digunakan dalam diskusi agar percakapan segera membahas poin utama tanpa pengantar panjang."
  },
  {
    phrase: "It slipped my mind",
    phonetic: "/ɪt slɪpt maɪ maɪnd/",
    meaningId: "Aku lupa / Terlewat dari ingatan",
    exampleSentence: "I was supposed to call my tutor yesterday, but it completely slipped my mind.",
    exampleId: "Aku seharusnya menelepon pembimbingku kemarin, tapi benar-benar terlupa.",
    usageContextId: "Alternatif natural dan sopan untuk menjelaskan kelupaan tanpa terkesan ceroboh."
  },
  {
    phrase: "Fair enough",
    phonetic: "/feər ɪˈnʌf/",
    meaningId: "Wajar juga / Masuk akal / Boleh juga",
    exampleSentence: "If you are too exhausted to attend the study group, that is fair enough.",
    exampleId: "Kalau kamu terlalu lelah untuk ikut kelompok belajar, itu sangat masuk akal.",
    usageContextId: "Dipakai untuk menerima alasan atau argumen lawan bicara meskipun awalnya mungkin tidak sependapat."
  },
  {
    phrase: "I couldn't agree more",
    phonetic: "/aɪ ˈkʊdnt əˈɡriː mɔː/",
    meaningId: "Aku setuju banget / Sangat sependapat",
    exampleSentence: "I couldn't agree more with your point regarding regular practice.",
    exampleId: "Aku sangat setuju dengan pendapatmu tentang pentingnya latihan rutin.",
    usageContextId: "Frasa bernilai tinggi untuk IELTS Speaking Part 3 saat menyetujui pernyataan penguji secara tegas."
  },
  {
    phrase: "Let's call it a day",
    phonetic: "/lɛts kɔːl ɪt ə deɪ/",
    meaningId: "Ayo akhiri dulu kerjaannya / Cukup untuk hari ini",
    exampleSentence: "We have made excellent progress on the essay, so let's call it a day.",
    exampleId: "Kita sudah ada kemajuan bagus di esai ini, ayo kita sudahi dulu hari ini.",
    usageContextId: "Digunakan saat memutuskan untuk berhenti beraktivitas setelah sesi kerja atau belajar yang panjang."
  },
  {
    phrase: "Better late than never",
    phonetic: "/ˈbɛtə leɪt ðæn ˈnɛvə/",
    meaningId: "Lebih baik terlambat daripada tidak sama sekali",
    exampleSentence: "He finally started preparing for the exam; better late than never.",
    exampleId: "Dia akhirnya mulai bersiap untuk ujian; lebih baik terlambat daripada tidak sama sekali.",
    usageContextId: "Pepatah untuk mengapresiasi suatu tindakan yang akhirnya dilakukan meskipun tertunda."
  },
  {
    phrase: "The ball is in your court",
    phonetic: "/ðə bɔːl ɪz ɪn jɔː kɔːt/",
    meaningId: "Terserah kamu sekarang / Keputusan di tanganmu",
    exampleSentence: "I have shared all the study materials, so the ball is in your court now.",
    exampleId: "Aku sudah membagikan semua materi belajar, jadi keputusannya ada di tanganmu sekarang.",
    usageContextId: "Dipakai untuk menunjukkan bahwa langkah atau keputusan berikutnya menjadi tanggung jawab orang tersebut."
  },
  {
    phrase: "Break a leg!",
    phonetic: "/breɪk ə lɛɡ/",
    meaningId: "Semoga berhasil! / Sukses ya!",
    exampleSentence: "I know you're taking your IELTS interview tomorrow—break a leg!",
    exampleId: "Aku tahu kamu ada wawancara IELTS besok—semoga sukses besar ya!",
    usageContextId: "Ungkapan khas teater yang kini umum untuk menyemangati seseorang sebelum tampil atau ujian penting."
  },
  {
    phrase: "Piece of cake",
    phonetic: "/piːs ɒv keɪk/",
    meaningId: "Gampang banget / Sangat mudah",
    exampleSentence: "Once you master the paragraph templates, Task 1 becomes a piece of cake.",
    exampleId: "Begitu kamu menguasai pola paragrafnya, Task 1 jadi mudah sekali.",
    usageContextId: "Idiom santai untuk mendeskripsikan tugas yang sederhana dan tidak membutuhkan usaha berlebih."
  },
  {
    phrase: "Hit the sack",
    phonetic: "/hɪt ðə sæk/",
    meaningId: "Tidur dulu ya / Beristirahat ke tempat tidur",
    exampleSentence: "It has been an exhausting study session, so I'm going to hit the sack early.",
    exampleId: "Ini sesi belajar yang melelahkan, jadi aku mau langsung tidur lebih awal.",
    usageContextId: "Ungkapan informal yang sering dipakai dalam obrolan sehari-hari untuk menyatakan hendak tidur."
  },
  {
    phrase: "Under the weather",
    phonetic: "/ˈʌndə ðə ˈwɛðə/",
    meaningId: "Lagi kurang sehat / Masuk angin / Agak sakit",
    exampleSentence: "She could not join the mock test because she was feeling under the weather.",
    exampleId: "Dia tidak bisa ikut ujian simulasi karena merasa kurang enak badan.",
    usageContextId: "Cara natural dan santun untuk mengatakan bahwa kondisi badan sedang tidak prima."
  },
  {
    phrase: "The best of both worlds",
    phonetic: "/ðə bɛst ɒv bəʊθ wɜːldz/",
    meaningId: "Dapat dua keuntungan sekaligus / Solusi ideal",
    exampleSentence: "Studying online gives you flexible hours and quality guidance—the best of both worlds.",
    exampleId: "Belajar secara daring memberimu jam fleksibel dan panduan berkualitas—keuntungan ganda yang ideal.",
    usageContextId: "Cocok untuk IELTS Speaking/Writing saat memuji solusi yang menggabungkan dua manfaat berbeda."
  }
];

function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

interface DailyExpressionCardProps {
  onAddExp: (amount: number) => void;
}

export const DailyExpressionCard: React.FC<DailyExpressionCardProps> = ({ onAddExp }) => {
  const initialIndex = useMemo(() => {
    const dayOfYear = getDayOfYear(new Date());
    return ((dayOfYear % EXPRESSIONS.length) + EXPRESSIONS.length) % EXPRESSIONS.length;
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [learnedIds, setLearnedIds] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const currentExpression = EXPRESSIONS[currentIndex];
  const isLearned = Boolean(learnedIds[currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % EXPRESSIONS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + EXPRESSIONS.length) % EXPRESSIONS.length);
  };

  const handlePlayAudio = async (text: string) => {
    setIsSpeaking(true);
    try {
      await speakText(text, getGlobalAccent(), 0.78);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleMarkLearned = () => {
    if (!isLearned) {
      setLearnedIds((prev) => ({ ...prev, [currentIndex]: true }));
      onAddExp(15);
    }
  };

  return (
    <div className="clean-surface p-5 sm:p-6 space-y-4">
      <div className="flex justify-between items-center border-b border-[#e8e6e1] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono-code text-[#c97a3e] uppercase font-semibold block">
            Expression of the Day
          </span>
          <span className="text-[10px] font-mono-code bg-[#fdf5eb] text-[#c97a3e] px-2 py-0.5 rounded border border-[#e8d5be]">
            Hari Ini
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-code text-[#6b675e]">
          <span>{currentIndex + 1} / {EXPRESSIONS.length}</span>
          <div className="flex gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous expression"
              className="px-2 py-1 bg-[#faf9f7] hover:bg-[#edeae3] border border-[#e8e6e1] rounded text-[#21201c] transition-colors"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              aria-label="Next expression"
              className="px-2 py-1 bg-[#faf9f7] hover:bg-[#edeae3] border border-[#e8e6e1] rounded text-[#21201c] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#faf9f7] border border-[#e8e6e1] rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-xl sm:text-2xl font-bold text-[#21201c] tracking-tight">
                "{currentExpression.phrase}"
              </h3>
              <button
                onClick={() => handlePlayAudio(currentExpression.phrase)}
                disabled={isSpeaking}
                title="Dengarkan pengucapan frasa"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-[#ffffff] hover:bg-[#f3f0e6] border border-[#e8e6e1] text-[#21201c] transition-all"
              >
                <span>🔊</span>
                <span className="font-mono-code text-[11px] text-[#6b675e]">Play</span>
              </button>
            </div>
            <p className="text-xs font-mono-code text-[#6b675e] mt-1">
              {currentExpression.phonetic}
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-[#6b675e] block font-mono-code">Arti / Makna:</span>
            <p className="text-sm font-semibold text-[#21201c]">
              {currentExpression.meaningId}
            </p>
          </div>
        </div>

        <div className="clean-surface-subtle p-3.5 rounded-lg border border-[#e8e6e1] space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div>
              <span className="text-[10px] font-mono-code text-[#6b675e] uppercase tracking-wider block mb-1">
                Contoh Kalimat Natural
              </span>
              <p className="text-sm text-[#21201c] font-medium leading-relaxed">
                "{currentExpression.exampleSentence}"
              </p>
            </div>
            <button
              onClick={() => handlePlayAudio(currentExpression.exampleSentence)}
              disabled={isSpeaking}
              title="Dengarkan contoh kalimat"
              className="p-1.5 bg-[#ffffff] hover:bg-[#faf9f7] border border-[#e8e6e1] rounded-md text-[#21201c] shrink-0 text-xs transition-colors"
            >
              🔊
            </button>
          </div>
          <p className="text-xs text-[#6b675e] italic border-t border-[#e8e6e1]/60 pt-1.5">
            Artinya: "{currentExpression.exampleId}"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-start gap-1.5 text-[#6b675e] leading-snug">
            <span className="font-semibold text-[#21201c] shrink-0">💡 Konteks Pakai:</span>
            <span>{currentExpression.usageContextId}</span>
          </div>

          <button
            onClick={handleMarkLearned}
            disabled={isLearned}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border shrink-0 transition-all font-mono-code ${
              isLearned
                ? 'bg-[#f0f9f2] text-[#2f7a42] border-[#c8e8c8] cursor-default'
                : 'bg-[#21201c] text-[#faf9f7] hover:bg-[#383632] border-[#21201c]'
            }`}
          >
            {isLearned ? '✓ Sudah Dipelajari (+15 XP)' : '+ Pelajari Ini (+15 XP)'}
          </button>
        </div>
      </div>
    </div>
  );
};
