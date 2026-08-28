import { MessageCircle } from 'lucide-react';
import { BRAND } from '../data/content';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Falar no WhatsApp
      </span>

      {/* Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href={BRAND.generalWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a DR Multas pelo WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transform hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7 text-slate-950" />
      </a>
    </div>
  );
}
