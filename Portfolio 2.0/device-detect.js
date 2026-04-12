/**
 * DEVICE-DETECT.JS
 * Sistema sofisticato di rilevamento del dispositivo.
 * Distingue tra Desktop e Mobile/Tablet per l'attivazione delle logiche dedicate.
 */

(function() {
    const ua = navigator.userAgent;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTouchInput = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Uniamo il rilevamento UserAgent alla capacità touch per una precisione maggiore
    // Nota: Escludiamo i laptop con schermo touch dalla modalità "is-mobile" 
    // basandoci sulla larghezza dello schermo se necessario, o lasciando che 
    // l'utente Agent faccia il grosso del lavoro.
    const isActuallyMobile = isMobileDevice || (isTouchInput && window.innerWidth < 1024);

    if (isActuallyMobile) {
        document.documentElement.classList.add('is-mobile');
        window.ZAKER_VERSION = 'mobile';
    } else {
        document.documentElement.classList.add('is-desktop');
        window.ZAKER_VERSION = 'web';
    }
    
    console.log("ZAKER_ENGINE: Sezione " + window.ZAKER_VERSION.toUpperCase() + " attivata.");
})();
