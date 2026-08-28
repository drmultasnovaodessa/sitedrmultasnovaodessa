import { Shield, MapPin, CheckCircle } from 'lucide-react';
import { BRAND } from '../data/content';
import { LogoOriginal } from './LogoOriginal';

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual / Institutional Badge with Original Logo */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-zinc-900 border-2 border-yellow-400/80 p-8 relative overflow-hidden shadow-2xl shadow-black/80">
              <div className="absolute top-0 right-0 w-56 h-56 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Authentic Original Logo */}
              <div className="mb-6 flex items-center justify-start">
                <LogoOriginal size={92} showGlow />
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{BRAND.name}</h3>
              <p className="text-sm font-bold text-yellow-400 flex items-center gap-1.5 mb-6">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Atuação em Nova Odessa – SP e região</span>
              </p>

              <div className="space-y-3 border-t border-zinc-800 pt-6 text-sm text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="font-medium text-white">Análise minuciosa de autos de infração</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="font-medium text-white">Foco em procedimentos administrativos</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="font-medium text-white">Atendimento transparente e acessível</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider shadow-md">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span>Sobre a Empresa</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Especialistas em Recursos e Defesa no Trânsito
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              A <strong className="text-white">DR Multas Nova Odessa</strong> foi estruturada para prestar atendimento
              especializado a motoristas que necessitam de orientação técnica frente a notificações,
              multas e procedimentos de suspensão ou cassação da CNH.
            </p>

            <p className="text-base text-zinc-400 leading-relaxed">
              Acreditamos que todo condutor tem o direito constitucional à ampla defesa e ao devido
              processo legal. Nosso compromisso é avaliar a conformidade técnica de cada ato
              administrativo, garantindo que você tenha um recurso fundamentado, transparente e ético.
            </p>

            <div className="pt-2">
              <div className="p-4.5 rounded-xl bg-zinc-900 border-2 border-zinc-800 text-sm text-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-yellow-400 font-black">Endereço:</span> {BRAND.address}
                </div>
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider transition-all flex-shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5 text-black" />
                  <span>Como chegar</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
