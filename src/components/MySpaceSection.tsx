import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { getCloudinaryUrl } from '../lib/cloudinary';

export const MySpaceSection: React.FC = () => {
  const imgSpace = getCloudinaryUrl('maison-balayage/espacio/salon-mi-espacio', { width: 1000, quality: 'auto', format: 'auto' });

  return (
    <section id="mi-espacio" className="py-16 md:py-24 bg-[#F3EFE9] relative overflow-hidden">
      {/* Subtle ambient light overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BFA181]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Cozy, minimal copywriting */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
              <span>Maison Balayage Studio</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-tight">
              Un Refugio Diseñado <br />
              <span className="italic font-serif bg-gradient-to-r from-[#1C1917] via-[#BFA181] to-[#1C1917] bg-clip-text text-transparent">
                Para Tu Bienestar
              </span>
            </h2>

            <div className="space-y-4 text-stone-600 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Queremos que tu visita sea mucho más que un cambio de look. Diseñamos este espacio íntimo y acogedor pensando en tu comodidad y descanso.
              </p>
              <p className="text-stone-700 font-medium italic">
                “Un rincón exclusivo donde el tiempo se detiene, el café está listo y tu cabello es el único protagonista.”
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-sm text-[#8C7153] font-medium">
              <Heart className="w-4 h-4 text-[#BFA181] fill-[#BFA181]" />
              <span>Ambiente privado y atención 100% personalizada</span>
            </div>
          </div>

          {/* Right Column: Clean, framed photo of the salon */}
          <div className="lg:col-span-7">
            <div className="relative bg-white p-3.5 rounded-3xl shadow-2xl border border-[#E7E2D8] group">
              {/* Decorative gold hover glow */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#BFA181]/20 transition-all pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <img
                  src={imgSpace}
                  alt="Maison Balayage Boutique - Nuestro Espacio de Estilismo"
                  className="w-full h-[300px] sm:h-[450px] object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-102"
                  loading="lazy"
                />
                
                {/* Floating Location Tag */}
                <div className="absolute bottom-4 right-4 bg-[#1C1917]/85 backdrop-blur-md text-[#FAF7F2] px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-lg">
                  Estudio Boutique Privado
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
