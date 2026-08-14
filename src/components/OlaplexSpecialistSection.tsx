import React from 'react';
import { Award, ShieldCheck, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';
import { getCloudinaryUrl } from '../lib/cloudinary';

export const OlaplexSpecialistSection: React.FC = () => {
  const imgOlaplexCert = getCloudinaryUrl('maison-balayage/certificado/janet-certificado-olaplex', { width: 800, quality: 'auto', format: 'auto' });
  const imgOlaplexProduct = getCloudinaryUrl('maison-balayage/tratamientos/tratamiento-olaplex-completo-jb-balayage', { width: 800, quality: 'auto', format: 'auto' });

  return (
    <section id="especialista-olaplex" className="py-16 md:py-24 bg-white border-t border-[#E7E2D8] relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#BFA181]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copywriting & Credentials */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
              <span>Protección Molecular de Vanguardia</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-tight">
              Especialista en <br />
              <span className="italic font-serif bg-gradient-to-r from-[#1C1917] via-[#BFA181] to-[#1C1917] bg-clip-text text-transparent">
                Tratamientos Olaplex®
              </span>
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed">
              La decoloración y los procesos químicos no tienen por qué comprometer la salud de tu melena. Como <strong>Especialista Certificada en Olaplex</strong>, integramos la química patentada original en cada fase de tu servicio para proteger y reconectar activamente los puentes de disulfuro rotos en el cabello.
            </p>

            {/* Checklist of Olaplex Benefits */}
            <div className="space-y-3 pt-2 text-left inline-block lg:block">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 bg-[#FAF7F2] p-3 rounded-xl border border-[#E7E2D8] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reconstrucción molecular de enlaces de disulfuro</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 bg-[#FAF7F2] p-3 rounded-xl border border-[#E7E2D8] shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Aclaraciones extremas seguras sin riesgo de quiebre</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-stone-700 bg-[#FAF7F2] p-3 rounded-xl border border-[#E7E2D8] shadow-xs">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certificación oficial internacional otorgada por Olaplex®</span>
              </div>
            </div>

            {/* CTA to Consult */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Me gustaría reservar un diagnóstico capilar para realizarme el tratamiento reconstructor Olaplex.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#BFA181] text-[#FAF7F2] font-semibold text-sm hover:bg-[#A88C6F] transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <MessageCircle className="w-4 h-4 text-[#FAF7F2] fill-[#FAF7F2]" />
                Reservar Tratamiento Olaplex
              </a>
            </div>
          </div>

          {/* Right Column: Photos Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-sm hover:border-[#BFA181]/40 transition-all bg-white p-2">
                <img 
                  src={imgOlaplexCert} 
                  alt="Certificado de Especialista Olaplex" 
                  className="w-full h-48 sm:h-64 object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full rounded-2xl overflow-hidden border border-[#BFA181] shadow-md hover:shadow-lg transition-all bg-white p-2">
                <img 
                  src={imgOlaplexProduct} 
                  alt="Tratamiento Olaplex Completo" 
                  className="w-full h-80 sm:h-[380px] object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
