let globalAccentPreference: 'en-US' | 'en-GB' = (localStorage.getItem('vanguard_preferred_accent') as 'en-US' | 'en-GB') || 'en-US';

export function getGlobalAccent(): 'en-US' | 'en-GB' {
  return globalAccentPreference;
}

export function setGlobalAccent(accent: 'en-US' | 'en-GB') {
  globalAccentPreference = accent;
  try {
    localStorage.setItem('vanguard_preferred_accent', accent);
  } catch (e) {
    console.warn('Could not save accent', e);
  }
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('en'));
}

function findBestVoice(langTarget: 'en-US' | 'en-GB'): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const isGB = langTarget === 'en-GB';

  // High-quality female voice signatures per accent
  const britishSignatures = [
    'sonia', 'libby', 'hazel', 'catherine', 'fiona', 'moira', 'serena',
    'en-gb', 'united kingdom', 'great britain', 'british'
  ];

  const americanSignatures = [
    'jenny', 'aria', 'zira', 'samantha', 'ava', 'allison', 'michelle',
    'en-us', 'united states', 'american'
  ];

  const signatures = isGB ? britishSignatures : americanSignatures;

  // Strict accent match first
  const exactAccent = voices.filter(v => {
    const l = v.lang.toLowerCase().replace('_', '-');
    const n = v.name.toLowerCase();
    if (isGB) {
      return l.includes('gb') || l.includes('uk') || n.includes('british') || n.includes('united kingdom');
    }
    return l.includes('us') || n.includes('united states');
  });

  // Priority 1: named female voices
  for (const sig of signatures) {
    const found = exactAccent.find(v => v.name.toLowerCase().includes(sig));
    if (found) return found;
  }

  // Priority 2: any voice with "female" / "natural" in accent
  const femNat = exactAccent.find(v => {
    const n = v.name.toLowerCase();
    return n.includes('female') || n.includes('natural');
  });
  if (femNat) return femNat;

  // Priority 3: any voice in accent
  if (exactAccent.length > 0) return exactAccent[0];

  // Priority 4: fallback across all English voices
  for (const sig of signatures) {
    const found = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes(sig));
    if (found) return found;
  }

  return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
}

export function speakText(
  text: string,
  langOverride?: 'en-US' | 'en-GB',
  rate: number = 0.78
): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const activeLang: 'en-US' | 'en-GB' =
      langOverride === 'en-GB' || langOverride === 'en-US'
        ? langOverride
        : globalAccentPreference;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = activeLang;
    utterance.rate = rate;
    utterance.pitch = 1.05;

    const execute = () => {
      const voice = findBestVoice(activeLang);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || activeLang;
      }
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      execute();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        execute();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  });
}

/**
 * Play audio N times with silence gap between each repetition
 */
export async function speakTextLoop(
  text: string,
  times: number = 3,
  langOverride?: 'en-US' | 'en-GB',
  rate: number = 0.78,
  gapMs: number = 800
): Promise<void> {
  for (let i = 0; i < times; i++) {
    await speakText(text, langOverride, rate);
    if (i < times - 1) {
      await new Promise(r => setTimeout(r, gapMs));
    }
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Break a word into approximate syllable groups for pronunciation display.
 * Pure heuristic (no external library needed).
 */
export function getStressBreakdown(word: string): { syllables: string[]; stressIndex: number } {
  const vowels = 'aeiouy';
  const w = word.toLowerCase().replace(/[^a-z]/g, '');

  // Split into syllables by vowel-consonant boundaries
  const syllables: string[] = [];
  let current = '';
  let lastWasVowel = false;

  for (let i = 0; i < w.length; i++) {
    const ch = w[i];
    const isVowel = vowels.includes(ch);
    current += ch;

    if (lastWasVowel && !isVowel && i < w.length - 1) {
      // Check next is not a vowel (or allow short split)
      const nextIsVowel = vowels.includes(w[i + 1]);
      if (!nextIsVowel || current.length >= 3) {
        syllables.push(current);
        current = '';
      }
    }
    lastWasVowel = isVowel;
  }
  if (current) syllables.push(current);

  // Simple heuristic: stress on first syllable for most words,
  // second syllable for words ending in -tion/-sion/-ic/-al
  let stressIndex = 0;
  if (syllables.length >= 2) {
    if (w.endsWith('tion') || w.endsWith('sion') || w.endsWith('ic') || w.endsWith('al') || w.endsWith('ity')) {
      stressIndex = syllables.length - 2 >= 0 ? syllables.length - 2 : 0;
    } else if (w.endsWith('ee') || w.endsWith('oo')) {
      stressIndex = syllables.length - 1;
    } else if (syllables.length === 2) {
      // 2-syllable: verb usually stress 2nd, noun/adjective stress 1st
      stressIndex = 1;
    } else if (syllables.length >= 3) {
      stressIndex = 1; // most 3+ syllable words stress 2nd
    }
  }

  return { syllables, stressIndex };
}
