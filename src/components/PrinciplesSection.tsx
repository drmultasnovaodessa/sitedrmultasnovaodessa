import { BookOpen, Scale, ShieldCheck, UserCheck, Shield } from 'lucide-react';
import { PRINCIPLES } from '../data/content';

export function PrinciplesSection() {
  const getIcon = (iconName: string) => {
    const iconProps = { className: 'w-6 h-6 stroke-[2.2]' };
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen {...iconProps} />;
      case 'Scale':
        return <Scale {...iconProps} />;
      case 'Cpu':
        return <ShieldCheck {...iconProps} />;
      case 'UserCheck':
      default:
        return <UserCheck {...iconProps} />;
    }
  };

  return (
    <section id="diferenciais" className="py-24 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span>Nossos Princípios & Defesa</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Compromisso com a Qualidade Técnica
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Atuamos pautados em diretrizes sólidas para oferecer a você a melhor orientação possível
            em processos e recursos de trânsito.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={principle.title}
              id={`principle-card-${index + 1}`}
              className="rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-yellow-400 p-6 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1"
            >
              <div>
                <div className="w-13 h-13 rounded-xl bg-yellow-400 text-black flex items-center justify-center mb-5 shadow-md">
                  {getIcon(principle.iconName)}
                </div>
                <h3 className="text-lg font-black text-white mb-2">{principle.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-medium">{principle.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono font-bold text-yellow-400 uppercase">
                <span>Pilar 0{index + 1}</span>
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
