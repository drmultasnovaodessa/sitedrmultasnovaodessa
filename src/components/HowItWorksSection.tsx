import { ArrowRight, CheckCircle2, Route } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/content';

interface HowItWorksSectionProps {
  onStartDiagnostic: () => void;
}

export function HowItWorksSection({ onStartDiagnostic }: HowItWorksSectionProps) {
  return (
    <section id="como-funciona" className="py-24 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <Route className="w-4 h-4 text-yellow-400" />
            <span>Processo Transparente & Seguro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Como Funciona o Atendimento
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Um fluxo direto, simples e sem burocracia para analisar sua situação e esclarecer suas
            dúvidas.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.number}
              id={`step-card-${step.number}`}
              className="relative rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-yellow-400 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black text-black bg-yellow-400 px-3 py-1 rounded-xl shadow-md">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-950 border border-yellow-400/40 flex items-center justify-center text-xs font-bold text-yellow-400">
                    {index + 1}/4
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-white mb-2">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">{step.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center gap-2 text-xs font-bold text-yellow-400">
                <CheckCircle2 className="w-4 h-4 text-yellow-400" />
                <span className="uppercase tracking-wider">Etapa {index + 1} de 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick CTA to diagnostic */}
        <div className="mt-14 text-center">
          <a
            href="#diagnostico"
            onClick={onStartDiagnostic}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-xl shadow-yellow-500/25 transition-all transform active:scale-95 border-b-4 border-yellow-600 hover:-translate-y-0.5"
          >
            <span>Iniciar etapa 01: Preencher diagnóstico</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>
        </div>
      </div>
    </section>
  );
}
