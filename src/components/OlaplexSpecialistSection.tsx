import React from 'react';
import { ShieldCheck, MessageCircle, Sparkles, Check } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';
import { getCloudinaryUrl } from '../lib/cloudinary';

export const OlaplexSpecialistSection: React.FC = () => {
  const imgOlaplexCert = getCloudinaryUrl('maison-balayage/certificado/janet-certificado-olaplex', { width: 1000, quality: 'auto', format: 'auto' });
  const imgOlaplexProduct = getCloudinaryUrl('maison-balayage/tratamientos/tratamiento-olaplex-completo-jb-balayage', { width: 1000, quality: 'auto', format: 'auto' });

  return (
    <section id="especialista-olaplex" className="py-16 md:py-24 bg-white border-t border-[#E7E2D8] relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BFA181]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Full-width Title Section */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
            <span>Ciencia Capilar y Reconstrucción Absoluta</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-tight">
            Especialista en <span className="italic font-serif bg-gradient-to-r from-[#1C1917] via-[#BFA181] to-[#1C1917] bg-clip-text text-transparent">Tratamientos Olaplex®</span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            ¿Tu cabello está opaco, quebradizo o debilitado por decoloraciones previas? Olaplex® es el único sistema patentado a nivel mundial que **reconstruye de forma real los puentes de disulfuro** rotos de tu fibra capilar. No es una simple hidratación cosmética; es devolverle la vida, elasticidad y fuerza original a tu melena desde el primer segundo.
          </p>
        </div>

        {/* Large Horizontal Images Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-md hover:border-[#BFA181]/40 transition-all bg-[#FAF7F2] p-2 flex items-center justify-center">
            <img 
              src={imgOlaplexCert} 
              alt="Certificado Oficial de Especialista Olaplex" 
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#BFA181] shadow-lg hover:shadow-xl transition-all bg-[#FAF7F2] p-2 flex items-center justify-center">
            <img 
              src={imgOlaplexProduct} 
              alt="Línea y Tratamiento Profesional Olaplex" 
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* Summarized compelling Steps (1, 2, 3, 4) */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E7E2D8] max-w-5xl mx-auto space-y-8 shadow-sm">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl font-normal text-[#1C1917]">El Secreto del Éxito: Protocolo de 4 Pasos</h3>
            <p className="text-xs text-[#8C7153] font-semibold tracking-wider uppercase">Fórmulas concentradas y activas para una melena invencible</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] hover:border-[#BFA181] transition-all flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-sm font-bold">1</span>
                <h4 className="font-serif text-lg font-semibold text-[#1C1917]">Nº.1 Bond Multiplier</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  **La cura de fuerza extrema.** Se mezcla directo en la decoloración para blindar tu fibra capilar de raíz a puntas, impidiendo el quiebre antes de que suceda.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] hover:border-[#BFA181] transition-all flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-sm font-bold">2</span>
                <h4 className="font-serif text-lg font-semibold text-[#1C1917]">Nº.2 Bond Perfector</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  **El reconstructor absoluto.** Crema activa que sella el proceso de aclarado, devolviendo inmediatamente la elasticidad, sedosidad y brillo natural.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] hover:border-[#BFA181] transition-all flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-sm font-bold">3</span>
                <h4 className="font-serif text-lg font-semibold text-[#1C1917]">Nº.3 Hair Perfector</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  **Tu escudo en casa.** El tratamiento de mantenimiento semanal que prolonga los efectos del salón y mantiene tu cabello fuerte contra la rutina diaria.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E2D8] hover:border-[#BFA181] transition-all flex flex-col justify-between space-y-3 shadow-xs">
              <div className="space-y-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-sm font-bold">4</span>
                <h4 className="font-serif text-lg font-semibold text-[#1C1917]">Nº.4 & Nº.5 Care</h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  **El brillo espejo diario.** Limpieza e hidratación profesional con PH equilibrado que sella cutículas y deja una textura ultra dócil al tacto.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* CTA to Consult */}
        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
          <a
            href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Me interesa agendar el tratamiento completo de Olaplex para recuperar y proteger mi cabello.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#BFA181] text-[#FAF7F2] font-bold text-sm hover:bg-[#A88C6F] transition-all shadow-md flex items-center justify-center gap-2 group hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5 text-[#FAF7F2] fill-[#FAF7F2]" />
            Quiero Recuperar mi Cabello con Olaplex®
          </a>
          <p className="text-[11px] text-stone-500 italic">
            *Recomendado antes, durante o después de cualquier servicio de coloración.*
          </p>
        </div>

      </div>
    </section>
  );
};
