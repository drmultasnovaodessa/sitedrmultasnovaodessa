import { useState } from 'react';
import {
  ArrowRight,
  MessageCircle,
  MapPin,
  CheckCircle2,
  FileSearch,
  ShieldCheck,
  Scale,
  Award,
  Clock,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { BRAND } from '../data/content';
import heroCutoutAsset1 from '../assets/images/corpo-1-cutout.png';

interface HeroProps {
  onStartDiagnostic: () => void;
}

const HERO_PHOTO_CANDIDATES = [
  heroCutoutAsset1,
  '/corpo-1-cutout.png',
  '/corpo completo.png',
  '/corpo-completo.png',
  '/corpo%20completo.png',
];

export function Hero({ onStartDiagnostic }: HeroProps) {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const handleImageError = () => {
    if (candidateIndex < HERO_PHOTO_CANDIDATES.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setCandidateIndex(-1);
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-zinc-950 text-white"
    >
      {/* Background Ambience & Transit Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle transit grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, #facc15 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Golden ambient lighting strategically placed behind the specialist */}
        <div className="absolute top-1/4 right-0 w-[650px] h-[650px] bg-yellow-500/15 rounded-full blur-3xl" />
        <div className="absolute top-10 left-10 w-[450px] h-[300px] bg-yellow-500/5 rounded-full blur-3xl" />

        {/* Top gold accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Main Content / Headline / CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left z-10">
            {/* Location & Specialization Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900/90 border-2 border-yellow-400/60 text-yellow-400 text-xs font-black uppercase tracking-wider shadow-lg shadow-yellow-500/10 backdrop-blur-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Nova Odessa – SP</span>
              <span className="text-zinc-600">|</span>
              <span className="text-white font-bold">Defesa Especializada de Trânsito</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18]">
              Recursos e defesa para quem{' '}
              <span className="relative inline-block mt-1 sm:mt-1.5">
                <span className="inline-block bg-yellow-400 text-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[3px] shadow-md font-black">
                  enfrenta problemas no trânsito.
                </span>
                {/* Subtle minimalist road lane marking under the yellow bar */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-1 right-1 h-[2px] opacity-40 flex items-center justify-between gap-1 pointer-events-none"
                >
                  <span className="h-full w-4 bg-yellow-400 rounded-full" />
                  <span className="h-full w-4 bg-yellow-400 rounded-full" />
                  <span className="h-full w-4 bg-yellow-400 rounded-full" />
                  <span className="h-full w-4 bg-yellow-400 rounded-full" />
                  <span className="h-full flex-1 bg-yellow-400/40 rounded-full" />
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-zinc-200 font-normal leading-relaxed max-w-2xl">
              Atuação especializada em multas, Lei Seca, suspensão e cassação da CNH, com análise
              técnica e individual de cada caso.
            </p>

            {/* Central Brand Phrase Card with Yellow Accent & Transit Pillars */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border-2 border-yellow-400/40 shadow-xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-yellow-400" />
              <p className="text-sm sm:text-base font-bold text-white pl-2">
                "{BRAND.centralQuote}"
              </p>

              {/* Transit Strategy Flow: Análise -> Estratégia -> Defesa */}
              <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-yellow-400 pl-2">
                <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-yellow-400/30">
                  <FileSearch className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white uppercase tracking-wider text-[11px]">
                    1. Análise Técnica
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-yellow-400/30">
                  <Scale className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white uppercase tracking-wider text-[11px]">
                    2. Estratégia Legal
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-yellow-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white uppercase tracking-wider text-[11px]">
                    3. Defesa do Condutor
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <a
                id="hero-primary-cta"
                href="#diagnostico"
                onClick={(_e) => {
                  onStartDiagnostic();
                }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-xl text-base font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all transform active:scale-95 border-b-4 border-yellow-600 hover:-translate-y-0.5"
              >
                <FileSearch className="w-5 h-5 text-black" />
                <span>Fazer diagnóstico inicial</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </a>

              <a
                id="hero-secondary-cta"
                href={BRAND.generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4.5 rounded-xl text-base font-bold text-white bg-zinc-900 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-300 transition-all transform active:scale-95 shadow-md group"
                aria-label="WhatsApp Dr Multas - Fale com um especialista"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform flex-shrink-0" />
                <div className="text-left leading-tight">
                  <span className="block text-sm sm:text-base font-black text-white group-hover:text-yellow-300">WhatsApp Dr Multas</span>
                  <span className="block text-[11px] font-medium text-zinc-400">Fale com um especialista</span>
                </div>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="font-semibold text-white">Análise individual do caso</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="font-semibold text-white">Atendimento ético e técnico</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="font-semibold text-white">Sem falsas promessas</span>
              </div>
            </div>
          </div>

          {/* Right Column: FOTO 1 (corpo completo.png) Hero Integration with Golden Rim Light */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-end">
            {/* Ambient Golden Halo behind the silhouette (soft light separation) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-tr from-yellow-500/25 via-yellow-400/15 to-transparent blur-3xl pointer-events-none" />

            {/* Top Floating Authority Chip */}
            <div className="z-20 mb-[-12px] inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-yellow-400/60 text-yellow-400 text-xs font-black uppercase tracking-wider shadow-xl backdrop-blur-md">
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>Especialista em Trânsito</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Seamless Character Stage for FOTO 1 (No border / No card box / Full integration) */}
            <div className="relative w-full max-w-[360px] sm:max-w-[440px] flex items-end justify-center">
              {candidateIndex >= 0 ? (
                <div className="relative w-full flex items-end justify-center">
                  {/* Subtle rim glow aura directly hugging the silhouette */}
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-40 blur-md">
                    <img
                      src={HERO_PHOTO_CANDIDATES[candidateIndex]}
                      alt=""
                      aria-hidden="true"
                      className="max-h-[480px] sm:max-h-[580px] lg:max-h-[620px] w-auto object-contain brightness-125 filter"
                    />
                  </div>

                  <img
                    src={HERO_PHOTO_CANDIDATES[candidateIndex]}
                    alt="Especialista em Recursos e Defesa de Trânsito - Dr Multas Nova Odessa"
                    className="relative z-10 max-h-[480px] sm:max-h-[580px] lg:max-h-[620px] w-auto object-contain select-none brightness-[1.08] contrast-[1.08] drop-shadow-[0_0_25px_rgba(250,204,21,0.22)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] transition-all duration-300"
                    onError={handleImageError}
                    loading="eager"
                  />

                  {/* Soft organic bottom fade integrating directly into the dark section background */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-15 pointer-events-none" />
                </div>
              ) : (
                <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-zinc-900/40 rounded-2xl border border-zinc-800">
                  <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mb-3">
                    <UserCheck className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-sm font-black text-white">Especialista DR Multas</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-[220px]">
                    Atendimento especializado e personalizado em Nova Odessa – SP
                  </p>
                </div>
              )}

              {/* Floating Bottom Identity Tag */}
              <div className="absolute bottom-2 z-20 inset-x-4 sm:inset-x-6 p-3 rounded-2xl bg-zinc-900/90 border border-yellow-400/50 backdrop-blur-md shadow-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center flex-shrink-0 font-black text-xs">
                    DR
                  </div>
                  <div>
                    <div className="text-xs font-black text-white flex items-center gap-1.5">
                      <span>Dr. Multas Nova Odessa</span>
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <p className="text-[10px] text-yellow-400 font-semibold">
                      Atendimento Direto & Humanizado
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">
                  <Clock className="w-3 h-3 text-yellow-400" />
                  <span>Ativo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
