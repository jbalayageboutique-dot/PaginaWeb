import React, { useState, useEffect } from 'react';
import {
  User, Phone, Mail, Calendar, MessageSquare,
  ArrowRight, CheckCircle2, Loader2, Sparkles,
  Heart, Star, ChevronDown, Instagram, Search
} from 'lucide-react';

import logoConfig from '../data/logoConfig.json';
import { getCloudinaryUrl } from '../lib/cloudinary';
import { GOOGLE_BUSINESS_DATA } from '../data/balayageData';

/* ──────────────────────────────────────── */
/*  CONSTANTS                               */
/* ──────────────────────────────────────── */

const TIPOS_CABELLO = [
  { value: 'rubio_natural',  label: '✨ Rubio natural' },
  { value: 'rubio_tenido',   label: '🌟 Rubio teñido' },
  { value: 'castano_claro',  label: '🌰 Castaño claro' },
  { value: 'castano_oscuro', label: '🍫 Castaño oscuro' },
  { value: 'negro',          label: '🖤 Negro' },
  { value: 'rojizo',         label: '🍂 Rojizo / Cobrizo' },
  { value: 'canoso',         label: '🩶 Canoso / Gris' },
  { value: 'otro',           label: '🌈 Otro' },
];

const SERVICIOS = [
  { value: 'balayage',     label: 'Balayage' },
  { value: 'babylights',   label: 'Mechas / Babylights' },
  { value: 'olaplex',      label: 'Tratamiento Olaplex' },
  { value: 'tonalizacion', label: 'Tonalización' },
  { value: 'correccion',   label: 'Corrección de color' },
  { value: 'barrido',      label: 'Barrido de color' },
  { value: 'camuflaje',    label: 'Camuflaje de canas' },
  { value: 'morena_iluminada', label: 'Morena Iluminada' },
];

const COMO_CONOCIO = [
  { value: 'instagram',      label: '📸 Instagram', icon: '📸' },
  { value: 'tiktok',         label: '🎵 TikTok',    icon: '🎵' },
  { value: 'google',         label: '🔍 Google / Búsqueda web', icon: '🔍' },
  { value: 'recomendacion',  label: '💬 Me lo recomendó una amiga', icon: '💬' },
  { value: 'clienta',        label: '💛 Ya soy clienta de antes', icon: '💛' },
  { value: 'local',          label: '🏡 Pasé por el local', icon: '🏡' },
  { value: 'ia',             label: '🤖 Me lo recomendó una IA', icon: '🤖' },
  { value: 'facebook',       label: '👤 Facebook', icon: '👤' },
  { value: 'otro',           label: '✨ Otro', icon: '✨' },
];

/* ──────────────────────────────────────── */
/*  HELPERS                                 */
/* ──────────────────────────────────────── */

/** Normaliza teléfono a formato wa.me sin + ni espacios */
function normalizeWhatsApp(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  // Si empieza con 56 (Chile) ya está bien
  if (digits.startsWith('56') && digits.length >= 11) return digits;
  // Si empieza con 9 (Chile sin código) → agregar 56
  if (digits.startsWith('9') && digits.length === 9) return '56' + digits;
  // Si empieza con 0056
  if (digits.startsWith('0056')) return digits.slice(2);
  return digits;
}

/** Muestra formato +56 9 1234 5678 */
function displayWhatsApp(raw: string): string {
  const d = normalizeWhatsApp(raw);
  if (d.startsWith('56') && d.length === 11) {
    return `+56 ${d[2]} ${d.slice(3, 7)} ${d.slice(7)}`;
  }
  return raw;
}

/* ──────────────────────────────────────── */
/*  TYPES                                   */
/* ──────────────────────────────────────── */

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  nombre: string;
  apellido: string;
  whatsapp: string;
  email: string;
  fecha_nacimiento: string;
  tipo_cabello: string;
  servicios: string[];
  ya_es_clienta: boolean;
  como_nos_conocio: string;
  motivo_consulta: string;
  acepta_newsletter: boolean;
}

