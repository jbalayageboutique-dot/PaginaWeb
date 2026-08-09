import React, { useState, useMemo } from 'react';
import { Sparkles, MessageCircle, SlidersHorizontal, Check, Clock, Eye, RefreshCw, Layers, UploadCloud, Zap } from 'lucide-react';
import { BEFORE_AFTER_CASES, GOOGLE_BUSINESS_DATA } from '../data/balayageData';
import { BeforeAfterCase, BalayageCategory } from '../types';
import { getCloudinaryUrl } from '../lib/cloudinary';

interface BeforeAfterGalleryProps {
  onOpenCloudinary?: () => void;
  customCases?: BeforeAfterCase[];
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  onOpenCloudinary,
  customCases = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BalayageCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCase, setActiveModalCase] = useState<BeforeAfterCase | null>(null);
  const [sliderPositions, setSliderPositions] = useState<{ [key: string]: number }>({});

  const allCases = useMemo(() => {
    return [...customCases, ...BEFORE_AFTER_CASES];
  }, [customCases]);

  const categories: { key: BalayageCategory; label: string }[] = [
    { key: 'todos', label: 'Todos los Trabajos' },
    { key: 'balayage-rubio', label: 'Balayage Rubio' },
    { key: 'morena-iluminada', label: 'Morenas Iluminadas' },
    { key: 'correccion-color', label: 'Corrección de Color' },
    { key: 'cobrizo-warm', label: 'Cobrizos & Cálidos' },
    { key: 'babylights-melt', label: 'Babylights & Melt' }
  ];

  const filteredCases = useMemo(() => {
    return allCases.filter(c => {
      const matchCategory = selectedCategory === 'todos' || c.category === selectedCategory;
      const matchSearch = 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.techniqueUsed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.seoKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [allCases, selectedCategory, searchQuery]);

  const handleSliderChange = (caseId: string, val: number) => {
    setSliderPositions(prev => ({ ...prev, [caseId]: val }));
  };

  const getPos = (caseId: string) => sliderPositions[caseId] ?? 50;

  return (
    <section id="galeria" className="py-16 md:py-24 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BFA181]/15 text-[#BFA181] text-xs font-semibold uppercase tracking-wider border border-[#BFA181]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#BFA181]" />
            <span>Galería de Resultados Reales • Cloudinary Stream</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F5F5F5]">
            Transformaciones Antes y Después
          </h2>

          <p className="text-stone-300 text-base leading-relaxed">
            Explora la diferencia entre el estado inicial y el acabado final con nuestra técnica de degradado continuo. 
            Todas nuestras fotografías son transmitidas velozmente a través del CDN de <strong>Cloudinary</strong> (`f_auto, q_auto`).
          </p>

          {onOpenCloudinary && (
            <div className="pt-2">
              <button
                onClick={onOpenCloudinary}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BFA181] text-[#0F0F0F] font-bold text-xs hover:bg-[#A88C6F] transition-all shadow-md"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Subir Nueva Fotografía a Cloudinary</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#BFA181] text-[#0F0F0F] shadow-sm font-bold'
                    : 'bg-[#171717] text-stone-300 border border-[#2A2A2A] hover:bg-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Cloudinary Badge */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-full md:w-64 relative">
              <input
                type="text"
                placeholder="Buscar por tono o técnica..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-9 bg-[#171717] border border-[#2A2A2A] rounded-full text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#BFA181]"
              />
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
            </div>

            {onOpenCloudinary && (
              <button
                onClick={onOpenCloudinary}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition-colors shrink-0"
                title="Gestor de fotos Cloudinary"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>Cloudinary</span>
              </button>
            )}
          </div>

        </div>

        {/* Grid of Before/After Cards */}
        {filteredCases.length === 0 ? (
          <div className="text-center py-16 bg-[#171717] rounded-2xl border border-[#2A2A2A] mt-8">
            <p className="text-stone-400 text-sm">No se encontraron resultados para los filtros seleccionados.</p>
            <button
              onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 text-xs font-semibold text-[#BFA181] underline"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredCases.map((item) => {
              const sliderVal = getPos(item.id);
              const optimizedBefore = getCloudinaryUrl(item.beforeImage, { width: 800, quality: 'auto', format: 'auto' });
              const optimizedAfter = getCloudinaryUrl(item.afterImage, { width: 800, quality: 'auto', format: 'auto' });

              return (
                <article 
                  key={item.id} 
                  className="bg-[#171717] rounded-2xl border border-[#2A2A2A] overflow-hidden shadow-sm hover:border-[#BFA181]/40 transition-all flex flex-col"
                >
                  {/* Before / After Interactive Slider Container */}
                  <div className="relative w-full h-80 overflow-hidden select-none bg-stone-950 group">
                    
                    {/* AFTER Image (Cloudinary Streamed) */}
                    <img
                      src={optimizedAfter}
                      alt={`Después: ${item.title}`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-sm text-amber-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border border-amber-300/30">
                      DESPUÉS
                    </div>

                    {/* BEFORE Image Overlay (Cloudinary Streamed) */}
                    <div
                      className="absolute top-0 left-0 bottom-0 overflow-hidden border-r-2 border-white shadow-xl"
                      style={{ width: `${sliderVal}%` }}
                    >
                      <img
                        src={optimizedBefore}
                        alt={`Antes: ${item.title}`}
                        className="absolute top-0 left-0 h-full object-cover max-w-none"
                        style={{ width: '100%', height: '100%' }}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-stone-950/90 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider">
                        ANTES
                      </div>
                    </div>

                    {/* Slider Range Control */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                      aria-label="Deslizar para comparar antes y después"
                    />

                    {/* Visual Divider Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none flex items-center justify-center shadow-md"
                      style={{ left: `${sliderVal}%` }}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#171717] text-[#BFA181] border border-[#BFA181] flex items-center justify-center text-xs font-bold shadow-lg">
                        ↔
                      </div>
                    </div>

                    {/* Zoom / Full Details Button */}
                    <button
                      onClick={() => setActiveModalCase(item)}
                      className="absolute bottom-3 right-3 bg-[#171717]/90 text-stone-200 border border-[#2A2A2A] px-3 py-1 rounded-full text-xs font-semibold opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow z-30 hover:bg-[#252525]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#BFA181]" />
                      Ver Ficha
                    </button>
                  </div>

                  {/* Case Information */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                        <span className="font-semibold text-[#BFA181] uppercase tracking-wider text-[11px]">
                          {item.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 text-stone-400">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {item.durationHours}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-normal text-[#F5F5F5] mb-2 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Technical details tags */}
                    <div className="space-y-2 pt-2 border-t border-[#2A2A2A] text-xs">
                      <div className="flex items-start gap-2 text-stone-300">
                        <Layers className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                        <span><strong>Técnica:</strong> {item.techniqueUsed}</span>
                      </div>
                      <div className="flex items-start gap-2 text-stone-300">
                        <RefreshCw className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                        <span><strong>Retoque:</strong> {item.maintenanceFrequency}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalCase(item)}
                        className="flex-1 py-2 rounded-full border border-[#2A2A2A] text-xs font-semibold text-stone-200 hover:bg-[#222222] transition-colors"
                      >
                        Ver Diagnóstico
                      </button>

                      <a
                        href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent(`Hola! Vi el caso "${item.title}" en la web y me gustaría lograr un resultado similar en mi cabello.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-full bg-[#BFA181] text-[#0F0F0F] text-xs font-bold hover:bg-[#A88C6F] transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-950 fill-emerald-950" />
                        <span>Consultar</span>
                      </a>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Detail Modal Pop-up for a selected Before/After Case */}
      {activeModalCase && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#171717] text-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#2A2A2A] animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-[#0F0F0F] text-white flex items-center justify-between border-b border-[#2A2A2A]">
              <div>
                <span className="text-xs font-semibold text-[#BFA181] uppercase tracking-widest">
                  Ficha Técnica de Coloración
                </span>
                <h3 className="font-serif text-2xl font-normal mt-0.5 text-white">
                  {activeModalCase.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalCase(null)}
                className="text-stone-400 hover:text-white text-2xl font-light px-2"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Dual Before / After Image comparison side by side */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden border border-[#2A2A2A]">
                  <img
                    src={getCloudinaryUrl(activeModalCase.beforeImage, { width: 800, quality: 'auto', format: 'auto' })}
                    alt="Antes"
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 left-2 bg-stone-950/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-stone-800">
                    Estado Inicial (Antes)
                  </span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-[#BFA181]">
                  <img
                    src={getCloudinaryUrl(activeModalCase.afterImage, { width: 800, quality: 'auto', format: 'auto' })}
                    alt="Después"
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-2 right-2 bg-emerald-900/90 text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border border-emerald-700">
                    Resultado Balayage (Después)
                  </span>
                </div>
              </div>

              {/* Case Info Specifications */}
              <div className="grid sm:grid-cols-2 gap-4 bg-[#0F0F0F] p-4 rounded-xl border border-[#2A2A2A] text-xs">
                <div>
                  <span className="text-stone-400 block font-medium">Base Inicial del Cabello:</span>
                  <span className="font-semibold text-white">{activeModalCase.startingBase}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Resultado de Tono Final:</span>
                  <span className="font-semibold text-[#BFA181]">{activeModalCase.finalTone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Técnica Aplicada:</span>
                  <span className="font-semibold text-white">{activeModalCase.techniqueUsed}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-medium">Mantenimiento Recomendado:</span>
                  <span className="font-semibold text-white">{activeModalCase.maintenanceFrequency}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 text-stone-300 text-sm">
                <h4 className="font-semibold text-white">Diagnóstico & Procedimiento:</h4>
                <p className="leading-relaxed text-stone-300">{activeModalCase.description}</p>
              </div>

              {/* Client review if available */}
              {activeModalCase.clientReview && (
                <div className="p-4 bg-[#0F0F0F] rounded-xl border border-[#BFA181]/40 text-xs italic text-stone-200 space-y-1">
                  <div className="flex items-center gap-1 font-bold not-italic text-[#BFA181]">
                    <span>★ Opinión de {activeModalCase.clientName || 'Cliente'}:</span>
                  </div>
                  <p>"{activeModalCase.clientReview}"</p>
                </div>
              )}

              {/* Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent(`Hola! Me interesa lograr un resultado como "${activeModalCase.title}". Quisiera agendar una consulta.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 rounded-full bg-[#BFA181] text-[#0F0F0F] text-xs font-bold hover:bg-[#A88C6F] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-950 fill-emerald-950" />
                  Agendar este Estilo por WhatsApp
                </a>
                <button
                  onClick={() => setActiveModalCase(null)}
                  className="py-3 px-6 rounded-full border border-[#2A2A2A] text-xs font-semibold text-stone-300 hover:bg-stone-800"
                >
                  Cerrar Ficha
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
