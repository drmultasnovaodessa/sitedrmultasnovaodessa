import { useState } from 'react';
import { Shield, MapPin, CheckCircle, Award, UserCheck, Scale } from 'lucide-react';
import { BRAND } from '../data/content';
import { LogoOriginal } from './LogoOriginal';
import aboutCutoutAsset2 from '../assets/images/corpo-2-cutout.png';

const ABOUT_PHOTO_CANDIDATES = [
  aboutCutoutAsset2,
  '/corpo-2-cutout.png',
  '/corpo completo 2.png',
  '/corpo-completo-2.png',
  '/corpo%20completo%202.png',
];

export function AboutSection() {
  const [candidateIndex, setCandidateIndex] = useState(0);

  const handleImageError = () => {
    if (candidateIndex < ABOUT_PHOTO_CANDIDATES.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setCandidateIndex(-1);
    }
  };

  return (
    <section id="sobre" className="py-20 md:py-24 bg-zinc-950 relative border-t border-zinc-800 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Seamless FOTO 2 (corpo completo 2.png) Integration with Golden Rim Light */}
          <div className="lg:col-span-5 flex flex-col items-center justify-end relative">
            {/* Ambient Aura behind character */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-gradient-to-tr from-yellow-500/20 via-yellow-400/10 to-transparent blur-3xl pointer-events-none" />

            {/* Original Brand Logo & Location badge floating smoothly at the top */}
            <div className="z-20 mb-[-10px] w-full max-w-[340px] flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-yellow-400/50 backdrop-blur-md shadow-xl">
              <LogoOriginal size={38} showGlow />
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-950 border border-yellow-400/40 text-yellow-400 text-[11px] font-black tracking-wider uppercase shadow-sm">
                  <Award className="w-3 h-3 text-yellow-400" />
                  <span>Nova Odessa • SP</span>
                </div>
              </div>
            </div>

            {/* Seamless Character Stage for FOTO 2 */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] flex items-end justify-center">
              {candidateIndex >= 0 ? (
                <div className="relative w-full flex items-end justify-center">
                  {/* Subtle silhouette rim glow */}
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-35 blur-md">
                    <img
                      src={ABOUT_PHOTO_CANDIDATES[candidateIndex]}
                      alt=""
                      aria-hidden="true"
                      className="max-h-[440px] sm:max-h-[520px] w-auto object-contain brightness-125 filter"
                    />
                  </div>

                  <img
                    src={ABOUT_PHOTO_CANDIDATES[candidateIndex]}
                    alt="Especialista em Recursos e Defesa de Trânsito - Dr Multas"
                    className="relative z-10 max-h-[440px] sm:max-h-[520px] w-auto object-contain select-none brightness-[1.08] contrast-[1.08] drop-shadow-[0_0_22px_rgba(250,204,21,0.22)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] transition-all duration-300"
                    onError={handleImageError}
                    loading="lazy"
                  />

                  {/* Soft bottom fade blending seamlessly into the dark section */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-15 pointer-events-none" />
                </div>
              ) : (
                <div className="w-full py-14 flex flex-col items-center justify-center text-center bg-zinc-900/40 rounded-2xl border border-zinc-800">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mb-3">
                    <Scale className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h3 className="text-sm font-black text-white">DR Multas Nova Odessa</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-[200px]">
                    Atuação técnica e ética em processos de trânsito
                  </p>
                </div>
              )}

              {/* Bottom Floating Info Pill */}
              <div className="absolute bottom-2 z-20 inset-x-3 sm:inset-x-4 p-3 rounded-2xl bg-zinc-900/90 border border-yellow-400/40 backdrop-blur-md shadow-2xl flex items-center justify-between text-left">
                <div>
                  <p className="text-xs font-black text-white">Defesa Técnica do Condutor</p>
                  <p className="text-[10px] text-yellow-400 font-semibold">Atendimento Ético e Individualizado</p>
                </div>
                <UserCheck className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              </div>
            </div>

            {/* Key Service Badges under photo */}
            <div className="w-full max-w-[340px] mt-3 space-y-1.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2 bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-[11px] font-medium">Análise minuciosa de autos de infração</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-[11px] font-medium">Foco em procedimentos administrativos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider shadow-md">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span>Sobre a Empresa</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Especialistas em Recursos e Defesa no Trânsito
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              A <strong className="text-white">DR Multas Nova Odessa</strong> foi estruturada para prestar atendimento
              especializado e humanizado a motoristas que necessitam de orientação técnica frente a notificações,
              multas e procedimentos de suspensão ou cassação da CNH.
            </p>

            <p className="text-base text-zinc-400 leading-relaxed">
              Acreditamos que todo condutor tem o direito constitucional à ampla defesa e ao devido
              processo legal. Nosso compromisso é avaliar a conformidade técnica de cada ato
              administrativo, garantindo que você tenha um recurso fundamentado, transparente e ético,
              sem promessas milagrosas e com foco exclusivo na legalidade.
            </p>

            {/* Strategic Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center flex-shrink-0 font-bold">
                  <Scale className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fundamentação Técnica</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Recursos baseados estritamente na legislação de trânsito e resoluções vigentes do CONTRAN.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center flex-shrink-0 font-bold">
                  <UserCheck className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Atendimento Próximo</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Você fala diretamente com quem entende do assunto, com clareza em todas as etapas.
                  </p>
                </div>
              </div>
            </div>

            {/* Address and Directions Box */}
            <div className="pt-2">
              <div className="p-4.5 rounded-xl bg-zinc-900 border-2 border-zinc-800 text-sm text-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-yellow-400 font-black">Endereço:</span> {BRAND.address}
                </div>
                <a
                  href={BRAND.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider transition-all flex-shrink-0 shadow-md active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-black" />
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
