/**
 * MOBILE-INTERACT.JS
 * Gestione interazioni esclusive per dispositivi Mobile/Touch
 * Effetto Ripple e ottimizzazioni performance
 */

document.addEventListener('DOMContentLoaded', () => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch) {
        initTouchRipple();
        document.body.classList.add('is-touch-device');
    }
});

/**
 * Inizializza l'effetto Ripple (onda) al tocco
 */
function initTouchRipple() {
    const rippleColors = ['#00f0ff', '#f92a82'];
    let colorIndex = 0;

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createRipple(touch.clientX, touch.clientY, rippleColors[colorIndex]);
        
        // Alterna i colori per l'effetto richiesto
        colorIndex = (colorIndex + 1) % rippleColors.length;
    }, { passive: true });
}

/**
 * Crea l'elemento DOM per l'onda
 */
function createRipple(x, y, color) {
    const ripple = document.createElement('div');
    ripple.className = 'zk-mobile-ripple';
    
    // Posizionamento al centro del tocco
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.backgroundColor = color;
    ripple.style.boxShadow = `0 0 15px ${color}`;

    document.body.appendChild(ripple);

    // Rimuovi l'elemento dopo l'animazione (400ms)
    setTimeout(() => {
        ripple.remove();
    }, 450);
}

/**
 * Logica per mostrare/nascondere i filtri nell'archivio (FAB style)
 */
window.toggleMobileFilters = function() {
    const container = document.getElementById('filter-container');
    if (container) {
        container.classList.toggle('mobile-visible');
        
        // Blur background when filters are open on mobile
        const grid = document.getElementById('archive-grid');
        if (grid) grid.classList.toggle('blur-sm');
    }
}
