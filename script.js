/* ---------- theme (in-memory only, no storage APIs used) ---------- */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const knobIcon = document.getElementById('knobIcon');
const moonPath = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
const sunPath = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>';

function setTheme(mode){
  html.setAttribute('data-theme', mode);
  if(knobIcon) knobIcon.innerHTML = mode === 'dark' ? moonPath : sunPath;
}
if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });
}
setTheme('light');

/* ---------- header shrink on scroll ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if(header) header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- custom cursor ---------- */
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mx = 0, my = 0, rx = 0, ry = 0;
window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top = my + 'px';
});
(function ringLoop(){
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(ringLoop);
})();
function bindCursorHover(el){
  el.addEventListener('mouseenter', () => cursorRing.classList.add('big'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('big'));
}
document.querySelectorAll('a, button, .lens, [data-cursor="hover"]').forEach(bindCursorHover);

/* ---------- magnetic buttons ---------- */
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2) * 0.25;
    const dy = (e.clientY - r.top - r.height/2) * 0.4;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
});

/* ---------- liquid-glass portrait lens ---------- */
document.querySelectorAll('.portrait-wrap').forEach(wrap => {
  const lens = wrap.querySelector('.lens');
  const lensImg = wrap.querySelector('.lens img');
  if(!lens || !lensImg) return;

  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    lens.style.left = x + 'px';
    lens.style.top = y + 'px';
    lensImg.style.left = (-x + lens.offsetWidth/2) + 'px';
    lensImg.style.top = (-y + lens.offsetHeight/2) + 'px';
    lensImg.style.width = r.width + 'px';
    lensImg.style.height = r.height + 'px';
  });
  wrap.addEventListener('mouseenter', () => wrap.classList.add('lens-active'));
  wrap.addEventListener('mouseleave', () => wrap.classList.remove('lens-active'));
});

/* =========================================================
   CONTENT FROM data.js (SITE_DATA) — photos, work, instagram.
   Edit data.js, not this file, to change what shows up here.
   ========================================================= */
if(typeof SITE_DATA !== 'undefined'){
  const heroBase = document.querySelector('.portrait-wrap .base-img');
  const heroLensImg = document.querySelector('.portrait-wrap .lens img');
  if(heroBase && SITE_DATA.heroPortrait) heroBase.src = SITE_DATA.heroPortrait.main;
  if(heroLensImg && SITE_DATA.heroPortrait) heroLensImg.src = SITE_DATA.heroPortrait.alt;

  document.querySelectorAll('[data-ig-link]').forEach(el => el.href = SITE_DATA.instagram.url);
  document.querySelectorAll('[data-ig-handle]').forEach(el => el.textContent = SITE_DATA.instagram.handle);

  const workGrid = document.getElementById('workGrid');
  if(workGrid && SITE_DATA.selectedWork){
    workGrid.innerHTML = SITE_DATA.selectedWork.map(item => `
      <a href="gallery.html">
        <img src="${item.src}" alt="${item.label}" loading="lazy">
        <span class="label">${item.label}</span>
      </a>`).join('');
  }

  const galleryGrid = document.getElementById('galleryGrid');
  if(galleryGrid && SITE_DATA.gallery){
    galleryGrid.innerHTML = SITE_DATA.gallery.map(item => `
      <figure data-category="${item.category}" data-full="${item.full}">
        <img src="${item.src}" alt="${item.caption}" loading="lazy">
        <figcaption>${item.caption}</figcaption>
      </figure>`).join('');
  }
}

/* ---------- gallery lightbox (only present on gallery page) ---------- */
const lightbox = document.getElementById('lightbox');
if(lightbox){
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('#galleryGrid figure').forEach(fig => {
    fig.addEventListener('click', () => {
      lightboxImg.src = fig.getAttribute('data-full');
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('open'); });
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') lightbox.classList.remove('open'); });
}

/* ---------- gallery filter (only present on gallery page) ---------- */
const filterBar = document.getElementById('filterBar');
if(filterBar){
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if(!btn) return;
    filterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('#galleryGrid figure').forEach(fig => {
      fig.classList.toggle('hidden', !(cat === 'all' || fig.dataset.category === cat));
    });
  });
}

