export interface ThemeConfig {
  id: 'stripe' | 'claude' | 'vercel' | 'apple' | 'supabase';
  name: string;
  badge: string;
  description: string;
  bg: string;
  cardBg: string;
  headerBg: string;
  accent: string;
  accentGradient: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  fontHeading: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  stripe: {
    id: 'stripe',
    name: 'Stripe Indigo',
    badge: 'Fintech Mesh',
    description: 'Electric indigo, deep ink, crisp borders & vibrant mesh gradients',
    bg: 'bg-[#f6f9fc]',
    cardBg: 'bg-white',
    headerBg: 'bg-[#0d253d]',
    accent: 'bg-[#533afd] text-white hover:bg-[#4434d4]',
    accentGradient: 'from-[#533afd] via-[#665efd] to-[#ea2261]',
    border: 'border-[#e3e8ee]',
    textPrimary: 'text-[#0d253d]',
    textMuted: 'text-[#64748d]',
    fontHeading: 'font-sans tracking-tight',
  },
  claude: {
    id: 'claude',
    name: 'Claude Warm Editorial',
    badge: 'Humanist Serif',
    description: 'Warm cream canvas, terracotta coral, and elegant serif headlines',
    bg: 'bg-[#faf9f5]',
    cardBg: 'bg-[#f5f0e8]/80',
    headerBg: 'bg-[#181715]',
    accent: 'bg-[#cc785c] text-white hover:bg-[#a9583e]',
    accentGradient: 'from-[#cc785c] via-[#e8a55a] to-[#5db8a6]',
    border: 'border-[#e6dfd8]',
    textPrimary: 'text-[#141413]',
    textMuted: 'text-[#6c6a64]',
    fontHeading: 'font-serif tracking-normal',
  },
  vercel: {
    id: 'vercel',
    name: 'Vercel / Linear Neo-Dark',
    badge: 'High-Tech Dark',
    description: 'Deep obsidian, subtle grid lines, monospaced typography & razor-sharp contrast',
    bg: 'bg-[#000000]',
    cardBg: 'bg-[#0c0c0d]',
    headerBg: 'bg-[#09090b]/90',
    accent: 'bg-white text-black hover:bg-slate-200',
    accentGradient: 'from-blue-500 via-indigo-500 to-cyan-400',
    border: 'border-[#27272a]',
    textPrimary: 'text-[#f4f4f5]',
    textMuted: 'text-[#a1a1aa]',
    fontHeading: 'font-sans font-black tracking-tighter',
  },
  supabase: {
    id: 'supabase',
    name: 'Supabase Emerald',
    badge: 'Dev Dark / Green',
    description: 'Deep slate surfaces with high-energy neon emerald accents',
    bg: 'bg-[#171717]',
    cardBg: 'bg-[#1f1f1f]',
    headerBg: 'bg-[#121212]',
    accent: 'bg-[#3ecf8e] text-[#121212] font-black hover:bg-[#34b27b]',
    accentGradient: 'from-[#3ecf8e] via-[#249361] to-[#0ea5e9]',
    border: 'border-[#2e2e2e]',
    textPrimary: 'text-[#ededed]',
    textMuted: 'text-[#878787]',
    fontHeading: 'font-sans tracking-tight',
  },
  apple: {
    id: 'apple',
    name: 'Apple Glassmorphism',
    badge: 'San Francisco Clean',
    description: 'Ultra-clean frosted glass, subtle drop-shadows and vibrant SF accents',
    bg: 'bg-[#f5f5f7]',
    cardBg: 'bg-white/80 backdrop-blur-md',
    headerBg: 'bg-[#1d1d1f]/90',
    accent: 'bg-[#0071e3] text-white hover:bg-[#0077ed]',
    accentGradient: 'from-[#0071e3] via-[#47a3ff] to-[#a855f7]',
    border: 'border-[#d2d2d7]',
    textPrimary: 'text-[#1d1d1f]',
    textMuted: 'text-[#86868b]',
    fontHeading: 'font-sans font-semibold tracking-tight',
  }
};
