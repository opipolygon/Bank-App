// ─────────────────────────────────────────────────────────────
// DRISHTI — cards, rails, hero carousel, navigation
// ─────────────────────────────────────────────────────────────

// ---- Watchlist toggle button -------------------------------------------
function WatchBtn({ saved, onToggle, size = 'lg' }) {
  const lg = size === 'lg';
  return (
    <button onClick={(e) => { e.stopPropagation(); onToggle(); }} className="press" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: lg ? 8 : 0,
      height: lg ? 50 : 34, width: lg ? 'auto' : 34, padding: lg ? '0 20px' : 0,
      borderRadius: lg ? 14 : 9, cursor: 'pointer',
      background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)',
      color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15,
    }}>
      <Icon name={saved ? 'check' : 'plus'} size={lg ? 20 : 18} stroke={2.4}
        color={saved ? 'var(--accent)' : '#fff'} />
      {lg && <span>{saved ? 'Added' : 'Watchlist'}</span>}
    </button>
  );
}

// ---- Horizontal rail wrapper -------------------------------------------
function Rail({ children, gap = 12, padEnd = true }) {
  return (
    <div className="rail" style={{
      display: 'flex', gap, overflowX: 'auto', overflowY: 'hidden',
      padding: `0 20px ${padEnd ? 4 : 0}px`, scrollSnapType: 'x proximity',
      WebkitOverflowScrolling: 'touch',
    }}>{children}</div>
  );
}

// ---- Portrait movie card -----------------------------------------------
function MovieCard({ item, w = 126, onOpen }) {
  return (
    <div onClick={onOpen} className="press" style={{ flexShrink: 0, width: w, cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'relative', width: w, height: w * 1.46, borderRadius: 16,
        boxShadow: '0 8px 22px rgba(0,0,0,0.4)' }}>
        <Poster item={item} monogram />
        {item.rating && (
          <div style={{ position: 'absolute', top: 8, left: 8 }}>
            <RatingPill>{item.rating}</RatingPill>
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Ranked card (trending) --------------------------------------------
function RankCard({ item, rank, onOpen }) {
  return (
    <div onClick={onOpen} className="press" style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end',
      cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 116,
        lineHeight: 0.78, color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.45)',
        marginRight: -16, marginBottom: -6, zIndex: 1, letterSpacing: -6 }}>{rank}</div>
      <div style={{ position: 'relative', width: 118, height: 168, borderRadius: 14,
        boxShadow: '0 8px 22px rgba(0,0,0,0.45)' }}>
        <Poster item={item} radius={14} monogram />
      </div>
    </div>
  );
}

// ---- Continue watching card --------------------------------------------
function ContinueCard({ item, onOpen }) {
  return (
    <div onClick={onOpen} className="press" style={{ flexShrink: 0, width: 250, cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'relative', width: 250, height: 142, borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 8px 22px rgba(0,0,0,0.4)' }}>
        <Poster item={item} radius={14} showTitle={false} monogram />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)' }} />
        {/* play affordance */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 46, height: 46, borderRadius: 99, background: 'rgba(10,10,12,0.55)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', border: '1.5px solid rgba(255,255,255,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="play" size={20} color="#fff" style={{ marginLeft: 2 }} />
        </div>
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 9 }}>
          <ProgressBar value={item.progress} />
        </div>
      </div>
      <div style={{ marginTop: 9, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-3)', marginTop: 1 }}>
            {item.ep ? item.ep + ' · ' : ''}{item.left}</div>
        </div>
      </div>
    </div>
  );
}

// ---- Web series card (large) -------------------------------------------
function WebSeriesCard({ item, onOpen }) {
  return (
    <div onClick={onOpen} className="press" style={{ flexShrink: 0, width: 290, cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'relative', width: 290, height: 168, borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 10px 26px rgba(0,0,0,0.45)' }}>
        <Poster item={item} radius={16} showTitle={false} monogram />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.6) 8%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 11, right: 11 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#fff',
            background: 'rgba(10,10,12,0.5)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.18)', padding: '4px 9px', borderRadius: 8 }}>
            {item.episodes} Episodes</span>
        </div>
        <div style={{ position: 'absolute', left: 16, bottom: 14, right: 16 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 25, color: '#fff',
            letterSpacing: -0.4, lineHeight: 1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{item.title}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12.5, color: 'rgba(255,255,255,0.72)', marginTop: 6,
            display: 'flex', alignItems: 'center', gap: 7 }}>
            <span>{item.genre}</span>
            <span style={{ width: 3, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.4)' }} />
            <span>{item.seasons} Season{item.seasons > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Live TV card -------------------------------------------------------
function LiveBadge() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--live)',
      padding: '3px 8px 3px 7px', borderRadius: 6, fontFamily: 'var(--font-ui)', fontSize: 10.5,
      fontWeight: 800, letterSpacing: 0.6, color: '#fff' }}>
      <span className="live-dot" style={{ width: 6, height: 6, borderRadius: 99, background: '#fff' }} />LIVE
    </span>
  );
}

