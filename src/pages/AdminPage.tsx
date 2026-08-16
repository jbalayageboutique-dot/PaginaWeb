import React, { useState, useEffect, useCallback } from 'react';
import {
  Lock, Loader2, LogOut, Search, RefreshCw, Copy, Users, Mail, Heart,
  Cake, TrendingUp, MessageCircle, Sparkles, UserPlus, ChevronDown
} from 'lucide-react';

/* ──────────────────────────────────────── */
/*  TYPES                                   */
/* ──────────────────────────────────────── */

interface Totals {
  total_clientas: number;
  newsletter: number;
  ya_clientas: number;
  nuevas_semana: number;
  nuevas_mes: number;
}

interface Stats {
  totals: Totals;
  por_origen: { origen: string; total: number }[];
  por_servicio: { servicio: string; total: number }[];
  cumpleanos_mes: { nombre: string; apellido: string | null; whatsapp: string; whatsapp_url: string | null; dia: number }[];
  ultimas: Clienta[];
}

interface Clienta {
  id: string;
  nombre: string;
  apellido: string | null;
  whatsapp: string;
  whatsapp_url: string | null;
  email: string | null;
  acepta_newsletter: boolean;
  ya_es_clienta: boolean;
  como_nos_conocio: string | null;
  tipo_cabello: string | null;
  servicios: string[] | null;
  motivo_consulta: string | null;
  creado_en: string;
}

interface Visita {
  id: string;
  clienta_id: string;
  fecha: string;
  titulo: string;
  marca: string | null;
  oxigeno: string | null;
  formula: string | null;
  tratamiento: string | null;
  observaciones: string | null;
  precio: number | null;
  creado_en: string;
}

interface NuevaVisita {
  fecha: string;
  titulo: string;
  marca: string;
  oxigeno: string;
  formula: string;
  tratamiento: string;
  observaciones: string;
  precio: string;
}

const VISITA_VACIA: NuevaVisita = {
  fecha: new Date().toISOString().split('T')[0],
  titulo: '',
  marca: '',
  oxigeno: '',
  formula: '',
  tratamiento: '',
  observaciones: '',
  precio: '',
};

const OXIGENO_OPCIONES = ['', '10 vol', '20 vol', '30 vol', '40 vol'];

const clp = (n: number | null | undefined) =>
  n != null ? `$${new Intl.NumberFormat('es-CL').format(n)}` : '—';

const fechaCL = (f: string) => {
  // La fecha llega como "2026-08-16T00:00:00.000Z" — usar solo la parte de fecha
  // para que la zona horaria de Chile no corra el día hacia atrás
  const [y, m, d] = f.split('T')[0].split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
};

const ORIGEN_LABELS: Record<string, string> = {
  instagram: '📸 Instagram',
  tiktok: '🎵 TikTok',
  google: '🔍 Google',
  recomendacion: '💬 Recomendación',
  clienta: '💛 Ya era clienta',
  local: '🏡 Pasó por el local',
  ia: '🤖 Recomendada por IA',
  facebook: '👤 Facebook',
  otro: '✨ Otro',
  sin_dato: '— Sin dato',
};

const SERVICIO_LABELS: Record<string, string> = {
  balayage: 'Balayage',
  babylights: 'Mechas / Babylights',
  olaplex: 'Olaplex',
  tonalizacion: 'Tonalización',
  correccion: 'Corrección de color',
  barrido: 'Barrido de color',
  camuflaje: 'Camuflaje de canas',
  morena_iluminada: 'Morena Iluminada',
  mechas: 'Mechas',
};

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/* ──────────────────────────────────────── */
/*  LOGIN                                   */
/* ──────────────────────────────────────── */

