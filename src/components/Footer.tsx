import { MessageCircle, MapPin, ShieldAlert, Instagram, Navigation, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { BRAND } from '../data/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-zinc-950 border-t-2 border-yellow-500/40 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand, Address & Instagram */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <div className="space-y-1.5 pt-2 text-sm text-zinc-300 font-medium">
              <p className="font-bold text-white">{BRAND.name}</p>
              <div className="flex items-start gap-2 text-xs text-zinc-300">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{BRAND.address}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Instagram className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span>
                  Instagram:{' '}
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 font-bold hover:underline"
                  >
                    {BRAND.instagramHandle}
                  </a>
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-normal pt-1">
              Atuação especializada em recursos e processos de trânsito, com atendimento
              individualizado e foco na ampla defesa e legalidade.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-yellow-400">Navegação</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="#servicos" className="hover:text-yellow-400 transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-yellow-400 transition-colors">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-yellow-400 transition-colors">
                  Como Funciona
                </a>
              </li>
              <li>
                <a href="#diagnostico" className="hover:text-yellow-400 transition-colors">
                  Diagnóstico Inicial
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-yellow-400 transition-colors">
                  Sobre a Empresa
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-yellow-400 transition-colors">
                  Contato e Localização
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-yellow-400 transition-colors">
                  Perguntas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Actions / Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-yellow-400">Canais Rápidos</h4>
            <div className="space-y-2.5">
              <a
                href={BRAND.generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-white text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {BRAND.phoneFormatted}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-white text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-yellow-400" />
                  <span>Instagram: {BRAND.instagramHandle}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={BRAND.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-white text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-yellow-400" />
                  <span>Como chegar: {BRAND.addressStreet}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="p-4 rounded-xl bg-zinc-900 border-2 border-zinc-800 text-xs text-zinc-300 flex items-start gap-3 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Observação importante:</strong> {BRAND.disclaimer}
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-medium">
            <p>© {currentYear} DR MULTAS NOVA ODESSA. Todos os direitos reservados.</p>
            <p className="text-yellow-400/80 font-bold">{BRAND.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