const EMPTY_FORM: FormData = {
  nombre: '',
  apellido: '',
  whatsapp: '',
  email: '',
  fecha_nacimiento: '',
  tipo_cabello: '',
  servicios: [],
  ya_es_clienta: false,
  como_nos_conocio: '',
  motivo_consulta: '',
  acepta_newsletter: true,
};

/* ──────────────────────────────────────── */
/*  SUB-COMPONENTS                          */
/* ──────────────────────────────────────── */

const InputWrapper: React.FC<{
  label: string;
  optional?: boolean;
  children: React.ReactNode;
  hint?: string;
}> = ({ label, optional, children, hint }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#8C7153' }}>
        {label}
      </label>
      {optional && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(191,161,129,0.12)', color: '#BFA181' }}>
          opcional
        </span>
      )}
    </div>
    {children}
    {hint && <p className="text-[11px]" style={{ color: '#B0A89E' }}>{hint}</p>}
  </div>
);

const inputStyle: React.CSSProperties = {
  background: '#FDFBF8',
  border: '1.5px solid #E7E2D8',
  color: '#2E2B27',
  borderRadius: '10px',
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const inputFocusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#BFA181';
    e.target.style.boxShadow = '0 0 0 3px rgba(191,161,129,0.15)';
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#E7E2D8';
    e.target.style.boxShadow = 'none';
  },
};

/* ──────────────────────────────────────── */
/*  MAIN PAGE                               */
/* ──────────────────────────────────────── */

