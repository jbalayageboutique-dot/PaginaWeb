import React from 'react';
import { Star, MapPin, ExternalLink, Heart } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';

import logoConfig from '../data/logoConfig.json';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F3EFE9] text-[#2E2B27] pt-16 pb-12 border-t border-[#E7E2D8] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Google Rating */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src={logoConfig.small_url}
                alt={logoConfig.alt}
                className="w-9 h-9 rounded-full object-cover border border-[#E7E2D8]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <span className="font-serif text-xl font-semibold text-[#1C1917]">
                JB Balayage Peluqueria boutique
              </span>
            </div>

            <p className="text-stone-600 text-xs leading-relaxed">
              Atelier especializado en técnica de coloración Balayage, Morenas Iluminadas y correcciones de color sin daño.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="bg-[#BFA181]/20 text-[#8C7153] px-2.5 py-1 rounded border border-[#BFA181]/30 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {GOOGLE_BUSINESS_DATA.rating} / 5.0
              </span>
              <span className="text-stone-500 text-[11px]">
                Google Verified Profile
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-stone-600">
              <li><a href="#hero" className="hover:text-[#BFA181] transition-colors">Inicio</a></li>
              <li><a href="#galeria" className="hover:text-[#BFA181] transition-colors">Antes y Después</a></li>
              <li><a href="#servicios" className="hover:text-[#BFA181] transition-colors">Servicios & Precios</a></li>
              <li><a href="#google-business" className="hover:text-[#BFA181] transition-colors">Reseñas de Google</a></li>
              <li><a href="#faq" className="hover:text-[#BFA181] transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Col 3: Google Profile & Location */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
              Google Business Profile
            </h4>
            <div className="space-y-2 text-stone-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#BFA181] shrink-0 mt-0.5" />
                <span>{GOOGLE_BUSINESS_DATA.address}, {GOOGLE_BUSINESS_DATA.city}</span>
              </p>
              <p>
                WhatsApp: {' '}
                <a
                  href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Quisiera realizar una consulta sobre turnos de Balayage.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 font-bold hover:underline"
                >
                  {GOOGLE_BUSINESS_DATA.whatsappFormatted}
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={GOOGLE_BUSINESS_DATA.googleProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#BFA181] hover:underline font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ver Ficha Oficial de Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Horarios & Atención */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
              Atención en Estudio
            </h4>
            <div className="space-y-1.5 text-stone-600">
              {GOOGLE_BUSINESS_DATA.openingHours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-[#E7E2D8] pb-1">
                  <span>{h.days}:</span>
                  <span className="font-semibold text-[#1C1917]">{h.hours}</span>
                </div>
              ))}
              <p className="text-[11px] text-stone-500 pt-2 italic">
                * Reserva de turnos exclusiva con anticipación vía WhatsApp.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & SEO Tags */}
        <div className="pt-8 border-t border-[#E7E2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} JB Balayage Peluqueria boutique. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Optimizado para posicionamiento en Google por</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span className="text-stone-700 font-medium">Estudio Balayage</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
