import React, { useState } from 'react';
import { Sparkles, Star, ShieldCheck, ArrowRight, CheckCircle2, MessageCircle, MapPin } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA, BEFORE_AFTER_CASES } from '../data/balayageData';
import { getCloudinaryUrl } from '../lib/cloudinary';

interface HeroSectionProps {
  onOpenQuiz: () => void;
  onExploreGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz, onExploreGallery }) => {
  const spotlightCase = BEFORE_AFTER_CASES[0];
  const spotlightBefore = getCloudinaryUrl(spotlightCase.beforeImage, { width: 800, quality: 'auto', format: 'auto' });
  const spotlightAfter = getCloudinaryUrl(spotlightCase.afterImage, { width: 800, quality: 'auto', format: 'auto' });

  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F3EFE9] to-[#FAF7F2]">
      {/* Decorative ambient subtle circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#BFA181]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & SEO Headings */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Google Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7E2D8] shadow-xs text-xs text-stone-700">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{GOOGLE_BUSINESS_DATA.rating}</span>
              </div>
              <span className="text-stone-300">|</span>
              <span className="font-medium text-stone-600">
                {GOOGLE_BUSINESS_DATA.totalReviews} opiniones reales en Google
              </span>
              <a
                href={GOOGLE_BUSINESS_DATA.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BFA181] underline font-semibold ml-1 text-[11px] hover:text-amber-600"
              >
                Ver Ficha Google
              </a>
            </div>

            {/* Main H1 - Key SEO Title */}
            <div className="space-y-4">
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1917] leading-[1.3] pb-2">
                JB Balayage Peluquería <br />
                <span className="bg-gradient-to-r from-[#1C1917] via-[#BFA181] to-[#1C1917] bg-clip-text text-transparent">
                  Boutique
                </span>
              </h1>
              <div className="pt-1 space-y-2">
                <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-semibold text-[#8C7153] leading-relaxed">
                  Especialista en Técnica Balayage y Coloración
                </h2>
                <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-stone-500 font-bold">
                  Atelier de Coloración
                </p>
              </div>
            </div>

            {/* Subheading */}
            <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Especialistas en luz natural, degradados continuos y difuminado de raíz sin marcaciones. 
              Resultados espectaculares de <strong className="text-[#1C1917]">Antes y Después</strong> diseñados a medida para cuidar la salud de tu fibra capilar.
            </p>

            {/* Quick Benefits Bullet points */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700 bg-white/80 p-2.5 rounded-xl border border-[#E7E2D8]">
                <ShieldCheck className="w-4 h-4 text-[#BFA181] shrink-0" />
                <span>Cuidado Plex sin daño</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700 bg-white/80 p-2.5 rounded-xl border border-[#E7E2D8]">
                <CheckCircle2 className="w-4 h-4 text-[#BFA181] shrink-0" />
                <span>Sin raíz marcada (hasta 6 meses)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-700 bg-white/80 p-2.5 rounded-xl border border-[#E7E2D8]">
                <Sparkles className="w-4 h-4 text-[#BFA181] shrink-0" />
                <span>Efecto dimensional 3D</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreGallery}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#BFA181] text-[#FAF7F2] font-semibold text-sm hover:bg-[#A88C6F] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                Ver Galería Antes y Después
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white border border-[#BFA181] text-[#2E2B27] font-semibold text-sm hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#BFA181]" />
                Diagnóstico Digital Capilar
              </button>
            </div>

            {/* Location & Contact info footer snippet */}
            <div className="pt-2 text-xs text-stone-500 flex items-center justify-center lg:justify-start gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-500" />
                {GOOGLE_BUSINESS_DATA.address}
              </span>
              <span>•</span>
              <a
                href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 underline flex items-center gap-1 hover:text-emerald-600"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                Atención directa por WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Specialist Cover Portrait */}
          <div className="lg:col-span-5">
            <div className="relative bg-white p-3.5 rounded-3xl shadow-2xl border border-[#E7E2D8] group">
              {/* Gold border/glow detail */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#BFA181]/30 transition-all pointer-events-none" />

              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <img
                  src={getCloudinaryUrl('maison-balayage/certificado/janet-certificado-vertical', { width: 800, quality: 'auto', format: 'auto' })}
                  alt="Janet Bahamondez Trujillo - Especialista Certificada"
                  className="w-full h-[450px] md:h-[520px] object-cover rounded-2xl"
                  loading="eager"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#E7E2D8] shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">
                      Atención Personalizada
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#1C1917]">
                    Janet Bahamondez Trujillo
                  </h3>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Estilista Fundadora & Especialista Certificada en Mechas y Corrección de Color.
                  </p>
                </div>

                {/* Ribbon Tag */}
                <div className="absolute top-4 right-4 bg-[#BFA181] text-[#FAF7F2] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-[#FAF7F2]/20 shadow-md">
                  ★ Especialista 2.0
                </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
};
