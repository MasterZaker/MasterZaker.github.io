// ==========================================
// JAVASCRIPT GLOBALE: GESTIONE LINGUE
// ==========================================

const savedLang = localStorage.getItem('zk_lang') || 'it';
document.documentElement.lang = savedLang;

function toggleLang() {
    const html = document.documentElement;
    const newLang = html.lang === 'it' ? 'en' : 'it';
    html.lang = newLang;
    localStorage.setItem('zk_lang', newLang);
    
    // Aggiorna tutti i testi del bottone switcher visualmente
    document.querySelectorAll('.lang-switcher-text').forEach(el => {
        el.innerText = newLang === 'it' ? 'EN' : 'IT';
    });
}

// Inizializza lo stato dei bottoni al caricamento del DOM
document.addEventListener("DOMContentLoaded", () => {
    const current = document.documentElement.lang;
    document.querySelectorAll('.lang-switcher-text').forEach(el => {
        el.innerText = current === 'it' ? 'EN' : 'IT';
    });
});