const LoginScreen: React.FC<{ onLogin: (pw: string) => void; error: string; loading: boolean }> = ({ onLogin, error, loading }) => {
  const [pw, setPw] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(160deg, #FAF7F2, #EDE8DF)' }}>
      <form
        onSubmit={e => { e.preventDefault(); if (pw) onLogin(pw); }}
        className="w-full max-w-sm p-10 rounded-3xl text-center"
        style={{ background: '#FFFFFF', boxShadow: '0 24px 64px rgba(28,25,23,0.10)' }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
             style={{ background: 'linear-gradient(135deg, #BFA181, #8C7153)' }}>
          <Lock className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#1C1917' }}>
          Panel de Janet
        </h1>
        <p className="text-xs mb-8 tracking-widest uppercase" style={{ color: '#BFA181' }}>
          JB Balayage Boutique
        </p>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder="Contraseña"
          className="w-full px-4 py-3 rounded-xl text-sm text-center tracking-widest outline-none"
          style={{ background: '#F3EFE9', border: '1.5px solid #E7E2D8', color: '#2E2B27' }}
          onFocus={e => (e.target.style.borderColor = '#BFA181')}
          onBlur={e => (e.target.style.borderColor = '#E7E2D8')}
          disabled={loading}
        />
        {error && <p className="text-xs mt-3" style={{ color: '#b45309' }}>⚠️ {error}</p>}
        <button
          type="submit"
          disabled={loading || !pw}
          className="w-full mt-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #BFA181, #8C7153)', color: '#FAF7F2', opacity: loading || !pw ? 0.55 : 1 }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};

/* ──────────────────────────────────────── */
/*  STAT CARD                               */
/* ──────────────────────────────────────── */

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; sub?: string }> = ({ icon, label, value, sub }) => (
  <div className="p-5 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(191,161,129,0.12)' }}>
        {icon}
      </div>
      <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: '#9B9591' }}>{label}</span>
    </div>
    <p className="text-3xl font-light" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#1C1917' }}>{value}</p>
    {sub && <p className="text-xs mt-1" style={{ color: '#B0A89E' }}>{sub}</p>}
  </div>
);

/* ──────────────────────────────────────── */
/*  MAIN ADMIN PAGE                         */
/* ──────────────────────────────────────── */

