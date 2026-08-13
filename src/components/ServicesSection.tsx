import React from 'react';
import { Check, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { SERVICES_MENU, GOOGLE_BUSINESS_DATA } from '../data/balayageData';

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
            <span>Servicios de Alta Coloración Capilar</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917]">
            Nuestras Técnicas Especializadas
          </h2>

          <p className="text-stone-600 text-base leading-relaxed">
            Cada servicio incluye diagnóstico personalizado, protector de la fibra capilar, matizado con Gloss y acabado profesional con ondas Balayage.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {SERVICES_MENU.map((srv) => (
            <div 
              key={srv.id} 
              className={`bg-white rounded-2xl p-6 sm:p-8 border ${
                srv.popularBadge ? 'border-[#BFA181] ring-1 ring-[#BFA181]/30 shadow-lg' : 'border-[#E7E2D8]'
              } flex flex-col justify-between relative overflow-hidden shadow-sm`}
            >
              {srv.popularBadge && (
                <span className="absolute top-0 right-0 bg-[#BFA181] text-[#FAF7F2] text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                  ★ Más Solicitado
                </span>
              )}

              {srv.imageUrl && (
                <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden h-52 relative border-b border-[#E7E2D8]">
                  <img 
                    src={srv.imageUrl} 
                    alt={srv.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-60" />
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#BFA181] uppercase tracking-widest">
                    {srv.seoTag}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
                    {srv.title}
                  </h3>
                  <p className="text-[#8C7153] text-xs font-medium">
                    {srv.shortSubtitle}
                  </p>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed">
                  {srv.description}
                </p>

                {/* Duration & Price info */}
                <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-y border-[#E7E2D8] text-xs">
                  <span className="flex items-center gap-1.5 text-stone-600 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#BFA181]" />
                    Duración: {srv.duration}
                  </span>
                  <span className="font-bold text-[#1C1917] bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E7E2D8]">
                    {srv.priceRange}
                  </span>
                </div>

                {/* Included Checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#1C1917] block">
                    El servicio incluye:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {srv.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendation & WhatsApp CTA */}
              <div className="mt-6 pt-4 border-t border-[#E7E2D8] space-y-3">
                <p className="text-[11px] text-stone-500 italic">
                  💡 Recomendado para: {srv.recommendedFor}
                </p>

                <a
                  href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent(`Hola! Quisiera consultar disponibilidad para el servicio de "${srv.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#BFA181] text-[#FAF7F2] text-xs font-bold hover:bg-[#A88C6F] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#FAF7F2] fill-[#FAF7F2]" />
                  Reservar o Consultar por WhatsApp
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
