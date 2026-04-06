// ==========================================
// MAIN.JS - Logiche Generali del Portfolio
// Cursore custom, Lightbox e Popolamento Grids
// ==========================================

// 1. CURSORE CUSTOM
function initCursor() {
  if (!document.getElementById('zk-cursor')) {
    const curDiv = document.createElement('div');
    curDiv.id = 'zk-cursor';
    curDiv.setAttribute('aria-hidden', 'true');
    curDiv.innerHTML = `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 16 3 L 5 28 L 16 22 L 27 28 Z" fill="#00f0ff"/>
        <path d="M 16 3 L 16 22 L 27 28 Z" fill="#f92a82"/>
      </svg>
    `;
    document.body.appendChild(curDiv);
  }

  var cur = document.getElementById('zk-cursor');
  if (!cur) return;

  window.addEventListener('mousemove', function(e){
    cur.style.transform = 'translate(' + (e.clientX - 16) + 'px,' + (e.clientY - 3) + 'px)';
  }, { passive: true });

  window.addEventListener('mousedown', function(){ cur.classList.add('zk-click'); });
  window.addEventListener('mouseup',   function(){ cur.classList.remove('zk-click'); });

  function updateHoverEffects() {
    var interactors = 'a, button, input, [role="button"], label, .cursor-pointer, article.card-glow';
    document.querySelectorAll(interactors).forEach(function(el){
      if(!el.dataset.cursorInit) {
        el.addEventListener('mouseenter', function(){ cur.classList.add('zk-hover'); });
        el.addEventListener('mouseleave', function(){ cur.classList.remove('zk-hover'); });
        el.dataset.cursorInit = "true";
      }
    });
  }
  
  updateHoverEffects(); // Prima esecuzione

  const observer = new MutationObserver(updateHoverEffects);
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener('mouseleave',  function(){ cur.style.opacity = '0'; });
  document.addEventListener('mouseenter',  function(){ cur.style.opacity = '1'; });
}

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
} else {
    initCursor();
}

// ==========================================
// 2. LOGICHE DI RENDER (Home & Archivio)
// ==========================================

function shuffle(arr){ return arr.sort(()=>Math.random()-0.5); }

document.addEventListener("DOMContentLoaded", () => {
    const ALL_PROJECTS = window.ZAKER_PROJECTS || [];
    const isIndex = location.pathname.endsWith('index.html') || location.pathname.endsWith('/') || location.pathname === '';
    
    // --> RANDOM GRID (INDEX.HTML)
    const randomContainer = document.getElementById('random-projects');
    if (randomContainer && ALL_PROJECTS.length > 0) {
        const shuffled = shuffle([...ALL_PROJECTS]);
        const selected = shuffled.slice(0, 3);
        
        randomContainer.innerHTML = selected.map(p => {
          const span = p.wide ? 'md:col-span-2' : '';
          const aspect = p.wide ? 'aspect-video' : 'aspect-square';
          let mediaHTML = p.isVideo 
            ? `<video class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" src="${p.img}" autoplay muted loop playsinline></video>` 
            : `<img alt="${p.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" src="${p.img}"/>`;

          return `<div class="group relative ${span} ${aspect} overflow-hidden rounded-xl bg-surface-container-lowest cursor-pointer" onclick="location.href='archivio.html'">
            ${mediaHTML}
            <div class="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-transparent to-transparent opacity-90"></div>
            <div class="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="px-3 py-1 bg-primary-container/20 text-primary-container text-[10px] font-label font-bold uppercase tracking-wider rounded-full border border-primary-container/30">
                  <span class="lang-it">${p.tag}</span><span class="lang-en">${p.tagEn}</span>
                </span>
                ${(p.software || []).map(sw => `<span class="px-3 py-1 bg-surface-container-highest/60 text-on-surface-variant text-[10px] font-label font-bold rounded-full">${sw}</span>`).join('')}
              </div>
              <h3 class="font-display text-${p.wide?'3xl':'xl'} font-bold text-[#e1e1ef] mb-1">${p.title}</h3>
              <p class="text-[#b9cacb] font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span class="lang-it">${p.desc}</span><span class="lang-en">${p.descEn}</span>
              </p>
            </div>
          </div>`;
        }).join('');
    }
    
    // Stats Counter
    const countEl = document.getElementById('index-models-count');
    const archCounter = document.getElementById('archivio-models-count');
    if(countEl || archCounter) {
        const modelliCompletati = ALL_PROJECTS.filter(p => p.tag === 'MODELLAZIONE 3D').length;
        if(countEl) countEl.innerText = modelliCompletati;
        if(archCounter) archCounter.innerText = modelliCompletati;
    }

    // --> COMPLETE GRID (ARCHIVIO.HTML)
    const archiveGrid = document.getElementById('archive-grid');
    if (archiveGrid) {
      function renderArchiveProjects(filter = 'TUTTI') {
        archiveGrid.innerHTML = '';
        const filtered = ALL_PROJECTS.filter(p => filter === 'TUTTI' || p.tag === filter);

        filtered.forEach(p => {
          let mediaHTML = p.isVideo
            ? `<video class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" src="${p.img}" autoplay muted loop playsinline></video>`
            : `<img alt="${p.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" src="${p.img}"/>`;

          const softwareHTML = (p.software || []).map(sw => `<span class="px-3 py-1 bg-surface-container-highest rounded-sm font-label font-bold text-[10px] text-on-surface-variant">${sw}</span>`).join('');

          const article = document.createElement('article');
          article.className = "group relative flex flex-col surface-container-lowest overflow-hidden transition-all duration-500 card-glow cursor-pointer";
          article.innerHTML = `
            <div class="relative aspect-video overflow-hidden rounded-xl bg-surface-container">
              ${mediaHTML}
              <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60"></div>
              <div class="absolute bottom-4 left-4 flex gap-2">
                <span class="px-2 py-1 bg-surface-variant/60 backdrop-blur-md rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-primary-fixed">
                    <span class="lang-it">${p.tag}</span><span class="lang-en">${p.tagEn}</span>
                </span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-display text-xl font-bold tracking-tight text-on-surface group-hover:text-primary-container transition-colors">${p.title}</h3>
                <span class="font-label text-[10px] text-outline-variant uppercase">${p.year || ''}</span>
              </div>
              <div class="flex flex-wrap gap-2 mt-4">
                ${softwareHTML}
              </div>
            </div>
          `;

          article.addEventListener('click', function (e) {
            let isVideo = p.isVideo;
            openLightbox(p.img, isVideo);
          });

          archiveGrid.appendChild(article);
        });

        // Riallinea stato lingue dopo inject DOM
        const savedLang = localStorage.getItem('zk_lang') || 'it';
        document.documentElement.lang = savedLang;
      }

      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('bg-primary-container', 'text-on-primary', 'border-primary-container');
            b.classList.add('bg-transparent', 'text-on-surface-variant', 'border-outline-variant/30');
          });
          btn.classList.add('bg-primary-container', 'text-on-primary', 'border-primary-container');
          btn.classList.remove('bg-transparent', 'text-on-surface-variant', 'border-outline-variant/30');
          renderArchiveProjects(btn.dataset.filter);
        });
      });

      renderArchiveProjects('TUTTI');
    }
});


