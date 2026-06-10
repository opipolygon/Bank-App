// ─────────────────────────────────────────────────────────────
// DRISHTI — core UI primitives
// Exports: Icon, Poster, PosterCtx, ProgressBar, SectionHeader,
//          GenreChip, RatingPill
// ─────────────────────────────────────────────────────────────

const PosterCtx = React.createContext('gradient');

// ---- Icon set (24x24 stroke icons) -------------------------------------
const ICON_PATHS = {
  search:   '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  bell:     '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  home:     '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  liveTv:   '<rect x="2.5" y="6.5" width="19" height="13" rx="2.5"/><path d="M8 6.5 12 2.5l4 4"/>',
  download: '<path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4.5 20.5h15"/>',
  user:     '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
  play:     '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
  plus:     '<path d="M12 5v14M5 12h14"/>',
  check:    '<path d="m4.5 12.5 5 5 10-11"/>',
  chevron:  '<path d="m9 5 7 7-7 7"/>',
  star:     '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" fill="currentColor" stroke="none"/>',
  info:     '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.6" r="0.6" fill="currentColor" stroke="none"/>',
  cast:     '<path d="M3 16.5a4.5 4.5 0 0 1 4.5 4.5M3 12.5a8.5 8.5 0 0 1 8.5 8.5"/><rect x="3" y="4.5" width="18" height="13" rx="2.5"/>',
  grid:     '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  trash:    '<path d="M4.5 6.5h15M9 6.5V4.5h6v2M6.5 6.5 7.5 20h9l1-13.5"/>',
  dots:     '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
};

function Icon({ name, size = 22, color = 'currentColor', stroke = 1.9, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }} />
  );
}

// ---- Generative poster art ---------------------------------------------
const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")";

// Deterministic pseudo-random from a string seed (for art variety)
function seed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 1000) / 1000;
}

function Poster({ item, radius = 16, showTitle = true, monogram = false }) {
  const style = React.useContext(PosterCtx);
  const tone = TONES[item.tone] || TONES.drama;
  const [top, glowA, glowB, bottom] = tone;
  const s = seed(item.title);
  const ax = 18 + s * 30, ay = 10 + s * 22;
  const bx = 64 + (1 - s) * 26, by = 70 + s * 22;

  let bg;
  if (style === 'noir') {
    const g = `hsl(${210}, 6%, ${10 + s * 8}%)`;
    bg = {
      background: `radial-gradient(110% 80% at ${ax}% ${ay}%, rgba(255,255,255,0.14), transparent 55%),
        radial-gradient(120% 90% at ${bx}% ${by}%, rgba(255,255,255,0.05), transparent 50%),
        linear-gradient(160deg, #1a1c20, ${g} 60%, #0a0b0d)`,
    };
  } else if (style === 'stripe') {
    bg = {
      background: `repeating-linear-gradient(135deg, ${top}, ${top} 9px, ${bottom} 9px, ${bottom} 18px)`,
    };
  } else {
    bg = {
      background: `radial-gradient(120% 85% at ${ax}% ${ay}%, ${glowA}, transparent 58%),
        radial-gradient(120% 95% at ${bx}% ${by}%, ${glowB}, transparent 55%),
        linear-gradient(165deg, ${top} 0%, ${bottom} 92%)`,
    };
  }

  const initials = item.title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden',
      ...bg,
    }}>
      {/* grain */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN,
        backgroundSize: '160px', mixBlendMode: 'overlay', opacity: style === 'stripe' ? 0.25 : 0.6 }} />
      {/* big faint monogram for texture */}
      {monogram && (
        <div style={{ position: 'absolute', right: -6, top: -18, fontFamily: 'var(--font-display)',
          fontSize: 120, fontWeight: 800, lineHeight: 1, color: 'rgba(255,255,255,0.07)',
          letterSpacing: -4 }}>{initials}</div>
      )}
      {/* bottom scrim + title */}
      {showTitle && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '26px 12px 11px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.0))' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16,
            lineHeight: 1.08, color: '#fff', letterSpacing: -0.2, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
            {item.title}
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Progress bar -------------------------------------------------------
function ProgressBar({ value = 0, height = 3 }) {
  return (
    <div style={{ height, borderRadius: 99, background: 'rgba(255,255,255,0.22)', overflow: 'hidden', width: '100%' }}>
      <div style={{ height: '100%', width: `${Math.round(value * 100)}%`, background: 'var(--accent)', borderRadius: 99 }} />
    </div>
  );
}

// ---- Section header -----------------------------------------------------
function SectionHeader({ title, accent = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', marginBottom: 13 }}>
      <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: 19, letterSpacing: -0.3, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8,
        whiteSpace: 'nowrap', flexShrink: 0 }}>
        {accent && <span style={{ width: 4, height: 17, borderRadius: 2, background: 'var(--accent)', display: 'inline-block' }} />}
        {title}
      </h2>
      <button className="ghost-btn" style={{ display: 'flex', alignItems: 'center', gap: 2,
        background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
        color: 'var(--text-3)', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600 }}>
        See all <Icon name="chevron" size={14} stroke={2.2} />
      </button>
    </div>
  );
}

// ---- Genre chip ---------------------------------------------------------
function GenreChip({ label, tone, active = false, onClick }) {
  const t = TONES[tone] || TONES.drama;
  return (
    <button onClick={onClick} className="press" style={{
      flexShrink: 0, position: 'relative', overflow: 'hidden',
      height: 64, width: 124, borderRadius: 14, cursor: 'pointer',
      border: active ? '1.5px solid var(--accent)' : '1px solid rgba(255,255,255,0.09)',
      background: `linear-gradient(150deg, ${t[1]}, ${t[3]})`,
      display: 'flex', alignItems: 'flex-end', padding: 11,
      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15,
      color: '#fff', letterSpacing: -0.2, textShadow: '0 1px 4px rgba(0,0,0,0.4)',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, backgroundSize: '120px',
        mixBlendMode: 'overlay', opacity: 0.5 }} />
      <span style={{ position: 'relative' }}>{label}</span>
    </button>
  );
}

// ---- Rating / meta pill -------------------------------------------------
function RatingPill({ children, solid = false }) {
  return (
    <span style={{
      fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3,
      padding: '2px 6px', borderRadius: 5, lineHeight: 1.2,
      color: solid ? '#0b0b0d' : 'var(--text-2)',
      background: solid ? 'var(--gold)' : 'rgba(255,255,255,0.13)',
      border: solid ? 'none' : '1px solid rgba(255,255,255,0.16)',
    }}>{children}</span>
  );
}

Object.assign(window, {
  PosterCtx, Icon, Poster, ProgressBar, SectionHeader, GenreChip, RatingPill, GRAIN, seed,
});
