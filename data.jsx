// ─────────────────────────────────────────────────────────────
// DRISHTI — content data (Bangladesh OTT)
// Titles are cultural/text references; all artwork is generated
// gradient art (no copyrighted posters).
// ─────────────────────────────────────────────────────────────

// Genre → cinematic duotone palette for generated poster art.
// [topColor, glowA, glowB, bottomColor]
const TONES = {
  drama:    ['#13303a', '#1d6e7a', '#0b1f2e', '#070d16'],
  action:   ['#3a1408', '#c2461f', '#5a1410', '#150705'],
  thriller: ['#0e1230', '#3b3f86', '#10122a', '#060713'],
  romance:  ['#34102a', '#b1426f', '#3a1340', '#140613'],
  sports:   ['#06281c', '#1f9e63', '#0a3322', '#04130d'],
  islamic:  ['#06251f', '#1f7d5e', '#1a3f2a', '#05140f'],
  comedy:   ['#3a2606', '#d59327', '#5a2c0c', '#160d04'],
  kids:     ['#2a134a', '#7b46c9', '#3a1c66', '#0e0720'],
  web:      ['#23103a', '#7a3bb0', '#3a1858', '#0d0617'],
  history:  ['#2e2208', '#9c7a1f', '#3a2a0c', '#120d04'],
  music:    ['#101a36', '#3a6fb0', '#161f3a', '#070b16'],
};

// Helper to mint a content item
const C = (title, tone, genre, extra = {}) => ({ title, tone, genre, ...extra });

const HERO = [
  C('Surongo', 'thriller', 'Thriller', {
    tagline: 'DRISHTI ORIGINAL',
    desc: 'A small-town man tunnels his way toward a fortune — and a reckoning he never planned for.',
    genres: ['Thriller', 'Crime', 'Drama'], rating: '16+', meta: '2h 8m',
  }),
  C('Hawa', 'drama', 'Drama', {
    tagline: 'DRISHTI ORIGINAL',
    desc: 'Eight fishermen, one trawler lost at sea, and a mysterious woman who changes everything.',
    genres: ['Drama', 'Mystery'], rating: '13+', meta: '2h 19m',
  }),
  C('Mohanagar', 'action', 'Series', {
    tagline: 'NEW SEASON',
    desc: 'One unforgettable night inside a Dhaka police station tests every line between law and justice.',
    genres: ['Crime', 'Thriller'], rating: '16+', meta: '2 Seasons',
  }),
  C('Karagar', 'thriller', 'Series', {
    tagline: 'DRISHTI ORIGINAL',
    desc: 'A prisoner who has not spoken in 250 years appears in cell number 145. No one knows who he is.',
    genres: ['Mystery', 'Drama'], rating: '16+', meta: '2 Seasons',
  }),
  C('Boli', 'action', 'Series', {
    tagline: 'TRENDING NOW',
    desc: 'In the brutal world of underground wrestling, a fighter risks everything for one final bout.',
    genres: ['Action', 'Sport'], rating: '18+', meta: '1 Season',
  }),
];

const CONTINUE = [
  C('Mohanagar', 'action', 'Series', { ep: 'S2 · E4', progress: 0.62, left: '22 min left' }),
  C('Aynabaji', 'thriller', 'Movie', { progress: 0.38, left: '1h 6m left' }),
  C('Taqdeer', 'drama', 'Series', { ep: 'S1 · E7', progress: 0.85, left: '8 min left' }),
  C('Debi', 'thriller', 'Movie', { progress: 0.15, left: '1h 41m left' }),
  C('Networker Baire', 'comedy', 'Series', { ep: 'S1 · E2', progress: 0.5, left: '24 min left' }),
];

const TRENDING = [
  C('Poran', 'romance', 'Movie', { rating: '16+' }),
  C('Surongo', 'thriller', 'Movie', { rating: '16+' }),
  C('Hawa', 'drama', 'Movie', { rating: '13+' }),
  C('Priyotoma', 'romance', 'Movie', { rating: '13+' }),
  C('Damal', 'sports', 'Movie', { rating: '13+' }),
  C('Karagar', 'thriller', 'Series', { rating: '16+' }),
  C('Monpura', 'drama', 'Movie', { rating: '13+' }),
];

