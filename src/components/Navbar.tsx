import React, { useState } from 'react';
import { Sparkles, Search, MessageCircle, BarChart2, MapPin, Star, Menu, X, Zap, UploadCloud } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';

import logoConfig from '../data/logoConfig.json';

interface NavbarProps {
  onOpenSeoPanel: () => void;
  onOpenQuiz: () => void;
  onOpenCloudinary: () => void;
  onNavigateSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSeoPanel, onOpenQuiz, onOpenCloudinary, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      {/* Top Banner for Google Profile Badge */}
      <div className="bg-[#F3EFE9] text-[#2E2B27] text-xs py-1.5 px-4 border-b border-[#E7E2D8]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#BFA181]/15 text-[#BFA181] px-2 py-0.5 rounded text-[11px] font-medium border border-[#BFA181]/30">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              {GOOGLE_BUSINESS_DATA.rating} en Google
            </span>
            <span className="hidden sm:inline text-stone-600">
              Especialistas en Técnica Balayage & Morenas Iluminadas
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={onOpenCloudinary}
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold transition-colors bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              Cloudinary Media Stream
            </button>
            <a
              href={GOOGLE_BUSINESS_DATA.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#8C7153] hover:text-[#70563B] font-semibold bg-white border border-[#E7E2D8] px-2.5 py-1 rounded shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8C7153]" />
              Google Business
            </a>
            <button
              onClick={onOpenSeoPanel}
              className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-900 font-bold transition-colors bg-amber-50 border border-amber-300 px-2.5 py-1 rounded shadow-xs"
            >
              <BarChart2 className="w-3.5 h-3.5 text-amber-600" />
              Panel SEO
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 text-left group"
        >
          <img 
            src={logoConfig.small_url}
            alt={logoConfig.alt}
            className="w-10 h-10 rounded-full object-cover border border-[#BFA181] group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-semibold tracking-wide text-[#1C1917]">
              JB Balayage Peluqueria boutique
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-[#7C7874] font-medium">
              Atelier de Coloración
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button 
            onClick={() => handleNavClick('galeria')} 
            className="hover:text-[#1C1917] transition-colors relative py-1 hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-[#BFA181]"
          >
            Antes y Después
          </button>
          <button 
            onClick={() => handleNavClick('servicios')} 
            className="hover:text-[#1C1917] transition-colors"
          >
            Servicios
          </button>
          <button 
            onClick={() => handleNavClick('google-business')} 
            className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5"
          >
            Google Reviews
            <span className="bg-[#BFA181]/20 text-[#BFA181] border border-[#BFA181]/40 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              5.0 ★
            </span>
          </button>
          <button 
            onClick={() => handleNavClick('faq')} 
            className="hover:text-[#1C1917] transition-colors"
          >
            Preguntas SEO
          </button>
        </nav>

        {/* Right Call To Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="px-4 py-2 text-xs font-semibold rounded-full border border-[#BFA181] text-[#2E2B27] hover:bg-[#BFA181]/15 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
            Test de Diagnóstico
          </button>

          <a
            href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Me gustaría consultar por un turno para Balayage.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 text-xs font-semibold rounded-full bg-[#BFA181] text-[#FAF7F2] hover:bg-[#A88C6F] transition-all shadow-sm hover:shadow flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-950" />
            Agendar Turno
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-[#1C1917]"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F3EFE9] border-b border-[#E7E2D8] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => handleNavClick('galeria')}
              className="text-left text-stone-700 py-1"
            >
              Galeria Antes y Después
            </button>
            <button
              onClick={() => handleNavClick('servicios')}
              className="text-left text-stone-700 py-1"
            >
              Servicios & Precios
            </button>
            <button
              onClick={() => handleNavClick('google-business')}
              className="text-left text-stone-700 py-1 flex items-center justify-between"
            >
              <span>Reseñas de Google</span>
              <span className="text-xs font-bold bg-[#BFA181]/20 text-[#BFA181] px-2 py-0.5 rounded border border-[#BFA181]/40">5.0 ★</span>
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-left text-stone-700 py-1"
            >
              Preguntas Frecuentes
            </button>
          </nav>

          <div className="pt-4 border-t border-[#E7E2D8] flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuiz(); }}
              className="w-full py-2.5 text-xs font-semibold rounded-full border border-[#BFA181] text-[#2E2B27] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#BFA181]" />
              Realizar Diagnóstico Capilar
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSeoPanel(); }}
              className="w-full py-2.5 text-xs font-semibold rounded-full bg-[#FAF7F2] text-stone-700 border border-stone-300 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Ver Vista Previa Google / SEO
            </button>

            <a
              href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Me gustaría consultar por un turno para Balayage.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-sm font-semibold rounded-full bg-[#BFA181] text-[#FAF7F2] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-950" />
              Consultar Turnos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
