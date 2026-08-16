import React, { useState, useRef } from 'react';
import { Mail, Sparkles, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error' | 'already';

export const NewsletterSection: React.FC = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState<'name' | 'email' | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setFormState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormState('error');
        setMessage(data.error || 'Hubo un error. Intenta de nuevo.');
        return;
      }

      if (data.alreadySubscribed) {
        setFormState('already');
        setMessage(data.message);
        return;
      }

      setFormState('success');
      setMessage(data.message);
      setEmail('');
      setName('');
    } catch {
      setFormState('error');
      setMessage('Error de conexión. Por favor intenta de nuevo.');
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1C1917 0%, #2E2B27 50%, #1C1917 100%)' }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(191,161,129,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(140,113,83,0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#BFA181]/60" />
          <div className="flex items-center gap-2 text-[#BFA181]">
            <Sparkles className="w-4 h-4 fill-current" />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: '#BFA181' }}>
              Newsletter Exclusivo
            </span>
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#BFA181]/60" />
        </div>

        {/* Headline */}
        <div className="text-center mb-4">
          <h2
            className="text-4xl sm:text-5xl font-light tracking-tight mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2' }}
          >
            Inspiración directa
            <br />
            <em className="italic" style={{ color: '#BFA181' }}>a tu bandeja</em>
          </h2>
          <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(250,247,242,0.6)' }}>
            Tendencias en balayage, transformaciones reales y tips exclusivos para el cuidado de tu color.
            Sin spam, solo belleza.
          </p>
        </div>

        {/* Benefits pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 mt-6">
          {['✨ Tendencias exclusivas', '📸 Antes & después reales', '💌 Solo lo mejor, sin spam'].map((b) => (
            <span
              key={b}
              className="text-xs px-3 py-1.5 rounded-full border"
              style={{
                color: 'rgba(250,247,242,0.7)',
                borderColor: 'rgba(191,161,129,0.3)',
                background: 'rgba(191,161,129,0.08)',
              }}
            >
              {b}
            </span>
          ))}
        </div>

        {/* Form card */}
        <div
          className="relative max-w-xl mx-auto rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(191,161,129,0.2)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Success state */}
          {(formState === 'success' || formState === 'already') && (
            <div className="text-center py-6 animate-[fadeInUp_0.4s_ease]">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(191,161,129,0.15)', border: '1px solid rgba(191,161,129,0.4)' }}
              >
                <CheckCircle2 className="w-8 h-8" style={{ color: '#BFA181' }} />
              </div>
              <h3
                className="text-2xl font-light mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FAF7F2' }}
              >
                {formState === 'already' ? '¡Ya estás suscripta! 💛' : '¡Gracias por suscribirte! 🤍'}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(250,247,242,0.6)' }}>
                {message}
              </p>
              {formState === 'success' && (
                <div
                  className="mt-4 text-xs p-3 rounded-lg"
                  style={{ background: 'rgba(191,161,129,0.1)', color: 'rgba(250,247,242,0.5)' }}
                >
                  📧 Revisa tu bandeja (y la carpeta de spam por si acaso)
                </div>
              )}
              <button
                onClick={() => { setFormState('idle'); setMessage(''); }}
                className="mt-6 text-xs underline-offset-2 underline transition-colors"
                style={{ color: 'rgba(191,161,129,0.6)' }}
              >
                Suscribir otro email
              </button>
            </div>
          )}

          {/* Form */}
          {(formState === 'idle' || formState === 'loading' || formState === 'error') && (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name field */}
              <div className="relative">
                <label
                  htmlFor="newsletter-name"
                  className="block text-xs mb-1.5 transition-colors"
                  style={{
                    color: focused === 'name' ? '#BFA181' : 'rgba(250,247,242,0.5)',
                    letterSpacing: '0.08em',
                  }}
                >
                  TU NOMBRE (opcional)
                </label>
                <input
                  id="newsletter-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="María Fernanda"
                  disabled={formState === 'loading'}
                  className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-60"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${focused === 'name' ? 'rgba(191,161,129,0.6)' : 'rgba(191,161,129,0.2)'}`,
                    color: '#FAF7F2',
                    boxShadow: focused === 'name' ? '0 0 0 3px rgba(191,161,129,0.12)' : 'none',
                  }}
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <label
                  htmlFor="newsletter-email"
                  className="block text-xs mb-1.5 transition-colors"
                  style={{
                    color: focused === 'email' ? '#BFA181' : 'rgba(250,247,242,0.5)',
                    letterSpacing: '0.08em',
                  }}
                >
                  TU EMAIL *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
                    style={{ color: focused === 'email' ? '#BFA181' : 'rgba(250,247,242,0.3)' }}
                  />
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="tu@email.com"
                    required
                    disabled={formState === 'loading'}
                    className="w-full rounded-lg pl-10 pr-4 py-3 text-sm outline-none transition-all duration-200 disabled:opacity-60"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: `1px solid ${focused === 'email' ? 'rgba(191,161,129,0.6)' : 'rgba(191,161,129,0.2)'}`,
                      color: '#FAF7F2',
                      boxShadow: focused === 'email' ? '0 0 0 3px rgba(191,161,129,0.12)' : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Error message */}
              {formState === 'error' && message && (
                <div
                  className="text-xs p-3 rounded-lg"
                  style={{ background: 'rgba(239,68,68,0.1)', color: 'rgba(252,165,165,0.9)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  ⚠️ {message}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                id="newsletter-submit-btn"
                disabled={formState === 'loading' || !email.trim()}
                className="w-full py-3.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: formState === 'loading'
                    ? 'rgba(191,161,129,0.6)'
                    : 'linear-gradient(135deg, #BFA181 0%, #8C7153 100%)',
                  color: '#FAF7F2',
                  letterSpacing: '0.04em',
                  boxShadow: formState !== 'loading' ? '0 4px 20px rgba(140,113,83,0.35)' : 'none',
                  transform: formState === 'loading' ? 'none' : undefined,
                }}
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Suscribiendo...
                  </>
                ) : (
                  <>
                    Suscribirme al Newsletter
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-xs" style={{ color: 'rgba(250,247,242,0.3)' }}>
                Sin spam. Podés darte de baja cuando quieras.
              </p>
            </form>
          )}
        </div>

        {/* Bottom quote */}
        <p
          className="text-center mt-10 text-sm italic font-light"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            color: 'rgba(191,161,129,0.5)',
            letterSpacing: '0.03em',
          }}
        >
          "El cabello es la joya que nunca te sacás" — Maison Balayage Studio
        </p>

      </div>

      {/* CSS for animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
