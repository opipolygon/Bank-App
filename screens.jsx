// ─────────────────────────────────────────────────────────────
// DRISHTI — secondary screens (Search, Live, Downloads, Profile)
// ─────────────────────────────────────────────────────────────

function dedupe(arr) {
  const seen = new Set(); const out = [];
  for (const it of arr) { if (!seen.has(it.title)) { seen.add(it.title); out.push(it); } }
  return out;
}
const ALL_CONTENT = dedupe([...TRENDING, ...NEW_RELEASES, ...BANGLA_MOVIES, ...RECOMMENDED, ...WEB_SERIES, ...HERO]);

function ScreenHeader({ title, sub }) {
  return (
    <div style={{ padding: '70px 20px 14px' }}>
      <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30,
        letterSpacing: -0.6, color: 'var(--text)' }}>{title}</h1>
      {sub && <p style={{ margin: '5px 0 0', fontFamily: 'var(--font-ui)', fontSize: 13.5,
        color: 'var(--text-3)' }}>{sub}</p>}
    </div>
  );
}

// ---- Search -------------------------------------------------------------
function SearchScreen({ onOpen }) {
  const [q, setQ] = React.useState('');
  const results = q.trim()
    ? ALL_CONTENT.filter((it) => it.title.toLowerCase().includes(q.trim().toLowerCase()))
    : [];
  const trendingSearches = ['Surongo', 'Mohanagar', 'BPL 2026', 'Hawa', 'Karagar', 'Eid Specials'];

  return (
    <div style={{ paddingBottom: 96 }}>
      <ScreenHeader title="Search" />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 46, padding: '0 14px',
          borderRadius: 13, background: 'var(--surface)', border: '1px solid var(--line)' }}>
          <Icon name="search" size={20} color="var(--text-3)" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Movies, series, channels, sports…"
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)',
              fontFamily: 'var(--font-ui)', fontSize: 15 }} />
          {q && <button onClick={() => setQ('')} className="press" style={{ background: 'none', border: 'none',
            cursor: 'pointer', color: 'var(--text-3)', fontFamily: 'var(--font-ui)', fontSize: 13 }}>Clear</button>}
        </div>
      </div>

      {q.trim() ? (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-3)', marginBottom: 14 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for “{q}”</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {results.map((it) => (
              <div key={it.title} onClick={() => onOpen(it)} className="press" style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '146%', borderRadius: 13 }}>
                  <Poster item={it} radius={13} monogram />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ padding: '22px 20px 0' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)',
              marginBottom: 13 }}>Browse by genre</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 11 }}>
              {GENRES.slice(0, 8).map((g) => {
                const t = TONES[g.tone];
                return (
                  <div key={g.label} className="press" style={{ position: 'relative', height: 70, borderRadius: 13,
                    overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0 16px',
                    background: `linear-gradient(120deg, ${t[1]}, ${t[3]})`, border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, backgroundSize: '120px',
                      mixBlendMode: 'overlay', opacity: 0.5 }} />
                    <span style={{ position: 'relative', fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 16, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{g.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ padding: '24px 20px 0' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)',
              marginBottom: 12 }}>Trending searches</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {trendingSearches.map((s, i) => (
                <button key={s} onClick={() => setQ(s)} className="press" style={{ display: 'flex', alignItems: 'center',
                  gap: 12, padding: '12px 2px', background: 'none', border: 'none', borderBottom: i < 5 ? '1px solid var(--line)' : 'none',
                  cursor: 'pointer', textAlign: 'left' }}>
                  <Icon name="search" size={18} color="var(--text-3)" />
                  <span style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--text)' }}>{s}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>#{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

// ---- Live TV ------------------------------------------------------------
function LiveScreen({ onOpen }) {
  const featured = LIVE[1];
  return (
    <div style={{ paddingBottom: 96 }}>
      <ScreenHeader title="Live TV" sub="42 channels streaming now" />
      {/* featured live */}
      <div style={{ padding: '0 20px 6px' }}>
        <div onClick={() => onOpen(featured)} className="press" style={{ position: 'relative', height: 200,
          borderRadius: 18, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 12px 28px rgba(0,0,0,0.45)' }}>
          <Poster item={featured} radius={18} showTitle={false} monogram />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 55%)' }} />
          <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8 }}><LiveBadge /></div>
          <div style={{ position: 'absolute', top: 15, right: 14, display: 'flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
            <span style={{ width: 5, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.7)' }} />{featured.viewers} watching</div>
          <div style={{ position: 'absolute', left: 18, bottom: 16, right: 18 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#fff' }}>{featured.title}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13.5, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>Now · {featured.now}</div>
          </div>
        </div>
      </div>
      {/* channel list */}
      <div style={{ padding: '18px 20px 0' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 13 }}>All channels</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {LIVE.map((ch) => (
            <div key={ch.title} onClick={() => onOpen(ch)} className="press" style={{ display: 'flex', gap: 13,
              alignItems: 'center', cursor: 'pointer' }}>
              <div style={{ position: 'relative', width: 116, height: 70, borderRadius: 11, overflow: 'hidden', flexShrink: 0 }}>
                <Poster item={ch} radius={11} showTitle={false} />
                <div style={{ position: 'absolute', top: 6, left: 6, transform: 'scale(0.82)', transformOrigin: 'left top' }}><LiveBadge /></div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5, color: 'var(--text)' }}>{ch.title}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, color: 'var(--text-3)', marginTop: 2,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch.genre} · {ch.now}</div>
              </div>
              <Icon name="play" size={18} color="var(--text-2)" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Downloads ----------------------------------------------------------
function DownloadsScreen({ onOpen }) {
  const items = [
    { ...CONTINUE[0], size: '1.2 GB', q: 'HD' },
    { ...TRENDING[1], size: '2.4 GB', q: 'Full HD' },
    { ...BANGLA_MOVIES[0], size: '1.8 GB', q: 'HD' },
  ];
  return (
    <div style={{ paddingBottom: 96 }}>
      <ScreenHeader title="Downloads" sub="Available offline" />
      <div style={{ padding: '0 20px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, color: 'var(--text-3)' }}>5.4 GB of 32 GB used</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600, color: 'var(--accent)' }}>Smart Downloads on</span>
        </div>
        <div style={{ height: 6, borderRadius: 99, background: 'var(--surface)', overflow: 'hidden' }}>
          <div style={{ width: '17%', height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--gold))' }} />
        </div>
      </div>
      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((it) => (
          <div key={it.title} onClick={() => onOpen(it)} className="press" style={{ display: 'flex', gap: 13, alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: 96, height: 64, borderRadius: 11, overflow: 'hidden', flexShrink: 0 }}>
              <Poster item={it} radius={11} showTitle={false} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15.5, color: 'var(--text)' }}>{it.title}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, color: 'var(--text-3)', marginTop: 3,
                display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#46c98a' }}>
                  <Icon name="check" size={13} stroke={2.6} color="#46c98a" /> Downloaded</span>
                <span style={{ width: 3, height: 3, borderRadius: 99, background: 'var(--text-3)' }} />
                <span>{it.q} · {it.size}</span>
              </div>
            </div>
            <button className="press icon-btn" onClick={(e) => e.stopPropagation()}><Icon name="trash" size={19} color="var(--text-3)" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Profile ------------------------------------------------------------
function ProfileScreen({ watchCount }) {
  const menu = [
    ['My Watchlist', `${watchCount} titles`],
    ['Account & Subscription', 'Premium · 4K'],
    ['Playback & Downloads', null],
    ['Language', 'English · বাংলা'],
    ['Parental Controls', null],
    ['Help & Support', null],
  ];
  return (
    <div style={{ paddingBottom: 96 }}>
      <ScreenHeader title="Profile" />
      <div style={{ padding: '4px 20px 0', display: 'flex', alignItems: 'center', gap: 15 }}>
        <div style={{ width: 64, height: 64, borderRadius: 99, padding: 2.5,
          background: 'linear-gradient(145deg, var(--accent), var(--gold))' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 99, background: 'linear-gradient(150deg,#3a4250,#1a1f29)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: 26, color: '#fff' }}>A</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 21, color: 'var(--text)' }}>Arif Hossain</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 5,
            background: 'rgba(232,178,90,0.14)', border: '1px solid rgba(232,178,90,0.3)', borderRadius: 7,
            padding: '3px 9px' }}>
            <Icon name="star" size={13} color="var(--gold)" />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: 'var(--gold)' }}>Premium Member</span>
          </div>
        </div>
      </div>
      {/* profiles row */}
      <div style={{ padding: '22px 20px 0' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Arif', 'Nadia', 'Kids', '+'].map((p, i) => (
            <div key={p} className="press" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <div style={{ width: 52, height: 52, borderRadius: 14,
                background: i === 3 ? 'var(--surface)' : `linear-gradient(150deg, ${['#3a4250','#7a3bb0','#1f9e63'][i]}, #1a1f29)`,
                border: i === 0 ? '2px solid var(--accent)' : '1px solid var(--line)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: i === 3 ? 24 : 18, color: i === 3 ? 'var(--text-3)' : '#fff' }}>{i === 3 ? '+' : p[0]}</div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11.5, color: 'var(--text-2)' }}>{i === 3 ? 'Add' : p}</span>
            </div>
          ))}
        </div>
      </div>
      {/* menu */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ background: 'var(--surface)', borderRadius: 16, border: '1px solid var(--line)', overflow: 'hidden' }}>
          {menu.map((m, i) => (
            <button key={m[0]} className="press" style={{ width: '100%', display: 'flex', alignItems: 'center',
              gap: 12, padding: '15px 16px', background: 'none', cursor: 'pointer', textAlign: 'left',
              border: 'none', borderBottom: i < menu.length - 1 ? '1px solid var(--line)' : 'none' }}>
              <span style={{ flex: 1, fontFamily: 'var(--font-ui)', fontSize: 15, color: 'var(--text)' }}>{m[0]}</span>
              {m[1] && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-3)' }}>{m[1]}</span>}
              <Icon name="chevron" size={16} color="var(--text-3)" />
            </button>
          ))}
        </div>
        <button className="press" style={{ width: '100%', marginTop: 16, height: 50, borderRadius: 14,
          background: 'none', border: '1px solid var(--line)', cursor: 'pointer', fontFamily: 'var(--font-ui)',
          fontWeight: 700, fontSize: 15, color: 'var(--accent)' }}>Sign Out</button>
      </div>
    </div>
  );
}

Object.assign(window, { SearchScreen, LiveScreen, DownloadsScreen, ProfileScreen, ALL_CONTENT });