const NEW_RELEASES = [
  C('Priyotoma', 'romance', 'Movie', { rating: '13+', year: '2026' }),
  C('Antaratma', 'thriller', 'Movie', { rating: '16+', year: '2026' }),
  C('Rebel', 'action', 'Movie', { rating: '16+', year: '2026' }),
  C('Beauty Circus', 'drama', 'Movie', { rating: '13+', year: '2026' }),
  C('Megh Roddur', 'romance', 'Movie', { rating: '13+', year: '2026' }),
  C('Shimanaheen', 'drama', 'Movie', { rating: '13+', year: '2026' }),
];

const WEB_SERIES = [
  C('Mohanagar', 'action', 'Crime · Thriller', { episodes: 16, seasons: 2 }),
  C('Karagar', 'thriller', 'Mystery', { episodes: 14, seasons: 2 }),
  C('Taqdeer', 'drama', 'Dark Comedy', { episodes: 8, seasons: 1 }),
  C('Kaiser', 'thriller', 'Crime', { episodes: 9, seasons: 1 }),
  C('Sabrina', 'thriller', 'Psychological', { episodes: 7, seasons: 1 }),
];

const LIVE = [
  C('Drishti News 24', 'thriller', 'News', { now: 'Sondhyar Khobor', viewers: '48K' }),
  C('Khela 360', 'sports', 'Sports', { now: 'BPL: Dhaka vs Sylhet', viewers: '212K' }),
  C('Probaho TV', 'romance', 'Entertainment', { now: 'Coffee With Tahsan', viewers: '31K' }),
  C('Surma Music', 'music', 'Music', { now: 'Top 20 Bangla Countdown', viewers: '19K' }),
  C('Noor TV', 'islamic', 'Islamic', { now: 'Tilawat & Tafsir', viewers: '12K' }),
];

const SPORTS = [
  C('Dhaka vs Sylhet', 'sports', 'BPL 2026 · Live', { live: true, meta: '1st Innings · 142/3', time: 'LIVE' }),
  C('Bangladesh vs India', 'sports', 'Highlights', { meta: '3rd ODI · Full highlights', time: '14:20' }),
  C('Abahani vs Mohammedan', 'sports', 'Football', { meta: 'Federation Cup Final', time: 'Replay' }),
  C('Bangabandhu Cup', 'sports', 'Kabaddi', { meta: 'Semi-final highlights', time: '08:45' }),
];

const BANGLA_MOVIES = [
  C('Monpura', 'drama', 'Movie', { rating: '13+' }),
  C('Aynabaji', 'thriller', 'Movie', { rating: '16+' }),
  C('Debi', 'thriller', 'Movie', { rating: '16+' }),
  C('Television', 'drama', 'Movie', { rating: '13+' }),
  C('Doob', 'drama', 'Movie', { rating: '13+' }),
  C('Dhaka Attack', 'action', 'Movie', { rating: '16+' }),
];

const RECOMMENDED = [
  C('Antaratma', 'thriller', 'Movie', { rating: '16+' }),
  C('Megh Roddur', 'romance', 'Movie', { rating: '13+' }),
  C('Rebel', 'action', 'Movie', { rating: '16+' }),
  C('Shimanaheen', 'drama', 'Movie', { rating: '13+' }),
  C('Boli', 'action', 'Series', { rating: '18+' }),
  C('Kaiser', 'thriller', 'Series', { rating: '16+' }),
];

const GENRES = [
  { label: 'Action', tone: 'action' },
  { label: 'Drama', tone: 'drama' },
  { label: 'Thriller', tone: 'thriller' },
  { label: 'Comedy', tone: 'comedy' },
  { label: 'Romance', tone: 'romance' },
  { label: 'Sports', tone: 'sports' },
  { label: 'Islamic', tone: 'islamic' },
  { label: 'Kids', tone: 'kids' },
  { label: 'Web Series', tone: 'web' },
  { label: 'History', tone: 'history' },
];

const TOP_TABS = ['Home', 'Series', 'Movies', 'Live', 'Sports'];

Object.assign(window, {
  TONES, HERO, CONTINUE, TRENDING, NEW_RELEASES, WEB_SERIES,
  LIVE, SPORTS, BANGLA_MOVIES, RECOMMENDED, GENRES, TOP_TABS,
});
