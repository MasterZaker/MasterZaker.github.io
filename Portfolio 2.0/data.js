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
    wide: true,
    isVideo: false,
    img: 'Immagini/Test Material in Blender.png',
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
    img: 'Immagini/Wood Plank Model.png',
    desc: 'Modellazione di precisione e texturing PBR su legno logorato.',
    descEn: 'High-precision modeling and PBR texturing on worn wood.',
    year: '2026'
  },
  {
    title: 'Animazione Facciale',
    tag: 'ANIMAZIONE',
    tagEn: 'ANIMATION',
    software: ['BLENDER'],
    wide: true,
    isVideo: true,
    img: 'Video/Animazione Facciale in Blender.mp4',
    desc: 'Test di rig e animazione facciale in tempo reale.',
    descEn: 'Rig test and real-time facial animation.',
    year: '2026'
  }
];
