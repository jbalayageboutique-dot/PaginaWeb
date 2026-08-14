import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, GOOGLE_BUSINESS_DATA } from '../data/balayageData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
            <HelpCircle className="w-3.5 h-3.5 text-[#BFA181]" />
            <span>Resolvemos tus Dudas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
            Preguntas Frecuentes sobre el Balayage
          </h2>

          <p className="text-stone-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Información clave sobre cuidados, duración y mantenimiento para tomar la decisión perfecta antes de tu turno.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl border border-[#E7E2D8] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-lg font-normal text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-stone-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#BFA181]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-[#E7E2D8] bg-[#FAF7F2]/80 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-[#E7E2D8] text-center space-y-3 shadow-sm">
          <h3 className="font-serif text-xl font-normal text-[#1C1917]">
            ¿Tienes alguna consulta específica sobre tu tipo de cabello?
          </h3>
          <p className="text-stone-600 text-xs max-w-md mx-auto">
            Envíanos una foto de tu estado actual por WhatsApp y te brindaremos un diagnóstico previo sin compromiso.
          </p>
          <a
            href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Tengo una duda sobre mi cabello antes de agendar un turno.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#BFA181] text-[#FAF7F2] text-xs font-bold hover:bg-[#A88C6F] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#FAF7F2] fill-[#FAF7F2]" />
            Hacer Consulta Directa
          </a>
        </div>

      </div>
    </section>
  );
};
