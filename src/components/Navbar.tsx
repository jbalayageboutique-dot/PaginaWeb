import React, { useState } from 'react';
import { Sparkles, Search, MessageCircle, BarChart2, MapPin, Star, Menu, X, Zap, UploadCloud } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';

import logoConfig from '../data/logoConfig.json';
import { getCloudinaryUrl } from '../lib/cloudinary';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo (Centered on desktop, left on mobile) */}
        <div className="flex-1 md:flex md:justify-center">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#BFA181] overflow-hidden shrink-0 aspect-square group hover:scale-105 transition-transform shadow-md flex items-center justify-center p-0 md:mx-auto"
          >
            <img 
              src={getCloudinaryUrl(logoConfig.secure_url, { width: 200, height: 200, crop: 'fill', gravity: 'center', quality: 'best', format: 'auto' })}
              alt={logoConfig.alt}
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </button>
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

      {/* Full-width Horizontal Cafecito Bar for Desktop */}
      <div className="hidden md:block bg-[#BFA181] border-y border-[#A88C6F]/30 w-full">
        <div className="max-w-7xl mx-auto flex items-stretch divide-x divide-white/20 text-white">
          <button 
            onClick={() => handleNavClick('galeria')} 
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Antes y Después
          </button>
          <button 
            onClick={() => handleNavClick('mi-espacio')} 
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Nuestro Espacio
          </button>
          <button 
            onClick={() => handleNavClick('servicios')} 
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Servicios
          </button>
          <button 
            onClick={() => handleNavClick('especialista-olaplex')} 
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Especialista en Olaplex
          </button>
          <button 
            onClick={() => handleNavClick('google-business')} 
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
          >
            Google Reviews
            <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              5.0 ★
            </span>
          </button>
          <button 
            onClick={() => handleNavClick('faq')} 
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Preguntas SEO
          </button>
          <button
            onClick={onOpenQuiz}
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Test de Diagnóstico
          </button>
          <a
            href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Me gustaría consultar por un turno para Balayage.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 text-center hover:bg-[#A88C6F] transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-white fill-white/20" />
            Agendar Turno
          </a>
        </div>
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
              onClick={() => handleNavClick('mi-espacio')}
              className="text-left text-stone-700 py-1"
            >
              Nuestro Espacio
            </button>
            <button
              onClick={() => handleNavClick('servicios')}
              className="text-left text-stone-700 py-1"
            >
              Servicios & Precios
            </button>
            <button
              onClick={() => handleNavClick('especialista-olaplex')}
              className="text-left text-stone-700 py-1"
            >
              Especialista en Olaplex
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