export default function AdminPage() {
  const [password, setPassword] = useState(sessionStorage.getItem('jb_admin_pw') || '');
  const [loginError, setLoginError] = useState('');
  const [authChecked, setAuthChecked] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [clientas, setClientas] = useState<Clienta[]>([]);
  const [search, setSearch] = useState('');
  const [onlyNewsletter, setOnlyNewsletter] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [fichaClienta, setFichaClienta] = useState<Clienta | null>(null);
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [visitasLoading, setVisitasLoading] = useState(false);
  const [nuevaVisita, setNuevaVisita] = useState<NuevaVisita>(VISITA_VACIA);
  const [guardandoVisita, setGuardandoVisita] = useState(false);
  const [visitaError, setVisitaError] = useState('');

  useEffect(() => {
    document.title = 'Panel de Janet | JB Balayage Boutique';
  }, []);

  const authHeaders = (pw?: string) => ({ 'Content-Type': 'application/json', 'x-admin-key': pw ?? password });

  const loadData = useCallback(async (searchQ = '', newsletter = false, pw?: string) => {
    setDataLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQ) params.set('search', searchQ);
      if (newsletter) params.set('newsletter', 'true');
      const [statsRes, listRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: authHeaders(pw) }),
        fetch(`/api/clientas?${params.toString()}`, { headers: authHeaders(pw) }),
      ]);
      if (statsRes.status === 401 || listRes.status === 401) {
        sessionStorage.removeItem('jb_admin_pw');
        setPassword('');
        setLoginError('Sesión expirada, ingresá de nuevo');
        return;
      }
      const statsData = await statsRes.json();
      const listData = await listRes.json();
      if (statsData.success) setStats(statsData.data);
      if (listData.success) setClientas(listData.data);
    } catch {
      setLoginError('Error de conexión');
    } finally {
      setDataLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  // Si hay contraseña guardada, validarla al montar
  useEffect(() => {
    if (!password) { setAuthChecked(true); return; }
    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then(r => {
      if (r.ok) { setAuthChecked(true); loadData(); }
      else { sessionStorage.removeItem('jb_admin_pw'); setPassword(''); setAuthChecked(true); }
    }).catch(() => setAuthChecked(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (pw: string) => {
    setLoginError('');
    setDataLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Contraseña incorrecta');
        return;
      }
      sessionStorage.setItem('jb_admin_pw', pw);
      setPassword(pw);
      setStats(data.data);
      loadData('', false, pw);
    } catch {
      setLoginError('Error de conexión');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    loadData(q, onlyNewsletter);
  };

  const toggleNewsletterFilter = () => {
    const v = !onlyNewsletter;
    setOnlyNewsletter(v);
    loadData(search, v);
  };

  const logout = () => {
    sessionStorage.removeItem('jb_admin_pw');
    setPassword('');
    setStats(null);
    setClientas([]);
  };

  /* ── Copiar link de registro al portapapeles ── */
  const LINK_REGISTRO = 'https://www.jbbalayage.cl/registro-clientas';
  const MENSAJE_REGISTRO = `¡Hola! 🤍 Registrate como clienta de JB Balayage Boutique acá:\n${LINK_REGISTRO}\n\nEs rapidito y así quedan tus datos y preferencias guardaditos para tu próxima visita ✨`;

  const [linkCopiado, setLinkCopiado] = useState(false);

  const copiarLinkRegistro = () => {
    navigator.clipboard.writeText(MENSAJE_REGISTRO).then(() => {
      setLinkCopiado(true);
      setTimeout(() => setLinkCopiado(false), 1800);
    });
  };

  /* ── FICHA TÉCNICA ── */

  const abrirFicha = async (clienta: Clienta) => {
    setFichaClienta(clienta);
    setNuevaVisita({ ...VISITA_VACIA, fecha: new Date().toISOString().split('T')[0] });
    setVisitaError('');
    setVisitasLoading(true);
    try {
      const res = await fetch(`/api/visitas?clienta_id=${clienta.id}`, { headers: authHeaders() });
      const data = await res.json();
      if (data.success) setVisitas(data.data);
    } catch {
      setVisitaError('Error cargando la ficha');
    } finally {
      setVisitasLoading(false);
    }
    setTimeout(() => {
      document.getElementById('ficha-tecnica')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const guardarVisita = async () => {
    if (!fichaClienta) return;
    setGuardandoVisita(true);
    setVisitaError('');
    try {
      const res = await fetch('/api/visitas', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...nuevaVisita, clienta_id: fichaClienta.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setVisitaError(data.error || 'No se pudo guardar');
        return;
      }
      setVisitas(v => [data.data, ...v]);
      setNuevaVisita({ ...VISITA_VACIA, fecha: nuevaVisita.fecha });
    } catch {
      setVisitaError('Error de conexión');
    } finally {
      setGuardandoVisita(false);
    }
  };

  const borrarVisita = async (id: string) => {
    try {
      const res = await fetch('/api/visitas/delete', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) setVisitas(v => v.filter(x => x.id !== id));
    } catch {
      setVisitaError('Error al borrar la visita');
    }
  };

  if (!password) {
    return <LoginScreen onLogin={handleLogin} error={loginError} loading={dataLoading} />;
  }

  const today = new Date();
  const mesActual = MESES[today.getMonth()];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #FAF7F2, #F3EFE9)' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b" style={{ background: 'rgba(250,247,242,0.94)', backdropFilter: 'blur(12px)', borderColor: '#E7E2D8' }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5" style={{ color: '#BFA181' }} />
            <div>
              <p className="text-sm font-semibold" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#1C1917' }}>Panel de Janet</p>
              <p className="text-[10px] tracking-widest uppercase" style={{ color: '#BFA181' }}>JB Balayage Boutique</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copiarLinkRegistro}
              className="p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold"
              style={{
                background: linkCopiado ? 'rgba(37,211,102,0.12)' : 'linear-gradient(135deg, #BFA181, #8C7153)',
                color: linkCopiado ? '#128C7E' : '#FAF7F2',
                border: linkCopiado ? '1px solid rgba(37,211,102,0.3)' : 'none',
              }}
              title="Copiar link de registro al portapapeles"
            >
              {linkCopiado ? '✓ ¡Copiado!' : <><Copy className="w-4 h-4" /><span className="hidden sm:inline">Nuevo registro</span></>}
            </button>
            <button
              onClick={() => loadData(search, onlyNewsletter)}
              className="p-2.5 rounded-xl flex items-center gap-2 text-xs font-medium"
              style={{ background: '#FFFFFF', border: '1px solid #E7E2D8', color: '#6B6661' }}
            >
              {dataLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span className="hidden sm:inline">Actualizar</span>
            </button>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl flex items-center gap-2 text-xs font-medium"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#b45309' }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── MÉTRICAS ── */}
        {stats && (
          <>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={<Users className="w-4 h-4" style={{ color: '#BFA181' }} />} label="Clientas" value={stats.totals.total_clientas} sub={`${stats.totals.ya_clientas} ya eran clientas`} />
              <StatCard icon={<Mail className="w-4 h-4" style={{ color: '#BFA181' }} />} label="Newsletter" value={stats.totals.newsletter} sub={stats.totals.total_clientas ? `${Math.round(stats.totals.newsletter / stats.totals.total_clientas * 100)}% del total` : ''} />
              <StatCard icon={<TrendingUp className="w-4 h-4" style={{ color: '#BFA181' }} />} label="Nuevas (7 días)" value={stats.totals.nuevas_semana} sub={`${stats.totals.nuevas_mes} en el último mes`} />
              <StatCard icon={<UserPlus className="w-4 h-4" style={{ color: '#BFA181' }} />} label="Crecimiento" value={`+${stats.totals.nuevas_mes}/mes`} sub="registradas últimos 30 días" />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Origen */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: '#2E2B27' }}>¿Cómo nos conocen?</h3>
                <div className="space-y-2.5">
                  {stats.por_origen.length === 0 && <p className="text-xs" style={{ color: '#B0A89E' }}>Todavía sin datos</p>}
                  {stats.por_origen.map(o => {
                    const pct = stats.totals.total_clientas ? Math.round(o.total / stats.totals.total_clientas * 100) : 0;
                    return (
                      <div key={o.origen}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: '#6B6661' }}>{ORIGEN_LABELS[o.origen] || o.origen}</span>
                          <span style={{ color: '#8C7153' }} className="font-semibold">{o.total} · {pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F3EFE9' }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(to right, #BFA181, #8C7153)' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Servicios */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: '#2E2B27' }}>Servicios más pedidos</h3>
                <div className="space-y-2.5">
                  {stats.por_servicio.length === 0 && <p className="text-xs" style={{ color: '#B0A89E' }}>Todavía sin datos</p>}
                  {stats.por_servicio.map((s, i) => (
                    <div key={s.servicio} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2" style={{ color: '#6B6661' }}>
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                              style={{ background: i === 0 ? 'linear-gradient(135deg, #BFA181, #8C7153)' : '#F3EFE9', color: i === 0 ? '#FAF7F2' : '#9B9591' }}>
                          {i + 1}
                        </span>
                        {SERVICIO_LABELS[s.servicio] || s.servicio}
                      </span>
                      <span className="font-semibold" style={{ color: '#8C7153' }}>{s.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cumpleaños */}
              <div className="p-6 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
                <h3 className="text-sm font-semibold mb-1 flex items-center gap-2" style={{ color: '#2E2B27' }}>
                  <Cake className="w-4 h-4" style={{ color: '#BFA181' }} /> Cumpleaños de {mesActual}
                </h3>
                <p className="text-[11px] mb-4" style={{ color: '#B0A89E' }}>Regalo de cumpleaños 🎁 — escribiles por WhatsApp</p>
                <div className="space-y-2.5">
                  {stats.cumpleanos_mes.length === 0 && <p className="text-xs" style={{ color: '#B0A89E' }}>Nadie cumple años este mes</p>}
                  {stats.cumpleanos_mes.map((c, i) => (
                    <a
                      key={i}
                      href={c.whatsapp_url || `https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs p-2.5 rounded-xl transition-all hover:shadow-sm"
                      style={{ background: c.dia === today.getDate() ? 'rgba(191,161,129,0.15)' : '#FDFAF6' }}
                    >
                      <span className="font-medium" style={{ color: '#2E2B27' }}>
                        {c.dia} · {c.nombre} {c.apellido || ''}
                        {c.dia === today.getDate() && ' 🎉¡hoy!'}
                      </span>
                      <MessageCircle className="w-3.5 h-3.5" style={{ color: '#128C7E' }} />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── LISTA DE CLIENTAS ── */}
        <section className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
          <div className="px-6 py-4 border-b flex flex-wrap items-center gap-3 justify-between" style={{ borderColor: '#F0EBE3' }}>
            <h3 className="text-sm font-semibold flex items-center gap-2" style={{ color: '#2E2B27' }}>
              <Heart className="w-4 h-4" style={{ color: '#BFA181' }} />
              Clientas registradas {clientas.length > 0 && <span style={{ color: '#9B9591', fontWeight: 400 }}>({clientas.length})</span>}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleNewsletterFilter}
                className="px-3 py-2 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: onlyNewsletter ? 'linear-gradient(135deg, #BFA181, #8C7153)' : '#F3EFE9',
                  color: onlyNewsletter ? '#FAF7F2' : '#6B6661',
                }}
              >
                💌 Solo newsletter
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: '#BFA181' }} />
                <input
                  type="search"
                  value={search}
                  onChange={e => handleSearch(e.target.value)}
                  placeholder="Buscar nombre, WhatsApp, email..."
                  className="pl-9 pr-4 py-2 rounded-xl text-xs outline-none w-56"
                  style={{ background: '#F3EFE9', border: '1px solid #E7E2D8', color: '#2E2B27' }}
                />
              </div>
            </div>
          </div>

          {dataLoading && clientas.length === 0 ? (
            <div className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: '#BFA181' }} /></div>
          ) : clientas.length === 0 ? (
            <p className="py-16 text-center text-sm" style={{ color: '#B0A89E' }}>Todavía no hay clientas registradas con ese filtro</p>
          ) : (
            <div className="divide-y" style={{ borderColor: '#F0EBE3' }}>
              {clientas.map(c => (
                <div key={c.id}>
                  <div
                    className="px-6 py-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#FDFAF6]"
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold"
                           style={{ background: 'linear-gradient(135deg, #BFA181, #8C7153)', color: '#FAF7F2' }}>
                        {c.nombre[0]}{(c.apellido || ' ')[0] || ''}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#2E2B27' }}>
                          {c.nombre} {c.apellido || ''}
                          {c.ya_es_clienta && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full align-middle" style={{ background: 'rgba(191,161,129,0.15)', color: '#8C7153' }}>clienta 💛</span>}
                          {c.acepta_newsletter && <span className="ml-1.5 text-[10px] align-middle">💌</span>}
                        </p>
                        <p className="text-xs truncate" style={{ color: '#9B9591' }}>
                          {c.email || 'sin email'} · {ORIGEN_LABELS[c.como_nos_conocio || ''] || c.como_nos_conocio || 'origen sin dato'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={e => { e.stopPropagation(); abrirFicha(c); }}
                        className="p-2 rounded-lg flex items-center gap-1.5"
                        style={{ background: 'rgba(191,161,129,0.18)' }}
                        title="Abrir ficha técnica"
                      >
                        <span className="text-sm leading-none">📋</span>
                        <span className="text-[11px] font-semibold hidden sm:inline" style={{ color: '#8C7153' }}>Ficha</span>
                      </button>
                      <a
                        href={c.whatsapp_url || `https://wa.me/${c.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="p-2 rounded-lg"
                        style={{ background: 'rgba(37,211,102,0.1)' }}
                        title="Escribir por WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" style={{ color: '#128C7E' }} />
                      </a>
                      <ChevronDown
                        className="w-4 h-4 transition-transform"
                        style={{ color: '#9B9591', transform: expanded === c.id ? 'rotate(180deg)' : 'none' }}
                      />
                    </div>
                  </div>

                  {expanded === c.id && (
                    <div className="px-6 pb-5 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs" style={{ background: '#FDFAF6' }}>
                      <p><span style={{ color: '#9B9591' }}>WhatsApp:</span> <span style={{ color: '#2E2B27' }}>{c.whatsapp}</span></p>
                      <p><span style={{ color: '#9B9591' }}>Cabello:</span> <span style={{ color: '#2E2B27' }}>{c.tipo_cabello || '—'}</span></p>
                      <p><span style={{ color: '#9B9591' }}>Servicios:</span> <span style={{ color: '#2E2B27' }}>{(c.servicios || []).map(s => SERVICIO_LABELS[s] || s).join(', ') || '—'}</span></p>
                      <p><span style={{ color: '#9B9591' }}>Registrada:</span> <span style={{ color: '#2E2B27' }}>{new Date(c.creado_en).toLocaleDateString('es-CL')}</span></p>
                      {c.motivo_consulta && (
                        <div className="sm:col-span-2 p-3 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
                          <p style={{ color: '#9B9591' }} className="mb-1">Lo que busca:</p>
                          <p style={{ color: '#2E2B27', fontStyle: 'italic' }}>"{c.motivo_consulta}"</p>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <button
                          onClick={e => { e.stopPropagation(); abrirFicha(c); }}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
                          style={{ background: 'linear-gradient(135deg, #BFA181, #8C7153)', color: '#FAF7F2' }}
                        >
                          📋 Ver ficha técnica
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── FICHA TÉCNICA DE LA CLIENTA ── */}
        <section id="ficha-tecnica">
          {fichaClienta ? (
            <div className="rounded-2xl overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
              {/* Encabezado de la ficha */}
              <div
                className="px-6 py-5 border-b flex flex-wrap items-center justify-between gap-3"
                style={{ borderColor: '#F0EBE3', background: 'linear-gradient(135deg, #BFA181 0%, #8C7153 100%)' }}
              >
                <div>
                  <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Ficha técnica</p>
                  <h3 className="text-xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                    {fichaClienta.nombre} {fichaClienta.apellido || ''}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    {visitas.length} {visitas.length === 1 ? 'visita registrada' : 'visitas registradas'}
                    {visitas.length > 0 && ` · última: ${fechaCL(visitas[0].fecha)}${visitas[0].precio != null ? ` · ${clp(visitas[0].precio)}` : ''}`}
                  </p>
                </div>
                <button
                  onClick={() => setFichaClienta(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF' }}
                >
                  Cerrar ficha
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Nueva visita */}
                <div className="p-5 rounded-2xl" style={{ background: '#FDFAF6', border: '1px dashed #D8CFC0' }}>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: '#2E2B27' }}>
                    ✏️ Registrar visita de hoy
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Fecha</label>
                      <input type="date" value={nuevaVisita.fecha}
                        onChange={e => setNuevaVisita(v => ({ ...v, fecha: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Servicio realizado *</label>
                      <input type="text" value={nuevaVisita.titulo}
                        onChange={e => setNuevaVisita(v => ({ ...v, titulo: e.target.value }))}
                        placeholder="Ej: Balayage + tonalización"
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Marca de tintura</label>
                      <input type="text" value={nuevaVisita.marca}
                        onChange={e => setNuevaVisita(v => ({ ...v, marca: e.target.value }))}
                        placeholder="Ej: Majirel, Igora, Koleston"
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Oxígeno</label>
                      <select value={nuevaVisita.oxigeno}
                        onChange={e => setNuevaVisita(v => ({ ...v, oxigeno: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: nuevaVisita.oxigeno ? '#2E2B27' : '#B0A89E' }}>
                        {OXIGENO_OPCIONES.map(o => <option key={o} value={o}>{o || '—'}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Fórmula de color *</label>
                      <textarea value={nuevaVisita.formula} rows={3}
                        onChange={e => setNuevaVisita(v => ({ ...v, formula: e.target.value }))}
                        placeholder="Ej: 60g de 7.0 + 15g de 7.34 + 5cm de corrector cenizo, con oxígeno de 20 vol 1:1.5, 35 min de exposición en balayage a mano alzada con papel"
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Tratamiento</label>
                      <input type="text" value={nuevaVisita.tratamiento}
                        onChange={e => setNuevaVisita(v => ({ ...v, tratamiento: e.target.value }))}
                        placeholder="Ej: Olaplex 1+2, hidratación"
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Precio cobrado (CLP)</label>
                      <input type="number" min="0" value={nuevaVisita.precio}
                        onChange={e => setNuevaVisita(v => ({ ...v, precio: e.target.value }))}
                        placeholder="Ej: 55000"
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-semibold tracking-wider uppercase mb-1" style={{ color: '#8C7153' }}>Observaciones</label>
                      <textarea value={nuevaVisita.observaciones} rows={2}
                        onChange={e => setNuevaVisita(v => ({ ...v, observaciones: e.target.value }))}
                        placeholder="Estado del cabello, cómo reaccionó el color, qué le recomendé para casa, qué ajustar la próxima vez..."
                        className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
                        style={{ background: '#FFFFFF', border: '1.5px solid #E7E2D8', color: '#2E2B27' }} />
                    </div>
                  </div>
                  {visitaError && <p className="text-xs mt-3" style={{ color: '#b45309' }}>⚠️ {visitaError}</p>}
                  <button
                    onClick={guardarVisita}
                    disabled={guardandoVisita || !nuevaVisita.titulo.trim() || !nuevaVisita.formula.trim()}
                    className="mt-4 w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #BFA181, #8C7153)',
                      color: '#FAF7F2',
                      opacity: (guardandoVisita || !nuevaVisita.titulo.trim() || !nuevaVisita.formula.trim()) ? 0.55 : 1,
                    }}
                  >
                    {guardandoVisita ? <><Loader2 className="w-4 h-4 animate-spin" />Guardando...</> : '✓ Guardar en la ficha'}
                  </button>
                </div>

                {/* Historial de visitas */}
                {visitasLoading ? (
                  <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto" style={{ color: '#BFA181' }} /></div>
                ) : visitas.length === 0 ? (
                  <p className="text-center text-xs py-6" style={{ color: '#B0A89E' }}>
                    Todavía no hay visitas registradas. La primera que guardes queda como referencia para las próximas.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {visitas.map(v => (
                      <div key={v.id} className="p-5 rounded-2xl" style={{ background: '#FFFFFF', border: '1px solid #F0EBE3' }}>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <p className="text-sm font-semibold" style={{ color: '#2E2B27' }}>{v.titulo}</p>
                            <p className="text-xs" style={{ color: '#9B9591' }}>{fechaCL(v.fecha)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {v.precio != null && (
                              <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(191,161,129,0.12)', color: '#8C7153' }}>
                                {clp(v.precio)}
                              </span>
                            )}
                            <button
                              onClick={() => borrarVisita(v.id)}
                              className="text-xs px-2 py-1 rounded-lg"
                              style={{ color: '#b45309', background: 'rgba(239,68,68,0.06)' }}
                              title="Borrar esta visita"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                        <div className="text-xs space-y-2">
                          {(v.marca || v.oxigeno) && (
                            <p><span style={{ color: '#9B9591' }}>Marca/Ox:</span>{' '}
                              <span style={{ color: '#2E2B27' }}>{[v.marca, v.oxigeno].filter(Boolean).join(' · ')}</span>
                            </p>
                          )}
                          <div className="p-3 rounded-xl" style={{ background: '#FDFAF6', border: '1px solid #F0EBE3' }}>
                            <p style={{ color: '#9B9591' }} className="mb-1">Fórmula:</p>
                            <p style={{ color: '#2E2B27', whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, monospace' }}>{v.formula}</p>
                          </div>
                          {v.tratamiento && <p><span style={{ color: '#9B9591' }}>Tratamiento:</span> <span style={{ color: '#2E2B27' }}>{v.tratamiento}</span></p>}
                          {v.observaciones && (
                            <p className="p-3 rounded-xl" style={{ background: 'rgba(191,161,129,0.06)', color: '#6B6661', fontStyle: 'italic' }}>
                              📝 {v.observaciones}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl p-6 text-center" style={{ background: '#FFFFFF', border: '1px dashed #E7E2D8' }}>
              <p className="text-sm" style={{ color: '#9B9591' }}>
                📋 <span style={{ color: '#8C7153', fontWeight: 600 }}>Ficha técnica</span> — tocá una clienta de la lista y después "Ver ficha técnica" para registrar sus fórmulas de color, tratamientos y precios de cada visita.
              </p>
            </div>
          )}
        </section>

        <p className="text-center text-xs pb-4" style={{ color: '#B0A89E' }}>
          Panel privado de JB Balayage Boutique · los datos se guardan en Supabase
        </p>
      </main>
    </div>
  );
}
