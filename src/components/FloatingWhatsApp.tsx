import { MessageCircle } from 'lucide-react';
import { BRAND } from '../data/content';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden md:inline-block mr-3 px-3.5 py-1.5 rounded-xl bg-zinc-900/95 text-white text-xs font-bold border border-yellow-400/50 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="text-yellow-400">WhatsApp Dr Multas</span> • Atendimento direto
      </span>

      {/* Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href={BRAND.generalWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp Dr Multas"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transform hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7 text-zinc-950" />
      </a>
    </div>
  );
}
