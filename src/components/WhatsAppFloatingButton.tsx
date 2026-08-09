import React from 'react';
import { MessageCircle } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip badge */}
      <div className="bg-[#171717] text-[#E5E5E5] text-xs py-1.5 px-3 rounded-xl shadow-lg border border-[#2A2A2A] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        <span>💬 ¡Reserva tu turno de Balayage!</span>
      </div>

      <a
        href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Me gustaría consultar disponibilidad de turnos para Balayage.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ring-4 ring-emerald-600/20"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};
