// 1. Troviamo gli elementi
const modal = document.getElementById("modal-foto");
const imgIngrandita = document.getElementById("img-ingrandita");
const btnChiudi = document.querySelector(".chiudi-modal");
const btnPrev = document.querySelector(".freccia.prev");
const btnNext = document.querySelector(".freccia.next");
const contenitoriProgetti = document.querySelectorAll(".thumbnail-container");

let arrayFotoCorrenti = [];
let indiceFotoAttuale = 0;
let livelloZoom = 1; // Variabile per ricordare quanto abbiamo zoomato

// --- LA FUNZIONE MAGICA CHE GESTISCE IL CAMBIO FOTO ---
function cambiaFoto(indice) {
    // A. Resetta lo zoom (torna normale quando cambi foto)
    livelloZoom = 1;
    imgIngrandita.style.transform = `scale(${livelloZoom})`;

    // B. Riavvia l'animazione di dissolvenza (un trucchetto Jedi per il browser)
    imgIngrandita.classList.remove("fade-anim");
    void imgIngrandita.offsetWidth; // Forza il browser a "ricaricare" l'animazione
    imgIngrandita.classList.add("fade-anim");

    // C. Cambia l'immagine vera e propria
    imgIngrandita.src = arrayFotoCorrenti[indice].src;
}

// 2. Aprire un progetto
contenitoriProgetti.forEach(contenitore => {
    contenitore.addEventListener("click", function() {
        arrayFotoCorrenti = Array.from(this.querySelectorAll("img"));
        indiceFotoAttuale = 0;

        // Mostra la finestra e BLOCCA LO SCROLL DEL SITO SOTTOFONDO
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Usa la funzione magica per caricare la prima foto
        cambiaFoto(indiceFotoAttuale);

        // Mostra o nascondi le frecce in base a quante foto ci sono
        if (arrayFotoCorrenti.length > 1) {
            btnPrev.style.display = "block";
            btnNext.style.display = "block";
        } else {
            btnPrev.style.display = "none";
            btnNext.style.display = "none";
        }
    });
});

// 3. Frecce Avanti e Indietro
btnNext.addEventListener("click", function() {
    indiceFotoAttuale++;
    if (indiceFotoAttuale >= arrayFotoCorrenti.length) indiceFotoAttuale = 0;
    cambiaFoto(indiceFotoAttuale); // Usa la funzione magica
});

btnPrev.addEventListener("click", function() {
    indiceFotoAttuale--;
    if (indiceFotoAttuale < 0) indiceFotoAttuale = arrayFotoCorrenti.length - 1;
    cambiaFoto(indiceFotoAttuale); // Usa la funzione magica
});

// --- FUNZIONE PER CHIUDERE TUTTO E RIATTIVARE LO SCROLL ---
function chiudiModale() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Riattiva lo scroll del sito!
}

btnChiudi.addEventListener("click", chiudiModale);

modal.addEventListener("click", function(event) {
    if (event.target === modal) chiudiModale();
});

// --- LA NOVITÀ: LO ZOOM CON LA ROTELLINA DEL MOUSE ---
imgIngrandita.addEventListener("wheel", function(event) {
    event.preventDefault(); // Evita comportamenti strani del browser

    // Se giro su, ingrandisco. Se giro giù, rimpicciolisco.
    if (event.deltaY < 0) {
        livelloZoom += 0.15;
    } else {
        livelloZoom -= 0.15;
    }

    // Limiti di sicurezza: non troppo piccolo, non troppo grande
    if (livelloZoom < 0.5) livelloZoom = 0.5;
    if (livelloZoom > 3) livelloZoom = 3;

    // Applica lo zoom alla foto!
    imgIngrandita.style.transform = `scale(${livelloZoom})`;
});