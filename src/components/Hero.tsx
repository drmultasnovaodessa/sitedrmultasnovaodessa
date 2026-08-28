import { ArrowRight, MessageCircle, MapPin, CheckCircle2, FileSearch, ShieldCheck, AlertTriangle, FileText, Scale } from 'lucide-react';
import { BRAND } from '../data/content';
import { LogoOriginal } from './LogoOriginal';

interface HeroProps {
  onStartDiagnostic: () => void;
}

export function Hero({ onStartDiagnostic }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-38 md:pb-26 overflow-hidden bg-zinc-950 text-white"
    >
      {/* Background Ambience & Transit Grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle transit dots/grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, #facc15 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
        {/* Yellow ambient glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-yellow-500/10 rounded-full blur-3xl" />
        
        {/* Top diagonal transit caution bar stripe (subtle) */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Location & Specialization Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-900 border-2 border-yellow-400/60 text-yellow-400 text-xs font-black uppercase tracking-wider shadow-lg shadow-yellow-500/10">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
              <MapPin className="w-4 h-4 text-yellow-400" />
              <span>Nova Odessa – SP</span>
              <span className="text-zinc-600">|</span>
              <span className="text-white font-bold">Defesa Especializada de Trânsito</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Recursos e defesa para quem{' '}
              <span className="inline-block bg-yellow-400 text-black px-2 py-0.5 rounded-md transform -rotate-1 shadow-md">
                enfrenta problemas no trânsito.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-200 font-normal leading-relaxed max-w-2xl">
              Atuação especializada em multas, Lei Seca, suspensão e cassação da CNH, com análise
              individual de cada caso.
            </p>

            {/* Central Brand Phrase Card with Yellow Accent & Transit Pillars */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border-2 border-yellow-400/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-yellow-400" />
              <p className="text-sm sm:text-base font-bold text-white pl-2">
                "{BRAND.centralQuote}"
              </p>
              
              {/* Transit Strategy Flow: Análise -> Estratégia -> Defesa */}
              <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-yellow-400 pl-2">
                <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-yellow-400/30">
                  <FileSearch className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white uppercase tracking-wider text-[11px]">1. Análise Técnica</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-yellow-400/30">
                  <Scale className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white uppercase tracking-wider text-[11px]">2. Estratégia Legal</span>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-md border border-yellow-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white uppercase tracking-wider text-[11px]">3. Defesa do Condutor</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons - High contrast Yellow & Black */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
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
                className="inline-flex items-center justify-center gap-3 px-6 py-4.5 rounded-xl text-base font-bold text-white bg-zinc-900 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-300 transition-all transform active:scale-95 shadow-md"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Falar pelo WhatsApp</span>
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

          {/* Right Column: Visual Interactive Transit Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-zinc-900 border-2 border-yellow-400/80 p-6 sm:p-8 shadow-2xl shadow-black/80">
              {/* Traffic Caution Tag in Corner */}
              <div className="absolute -top-3 right-6 bg-yellow-400 text-black text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-md shadow-md flex items-center gap-1.5 border border-yellow-500">
                <AlertTriangle className="w-3.5 h-3.5 text-black" />
                <span>Atendimento Ativo</span>
              </div>

              {/* Card top branding */}
              <div className="flex items-center gap-4 border-b border-zinc-800 pb-5 mb-5 mt-1">
                <LogoOriginal size={58} showGlow />
                <div>
                  <h3 className="text-lg font-black text-white leading-snug">
                    Está com problemas na sua CNH ou multas?
                  </h3>
                  <p className="text-xs text-yellow-400 font-semibold mt-0.5">
                    Avaliação individual e estratégica para seu caso.
                  </p>
                </div>
              </div>

              {/* Transit Motifs List */}
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs sm:text-sm hover:border-yellow-400/60 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-zinc-200 font-medium">Multas gravíssimas & pontos</span>
                  </div>
                  <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-xs">Avaliação técnica</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs sm:text-sm hover:border-yellow-400/60 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-zinc-200 font-medium">Processos de Lei Seca</span>
                  </div>
                  <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-xs">Defesa processual</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs sm:text-sm hover:border-yellow-400/60 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-zinc-200 font-medium">Suspensão ou Cassação de CNH</span>
                  </div>
                  <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded text-xs">Análise de prazos</span>
                </div>
              </div>

              {/* Quick CTA to Diagnostic */}
              <div className="pt-5 mt-2 border-t border-zinc-800">
                <a
                  href="#diagnostico"
                  onClick={onStartDiagnostic}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-500/20 border-b-2 border-yellow-600 hover:-translate-y-0.5"
                >
                  <FileSearch className="w-4 h-4 text-black" />
                  <span>Iniciar Diagnóstico Simples</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </a>
                <p className="text-[11px] text-zinc-400 text-center mt-2.5 font-medium">
                  Leva menos de 1 minuto • Não exige documentos agora
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
