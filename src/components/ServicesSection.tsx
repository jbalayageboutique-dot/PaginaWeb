import React from 'react';
import { Check, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { SERVICES_MENU, GOOGLE_BUSINESS_DATA } from '../data/balayageData';

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/15 text-[#BFA181] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
            <span>Servicios de Alta Coloración Capilar</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F5F5F5]">
            Nuestras Técnicas Especializadas
          </h2>

          <p className="text-stone-300 text-base leading-relaxed">
            Cada servicio incluye diagnóstico personalizado, protector de la fibra capilar, matizado con Gloss y acabado profesional con ondas Balayage.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {SERVICES_MENU.map((srv) => (
            <div 
              key={srv.id} 
              className={`bg-[#171717] rounded-2xl p-6 sm:p-8 border ${
                srv.popularBadge ? 'border-[#BFA181] ring-1 ring-[#BFA181]/30 shadow-lg' : 'border-[#2A2A2A]'
              } flex flex-col justify-between relative overflow-hidden`}
            >
              {srv.popularBadge && (
                <span className="absolute top-0 right-0 bg-[#BFA181] text-[#0F0F0F] text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                  ★ Más Solicitado
                </span>
              )}

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#BFA181] uppercase tracking-widest">
                    {srv.seoTag}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold text-white">
                    {srv.title}
                  </h3>
                  <p className="text-stone-400 text-xs font-medium">
                    {srv.shortSubtitle}
                  </p>
                </div>

                <p className="text-stone-300 text-xs leading-relaxed">
                  {srv.description}
                </p>

                {/* Duration & Price info */}
                <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-y border-[#2A2A2A] text-xs">
                  <span className="flex items-center gap-1.5 text-stone-300 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#BFA181]" />
                    Duración: {srv.duration}
                  </span>
                  <span className="font-bold text-white bg-[#0F0F0F] px-2.5 py-1 rounded border border-[#262626]">
                    {srv.priceRange}
                  </span>
                </div>

                {/* Included Checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-white block">
                    El servicio incluye:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {srv.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendation & WhatsApp CTA */}
              <div className="mt-6 pt-4 border-t border-[#2A2A2A] space-y-3">
                <p className="text-[11px] text-stone-400 italic">
                  💡 Recomendado para: {srv.recommendedFor}
                </p>

                <a
                  href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent(`Hola! Quisiera consultar disponibilidad para el servicio de "${srv.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-[#BFA181] text-[#0F0F0F] text-xs font-bold hover:bg-[#A88C6F] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-950" />
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
