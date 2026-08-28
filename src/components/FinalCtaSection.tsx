import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/content';

interface FinalCtaSectionProps {
  onStartDiagnostic: () => void;
}

export function FinalCtaSection({ onStartDiagnostic }: FinalCtaSectionProps) {
  return (
    <section className="py-20 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-zinc-900 border-2 border-yellow-400 p-8 sm:p-14 text-center shadow-2xl shadow-yellow-500/10 overflow-hidden">
          {/* Ambient Yellow Glow */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Yellow Road Striping Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Seu problema no trânsito merece uma análise individual.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-medium">
              Explique brevemente sua situação e fale com nossa equipe pelo WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4">
              <a
                id="final-cta-diagnostic-btn"
                href="#diagnostico"
                onClick={onStartDiagnostic}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 rounded-xl text-base font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 transition-all transform active:scale-95 border-b-4 border-yellow-600 hover:-translate-y-0.5"
              >
                <span>Fazer diagnóstico inicial</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </a>

              <a
                id="final-cta-whatsapp-btn"
                href={BRAND.generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4.5 rounded-xl text-base font-bold text-white bg-zinc-950 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-300 transition-all transform active:scale-95 shadow-md"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
