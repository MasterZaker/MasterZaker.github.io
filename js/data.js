/**
 * DATABASE DEI PROGETTI ZAKER
 * --------------------------------
 * Aggiungi qui i tuoi nuovi lavori copiando il formato di un blocco esistente.
 *
 * Attenzione, per far funzionare correttamente i filtri, il parametro "tag" (Categoria) deve essere ESATTAMENTE
 * uno dei seguenti:
 * - "MODELLAZIONE 3D"
 * - "ANIMAZIONE"
 * - "SVILUPPO"
 * - "PROGETTI PERSONALI"
 *
 * Il tagEn e' la sua traduzione esatta:
 * - "3D MODELING"
 * - "ANIMATION"
 * - "DEVELOPMENT"
 * - "PERSONAL PROJECTS"
 *
 * "software" è un Array, puoi metterne quanti ne vuoi chiusi tra virgolette e separati da virgola.
 * Esempio: software: ["BLENDER", "ZBRUSH", "MARMOSET"]
 */

window.ZAKER_PROJECTS = [
  {
    title: 'Test Material',
    tag: 'MODELLAZIONE 3D',
    tagEn: '3D MODELING',
    software: ['BLENDER'],
    wide: false,
    isVideo: false,
    img: 'immagini/Test Material in Blender.png',
    desc: 'Test e render di un materiale architetturale in Blender.',
    descEn: 'Architectural material test and render inside Blender.',
    year: '2026'
  },
  {
    title: 'Wood Plank Model',
    tag: 'MODELLAZIONE 3D',
    tagEn: '3D MODELING',
    software: ['BLENDER'],
    wide: false,
    isVideo: false,
    img: 'immagini/Wood Plank Model.png',
    desc: 'Modellazione di precisione e texturing PBR su legno logorato.',
    descEn: 'High-precision modeling and PBR texturing on worn wood.',
    year: '2026'
  },
  {
    title: 'Animazione Facciale',
    tag: 'ANIMAZIONE',
    tagEn: 'ANIMATION',
    software: ['BLENDER'],
    wide: false,
    isVideo: true,
    img: 'video/Animazione Facciale in Blender.mp4',
    desc: 'Test di rig e animazione facciale in tempo reale.',
    descEn: 'Rig test and real-time facial animation.',
    year: '2026'
  }
];

/* =========================================================
   RENDERER — replaces whatever was rendering cards before.
   Call renderArchive() once the DOM is ready.
   ========================================================= */

function renderArchive(filterTag = 'TUTTI') {
  const grid = document.getElementById('archive-grid');
  const countEl = document.getElementById('archivio-models-count');
  if (!grid) return;

  const isEN = document.documentElement.classList.contains('lang-en') ||
               localStorage.getItem('lang') === 'en';

  const projects = window.ZAKER_PROJECTS;

  const filtered = filterTag === 'TUTTI'
    ? projects
    : projects.filter(p => p.tag === filterTag);

  // Update counter
  if (countEl) countEl.textContent = String(projects.length).padStart(2, '0');

  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-on-surface-variant py-20 font-label tracking-widest uppercase text-sm opacity-50">
      ${isEN ? 'No projects found.' : 'Nessun progetto trovato.'}
    </p>`;
    return;
  }

  filtered.forEach((p, i) => {
    const label   = isEN ? p.tagEn  : p.tag;
    const desc    = isEN ? p.descEn : p.desc;

    /* Wide cards span 2 columns on md+ screens */
    const spanClass = p.wide ? 'md:col-span-2' : '';

    /* Tag accent colour */
    const tagColor = p.tag === 'ANIMAZIONE'         ? '#f92a82'
                   : p.tag === 'SVILUPPO'            ? '#a78bfa'
                   : p.tag === 'PROGETTI PERSONALI'  ? '#fbbf24'
                   :                                   '#00f0ff'; /* MODELLAZIONE 3D */

    /* Media block — video or image */
    const mediaBlock = p.isVideo
      ? `<video
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="${p.img}"
            autoplay loop muted playsinline
            preload="metadata"
         ></video>`
      : `<img
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="${p.img}"
            alt="${p.title}"
            loading="lazy"
         />`;

    /* Software badges */
    const badges = p.software.map(s =>
      `<span class="font-['Orbitron'] text-[0.55rem] tracking-widest px-2 py-0.5
                    bg-surface-container-high border border-outline-variant/30
                    text-on-surface-variant rounded-sm">${s}</span>`
    ).join('');

    const card = document.createElement('article');
    card.className = `project-card group relative flex flex-col bg-surface-container-lowest
                      border border-outline-variant/10 rounded-xl overflow-hidden
                      hover:border-[${tagColor}]/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]
                      transition-all duration-300 cursor-pointer ${spanClass}`;
    card.dataset.tag = p.tag;

    /* Fixed aspect ratio wrapper keeps every card's image uniform */
    card.innerHTML = `
      <!-- IMAGE / VIDEO — fixed 16:9 aspect ratio -->
      <div class="relative w-full overflow-hidden" style="aspect-ratio:16/9">
        ${mediaBlock}
        <!-- Year badge -->
        <span class="absolute top-3 right-3 font-['Orbitron'] text-[0.6rem] tracking-widest
                     bg-black/60 backdrop-blur-sm text-[${tagColor}] px-2 py-1 rounded-sm">
          ${p.year}
        </span>
        <!-- Hover overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <p class="text-white/90 text-sm leading-relaxed font-light">${desc}</p>
        </div>
      </div>

      <!-- CARD FOOTER -->
      <div class="flex flex-col gap-3 p-5">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-['Orbitron'] font-bold text-base leading-tight tracking-tight text-on-surface">
            ${p.title}
          </h3>
          <!-- Category tag pill -->
          <span class="shrink-0 font-label text-[0.55rem] tracking-widest uppercase px-2 py-1 rounded-sm border"
                style="color:${tagColor};border-color:${tagColor}40;background:${tagColor}10">
            ${label}
          </span>
        </div>
        <!-- Software badges row -->
        <div class="flex flex-wrap gap-1.5">
          ${badges}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* =========================================================
   FILTER LOGIC
   ========================================================= */
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => {
        b.classList.remove('bg-primary-container', 'text-on-primary');
        b.classList.add('bg-transparent', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary-container', 'text-on-primary');
      btn.classList.remove('bg-transparent', 'text-on-surface-variant');

      renderArchive(btn.dataset.filter);
    });
  });
}

/* =========================================================
   BOOT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderArchive('TUTTI');
  initFilters();
});