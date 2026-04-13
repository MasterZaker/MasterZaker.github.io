/**
 * DEVICE-DETECT.JS
 * Sistema sofisticato di rilevamento del dispositivo.
 * Distingue tra Desktop e Mobile/Tablet per l'attivazione delle logiche dedicate.
 */

(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const forceMode = urlParams.get('mode');
    
    const ua = navigator.userAgent;
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTouchInput = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
    // Ritorno alla logica rigorosa: Mobile solo se c'è touch E larghezza ridotta, o UserAgent specifico
    const isActuallyMobile = (forceMode === 'mobile') || isMobileDevice || (isTouchInput && window.innerWidth < 1024);

    if (isActuallyMobile && forceMode !== 'desktop') {
        document.documentElement.classList.add('is-mobile');
        window.ZAKER_VERSION = 'mobile';
    } else {
        document.documentElement.classList.add('is-desktop');
        window.ZAKER_VERSION = 'web';
    }
    
    console.log("ZAKER_ENGINE: Sezione " + window.ZAKER_VERSION.toUpperCase() + " attivata.");
})();