export default function RegistroClientasPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [whatsappDisplay, setWhatsappDisplay] = useState('');

  // SEO
  useEffect(() => {
    document.title = 'Registrarme como clienta | JB Balayage Boutique — Punta Arenas';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Registrate como clienta de JB Balayage Boutique en Punta Arenas. Recibí atención personalizada, novedades de balayage y ofertas exclusivas.');
  }, []);

  const toggleServicio = (val: string) => {
    setForm(f => ({
      ...f,
      servicios: f.servicios.includes(val)
        ? f.servicios.filter(s => s !== val)
        : [...f.servicios, val],
    }));
  };

  const handleWhatsAppChange = (raw: string) => {
    setWhatsappDisplay(raw);
    setForm(f => ({ ...f, whatsapp: raw }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMsg('');

    const whatsappClean = normalizeWhatsApp(form.whatsapp);
    const whatsappUrl = `https://wa.me/${whatsappClean}`;

    try {
      const res = await fetch('/api/clientas/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          whatsapp: whatsappClean ? `+${whatsappClean}` : form.whatsapp,
          whatsapp_url: whatsappUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormState('error');
        setErrorMsg(data.error || 'Hubo un error. Intentá de nuevo.');
        return;
      }

      setFormState('success');
    } catch {
      setFormState('error');
      setErrorMsg('Error de conexión. Por favor intentá de nuevo.');
    }
  };

  /* ── SUCCESS ── */
  if (formState === 'success') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F3EFE9 100%)' }}
      >
        <div
          className="max-w-md w-full text-center p-12 rounded-3xl"
          style={{ background: '#FFFFFF', boxShadow: '0 24px 64px rgba(28,25,23,0.10)' }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(191,161,129,0.12)', border: '1px solid rgba(191,161,129,0.3)' }}
          >
            <CheckCircle2 className="w-10 h-10" style={{ color: '#BFA181' }} />
          </div>
          <h2
            className="text-3xl font-light mb-3"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#1C1917' }}
          >
            ¡Gracias, {form.nombre}! 🤍
          </h2>
          <p className="text-sm leading-relaxed mb-2" style={{ color: '#6B6661' }}>
            {form.ya_es_clienta
              ? 'Ya tenemos tu registro actualizado. ¡Nos encanta seguir contándote entre nuestras clientas!'
              : 'Recibimos tu registro. Pronto nos ponemos en contacto por WhatsApp para coordinar tu primera cita.'}
          </p>
          {form.acepta_newsletter && form.email && (
            <p className="text-xs mt-3 px-4 py-2 rounded-full inline-block" style={{ background: 'rgba(191,161,129,0.1)', color: '#8C7153' }}>
              💌 También te sumamos al newsletter
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/"
              className="block py-3 rounded-xl text-sm font-semibold text-center transition-all"
              style={{ background: 'linear-gradient(135deg, #BFA181, #8C7153)', color: '#FAF7F2' }}
            >
              Volver al sitio
            </a>
            <a
              href={`https://wa.me/${GOOGLE_BUSINESS_DATA.whatsappNumber}?text=${encodeURIComponent('Hola! Acabo de registrarme en la web, quiero coordinar una cita.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 rounded-xl text-sm font-semibold text-center transition-all"
              style={{ background: 'rgba(37,211,102,0.1)', color: '#128C7E', border: '1px solid rgba(37,211,102,0.25)' }}
            >
              💬 Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* ── FORM ── */
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #FAF7F2 0%, #F3EFE9 60%, #EDE8DF 100%)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 border-b"
        style={{ background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(12px)', borderColor: '#E7E2D8' }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <img
              src={getCloudinaryUrl(logoConfig.secure_url, { width: 48, height: 48, crop: 'fill', quality: 'auto', format: 'auto' })}
              alt="JB Balayage"
              className="w-10 h-10 rounded-full border object-cover"
              style={{ borderColor: '#BFA181' }}
            />
            <div>
              <p className="text-xs" style={{ color: '#BFA181', letterSpacing: '0.15em' }}>MAISON BALAYAGE STUDIO</p>
              <p className="text-sm font-semibold" style={{ color: '#1C1917', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                JB Balayage Boutique
              </p>
            </div>
          </a>
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
            <span className="text-xs ml-1" style={{ color: '#6B6661' }}>5.0 Google</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">

        {/* Hero text */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(to right, transparent, #BFA181)' }} />
            <Sparkles className="w-4 h-4" style={{ color: '#BFA181' }} />
            <div className="h-px w-12" style={{ background: 'linear-gradient(to left, transparent, #BFA181)' }} />
          </div>
          <h1
            className="text-4xl sm:text-5xl font-light mb-3"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#1C1917' }}
          >
            Registrate como clienta
          </h1>
          <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: '#6B6661' }}>
            Tu primera vez con nosotras o una clienta de siempre — queremos conocerte mejor para darte la atención que merecés.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: '#FFFFFF', boxShadow: '0 8px 40px rgba(28,25,23,0.09)', border: '1px solid #F0EBE3' }}
        >
          {/* "¿Ya sos clienta?" toggle — arriba del formulario */}
          <div
            className="px-8 py-5 border-b flex items-center justify-between gap-4"
            style={{ borderColor: '#F0EBE3', background: '#FDFAF6' }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: '#2E2B27' }}>¿Ya sos clienta de JB Balayage?</p>
              <p className="text-xs mt-0.5" style={{ color: '#9B9591' }}>Ayudanos a saber si es tu primera vez o si ya nos conocés</p>
            </div>
            <div className="flex rounded-full overflow-hidden border shrink-0" style={{ borderColor: '#E7E2D8' }}>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, ya_es_clienta: false }))}
                className="px-4 py-2 text-xs font-semibold transition-all"
                style={{
                  background: !form.ya_es_clienta ? 'linear-gradient(135deg, #BFA181, #8C7153)' : 'transparent',
                  color: !form.ya_es_clienta ? '#FAF7F2' : '#9B9591',
                }}
              >
                Nueva clienta
              </button>
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, ya_es_clienta: true }))}
                className="px-4 py-2 text-xs font-semibold transition-all"
                style={{
                  background: form.ya_es_clienta ? 'linear-gradient(135deg, #BFA181, #8C7153)' : 'transparent',
                  color: form.ya_es_clienta ? '#FAF7F2' : '#9B9591',
                }}
              >
                Ya soy clienta 💛
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* ── NOMBRE + APELLIDO ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputWrapper label="Nombre *">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#BFA181' }} />
                  <input
                    type="text" id="reg-nombre" required
                    value={form.nombre}
                    onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                    placeholder="María"
                    style={{ ...inputStyle, paddingLeft: '40px' }}
                    {...inputFocusHandlers}
                    disabled={formState === 'loading'}
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="Apellido *">
                <input
                  type="text" id="reg-apellido" required
                  value={form.apellido}
                  onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))}
                  placeholder="González"
                  style={inputStyle}
                  {...inputFocusHandlers}
                  disabled={formState === 'loading'}
                />
              </InputWrapper>
            </div>

            {/* ── WHATSAPP ── */}
            <InputWrapper
              label="WhatsApp *"
              hint={whatsappDisplay ? `✓ ${displayWhatsApp(whatsappDisplay)}  →  wa.me/${normalizeWhatsApp(whatsappDisplay)}` : 'Ej: +56 9 1234 5678 — lo usamos para coordinarte el turno'}
            >
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#BFA181' }} />
                <input
                  type="tel" id="reg-whatsapp" required
                  value={whatsappDisplay}
                  onChange={e => handleWhatsAppChange(e.target.value)}
                  placeholder="+56 9 1234 5678"
                  style={{ ...inputStyle, paddingLeft: '40px' }}
                  {...inputFocusHandlers}
                  disabled={formState === 'loading'}
                />
              </div>
            </InputWrapper>

            {/* ── EMAIL + FECHA NAC ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputWrapper label="Email" optional hint="Para enviarte novedades y tu regalo de cumpleaños 🎁">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#BFA181' }} />
                  <input
                    type="email" id="reg-email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="tu@email.com"
                    style={{ ...inputStyle, paddingLeft: '40px' }}
                    {...inputFocusHandlers}
                    disabled={formState === 'loading'}
                  />
                </div>
              </InputWrapper>

              <InputWrapper label="Fecha de nacimiento" optional hint="🎂 Te mandamos un regalo el día de tu cumpleaños">
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#BFA181' }} />
                  <input
                    type="date" id="reg-fecha-nacimiento"
                    value={form.fecha_nacimiento}
                    onChange={e => setForm(f => ({ ...f, fecha_nacimiento: e.target.value }))}
                    max={new Date().toISOString().split('T')[0]}
                    style={{ ...inputStyle, paddingLeft: '40px' }}
                    {...inputFocusHandlers}
                    disabled={formState === 'loading'}
                  />
                </div>
              </InputWrapper>
            </div>

            {/* ── TIPO DE CABELLO ── */}
            <InputWrapper label="Tipo de cabello" optional>
              <div className="relative">
                <select
                  id="reg-tipo-cabello"
                  value={form.tipo_cabello}
                  onChange={e => setForm(f => ({ ...f, tipo_cabello: e.target.value }))}
                  style={{ ...inputStyle, appearance: 'none', paddingRight: '40px', color: form.tipo_cabello ? '#2E2B27' : '#B0A89E' }}
                  {...inputFocusHandlers}
                  disabled={formState === 'loading'}
                >
                  <option value="">¿Cómo es tu cabello hoy?</option>
                  {TIPOS_CABELLO.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#BFA181' }} />
              </div>
            </InputWrapper>

            {/* ── SERVICIOS ── */}
            <InputWrapper label="Servicios de interés" optional>
              <div className="flex flex-wrap gap-2">
                {SERVICIOS.map(s => {
                  const sel = form.servicios.includes(s.value);
                  return (
                    <button
                      key={s.value} type="button"
                      onClick={() => toggleServicio(s.value)}
                      className="px-3 py-2 rounded-xl text-xs transition-all"
                      style={{
                        background: sel ? 'linear-gradient(135deg, #BFA181, #8C7153)' : '#FDFBF8',
                        color: sel ? '#FAF7F2' : '#6B6661',
                        border: sel ? '1.5px solid transparent' : '1.5px solid #E7E2D8',
                        fontWeight: sel ? 600 : 400,
                      }}
                      disabled={formState === 'loading'}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </InputWrapper>

            {/* ── CÓMO NOS CONOCISTE ── */}
            <InputWrapper label="¿Cómo llegaste a nosotras?" optional>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COMO_CONOCIO.map(op => {
                  const sel = form.como_nos_conocio === op.value;
                  return (
                    <button
                      key={op.value} type="button"
                      onClick={() => setForm(f => ({ ...f, como_nos_conocio: f.como_nos_conocio === op.value ? '' : op.value }))}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition-all text-left"
                      style={{
                        background: sel ? 'rgba(191,161,129,0.12)' : '#FDFBF8',
                        border: sel ? '1.5px solid #BFA181' : '1.5px solid #E7E2D8',
                        color: sel ? '#8C7153' : '#6B6661',
                        fontWeight: sel ? 600 : 400,
                      }}
                      disabled={formState === 'loading'}
                    >
                      <span className="text-base leading-none">{op.icon}</span>
                      <span>{op.label.replace(/^.{2}/, '').trim()}</span>
                    </button>
                  );
                })}
              </div>
            </InputWrapper>

            {/* ── MOTIVO DE CONSULTA ── */}
            <InputWrapper
              label="Contame qué buscás"
              optional
              hint="En tus palabras — ¿qué querés lograr con tu cabello?"
            >
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 pointer-events-none" style={{ color: '#BFA181' }} />
                <textarea
                  id="reg-motivo"
                  value={form.motivo_consulta}
                  onChange={e => setForm(f => ({ ...f, motivo_consulta: e.target.value }))}
                  placeholder="Por ejemplo: tengo el cabello muy dañado y quiero iluminarlo sin lastimarlo más, siempre quise un balayage pero no sé si va con mi tono de piel..."
                  rows={3}
                  style={{ ...inputStyle, paddingLeft: '40px', resize: 'none' } as React.CSSProperties}
                  {...inputFocusHandlers}
                  disabled={formState === 'loading'}
                />
              </div>
            </InputWrapper>

            {/* ── NEWSLETTER OPT-IN ── */}
            {form.email && (
              <div
                className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all"
                style={{
                  background: form.acepta_newsletter ? 'rgba(191,161,129,0.08)' : '#FDFBF8',
                  border: form.acepta_newsletter ? '1.5px solid rgba(191,161,129,0.35)' : '1.5px solid #E7E2D8',
                }}
                onClick={() => setForm(f => ({ ...f, acepta_newsletter: !f.acepta_newsletter }))}
              >
                <div
                  className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all"
                  style={{
                    background: form.acepta_newsletter ? 'linear-gradient(135deg, #BFA181, #8C7153)' : '#FFFFFF',
                    border: form.acepta_newsletter ? 'none' : '1.5px solid #E7E2D8',
                  }}
                >
                  {form.acepta_newsletter && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#2E2B27' }}>
                    💌 Quiero recibir el newsletter de JBalayage
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#9B9591' }}>
                    Tendencias, tips exclusivos y ofertas. Sin spam — podés darte de baja cuando quieras.
                  </p>
                </div>
              </div>
            )}

            {/* ── ERROR ── */}
            {formState === 'error' && errorMsg && (
              <div
                className="text-sm p-4 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.06)', color: '#b45309', border: '1px solid rgba(239,68,68,0.18)' }}
              >
                ⚠️ {errorMsg}
              </div>
            )}

            {/* ── SUBMIT ── */}
            <button
              type="submit"
              id="reg-submit-btn"
              disabled={formState === 'loading' || !form.nombre.trim() || !form.apellido.trim() || !form.whatsapp.trim()}
              className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 transition-all"
              style={{
                background: 'linear-gradient(135deg, #BFA181 0%, #8C7153 100%)',
                color: '#FAF7F2',
                letterSpacing: '0.05em',
                boxShadow: '0 6px 24px rgba(140,113,83,0.28)',
                opacity: (formState === 'loading' || !form.nombre.trim() || !form.apellido.trim() || !form.whatsapp.trim()) ? 0.55 : 1,
              }}
            >
              {formState === 'loading' ? (
                <><Loader2 className="w-4 h-4 animate-spin" />Registrando...</>
              ) : (
                <>{form.ya_es_clienta ? '💛 Actualizar mis datos' : '✦ Registrarme como clienta'}<ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center text-xs pb-1" style={{ color: '#B0A89E' }}>
              Tus datos son privados y solo los usa JB Balayage Boutique. Nunca los compartimos.
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs" style={{ color: '#9B9591' }}>
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            5.0 en Google Reviews
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            Especialistas en Balayage
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#BFA181' }} />
            Punta Arenas, Chile
          </span>
        </div>

      </main>
    </div>
  );
}
