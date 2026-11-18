// Plan de course sur 12 semaines (lun : footing · mer : qualité · ven : sortie longue)
// {E},{T},{I},{O10} = allures calculées à partir des records
export const PH = {
  Apprentissage: 'On apprend les mouvements et on installe la routine. Muscu à 2–3 reps en réserve, course facile et régulière.',
  Charge: 'Charges réelles en muscu : monte d\'une plaque dès que tu atteins le haut de la fourchette. La sortie longue s\'allonge doucement.',
  'Allègement': 'Semaine de récupération : mêmes charges, une série de moins par exercice. C\'est là que le muscle se construit.',
  Volume: '+1 série sur tes 3 exercices prioritaires. Sortie longue jusqu\'à 75 min.',
  Test: 'Semaine allégée et test 10 km vendredi pour recalculer tes allures. Ensuite, nouveau cycle avec des variantes.',
};

const SEUIL = (n) => ['Seuil ' + '3 × ' + n + '′', `Échauffement 15′ à {E} · 3 × ${n}′ à {T} (récup 2′ trot) · retour au calme 10′`];
const FRAC = (n) => ['Fractionné ' + n + ' × 2′', `Échauffement 15′ à {E} · ${n} × 2′ à {I} (récup 2′ trot) · retour au calme 10′`];

// e = footing lundi (min), q = séance du mercredi, sl = sortie longue vendredi (min), dl = semaine allégée
export const W = [
  { ph: 'Apprentissage', e: 35, lds: 4, q: SEUIL(8), sl: 50 },
  { ph: 'Apprentissage', e: 35, lds: 4, q: FRAC(6), sl: 50 },
  { ph: 'Charge', e: 35, lds: 4, q: SEUIL(8), sl: 55 },
  { ph: 'Charge', e: 35, lds: 4, q: FRAC(6), sl: 55 },
  { ph: 'Charge', e: 40, lds: 4, q: SEUIL(10), sl: 60 },
  { ph: 'Charge', e: 40, lds: 4, q: FRAC(8), sl: 60 },
  { ph: 'Allègement', dl: 1, e: 35, lds: 0, q: SEUIL(8), sl: 50 },
  { ph: 'Volume', e: 40, lds: 4, q: FRAC(8), sl: 65 },
  { ph: 'Volume', e: 45, lds: 4, q: SEUIL(10), sl: 70 },
  { ph: 'Volume', e: 45, lds: 4, q: FRAC(8), sl: 70 },
  { ph: 'Volume', e: 45, lds: 4, q: SEUIL(10), sl: 75 },
  { ph: 'Test', dl: 1, e: 35, lds: 4, q: FRAC(6), sl: 'TEST' },
];
