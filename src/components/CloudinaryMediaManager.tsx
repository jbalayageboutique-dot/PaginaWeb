import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Zap, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  Plus, 
  Settings, 
  Sparkles, 
  Layers, 
  Key, 
  RefreshCw,
  X
} from 'lucide-react';
import { CLOUDINARY_CONFIG, uploadImageToCloudinary, getCloudinaryUrl, CloudinaryUploadResponse } from '../lib/cloudinary';
import { BeforeAfterCase } from '../types';

interface CloudinaryMediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCaseToGallery?: (newCase: BeforeAfterCase) => void;
}

export const CloudinaryMediaManager: React.FC<CloudinaryMediaManagerProps> = ({
  isOpen,
  onClose,
  onAddCaseToGallery
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'optimizer' | 'config'>('upload');
  
  // Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedResult, setUploadedResult] = useState<CloudinaryUploadResponse | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Gallery case creation form state
  const [caseTitle, setCaseTitle] = useState('Transformación Balayage Cloudinary');
  const [caseCategory, setCaseCategory] = useState<'balayage-rubio' | 'morena-iluminada' | 'correccion-color' | 'cobrizo-warm' | 'babylights-melt'>('balayage-rubio');
  const [beforeUrl, setBeforeUrl] = useState('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop');
  const [addedSuccessMsg, setAddedSuccessMsg] = useState(false);

  // Config State
  const [apiSecretInput, setApiSecretInput] = useState('');
  const [hasSecretOnServer, setHasSecretOnServer] = useState(false);
  const [savingSecret, setSavingSecret] = useState(false);
  const [secretMsg, setSecretMsg] = useState<string | null>(null);

  // Optimizer Demo URL
  const [demoUrl, setDemoUrl] = useState('https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=1200');
  const [optimizedDemoUrl, setOptimizedDemoUrl] = useState('');

  useEffect(() => {
    // Check server cloudinary config
    fetch('/api/cloudinary/config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHasSecretOnServer(data.hasSecret);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (demoUrl) {
      setOptimizedDemoUrl(getCloudinaryUrl(demoUrl, { width: 800, quality: 'auto', format: 'auto' }));
    }
  }, [demoUrl]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadedResult(null);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile && !imageUrlInput.trim()) {
      setUploadError('Por favor selecciona una foto o pega una URL de imagen.');
      return;
    }

    setUploading(true);
    setUploadProgress(10);
    setUploadError(null);

    try {
      const source = selectedFile || imageUrlInput.trim();
      const result = await uploadImageToCloudinary(source, CLOUDINARY_CONFIG.defaultUploadFolder, (pct) => {
        setUploadProgress(pct);
      });

      setUploadedResult(result);
      setUploading(false);
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'Error al subir la imagen');
      setUploading(false);
    }
  };

  const handleSaveSecret = async () => {
    if (!apiSecretInput.trim()) return;
    setSavingSecret(true);
    setSecretMsg(null);

    try {
      const res = await fetch('/api/cloudinary/update-secret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiSecret: apiSecretInput.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setHasSecretOnServer(true);
        setSecretMsg('¡API Secret de Cloudinary guardado con éxito!');
        setApiSecretInput('');
      } else {
        setSecretMsg(data.error || 'Error al guardar');
      }
    } catch (e) {
      setSecretMsg('Error al conectar con el servidor.');
    } finally {
      setSavingSecret(false);
    }
  };

  const handleAddCaseToGallerySubmit = () => {
    if (!uploadedResult) return;

    const newCase: BeforeAfterCase = {
      id: `case-cloud-${Date.now()}`,
      title: caseTitle,
      category: caseCategory,
      categoryLabel: caseCategory === 'balayage-rubio' ? 'Balayage Rubio' : caseCategory === 'morena-iluminada' ? 'Morena Iluminada' : caseCategory === 'correccion-color' ? 'Corrección de Color' : 'Técnica Signature',
      beforeImage: getCloudinaryUrl(beforeUrl, { width: 800, quality: 'auto', format: 'auto' }),
      afterImage: uploadedResult.optimized_url || uploadedResult.secure_url,
      startingBase: 'Castaño / Oscuro natural',
      techniqueUsed: 'Balayage optimizado por Cloudinary Stream',
      finalTone: 'Tono luminoso con transmisión rápida Cloudinary',
      durationHours: '4 horas',
      maintenanceFrequency: 'Cada 5 a 6 meses',
      hairTexture: 'Ondas balayage',
      description: 'Foto cargada en vivo mediante Cloudinary SDK y transmitida en formato ultra-rápido f_auto/q_auto.',
      clientName: 'Cliente Cloudinary',
      rating: 5,
      clientReview: 'Súper rápido de cargar, la imagen se ve nítida y brillante.',
      seoKeywords: ['balayage cloudinary', 'streaming optimizado']
    };

    if (onAddCaseToGallery) {
      onAddCaseToGallery(newCase);
      setAddedSuccessMsg(true);
      setTimeout(() => setAddedSuccessMsg(false), 3000);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#171717] text-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#2A2A2A] animate-in zoom-in-95 duration-200 my-8">
        
        {/* Header */}
        <div className="p-5 bg-[#0F0F0F] border-b border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#BFA181]/20 border border-[#BFA181]/40 flex items-center justify-center text-[#BFA181]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-semibold text-white">
                  Integración Cloudinary Image & Video
                </h3>
                <span className="text-[10px] font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">
                  Cloud: {CLOUDINARY_CONFIG.cloudName}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Subida de fotografías en la nube y optimización automática de streaming (`f_auto, q_auto`).
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#2A2A2A] bg-[#0F0F0F] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'upload'
                ? 'border-[#BFA181] text-[#BFA181] bg-[#171717]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Subir Imagen</span>
          </button>

          <button
            onClick={() => setActiveTab('optimizer')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'optimizer'
                ? 'border-[#BFA181] text-[#BFA181] bg-[#171717]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Streaming & Formatos (`f_auto`)</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'config'
                ? 'border-[#BFA181] text-[#BFA181] bg-[#171717]'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Credenciales API</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* TAB 1: UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#262626] space-y-2">
                <span className="text-[10px] font-bold text-[#BFA181] uppercase tracking-wider block">
                  Carga Directa a Cloudinary (`cloud_name: ${CLOUDINARY_CONFIG.cloudName}`)
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Sube fotos de trabajos realizados en el salón. Cloudinary las procesará automáticamente reduciendo el peso en hasta un 70% sin perder calidad.
                </p>
              </div>

              {/* Upload Drop Zone / Input */}
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* File Upload Box */}
                <div className="border-2 border-dashed border-[#2A2A2A] hover:border-[#BFA181] bg-[#0F0F0F] rounded-2xl p-6 text-center space-y-3 transition-colors flex flex-col items-center justify-center relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#171717] border border-[#2A2A2A] flex items-center justify-center text-[#BFA181]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {selectedFile ? selectedFile.name : 'Haz clic o arrastra una imagen'}
                    </span>
                    <span className="text-[11px] text-stone-500 block mt-1">
                      PNG, JPG, WEBP hasta 25MB
                    </span>
                  </div>
                </div>

                {/* URL Paste Option */}
                <div className="bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-stone-300 block">
                      O pega la URL de una foto remota:
                    </label>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/mifoto.jpg"
                      value={imageUrlInput}
                      onChange={(e) => {
                        setImageUrlInput(e.target.value);
                        if (e.target.value) setPreviewUrl(e.target.value);
                      }}
                      className="w-full bg-[#171717] border border-[#2A2A2A] rounded-xl p-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#BFA181]"
                    />
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={uploading || (!selectedFile && !imageUrlInput.trim())}
                    className="w-full py-3 rounded-full bg-[#BFA181] text-[#0F0F0F] text-xs font-bold hover:bg-[#A88C6F] disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Subiendo a Cloudinary... ({uploadProgress}%)</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-[#0F0F0F]" />
                        <span>Subir & Optimizar en Cloudinary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div className="space-y-1">
                  <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#BFA181] transition-all duration-200" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Error */}
              {uploadError && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-red-200 text-xs">
                  ⚠️ {uploadError}
                </div>
              )}

              {/* Live Preview & Result Card */}
              {uploadedResult && (
                <div className="bg-[#0F0F0F] p-5 rounded-2xl border border-[#BFA181]/50 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs border-b border-[#262626] pb-3">
                    <span className="font-bold text-[#BFA181] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" /> ¡Fotografía Subida e Indexada en Cloudinary!
                    </span>
                    <span className="text-stone-400 font-mono text-[10px]">
                      ID: {uploadedResult.public_id}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 items-center">
                    {/* Image Preview */}
                    <div className="relative rounded-xl overflow-hidden border border-[#2A2A2A] h-48 bg-stone-950">
                      <img
                        src={uploadedResult.optimized_url || uploadedResult.secure_url}
                        alt="Cloudinary Stream"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-black/80 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/30">
                        f_auto,q_auto Stream
                      </span>
                    </div>

                    {/* Meta Details & Copy URL */}
                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-stone-400 font-medium block">URL de entrega ultra-rápida (CDN):</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            readOnly
                            value={uploadedResult.optimized_url || uploadedResult.secure_url}
                            className="w-full bg-[#171717] border border-[#2A2A2A] rounded-lg p-2 text-[11px] text-stone-300 font-mono truncate"
                          />
                          <button
                            onClick={() => copyToClipboard(uploadedResult.optimized_url || uploadedResult.secure_url)}
                            className="p-2 rounded-lg bg-[#222] border border-[#333] hover:bg-[#333] text-stone-200"
                          >
                            {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-400 bg-[#171717] p-3 rounded-xl border border-[#262626]">
                        <div>Formato: <strong className="text-white uppercase">{uploadedResult.format || 'Auto'}</strong></div>
                        <div>Dimensiones: <strong className="text-white">{uploadedResult.width || 800}x{uploadedResult.height || 800}</strong></div>
                        <div>Compresión: <strong className="text-emerald-400 font-bold">Auto (q_auto)</strong></div>
                        <div>CDN Cloudinary: <strong className="text-[#BFA181]">Activo</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* Add directly to Before & After Gallery */}
                  {onAddCaseToGallery && (
                    <div className="pt-3 border-t border-[#262626] space-y-3">
                      <span className="text-xs font-bold text-white block">
                        ➕ Agregar este resultado a la Galería de la página web:
                      </span>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={caseTitle}
                          onChange={(e) => setCaseTitle(e.target.value)}
                          placeholder="Título del trabajo"
                          className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-2.5 text-xs text-white"
                        />
                        <select
                          value={caseCategory}
                          onChange={(e: any) => setCaseCategory(e.target.value)}
                          className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-2.5 text-xs text-white"
                        >
                          <option value="balayage-rubio">Balayage Rubio</option>
                          <option value="morena-iluminada">Morena Iluminada</option>
                          <option value="correccion-color">Corrección de Color</option>
                          <option value="cobrizo-warm">Cobrizo Cálido</option>
                          <option value="babylights-melt">Babylights & Melt</option>
                        </select>
                      </div>

                      <button
                        onClick={handleAddCaseToGallerySubmit}
                        className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Publicar Foto de Cloudinary en Galería Web</span>
                      </button>

                      {addedSuccessMsg && (
                        <p className="text-center text-xs font-semibold text-emerald-400 animate-in fade-in">
                          ✓ ¡Caso agregado exitosamente a la Galería Antes y Después!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: OPTIMIZER & FORMAT DEMO */}
          {activeTab === 'optimizer' && (
            <div className="space-y-6">
              <div className="bg-[#0F0F0F] p-4 rounded-xl border border-[#262626] space-y-2">
                <span className="text-[10px] font-bold text-[#BFA181] uppercase tracking-wider block">
                  Prueba de Velocidad & Streaming Dinámico
                </span>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Cloudinary `f_auto` detecta automáticamente si el navegador del usuario soporta <strong>AVIF</strong> o <strong>WEBP</strong> y sirve el formato óptimo en tiempo real.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-300 block">
                  Inserta cualquier URL de imagen para generar la versión streaming de Cloudinary:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="flex-1 bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#BFA181]"
                  />
                  <button
                    onClick={() => setOptimizedDemoUrl(getCloudinaryUrl(demoUrl, { width: 800, quality: 'auto', format: 'auto' }))}
                    className="px-4 py-2.5 bg-[#BFA181] text-[#0F0F0F] rounded-xl font-bold text-xs hover:bg-[#A88C6F]"
                  >
                    Optimizar
                  </button>
                </div>
              </div>

              {/* Comparison Box */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#0F0F0F] p-4 rounded-2xl border border-[#2A2A2A] space-y-2">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    URL Original (Sin optimizar)
                  </span>
                  <div className="h-44 rounded-xl overflow-hidden bg-stone-950 border border-stone-800">
                    <img src={demoUrl} alt="Original" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[11px] text-stone-500 block truncate">
                    {demoUrl}
                  </span>
                </div>

                <div className="bg-[#0F0F0F] p-4 rounded-2xl border border-[#BFA181]/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#BFA181] uppercase tracking-wider block">
                      Cloudinary Optimized Stream
                    </span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-800">
                      f_auto, q_auto
                    </span>
                  </div>
                  <div className="h-44 rounded-xl overflow-hidden bg-stone-950 border border-[#BFA181]/40">
                    <img src={optimizedDemoUrl} alt="Cloudinary Stream" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-300 font-mono truncate max-w-[200px]">
                      {optimizedDemoUrl}
                    </span>
                    <button
                      onClick={() => copyToClipboard(optimizedDemoUrl)}
                      className="text-[#BFA181] underline text-[10px] font-bold shrink-0"
                    >
                      Copiar URL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CREDENTIALS & CONFIG */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              <div className="bg-[#0F0F0F] p-5 rounded-2xl border border-[#2A2A2A] space-y-4">
                <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                  <h4 className="font-serif text-base font-semibold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#BFA181]" />
                    Configuración de la Cuenta de Cloudinary
                  </h4>
                  <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800 font-bold">
                    Conectado
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#171717] p-3.5 rounded-xl border border-[#262626] space-y-1">
                    <span className="text-stone-400 block font-medium">Cloud Name:</span>
                    <strong className="text-white font-mono text-sm block">{CLOUDINARY_CONFIG.cloudName}</strong>
                  </div>

                  <div className="bg-[#171717] p-3.5 rounded-xl border border-[#262626] space-y-1">
                    <span className="text-stone-400 block font-medium">API Key:</span>
                    <strong className="text-white font-mono text-sm block">{CLOUDINARY_CONFIG.apiKey}</strong>
                  </div>
                </div>

                {/* API Secret Field */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-[#BFA181]" /> API Secret (Requerido para subida firmada de fotos):
                    </span>
                    <span className={`text-[11px] font-bold ${hasSecretOnServer ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {hasSecretOnServer ? '✓ Secret Configurado' : '⚠️ No ingresado'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Ingresa tu API Secret de Cloudinary"
                      value={apiSecretInput}
                      onChange={(e) => setApiSecretInput(e.target.value)}
                      className="flex-1 bg-[#171717] border border-[#2A2A2A] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#BFA181]"
                    />
                    <button
                      onClick={handleSaveSecret}
                      disabled={savingSecret || !apiSecretInput.trim()}
                      className="px-5 py-2.5 rounded-xl bg-[#BFA181] text-[#0F0F0F] text-xs font-bold hover:bg-[#A88C6F] disabled:opacity-40 transition-all"
                    >
                      {savingSecret ? 'Guardando...' : 'Guardar Secret'}
                    </button>
                  </div>

                  {secretMsg && (
                    <p className="text-xs text-emerald-400 font-semibold animate-in fade-in">
                      {secretMsg}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0F0F0F] border-t border-[#2A2A2A] flex items-center justify-between text-xs">
          <span className="text-stone-400">
            Cloudinary SDK Activo | Transmisión rápida habilitada
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-[#2A2A2A] text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
