import React from 'react';
import { Star, MapPin, Phone, Clock, ExternalLink, ShieldCheck, CheckCircle, MessageSquare } from 'lucide-react';
import { GOOGLE_BUSINESS_DATA, GOOGLE_REVIEWS } from '../data/balayageData';

export const GoogleBusinessSection: React.FC = () => {
  return (
    <section id="google-business" className="py-16 md:py-24 bg-[#FAF7F2] text-[#2E2B27] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#BFA181]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/20 text-[#8C7153] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#BFA181]" />
            <span>Perfil Oficial en Google Business</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917]">
            Reputación & Opiniones en Google
          </h2>

          <p className="text-stone-600 text-base leading-relaxed">
            La satisfacción de nuestras clientas es nuestra mejor garantía. Puedes verificar nuestro perfil comercial en Google Maps y leer experiencias reales de transformaciones Balayage.
          </p>
        </div>

        {/* Main Google Profile Summary Card */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-[#E7E2D8] shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Star rating overview */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#E7E2D8] pb-6 lg:pb-0 lg:pr-8">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="font-serif text-6xl font-bold text-[#BFA181]">
                {GOOGLE_BUSINESS_DATA.rating}
              </span>
              <div className="space-y-1 text-left">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {GOOGLE_BUSINESS_DATA.totalReviews} reseñas verificadas en Google
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Puntuación máxima basada en la calidad del tinte, durabilidad del degradado sin marcas y la atención personalizada en cada sesión.
            </p>

            <a
              href={GOOGLE_BUSINESS_DATA.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BFA181] text-[#FAF7F2] font-bold text-xs hover:bg-[#A88C6F] transition-all shadow"
            >
              <ExternalLink className="w-4 h-4 text-[#FAF7F2]" />
              Abrir Perfil de Google Business
            </a>
          </div>

          {/* Right: Location & Opening Hours info */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-[#1C1917] tracking-wider uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#BFA181]" />
              Ubicación & Horarios del Estudio
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-stone-600">
              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E7E2D8] space-y-1">
                <span className="text-stone-500 font-medium block">Dirección Principal:</span>
                <span className="text-[#2E2B27] font-semibold block">{GOOGLE_BUSINESS_DATA.address}</span>
                <span className="text-stone-500 block">{GOOGLE_BUSINESS_DATA.city}</span>
              </div>

              <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E7E2D8] space-y-2">
                <span className="text-stone-500 font-medium block">Teléfono / WhatsApp Directo:</span>
                <a
                  href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Quisiera consultar por disponibilidades de turnos para Balayage en Punta Arenas.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-50 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-emerald-500/50 underline-offset-4">{GOOGLE_BUSINESS_DATA.whatsappFormatted}</span>
                </a>
                <p className="text-stone-500 text-[11px]">
                  Haz clic para abrir chat directo en WhatsApp y solicitar tu turno.
                </p>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E7E2D8] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#BFA181]" />
                <span className="text-stone-600">
                  Horario de Atención: <strong>Lunes a Sábados de 09:00 a 19:00 hs</strong>
                </span>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                Abierto para Turnos
              </span>
            </div>
          </div>

        </div>

        {/* Customer Reviews Grid */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-serif text-[#1C1917] text-center sm:text-left flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#BFA181]" />
            Lo que opinan nuestras clientas
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((rev) => (
              <div 
                key={rev.id} 
                className="bg-white p-5 rounded-2xl border border-[#E7E2D8] space-y-3 flex flex-col justify-between hover:border-[#BFA181]/40 transition-all shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#1C1917] text-sm">{rev.authorName}</span>
                    <span className="text-[10px] text-stone-500">{rev.relativeTime}</span>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-stone-650 text-xs italic leading-relaxed">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E7E2D8] flex items-center justify-between text-[11px] text-stone-500">
                  <span>Servicio: <strong className="text-[#BFA181]">{rev.serviceMentioned}</strong></span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle className="w-3 h-3" /> Reseña Verificada
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Google Indexing Keywords Cloud */}
        <div className="mt-12 pt-8 border-t border-[#E7E2D8] text-center space-y-3">
          <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">
            Términos de Búsqueda Indexados en Google
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              'Balayage cerca de mí',
              'Especialista en Balayage',
              'Peluquería Balayage profesional',
              'Morena Iluminada antes y después',
              'Corrección de color pelo teñido',
              'Balayage rubio sin tinte naranja',
              'Tratamiento Plex decoloración',
              'Matizado de rubios'
            ].map((kw, idx) => (
              <span 
                key={idx}
                className="text-[11px] bg-white text-stone-650 px-3 py-1 rounded-full border border-[#E7E2D8]"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
