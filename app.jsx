// ─────────────────────────────────────────────────────────────
// DRISHTI — Home screen, detail sheet, app root
// ─────────────────────────────────────────────────────────────

const ROWS_BY_CAT = {
  Home:   ['continue', 'trending', 'new', 'web', 'live', 'sports', 'bangla', 'recommended', 'genres', 'watchlist'],
  Series: ['continue', 'web', 'trending', 'recommended', 'genres', 'watchlist'],
  Movies: ['new', 'trending', 'bangla', 'recommended', 'genres', 'watchlist'],
  Live:   ['live', 'sports', 'trending', 'genres'],
  Sports: ['sports', 'live', 'trending', 'genres'],
};
function heroFor(cat) {
  if (cat === 'Series') return HERO.filter((h) => h.genre === 'Series');
  if (cat === 'Movies') return HERO.filter((h) => h.genre !== 'Series');
  return HERO;
}

// ---- Home screen --------------------------------------------------------
function HomeScreen({ cat, onCat, wl, isSaved, toggleSave, onOpen }) {
  const rows = ROWS_BY_CAT[cat] || ROWS_BY_CAT.Home;
  const Section = ({ title, accent, children }) => (
    <div style={{ marginTop: 28 }}>
      <SectionHeader title={title} accent={accent} />
      {children}
    </div>
  );

  const render = (row) => {
    switch (row) {
      case 'continue':
        return (
          <Section key={row} title="Continue Watching">
            <Rail>{CONTINUE.map((it) => <ContinueCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'trending':
        return (
          <Section key={row} title="Trending in Bangladesh" accent>
            <Rail gap={4}>{TRENDING.map((it, i) => <RankCard key={it.title} item={it} rank={i + 1} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'new':
        return (
          <Section key={row} title="New Releases">
            <Rail>{NEW_RELEASES.map((it) => <MovieCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'web':
        return (
          <Section key={row} title="Popular Web Series">
            <Rail>{WEB_SERIES.map((it) => <WebSeriesCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'live':
        return (
          <Section key={row} title="Live TV" accent>
            <Rail>{LIVE.map((it) => <LiveCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'sports':
        return (
          <Section key={row} title="Sports Highlights">
            <Rail>{SPORTS.map((it) => <SportsCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'bangla':
        return (
          <Section key={row} title="Bangla Movies">
            <Rail>{BANGLA_MOVIES.map((it) => <MovieCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'recommended':
        return (
          <Section key={row} title="Recommended For You">
            <Rail>{RECOMMENDED.map((it) => <MovieCard key={it.title} item={it} onOpen={() => onOpen(it)} />)}</Rail>
          </Section>
        );
      case 'genres':
        return (
          <Section key={row} title="Genres">
            <Rail>{GENRES.map((g) => <GenreChip key={g.label} label={g.label} tone={g.tone} />)}</Rail>
          </Section>
        );
      case 'watchlist':
        if (!wl.length) return null;
        return (
          <Section key={row} title="My Watchlist">
            <Rail>{wl.map((it) => <WatchlistCard key={it.title} item={it} onOpen={() => onOpen(it)} onRemove={() => toggleSave(it)} />)}</Rail>
          </Section>
        );
      default: return null;
    }
  };

  return (
    <div style={{ paddingBottom: 96 }}>
      <HeroCarousel slides={heroFor(cat)} isSaved={isSaved} onToggleSave={toggleSave} onOpen={onOpen}
        navTabs={TOP_TABS} activeTab={cat} onTab={onCat} />
      {rows.map(render)}
    </div>
  );
}

// ---- Detail sheet -------------------------------------------------------
function DetailSheet({ item, isSaved, toggleSave, onClose }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => { const t = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(t); }, []);
  const close = () => { setShow(false); setTimeout(onClose, 260); };
  if (!item) return null;
  const desc = item.desc || `${item.title} — a standout ${(item.genre || 'Bangla').toLowerCase()} title from across Bangladesh's finest, streaming now in crisp quality on DRISHTI.`;
  const tags = item.genres || [item.genre, 'Bangla', 'Drishti Original'].filter(Boolean);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
        opacity: show ? 1 : 0, transition: 'opacity 0.26s' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '88%',
        background: 'var(--bg)', borderRadius: '24px 24px 0 0', overflow: 'hidden',
        transform: show ? 'translateY(0)' : 'translateY(102%)', transition: 'transform 0.34s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: '0 -20px 50px rgba(0,0,0,0.5)' }}>
        {/* banner */}
        <div style={{ position: 'relative', height: 230 }}>
          <Poster item={item} radius={0} showTitle={false} monogram />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg), transparent 60%)' }} />
          <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 38, height: 4,
            borderRadius: 99, background: 'rgba(255,255,255,0.4)' }} />
          <button onClick={close} className="press icon-btn" style={{ position: 'absolute', top: 14, right: 14,
            width: 32, height: 32, borderRadius: 99, background: 'rgba(10,10,12,0.55)', backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex',
            alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 18, lineHeight: 1 }}>×</span>
          </button>
          <div style={{ position: 'absolute', left: 20, bottom: 14, right: 20 }}>
            {item.tagline && <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800,
              letterSpacing: 2, color: 'var(--gold)', marginBottom: 7 }}>{item.tagline}</div>}
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32,
              letterSpacing: -0.6, color: '#fff', lineHeight: 1 }}>{item.title}</h2>
          </div>
        </div>
        {/* body */}
        <div style={{ padding: '6px 20px 30px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 15, flexWrap: 'wrap' }}>
            {item.year && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-2)', fontWeight: 600 }}>{item.year}</span>}
            {item.rating && <RatingPill>{item.rating}</RatingPill>}
            {(item.meta || item.episodes) && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-2)' }}>
              {item.meta || `${item.episodes} Episodes`}</span>}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font-ui)',
              fontSize: 13, color: 'var(--text-2)', fontWeight: 600 }}><Icon name="star" size={13} color="var(--gold)" /> 4.6</span>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <button className="press" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, height: 52, borderRadius: 14, border: 'none', cursor: 'pointer', background: 'var(--accent)',
              color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 16,
              boxShadow: '0 8px 22px rgba(255,61,87,0.32)' }}>
              <Icon name="play" size={19} color="#fff" /> Watch Now</button>
            <WatchBtn saved={isSaved(item.title)} onToggle={() => toggleSave(item)} size="sm" />
            <button className="press icon-btn" style={{ width: 52, height: 52, borderRadius: 14,
              background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer' }}><Icon name="download" size={21} color="var(--text)" /></button>
          </div>
          <p style={{ margin: '0 0 18px', fontFamily: 'var(--font-ui)', fontSize: 14.5, lineHeight: 1.6,
            color: 'var(--text-2)', textWrap: 'pretty' }}>{desc}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tags.map((t) => <span key={t} style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600,
              color: 'var(--text-2)', background: 'var(--surface)', border: '1px solid var(--line)',
              padding: '6px 12px', borderRadius: 9 }}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- App root -----------------------------------------------------------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff3d57",
  "posterStyle": "gradient",
  "display": "Bricolage Grotesque"
}/*EDITMODE-END*/;

const WL_KEY = 'drishti.watchlist.v1';
function loadWL() { try { return JSON.parse(localStorage.getItem(WL_KEY)) || []; } catch (e) { return []; } }

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = React.useState('Home');
  const [cat, setCat] = React.useState('Home');
  const [wl, setWl] = React.useState(loadWL);
  const [open, setOpen] = React.useState(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => { try { localStorage.setItem(WL_KEY, JSON.stringify(wl)); } catch (e) {} }, [wl]);

  // apply tweaks to CSS vars
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--font-display', `"${t.display}", var(--font-ui)`);
  }, [t.accent, t.display]);

  const isSaved = (title) => wl.some((x) => x.title === title);
  const toggleSave = (item) => setWl((cur) => cur.some((x) => x.title === item.title)
    ? cur.filter((x) => x.title !== item.title)
    : [{ title: item.title, tone: item.tone, genre: item.genre, rating: item.rating }, ...cur]);

  const goNav = (key) => { setNav(key); if (scrollRef.current) scrollRef.current.scrollTop = 0; };
  const goCat = (c) => { setCat(c); if (scrollRef.current) scrollRef.current.scrollTop = 0; };

  let screen;
  if (nav === 'Home') screen = <HomeScreen cat={cat} onCat={goCat} wl={wl} isSaved={isSaved} toggleSave={toggleSave} onOpen={setOpen} />;
  else if (nav === 'Search') screen = <SearchScreen onOpen={setOpen} />;
  else if (nav === 'Live') screen = <LiveScreen onOpen={setOpen} />;
  else if (nav === 'Downloads') screen = <DownloadsScreen onOpen={setOpen} />;
  else screen = <ProfileScreen watchCount={wl.length} />;

  return (
    <PosterCtx.Provider value={t.posterStyle}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
        <div ref={scrollRef} className="app-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', position: 'relative', isolation: 'isolate' }}>
          {screen}
        </div>
        <BottomNav active={nav} onChange={goNav} />
        {open && <DetailSheet item={open} isSaved={isSaved} toggleSave={toggleSave} onClose={() => setOpen(null)} />}
      </div>

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={['#ff3d57', '#10b981', '#f59e0b', '#7c3aed', '#0ea5e9']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSelect label="Display font" value={t.display}
          options={['Bricolage Grotesque', 'Plus Jakarta Sans', 'Space Grotesk', 'DM Serif Display']}
          onChange={(v) => setTweak('display', v)} />
        <TweakSection label="Artwork" />
        <TweakRadio label="Poster style" value={t.posterStyle}
          options={['gradient', 'noir', 'stripe']}
          onChange={(v) => setTweak('posterStyle', v)} />
      </TweaksPanel>
    </PosterCtx.Provider>
  );
}

window.DrishtiApp = App;
