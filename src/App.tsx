import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PrinciplesSection } from './components/PrinciplesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DiagnosticSection } from './components/DiagnosticSection';
import { AboutSection } from './components/AboutSection';
import { BillboardPoster } from './components/BillboardPoster';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RoadDivider } from './components/RoadDivider';
import { DiagnosticFormData, ServiceId } from './types';

export default function App() {
  // In-memory state only - STRICTLY NO localStorage, sessionStorage, cookies, or backend persistence
  const [formData, setFormData] = useState<DiagnosticFormData>({
    nome: '',
    whatsapp: '',
    servico: '',
    descricao: '',
  });

  const scrollToDiagnostic = () => {
    const diagnosticEl = document.getElementById('diagnostico');
    if (diagnosticEl) {
      diagnosticEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForDiagnostic = (serviceId: ServiceId) => {
    setFormData((prev) => ({ ...prev, servico: serviceId }));
    scrollToDiagnostic();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-yellow-400 selection:text-black antialiased">
      {/* Top Header */}
      <Header onOpenDiagnostic={scrollToDiagnostic} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onStartDiagnostic={scrollToDiagnostic} />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 2. Services Section */}
        <ServicesSection onSelectServiceForDiagnostic={handleSelectServiceForDiagnostic} />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 3. Principles & Differentials */}
        <PrinciplesSection />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 4. How It Works (Como Funciona) */}
        <HowItWorksSection onStartDiagnostic={scrollToDiagnostic} />

        {/* Transit Road Divider */}
        <RoadDivider variant="stripes" />

        {/* 5. Interactive Diagnostic Section */}
        <DiagnosticSection formData={formData} setFormData={setFormData} />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 6. Institutional / About Section */}
        <AboutSection />

        {/* 7. Official Billboard Poster / Painel Institucional */}
        <BillboardPoster />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 8. Official Contact & Location Section */}
        <ContactSection />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 9. FAQ Section */}
        <FaqSection />

        {/* Transit Road Divider */}
        <RoadDivider variant="dashed" />

        {/* 10. Final Conversion CTA */}
        <FinalCtaSection onStartDiagnostic={scrollToDiagnostic} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />
    </div>
  );
}
