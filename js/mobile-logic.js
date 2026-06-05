/**
 * MOBILE-LOGIC.JS
 * Logiche attivate solo se il sistema rileva un dispositivo mobile.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inizializza i componenti interattivi mobile su tutte le piattaforme per garantire la responsività su browser ridimensionati
    initMobileMenu();
    initMobileFilters();

    // L'effetto onda (ripple) viene attivato solo su dispositivi touch effettivi
    if (document.documentElement.classList.contains('is-mobile')) {
        console.log("ZAKER_MOBILE: Rilevato touch screen, caricamento Ripple Effect.");
        initMobileRipple();
    }
});

/**
 * Gestione Menu Laterale (Side-Drawer)
 */
function initMobileMenu() {
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        if (!menu || !overlay) return;

        menu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    };

    // Chiudi al click sui link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (document.getElementById('mobile-menu').classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Chiudi se si torna a desktop (resize)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            const menu = document.getElementById('mobile-menu');
            if (menu && menu.classList.contains('open')) toggleMobileMenu();
        }
    });
}

/**
 * Effetto Onda (Ripple)
 */
function initMobileRipple() {
    const colors = ['#00f0ff', '#f92a82'];
    let index = 0;

    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const ripple = document.createElement('div');
        ripple.className = 'zk-mobile-ripple';
        ripple.style.left = `${touch.clientX}px`;
        ripple.style.top = `${touch.clientY}px`;
        ripple.style.backgroundColor = colors[index];
        ripple.style.boxShadow = `0 0 10px ${colors[index]}`;
        
        document.body.appendChild(ripple);
        index = (index + 1) % colors.length;

        setTimeout(() => ripple.remove(), 400);
    }, { passive: true });
}

/**
 * Gestione Filtri (Progetti)
 */
function initMobileFilters() {
    window.toggleMobileFilters = function() {
        const container = document.getElementById('filter-container');
        if (container) {
            container.classList.toggle('mobile-visible');
        }
    };
}
