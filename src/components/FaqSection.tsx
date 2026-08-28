import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/content';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <HelpCircle className="w-4 h-4 text-yellow-400" />
            <span>Perguntas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Dúvidas Comuns
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Esclareça os principais pontos sobre os recursos, processos e nosso modelo de
            atendimento.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                id={`faq-item-${index + 1}`}
                className={`rounded-2xl bg-zinc-900 border-2 transition-all overflow-hidden ${
                  isOpen ? 'border-yellow-400 shadow-lg shadow-yellow-500/5' : 'border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-black ${isOpen ? 'text-yellow-400' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-lg transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-black bg-yellow-400' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-300 leading-relaxed border-t border-zinc-800/80 font-normal animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
