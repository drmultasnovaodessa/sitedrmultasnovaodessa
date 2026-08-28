import { MessageCircle, MapPin, Instagram, ExternalLink, Navigation } from 'lucide-react';
import { BRAND } from '../data/content';

export function ContactSection() {
  return (
    <section id="contato" className="py-24 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <Navigation className="w-4 h-4 text-yellow-400" />
            <span>Canais Oficiais e Localização</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Contato e Atendimento
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-medium">
            Fale diretamente com nossa equipe pelo WhatsApp, acompanhe nosso Instagram oficial ou
            visite nosso escritório em Nova Odessa.
          </p>
        </div>

        {/* 3 Interactive Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: WHATSAPP */}
          <div
            id="card-contato-whatsapp"
            className="rounded-3xl bg-zinc-900 border-2 border-zinc-800 hover:border-yellow-400 transition-all p-7 sm:p-8 flex flex-col justify-between shadow-xl group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <MessageCircle className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 font-mono">
                  Atendimento Imediato
                </span>
                <h3 className="text-xl font-black text-white mt-1">WHATSAPP</h3>
                <p className="text-sm text-zinc-300 font-medium mt-1.5">Falar com nossa equipe</p>
                <p className="text-sm font-bold text-white font-mono mt-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 inline-block">
                  {BRAND.phoneFormatted}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800">
              <a
                id="btn-contato-whatsapp"
                href={BRAND.generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20 transition-all active:scale-95 border-b-2 border-yellow-600"
              >
                <MessageCircle className="w-4 h-4 text-black" />
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: INSTAGRAM */}
          <div
            id="card-contato-instagram"
            className="rounded-3xl bg-zinc-900 border-2 border-zinc-800 hover:border-yellow-400 transition-all p-7 sm:p-8 flex flex-col justify-between shadow-xl group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border-2 border-yellow-500/40 text-yellow-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Instagram className="w-7 h-7 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400 font-mono">
                  Rede Social Oficial
                </span>
                <h3 className="text-xl font-black text-white mt-1">INSTAGRAM</h3>
                <p className="text-sm text-yellow-400 font-bold font-mono mt-1.5 text-base">
                  {BRAND.instagramHandle}
                </p>
                <p className="text-xs text-zinc-400 font-medium mt-2 leading-relaxed">
                  Acompanhe orientações, dicas práticas e novidades sobre legislação de trânsito.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800">
              <a
                id="btn-contato-instagram"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-zinc-950 border-2 border-zinc-700 hover:border-yellow-400 hover:text-yellow-300 transition-all active:scale-95 shadow-md"
              >
                <Instagram className="w-4 h-4 text-yellow-400" />
                <span>Ver no Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>
          </div>

          {/* Card 3: LOCALIZAÇÃO DO ESCRITÓRIO */}
          <div
            id="card-contato-localizacao"
            className="rounded-3xl bg-zinc-900 border-2 border-yellow-400/80 p-7 sm:p-8 flex flex-col justify-between shadow-2xl shadow-black/80 relative overflow-hidden group"
          >
            {/* Ambient Yellow Light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <MapPin className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-yellow-400 font-mono">
                  Sede Oficial
                </span>
                <h3 className="text-xl font-black text-white mt-1">LOCALIZAÇÃO</h3>
                <div className="mt-2 text-zinc-200 text-sm space-y-0.5 font-medium">
                  <p className="text-base font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span>{BRAND.addressStreet}</span>
                  </p>
                  <p className="text-zinc-300 pl-5.5">{BRAND.addressCityState}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-800">
              <a
                id="btn-contato-como-chegar"
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 transition-all active:scale-95 border-b-2 border-yellow-600"
              >
                <Navigation className="w-4 h-4 text-black" />
                <span>Como chegar</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
