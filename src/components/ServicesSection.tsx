import {
  FileText,
  ShieldAlert,
  CreditCard,
  ShieldX,
  GraduationCap,
  Scale,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceId } from '../types';

interface ServicesSectionProps {
  onSelectServiceForDiagnostic: (serviceId: ServiceId) => void;
}

export function ServicesSection({ onSelectServiceForDiagnostic }: ServicesSectionProps) {
  const getIcon = (iconName: string, serviceId: string) => {
    const iconProps = { className: 'w-6 h-6 stroke-[2.2]' };
    
    // Explicit transit-specific icons based on service type
    if (serviceId === 'recurso-multas' || iconName === 'FileCheck') {
      return <FileText {...iconProps} />;
    }
    if (serviceId === 'lei-seca' || iconName === 'Wine') {
      return <ShieldAlert {...iconProps} />;
    }
    if (serviceId === 'suspensao-cnh' || iconName === 'AlertTriangle') {
      return <CreditCard {...iconProps} />; // CNH / Carteira de motorista
    }
    if (serviceId === 'cassacao-cnh' || iconName === 'ShieldAlert') {
      return <ShieldX {...iconProps} />; // Cassação / Defesa técnica rigorosa
    }
    if (serviceId === 'cursos-especializados' || iconName === 'GraduationCap') {
      return <GraduationCap {...iconProps} />; // Cursos e reciclagem
    }
    return <Scale {...iconProps} />; // Consultoria e estratégia
  };

  return (
    <section id="servicos" className="py-24 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border-2 border-yellow-400 text-yellow-400 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>Nossos Serviços Especializados</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Atuação Especializada em Trânsito
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Conheça as áreas de atuação da DR Multas Nova Odessa. Análise técnica, orientação
            responsável e suporte focado em cada tipo de procedimento.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative rounded-2xl bg-zinc-900 border-2 border-zinc-800 hover:border-yellow-400 p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1.5"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-xl bg-yellow-400 text-black group-hover:bg-yellow-300 transition-colors duration-300 shadow-md">
                    {getIcon(service.iconName, service.id)}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-yellow-400 bg-zinc-950 border border-yellow-400/40 px-2.5 py-1 rounded-md">
                    {service.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-medium">
                  {service.shortDescription}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => onSelectServiceForDiagnostic(service.id)}
                  className="w-full inline-flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-yellow-400 group-hover:bg-yellow-300 transition-all shadow-sm"
                >
                  <span>Analisar meu caso de {service.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
