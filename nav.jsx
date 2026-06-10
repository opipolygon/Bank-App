// ─────────────────────────────────────────────────────────────
// DRISHTI — hero carousel + navigation chrome
// ─────────────────────────────────────────────────────────────

// ---- Brand wordmark -----------------------------------------------------
function BrandLogo({ size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <span style={{ position: 'relative', width: size, height: size, display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: 7,
          background: 'linear-gradient(145deg, var(--accent), #b21833)' }} />
        <span style={{ position: 'relative', width: size * 0.32, height: size * 0.32, borderRadius: 99,
          background: '#fff', boxShadow: '0 0 0 ' + (size * 0.11) + 'px rgba(255,255,255,0.32)' }} />
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: size * 0.86,
        letterSpacing: 1, color: '#fff' }}>DRISHTI</span>
    </div>
  );
}

// ---- Top navigation (overlays hero) ------------------------------------
function TopNav({ tabs, active, onTab }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, paddingTop: 58,
      background: 'linear-gradient(to bottom, rgba(8,8,10,0.82) 12%, rgba(8,8,10,0.45) 60%, transparent)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 18px 0' }}>
        <BrandLogo />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="press icon-btn"><Icon name="search" size={23} color="#fff" /></button>
          <button className="press icon-btn" style={{ position: 'relative' }}>
            <Icon name="bell" size={23} color="#fff" />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 99,
              background: 'var(--accent)', border: '1.5px solid #0b0b0d' }} />
          </button>
          <div style={{ width: 30, height: 30, borderRadius: 99, padding: 1.5,
            background: 'linear-gradient(145deg, var(--accent), var(--gold))' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 99,
              background: 'linear-gradient(150deg,#3a4250,#1a1f29)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#fff' }}>A</div>
          </div>
        </div>
      </div>
      {/* category tabs */}
      <div style={{ display: 'flex', gap: 22, padding: '14px 20px 14px', overflowX: 'auto' }} className="rail">
        {tabs.map((t) => {
          const on = t === active;
          return (
            <button key={t} onClick={() => onTab(t)} className="press" style={{ position: 'relative',
              background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 7px', flexShrink: 0,
              fontFamily: 'var(--font-ui)', fontWeight: on ? 700 : 600, fontSize: 15.5,
              color: on ? '#fff' : 'rgba(255,255,255,0.55)', letterSpacing: -0.1 }}>
              {t}
              {on && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 0,
                width: 20, height: 3, borderRadius: 99, background: 'var(--accent)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- Hero carousel ------------------------------------------------------
function HeroCarousel({ slides, isSaved, onToggleSave, onOpen, navTabs, activeTab, onTab }) {
  const [idx, setIdx] = React.useState(0);
  const [drag, setDrag] = React.useState(0);
  const [w, setW] = React.useState(402);
  const ref = React.useRef(null);
  const start = React.useRef(null);
  const n = slides.length;

  React.useEffect(() => { if (ref.current) setW(ref.current.offsetWidth); }, []);
  React.useEffect(() => { setIdx(0); }, [slides]);

  // autoplay
  React.useEffect(() => {
    if (start.current !== null) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5200);
    return () => clearInterval(t);
  }, [n, drag]);

  const down = (e) => { start.current = (e.touches ? e.touches[0].clientX : e.clientX); };
  const move = (e) => {
    if (start.current === null) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    setDrag(x - start.current);
  };
  const up = () => {
    if (start.current === null) return;
    if (drag < -45 && idx < n - 1) setIdx(idx + 1);
    else if (drag > 45 && idx > 0) setIdx(idx - 1);
    start.current = null; setDrag(0);
  };

  const HERO_H = 566;
  return (
    <div style={{ position: 'relative', height: HERO_H, overflow: 'hidden', background: '#0b0b0d' }} ref={ref}>
      <div style={{ display: 'flex', height: '100%', width: n * 100 + '%',
        transform: `translateX(calc(${-idx * (100 / n)}% + ${drag}px))`,
        transition: start.current === null ? 'transform 0.5s cubic-bezier(0.22,1,0.36,1)' : 'none' }}
        onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}
        onTouchStart={down} onTouchMove={move} onTouchEnd={up}>
        {slides.map((s) => (
          <div key={s.title} style={{ width: (100 / n) + '%', height: '100%', position: 'relative' }}>
            <Poster item={s} radius={0} showTitle={false} monogram />
            <div style={{ position: 'absolute', inset: 0, background:
              'linear-gradient(to top, #0b0b0d 2%, rgba(11,11,13,0.5) 26%, transparent 52%)' }} />
            {/* hero copy */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 22px 16px',
              textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11.5, fontWeight: 800, letterSpacing: 2.4,
                color: 'var(--gold)', marginBottom: 10 }}>{s.tagline}</div>
              <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 44,
                lineHeight: 0.96, letterSpacing: -1, color: '#fff', textShadow: '0 3px 18px rgba(0,0,0,0.5)' }}>{s.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '13px 0 11px',
                fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.78)' }}>
                {s.genres.map((g, i) => (
                  <React.Fragment key={g}>
                    {i > 0 && <span style={{ width: 3, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.45)' }} />}
                    <span>{g}</span>
                  </React.Fragment>
                ))}
                <RatingPill>{s.rating}</RatingPill>
              </div>
              <p style={{ margin: '0 0 16px', maxWidth: 320, fontFamily: 'var(--font-ui)', fontSize: 13.5,
                lineHeight: 1.5, color: 'rgba(255,255,255,0.7)', textWrap: 'pretty' }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <button className="press" onClick={() => onOpen(s)} style={{ display: 'flex', alignItems: 'center', gap: 8,
                  height: 50, padding: '0 30px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 16,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 22px rgba(255,61,87,0.35)' }}>
                  <Icon name="play" size={19} color="#fff" /> Watch Now
                </button>
                <WatchBtn saved={isSaved(s.title)} onToggle={() => onToggleSave(s)} />
              </div>
              {/* dots */}
              <div style={{ display: 'flex', gap: 6, marginTop: 18 }}>
                {slides.map((_, i) => (
                  <span key={i} onClick={() => setIdx(i)} style={{ height: 6, borderRadius: 99, cursor: 'pointer',
                    width: i === idx ? 20 : 6, background: i === idx ? 'var(--accent)' : 'rgba(255,255,255,0.34)',
                    transition: 'width 0.3s, background 0.3s' }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <TopNav tabs={navTabs} active={activeTab} onTab={onTab} />
    </div>
  );
}

// ---- Bottom navigation --------------------------------------------------
function BottomNav({ active, onChange }) {
  const items = [
    { key: 'Home', icon: 'home' },
    { key: 'Search', icon: 'search' },
    { key: 'Live', icon: 'liveTv' },
    { key: 'Downloads', icon: 'download' },
    { key: 'Profile', icon: 'user' },
  ];
  return (
    <div style={{ position: 'relative', zIndex: 40, paddingBottom: 26, paddingTop: 9,
      background: 'linear-gradient(to top, #0b0b0d 70%, rgba(11,11,13,0.0))',
      borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        {items.map((it) => {
          const on = it.key === active;
          return (
            <button key={it.key} onClick={() => onChange(it.key)} className="press" style={{ background: 'none',
              border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 5, padding: '2px 10px', width: 64 }}>
              <Icon name={it.icon} size={24} stroke={on ? 2.3 : 1.9} color={on ? 'var(--accent)' : 'rgba(255,255,255,0.5)'} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: on ? 700 : 600,
                whiteSpace: 'nowrap',
                color: on ? '#fff' : 'rgba(255,255,255,0.5)' }}>{it.key === 'Live' ? 'Live TV' : it.key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { BrandLogo, TopNav, HeroCarousel, BottomNav });