function LiveCard({ item, onOpen }) {
  return (
    <div onClick={onOpen} className="press" style={{ flexShrink: 0, width: 230, cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'relative', width: 230, height: 132, borderRadius: 14, overflow: 'hidden',
        boxShadow: '0 8px 22px rgba(0,0,0,0.4)' }}>
        <Poster item={item} radius={14} showTitle={false} monogram />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 10, left: 10 }}><LiveBadge /></div>
        <div style={{ position: 'absolute', top: 11, right: 11, display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
          <span style={{ width: 5, height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.7)' }} />{item.viewers}
        </div>
        <div style={{ position: 'absolute', left: 12, bottom: 11, right: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff' }}>{item.title}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 1,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Now · {item.now}</div>
        </div>
      </div>
    </div>
  );
}

// ---- Sports card --------------------------------------------------------
function SportsCard({ item, onOpen }) {
  return (
    <div onClick={onOpen} className="press" style={{ flexShrink: 0, width: 268, cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'relative', width: 268, height: 150, borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 10px 24px rgba(0,0,0,0.45)' }}>
        <Poster item={item} radius={16} showTitle={false} monogram />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.62), transparent 58%)' }} />
        <div style={{ position: 'absolute', top: 11, left: 11 }}>
          {item.live ? <LiveBadge /> : (
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10.5, fontWeight: 700, color: 'var(--text)',
              background: 'rgba(10,10,12,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.16)', padding: '3px 8px', borderRadius: 6, letterSpacing: 0.4 }}>
              {item.time}</span>
          )}
        </div>
        <div style={{ position: 'absolute', left: 14, bottom: 13, right: 14 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: 'var(--accent)',
            letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 3 }}>{item.genre}</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#fff', lineHeight: 1.05 }}>{item.title}</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'rgba(255,255,255,0.66)', marginTop: 2 }}>{item.meta}</div>
        </div>
      </div>
    </div>
  );
}

// ---- Watchlist preview card (portrait, removable) ----------------------
function WatchlistCard({ item, onRemove, onOpen }) {
  return (
    <div className="press" onClick={onOpen} style={{ flexShrink: 0, width: 116, cursor: 'pointer', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'relative', width: 116, height: 168, borderRadius: 14, boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }}>
        <Poster item={item} radius={14} monogram />
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="press" style={{
          position: 'absolute', top: 7, right: 7, width: 28, height: 28, borderRadius: 99,
          background: 'rgba(10,10,12,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name="check" size={15} stroke={2.6} color="var(--accent)" />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, {
  WatchBtn, Rail, MovieCard, RankCard, ContinueCard, WebSeriesCard,
  LiveCard, LiveBadge, SportsCard, WatchlistCard,
});
