import palacImg from '../assets/palac_kultury.jpeg'

export const RANKS = [
  { threshold: 0, name: 'Dopiero zaczynam', color: '#888' },
  { threshold: 10, name: 'Odkrywca', color: '#cd7f32' }, // Brąz
  { threshold: 50, name: 'Kartograf', color: '#c0c0c0' }, // Srebro
  { threshold: 100, name: 'Podróżnik', color: '#ffd700' }, // Złoto
  { threshold: 200, name: 'Ekspert', color: '#00ced1' }, // Diament
  { threshold: 500, name: 'Mistrz mapy', color: '#a10d0dff' }, // Rubin
  { threshold: 10000, name: 'ADMIN', color: '#9932cc' } // Legenda
];
export const START_DATA = [
  { id:1, lat:52.229, lng:21.011, title:'Pałac Kultury', desc:'Centrum Warszawy', type:'zabytek', image: palacImg,rating: 5, author: 'admin' },
  { id:2, lat:50.064, lng:19.944, title:'Rynek Główny', desc:'Centurm handlu', type:'miejsce', rating: 4.8, author: 'admin' },
  { id:3, lat:54.35, lng:18.646, title:'Fontanna Neptuna', desc:'Zabytkowa fontanna na długim targu', type:'zabytek',rating:4.6, author:'admin'}
];
export const REVIEW_DATA = [
  { id: 101, pointId: 1, author: 'Ania', rating: 5, text: 'Super widok z tarasu!', date: '2023-10-12' }
];

export const CATEGORIES = [
  { id: 'miejsce', label: 'Miejsca' },
  { id: 'restauracja', label: 'Jedzenie' },
  { id: 'zabytek', label: 'Zabytki' },
  { id: 'nocleg', label: 'Nocleg' },
  { id: 'placowka', label: "Placówki" },
  { id: 'dworzec', label: "Dworce" },
  { id: 'inne', label: 'Inne'}
];