/* =====================================================================
   PLAYLIST — sourced from data.js (SITE_DATA.tracks) when available,
   otherwise falls back to these defaults. To change the songs, edit
   the "tracks" list in data.js — no need to touch this file.
   src: path to your own audio file (e.g. "audio/track-1.mp3").
   Add an /audio folder next to these HTML files and drop your mp3s there.
===================================================================== */
const TRACKS = (typeof SITE_DATA !== 'undefined' && SITE_DATA.tracks && SITE_DATA.tracks.length)
  ? SITE_DATA.tracks
  : [
      { title: "Track One",   artist: "Artist Name", cover: "https://picsum.photos/seed/track1/300/300", src: "audio/track-1.mp3" },
      { title: "Track Two",   artist: "Artist Name", cover: "https://picsum.photos/seed/track2/300/300", src: "audio/track-2.mp3" },
      { title: "Track Three", artist: "Artist Name", cover: "https://picsum.photos/seed/track3/300/300", src: "audio/track-3.mp3" }
    ];

/* ---------- bottom tab bar: slide indicator under the active tab ---------- */
const tabbar = document.getElementById('iosTabbar');
if(tabbar){
  const indicator = document.getElementById('tabIndicator');
  function positionIndicator(el){
    if(!el || !indicator) return;
    indicator.style.left = el.offsetLeft + 'px';
    indicator.style.width = el.offsetWidth + 'px';
  }
  const activeItem = tabbar.querySelector('.tab-item.active');
  requestAnimationFrame(() => positionIndicator(activeItem));
  window.addEventListener('resize', () => positionIndicator(tabbar.querySelector('.tab-item.active')));
}

/* ---------- floating media player (mini bar + expandable playlist) ---------- */
const playerEl = document.getElementById('player');
if(playerEl && TRACKS.length){
  const audio = document.getElementById('audioEl');
  const cover = document.getElementById('playerCover');
  const titleEl = document.getElementById('playerTitle');
  const artistEl = document.getElementById('playerArtist');
  const playBtn = document.getElementById('playBtn');
  const playIconEl = document.getElementById('playIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const bar = document.getElementById('playerBar');
  const expandBtn = document.getElementById('playerExpand');
  const progress = document.getElementById('playerProgress');
  const fill = document.getElementById('progressFill');
  const list = document.getElementById('playerList');

  const ICON_PLAY = '<path d="M8 5v14l11-7z"/>';
  const ICON_PAUSE = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';

  let idx = 0;
  let isPlaying = false;

  function renderList(){
    list.innerHTML = TRACKS.map((t, i) => `
      <div class="track-row${i === idx ? ' playing' : ''}" data-index="${i}">
        <img src="${t.cover}" alt="${t.title} cover">
        <div>
          <div class="t-title">${t.title}</div>
          <div class="t-artist">${t.artist}</div>
        </div>
        <svg class="eq" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="10" width="3" height="8"/><rect x="10.5" y="6" width="3" height="12"/><rect x="17" y="12" width="3" height="6"/></svg>
      </div>
    `).join('');
    list.querySelectorAll('.track-row').forEach(row => {
      row.addEventListener('click', () => {
        const i = parseInt(row.dataset.index, 10);
        loadTrack(i);
        play();
      });
    });
  }

  function loadTrack(i){
    idx = (i + TRACKS.length) % TRACKS.length;
    const t = TRACKS[idx];
    cover.src = t.cover;
    titleEl.textContent = t.title;
    artistEl.textContent = t.artist;
    audio.src = t.src;
    fill.style.width = '0%';
    renderList();
  }

  function play(){
    audio.play().catch(() => { /* file missing until you add your own mp3 */ });
    isPlaying = true;
    playIconEl.innerHTML = ICON_PAUSE;
  }
  function pause(){
    audio.pause();
    isPlaying = false;
    playIconEl.innerHTML = ICON_PLAY;
  }

  playBtn.addEventListener('click', (e) => { e.stopPropagation(); isPlaying ? pause() : play(); });
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); loadTrack(idx - 1); if(isPlaying) play(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); loadTrack(idx + 1); if(isPlaying) play(); });
  audio.addEventListener('ended', () => { loadTrack(idx + 1); play(); });
  audio.addEventListener('timeupdate', () => {
    if(audio.duration){ fill.style.width = (audio.currentTime / audio.duration * 100) + '%'; }
  });

  bar.addEventListener('click', () => playerEl.classList.toggle('open'));
  expandBtn.addEventListener('click', (e) => { e.stopPropagation(); playerEl.classList.toggle('open'); });
  progress.addEventListener('click', (e) => {
    e.stopPropagation();
    const r = progress.getBoundingClientRect();
    const pct = (e.clientX - r.left) / r.width;
    if(audio.duration) audio.currentTime = pct * audio.duration;
  });

  loadTrack(0);
}
