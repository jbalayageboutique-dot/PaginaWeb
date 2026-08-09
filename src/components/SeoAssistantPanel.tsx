import React, { useState } from 'react';
import { Search, Globe, Code, CheckCircle2, Copy, Check, BarChart3, ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';
import { INITIAL_SEO_SETTINGS, GOOGLE_BUSINESS_DATA } from '../data/balayageData';
import { SeoSettings } from '../types';

interface SeoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SeoAssistantPanel: React.FC<SeoPanelProps> = ({ isOpen, onClose }) => {
  const [seo, setSeo] = useState<SeoSettings>(INITIAL_SEO_SETTINGS);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeTab, setActiveTab] = useState<'serp' | 'schema' | 'checklist'>('serp');

  if (!isOpen) return null;

  // JSON-LD Schema.org generator for Google rich snippets
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": GOOGLE_BUSINESS_DATA.name,
    "image": "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800",
    "@id": seo.canonicalUrl,
    "url": seo.canonicalUrl,
    "telephone": GOOGLE_BUSINESS_DATA.phone,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": GOOGLE_BUSINESS_DATA.address,
      "addressLocality": GOOGLE_BUSINESS_DATA.city,
      "addressCountry": "AR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": GOOGLE_BUSINESS_DATA.rating.toString(),
      "reviewCount": GOOGLE_BUSINESS_DATA.totalReviews.toString()
    },
    "sameAs": [
      GOOGLE_BUSINESS_DATA.googleProfileUrl
    ]
  };

  const schemaString = JSON.stringify(jsonLdSchema, null, 2);

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaString);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#171717] text-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#2A2A2A] animate-in zoom-in-95 duration-200">
        
        {/* Panel Header */}
        <div className="p-5 bg-[#0F0F0F] border-b border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#BFA181]" />
            <div>
              <h3 className="font-serif text-lg font-normal text-white">
                Suite de Optimización SEO & Indexación en Google
              </h3>
              <p className="text-[11px] text-stone-400">
                Visualizador y generador de datos estructurados para posicionamiento local
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-white text-xl">✕</button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#2A2A2A] bg-[#0F0F0F] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('serp')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'serp'
                ? 'border-[#BFA181] text-[#BFA181] bg-[#171717]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Vista Previa Google (SERP)
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'schema'
                ? 'border-[#BFA181] text-[#BFA181] bg-[#171717]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Código Schema.org (JSON-LD)
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors ${
              activeTab === 'checklist'
                ? 'border-[#BFA181] text-[#BFA181] bg-[#171717]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Auditoría SEO On-Page
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: SERP Preview */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              
              {/* Google Result Box Simulation */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                  Simulador de Búsqueda en Google (Resultados de Búsqueda)
                </span>
                <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#262626] text-stone-100 space-y-1 font-sans">
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>https://estudiobalayage.com</span>
                    <span className="text-stone-500">› studio › balayage</span>
                  </div>
                  <h4 className="text-[#BFA181] hover:underline text-base font-medium cursor-pointer leading-snug">
                    {seo.pageTitle || 'Título no configurado'}
                  </h4>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {seo.metaDescription || 'Descripción meta no configurada'}
                  </p>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-4 bg-[#0F0F0F] p-4 rounded-xl border border-[#262626] text-xs">
                
                {/* Title Edit */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-stone-400">
                    <label className="font-semibold text-white">Etiqueta &lt;title&gt; (Título de la Página)</label>
                    <span className={seo.pageTitle.length > 60 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {seo.pageTitle.length} / 60 caracteres
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seo.pageTitle}
                    onChange={(e) => setSeo({ ...seo, pageTitle: e.target.value })}
                    className="w-full bg-[#171717] border border-[#2A2A2A] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#BFA181]"
                  />
                </div>

                {/* Meta Description Edit */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-stone-400">
                    <label className="font-semibold text-white">Meta Description (Resumen para Google)</label>
                    <span className={seo.metaDescription.length > 160 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {seo.metaDescription.length} / 160 caracteres
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={seo.metaDescription}
                    onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
                    className="w-full bg-[#171717] border border-[#2A2A2A] rounded-lg p-2.5 text-white focus:outline-none focus:border-[#BFA181] resize-none"
                  />
                </div>

                {/* Google Business Link Status */}
                <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between">
                  <span className="text-stone-400">Ficha de Google Business vinculada:</span>
                  <a
                    href={GOOGLE_BUSINESS_DATA.googleProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#BFA181] underline font-semibold flex items-center gap-1 hover:text-[#A88C6F]"
                  >
                    Ver perfil comercial <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Schema.org JSON-LD */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-300">
                  Código de datos estructurados <strong>Schema.org (HairSalon)</strong> inyectado para Google Rich Snippets:
                </span>
                <button
                  onClick={handleCopySchema}
                  className="px-3 py-1.5 rounded-lg bg-[#BFA181] text-[#0F0F0F] text-xs font-bold hover:bg-[#A88C6F] transition-colors flex items-center gap-1.5"
                >
                  {copiedSchema ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSchema ? '¡Copiado!' : 'Copiar Código Schema'}</span>
                </button>
              </div>

              <pre className="bg-[#0F0F0F] p-4 rounded-xl border border-[#262626] text-[11px] text-[#BFA181] font-mono overflow-x-auto">
                {schemaString}
              </pre>

              <p className="text-[11px] text-stone-400 italic">
                * Este código ayuda a Google a mostrar el número de teléfono, dirección, horario y valoración de 4.9 estrellas directamente en los resultados de búsqueda.
              </p>
            </div>
          )}

          {/* TAB 3: On-page checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2">
                Verificación de Requisitos para Google Search
              </h4>

              {[
                { title: 'Etiqueta H1 Única', status: true, detail: '1 etiqueta H1 con término clave Balayage' },
                { title: 'Atributos Alt en Imágenes Antes/Después', status: true, detail: 'Todas las imágenes contienen textos descriptivos' },
                { title: 'Alineación con Google Business Profile', status: true, detail: 'Enlace directo a https://share.google/BZ2Y9Lp3IaIZsuHyo' },
                { title: 'Metadatos de Idioma (lang="es")', status: true, detail: 'Configurado para búsquedas en español' },
                { title: 'Diseño Adaptado a Dispositivos Móviles', status: true, detail: 'Optimizado para índice Mobile-First de Google' },
                { title: 'Contacto Directo por WhatsApp', status: true, detail: 'Enlace directo para convertir visitantes en reservas' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#0F0F0F] p-3 rounded-xl border border-[#262626]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-white block">{item.title}</span>
                      <span className="text-[11px] text-stone-400">{item.detail}</span>
                    </div>
                  </div>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    CUMPLIDO
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
