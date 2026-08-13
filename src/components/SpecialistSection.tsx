import React from 'react';
import { Award, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';
import { getCloudinaryUrl } from '../lib/cloudinary';

export const SpecialistSection: React.FC = () => {
  const imgStudio = getCloudinaryUrl('maison-balayage/certificado/janet-certificado-studio', { width: 800, quality: 'auto', format: 'auto' });
  const imgOlaplex = getCloudinaryUrl('maison-balayage/certificado/janet-certificado-olaplex', { width: 800, quality: 'auto', format: 'auto' });
  const imgVertical = getCloudinaryUrl('maison-balayage/certificado/janet-certificado-vertical', { width: 600, quality: 'auto', format: 'auto' });

  return (
    <section id="especialista" className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E7E2D8] relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#BFA181]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photos Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-sm hover:border-[#BFA181]/40 transition-all bg-white p-2">
                <img 
                  src={imgStudio} 
                  alt="Janet Bahamondez en el Studio" 
                  className="w-full h-48 sm:h-64 object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-sm hover:border-[#BFA181]/40 transition-all bg-white p-2">
                <img 
                  src={imgOlaplex} 
                  alt="Certificado de Especialista y Olaplex" 
                  className="w-full h-40 sm:h-52 object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full rounded-2xl overflow-hidden border border-[#BFA181] shadow-md hover:shadow-lg transition-all bg-white p-2">
                <img 
                  src={imgVertical} 
                  alt="Janet Bahamondez Trujillo - Especialista Certificada" 
                  className="w-full h-80 sm:h-[420px] object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting & Credentials */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
              <Award className="w-3.5 h-3.5 text-[#BFA181]" />
              <span>Garantía de Excelencia Profesional</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-tight">
              Especialista Certificada en <br />
              <span className="italic font-serif bg-gradient-to-r from-[#1C1917] via-[#BFA181] to-[#1C1917] bg-clip-text text-transparent">
                Mechas & Corrección de Color
              </span>
            </h2>

            <p className="text-stone-700 text-base leading-relaxed font-serif italic text-lg text-stone-600">
              "Janet Soledad Bahamondez Trujillo"
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              Formada internacionalmente con más de 30 horas de especialización de alto nivel (Especialista 2.0). 
              Nuestra filosofía combina el arte del diseño personalizado con un rigor técnico absoluto para proteger la salud de tu cabello. Cada aclaración se realiza con protocolos avanzados de reconstrucción molecular y la línea oficial de Olaplex.
            </p>

            {/* Checklist of Professional Standards */}
            <div className="space-y-3 pt-2 text-left inline-block lg:block">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 bg-white/80 p-3 rounded-xl border border-[#E7E2D8] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificación Oficial Internacional en Colorimetría Avanzada</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 bg-white/80 p-3 rounded-xl border border-[#E7E2D8] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Experta en Diagnóstico Capilar & Resistencia de Fibra</span>
              </div>
            </div>

            {/* CTA to Consult */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola Janet! Vi tu perfil de Especialista Certificada en la web y me gustaría reservar una consulta capilar.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#BFA181] text-[#FAF7F2] font-semibold text-sm hover:bg-[#A88C6F] transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 text-[#FAF7F2] fill-[#FAF7F2]" />
                Reservar Diagnóstico con Janet
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
