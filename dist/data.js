"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint linebreak-style: ["error", "windows"] */
var _default = {
  products: [{
    _id: '111111111111111111111111',
    name: 'Analisi Matematica 1',
    category: 'Anno Accademico: 1°',
    image: '/images/analisi1.jpg',
    description: 'Definizioni, teoremi e dimostrazioni di Analisi Matematica 1. <br> Avvertenze: non è vero che dopo Analisi è tutto in discesa!',
    original_price: 52,
    price: 26,
    rating: 1.5,
    numReviews: 1560,
    countInStock: 5
  }, {
    _id: '222222222222222222222222',
    name: 'Esami di Analisi Matematica 1',
    category: 'Anno Accademico: 1°',
    image: '/images/analisi-esami.jpg',
    description: 'Raccolta di esami svolti di Analisi Matematica 1. <br> Avvertenze: Non prendere sottogamba la soglia! ',
    price: 13,
    original_price: 26,
    rating: 5,
    numReviews: 321,
    countInStock: 6
  }, {
    _id: '333333333333333333333333',
    name: 'Esercizi di Analisi Matematica 1',
    category: 'Anno Accademico: 1°',
    image: '/images/an1es.jpg',
    description: `Raccolta di esercizi svolti di Analisi Matematica 1. <br> Avvertenze: Fanne il più possibile per evitare di prendere delle "cantonate"!`,
    price: 12,
    original_price: 24,
    rating: 3.5,
    numReviews: 56,
    countInStock: 4
  }, {
    _id: '444444444444444444444444',
    name: 'Geometria e Algebra Lineare',
    category: 'Anno Accademico: 1°',
    image: '/images/geom.jpg',
    description: 'Definizioni, teoremi e dimostrazioni di algebra lineare. <br> Avvertenze: Non ci cascare! Non è la geometria del teorema di Pitagora...',
    price: 20,
    original_price: 40,
    rating: 4.5,
    numReviews: 245,
    countInStock: 9
  }, {
    _id: '555555555555555555555555',
    name: 'Fisica 1',
    category: 'Anno Accademico: 1°',
    image: '/images/fisica1.jpg',
    description: 'Uno sguardo approfondito sul mondo della meccanica e della termodinamica <br> Avvertenze: non affidarti ai risultati degli esercizi...',
    price: 22,
    original_price: 44,
    rating: 5,
    numReviews: 123,
    countInStock: 2
  }, {
    _id: '666666666666666666666666',
    name: 'Python',
    category: 'Anno Accademico: 1°',
    image: '/images/phyton.jpg',
    description: `Una breve introduzione al linguaggio di programmazione Python <br> Avvertenze: non affezionarti troppo a Python, JavaScript e C++ sono dietro l'angolo.`,
    price: 5,
    original_price: 9.90,
    rating: 2,
    numReviews: 78,
    countInStock: 0
  }, {
    _id: '777777777777777777777777',
    name: 'C++',
    category: 'Anno Accademico: 1°',
    image: '/images/c++.jpg',
    description: 'Il linguaggio di programmazione C++ a 360 gradi <br> Avvertenze: Armati di camomilla per creare le classi!',
    price: 11,
    original_price: 22,
    rating: 2,
    numReviews: 78,
    countInStock: 3
  }, {
    _id: '888888888888888888888888',
    name: 'Elementi di Elettronica Digitale',
    category: 'Anno Accademico: 1°',
    image: '/images/elettronica.jpg',
    description: `Introduzione al mondo dell'elettronica <br> Avvertenze: il computer costa, se Matlab crasha non lanciarlo contro il muro`,
    price: 16,
    original_price: 32,
    rating: 2,
    numReviews: 78,
    countInStock: 8
  }, {
    _id: '999999999999999999999999',
    name: 'Teoria dei Segnali',
    category: 'Anno Accademico: 2°',
    image: '/images/tds.jpg',
    description: 'Dimostrazioni, spiegazioni, esempi ed esercizi del mondo dei segnali analogici. <br> Avvertenze: non spaventarti per i troppi integrali, diventeranno i tuoi migliori amici.',
    price: 8,
    original_price: 16,
    rating: 2,
    numReviews: 78,
    countInStock: 5
  }, {
    _id: '101010101010101010101010',
    name: 'Fisica 2',
    category: 'Anno Accademico: 2°',
    image: '/images/fisica2.jpg',
    description: `Uno sguardo approfondito sul mondo dell'elettromagnetismo e delle onde. <br> Avvertenze: anche se penserai negativo sarai attratto da una carica positiva.`,
    price: 16,
    original_price: 32,
    rating: 2,
    numReviews: 78,
    countInStock: 6
  }, {
    _id: '011011011011011011011011',
    name: 'Analisi 2',
    category: 'Anno Accademico: 2°',
    image: '/images/an2.jpg',
    description: 'Definizioni, teoremi e dimsotrazioni di Analisi Matematica 2. <br> Avvertenze: prepara lo shuttle, verrai catapultato nella terza dimensione',
    price: 24,
    original_price: 48,
    rating: 2,
    numReviews: 78,
    countInStock: 8
  }, {
    _id: '121212121212121212121212',
    name: 'Big Data & Business Intelligence',
    category: 'Anno Accademico: 3°',
    image: '/images/ai.jpg',
    description: 'Data mining & Data analysis. <br> Avvertenze: se Elon Musk vuoi diventare, AI devi studiare.',
    price: 20,
    original_price: 40,
    rating: 2,
    numReviews: 78,
    countInStock: 0
  }, {
    _id: '131313131313131313131313',
    name: 'Basi di Dati',
    category: 'Anno Accademico: 3°',
    image: '/images/basi.jpg',
    description: `Tutto quello che c'è da sapere sul linguaggio SQL e sui database. <br> Avvertenze: ricordati di studiare, non basta essere SQLato per passare gli esami!`,
    price: 23,
    original_price: 46,
    rating: 2,
    numReviews: 78,
    countInStock: 6
  }, {
    _id: '141414141414141414141414',
    name: 'Tecnologie Internet',
    category: 'Anno Accademico: 3°',
    image: '/images/tec.jpg',
    description: `Lo scheletro, gli organi e la pelle dell'Internet. <br> Avvertenze: prima di investire in Bitcoin assicurati di aver studiato bene il meccanismo delle Blockchain`,
    price: 34,
    original_price: 68,
    rating: 2,
    numReviews: 78,
    countInStock: 5
  }, {
    _id: '151515151515151515151515',
    name: 'Cybersecurity',
    category: 'Anno Accademico: 3°',
    image: '/images/cyber.jpg',
    description: `Tutto quello che c'è da sapere riguardo la Cybersecurity. <br> Avvertenze: ricordati che hackerare il profilo del fidanzato/a è illegale!`,
    price: 30,
    original_price: 60,
    rating: 2,
    numReviews: 78,
    countInStock: 3
  }]
};
exports.default = _default;