// ==========================================
// 3. LOGICA LIGHTBOX (MODALE)
// ==========================================
let currentZoom = 1;

window.openLightbox = function(src, isVideo) {
    document.body.style.overflow = 'hidden'; // prevent scroll
    
    // Inject lightbox se non esiste
    let lb = document.getElementById('zk-lightbox');
    if(!lb) {
      lb = document.createElement('div');
      lb.id = 'zk-lightbox';
      lb.className = "fixed inset-0 z-[100] hidden items-center justify-center bg-[#0c0e17]/95 backdrop-blur-md opacity-0 transition-opacity duration-300";
      lb.innerHTML = `
        <button onclick="closeLightbox()"
          class="absolute top-4 right-4 md:top-8 md:right-8 text-on-surface-variant hover:text-accent-pink transition-colors z-[110] bg-surface-container/50 rounded-full p-2 backdrop-blur-lg border border-outline-variant/30">
          <span class="material-symbols-outlined text-4xl block font-bold transition-transform hover:scale-110">close</span>
        </button>
        <div class="relative w-full h-full flex items-center justify-center overflow-hidden" oncontextmenu="return false;">
          <img id="lightbox-img" class="max-w-[90vw] max-h-[90vh] object-contain hidden pointer-events-auto transition-transform duration-75" src="" draggable="false" />
          <video id="lightbox-video" class="max-w-[90vw] max-h-[90vh] hidden pointer-events-auto" controls controlsList="nodownload" oncontextmenu="return false;"></video>
        </div>
      `;
      document.body.appendChild(lb);

      // Setup zoom events on newly created lightbox
      lb.addEventListener('wheel', function (e) {
        if (lb.classList.contains('hidden')) return;
        e.preventDefault();
        const img = document.getElementById('lightbox-img');
        const vid = document.getElementById('lightbox-video');
        
        if (e.deltaY < 0) {
            currentZoom += 0.15;
        } else {
            currentZoom -= 0.15;
        }
        currentZoom = Math.max(0.2, Math.min(currentZoom, 6));
        
        if(!img.classList.contains('hidden')) {
           img.style.transform = `scale(${currentZoom})`;
        } else if(!vid.classList.contains('hidden')) {
           vid.style.transform = `scale(${currentZoom})`;
        }
      }, { passive: false });
    }

    const img = document.getElementById('lightbox-img');
    const vid = document.getElementById('lightbox-video');

    currentZoom = 1;
    img.style.transform = `scale(${currentZoom})`;
    vid.style.transform = `scale(${currentZoom})`;

    if (isVideo) {
      img.classList.add('hidden');
      vid.src = src;
      vid.classList.remove('hidden');
      vid.play();
    } else {
      vid.classList.add('hidden');
      vid.pause();
      img.src = src;
      img.classList.remove('hidden');
    }

    lb.classList.remove('hidden');
    lb.classList.add('flex');
    void lb.offsetWidth; // force reflow
    lb.classList.remove('opacity-0');
    lb.classList.add('opacity-100');
}

window.closeLightbox = function() {
    document.body.style.overflow = ''; // allow scroll again
    const lb = document.getElementById('zk-lightbox');
    if(!lb) return;
    
    const vid = document.getElementById('lightbox-video');

    lb.classList.remove('opacity-100');
    lb.classList.add('opacity-0');
    setTimeout(() => {
      lb.classList.remove('flex');
      lb.classList.add('hidden');
      if(vid) {
         vid.pause();
         vid.src = "";
      }
    }, 300);
}
