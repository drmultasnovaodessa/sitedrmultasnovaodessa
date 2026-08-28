import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, MessageCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { Logo } from './Logo';
import { BRAND } from '../data/content';

interface HeaderProps {
  onOpenDiagnostic?: () => void;
}

export function Header({ onOpenDiagnostic }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
    { label: 'Dúvidas (FAQ)', href: '#faq' },
  ];

  const handleDiagnosticClick = (_e: MouseEvent<HTMLElement>) => {
    if (onOpenDiagnostic) {
      onOpenDiagnostic();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b-2 border-yellow-500/40 shadow-xl shadow-black/50 py-3'
          : 'bg-zinc-950/80 backdrop-blur-sm py-4 border-b border-yellow-500/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="header-logo-link"
            href="#"
            className="group focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-xl"
            aria-label="DR Multas Nova Odessa - Página Inicial"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav
            id="desktop-navigation"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-zinc-300"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-yellow-400 transition-colors duration-200 py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              id="header-whatsapp-btn"
              href={BRAND.generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 border border-zinc-700 hover:border-yellow-400 hover:text-yellow-300 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>(19) 97168-5849</span>
            </a>

            <a
              id="header-diagnostic-btn"
              href="#diagnostico"
              onClick={handleDiagnosticClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-md shadow-yellow-500/20 hover:shadow-yellow-500/40 transition-all active:scale-95 border-b-2 border-yellow-600"
            >
              <ShieldAlert className="w-4 h-4 text-black" />
              <span>Fazer Diagnóstico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#diagnostico"
              onClick={handleDiagnosticClick}
              className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300"
            >
              Diagnóstico
            </a>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-zinc-950/98 border-b-2 border-yellow-500 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-2xl"
        >
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-zinc-200 hover:text-yellow-400 hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
              <a
                id="mobile-diagnostic-link"
                href="#diagnostico"
                onClick={handleDiagnosticClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg shadow-yellow-500/20"
              >
                <ShieldAlert className="w-4 h-4 text-black" />
                <span>Fazer Diagnóstico Inicial</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="mobile-whatsapp-link"
                href={BRAND.generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-zinc-900 border border-zinc-700 hover:border-yellow-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Falar pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
