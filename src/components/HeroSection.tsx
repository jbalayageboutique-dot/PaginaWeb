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
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#0F0F0F] via-[#141414] to-[#0F0F0F]">
      {/* Decorative ambient subtle circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#BFA181]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & SEO Headings */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Google Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#2A2A2A] shadow-xs text-xs text-stone-200">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold">{GOOGLE_BUSINESS_DATA.rating}</span>
              </div>
              <span className="text-stone-600">|</span>
              <span className="font-medium text-stone-300">
                {GOOGLE_BUSINESS_DATA.totalReviews} opiniones reales en Google
              </span>
              <a
                href={GOOGLE_BUSINESS_DATA.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BFA181] underline font-semibold ml-1 text-[11px] hover:text-amber-200"
              >
                Ver Ficha Google
              </a>
            </div>

            {/* Main H1 - Key SEO Title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#F5F5F5] leading-[1.12]">
              Especialista en Técnica <br className="hidden sm:inline" />
              <span className="italic font-serif bg-gradient-to-r from-[#F5F5F5] via-[#BFA181] to-[#F5F5F5] bg-clip-text text-transparent">
                Balayage & Coloración
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Especialistas en luz natural, degradados continuos y difuminado de raíz sin marcaciones. 
              Resultados espectaculares de <strong className="text-white">Antes y Después</strong> diseñados a medida para cuidar la salud de tu fibra capilar.
            </p>

            {/* Quick Benefits Bullet points */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-200 bg-[#171717]/80 p-2.5 rounded-xl border border-[#2A2A2A]">
                <ShieldCheck className="w-4 h-4 text-[#BFA181] shrink-0" />
                <span>Cuidado Plex sin daño</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-200 bg-[#171717]/80 p-2.5 rounded-xl border border-[#2A2A2A]">
                <CheckCircle2 className="w-4 h-4 text-[#BFA181] shrink-0" />
                <span>Sin raíz marcada (hasta 6 meses)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-stone-200 bg-[#171717]/80 p-2.5 rounded-xl border border-[#2A2A2A]">
                <Sparkles className="w-4 h-4 text-[#BFA181] shrink-0" />
                <span>Efecto dimensional 3D</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onExploreGallery}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#BFA181] text-[#0F0F0F] font-semibold text-sm hover:bg-[#A88C6F] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                Ver Galería Antes y Después
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#171717] border border-[#BFA181]/50 text-white font-semibold text-sm hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#BFA181]" />
                Diagnóstico Digital Capilar
              </button>
            </div>

            {/* Location & Contact info footer snippet */}
            <div className="pt-2 text-xs text-stone-400 flex items-center justify-center lg:justify-start gap-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                {GOOGLE_BUSINESS_DATA.address}
              </span>
              <span>•</span>
              <a
                href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 underline flex items-center gap-1 hover:text-emerald-400"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                Atención directa por WhatsApp
              </a>
            </div>

          </div>

          {/* Right Column: Hero Spotlight Interactive Before / After Slider */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#171717] p-3 rounded-2xl shadow-2xl border border-[#2A2A2A]">
              
              {/* Header Badge on Card */}
              <div className="flex justify-between items-center mb-3 px-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5F5F5]">
                  <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
                  <span>Resultado Destacado de la Semana</span>
                </div>
                <span className="text-[11px] font-medium bg-[#BFA181]/20 text-[#BFA181] px-2.5 py-0.5 rounded-full border border-[#BFA181]/30">
                  Desliza para comparar
                </span>
              </div>

              {/* Before/After Split View */}
              <div 
                className="relative w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden cursor-ew-resize select-none touch-none"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* AFTER Image (Full background) */}
                <img
                  src={spotlightAfter}
                  alt={`Después: ${spotlightCase.title}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* AFTER Label */}
                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md text-amber-200 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-amber-300/30 z-10">
                  DESPUÉS: {spotlightCase.categoryLabel}
                </div>

                {/* BEFORE Image (Clipped overlay) */}
                <div 
                  className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-white shadow-2xl"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={spotlightBefore}
                    alt={`Antes: ${spotlightCase.title}`}
                    className="absolute top-0 left-0 h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                    referrerPolicy="no-referrer"
                  />
                  {/* BEFORE Label */}
                  <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-white/20">
                    ANTES
                  </div>
                </div>

                {/* Drag handle line & icon */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#171717] text-[#BFA181] shadow-lg border border-[#BFA181] flex items-center justify-center text-xs font-bold">
                    ↔
                  </div>
                </div>
              </div>

              {/* Case details summary */}
              <div className="mt-3 p-3 bg-[#0F0F0F] rounded-xl border border-[#262626] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white text-sm">{spotlightCase.title}</span>
                  <span className="text-[#BFA181] font-medium">⏱ {spotlightCase.durationHours}</span>
                </div>
                <p className="text-stone-400 line-clamp-2">{spotlightCase.description}</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-stone-300">
                  <span className="bg-[#171717] px-2 py-0.5 rounded border border-[#2A2A2A]">
                    Base: {spotlightCase.startingBase}
                  </span>
                  <span className="bg-[#171717] px-2 py-0.5 rounded border border-[#2A2A2A]">
                    {spotlightCase.maintenanceFrequency}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
