// Nutrition 100 % aliments, sans compléments. Quantités = poids des aliments.
export const DAILY = [
  ['Œufs entiers', '3 gros (180 g)', 257, 23],
  ['Poulet, dinde ou poisson (poids cru)', '200 g', 220, 46],
  ['Lentilles, pois chiches ou haricots (poids sec)', '60 g', 210, 14],
  ['Lait demi-écrémé', '300 ml', 138, 10],
  ['Raïbi ou lben nature + fromage blanc', '300 g', 195, 18],
  ['Flocons d\'avoine', '80 g', 300, 10],
  ['Riz, semoule ou pâtes (poids sec)', '100 g', 355, 11],
  ['Pain complet', '120 g (≈ ⅓ khobz)', 294, 11],
  ['Pommes de terre', '200 g', 160, 4],
  ['Fruits (bananes, oranges…)', '400 g (3 fruits)', 280, 4],
  ['Dattes', '4 (40 g)', 112, 1],
  ['Légumes variés', '400 g', 120, 6],
  ['Huile d\'olive', '20 g (2 c. à s.)', 180, 0],
  ['Amandes ou noix', '25 g (une poignée)', 150, 5],
];

export const MEALS = {
  fajr: { t: 'Avant la course', h: '6h15', n: 'lundi, mercredi, vendredi', pre: 1, items: ['2 dattes', '1 grand verre d\'eau'], k: 56, p: 1, c: 13, f: 0, alt: ['Footing facile : possible à jeun, juste l\'eau'] },
  pdj: { t: 'Petit-déjeuner', h: '7h30', items: ['1 œuf', '150 g de fromage blanc', '60 g de pain complet', '1 banane', 'Thé : 1 sucre maximum'], k: 435, p: 23, c: 60, f: 11, alt: ['2 œufs + 60 g de pain + 1 orange (sans fromage blanc)', '1 msemen + 1 œuf + 1 raïbi nature (de temps en temps)', 'Bissara (40 g de fèves sèches) + 60 g de pain + 1 œuf'] },
  col: { t: 'Collation', h: '10h', items: ['150 g de raïbi nature', '25 g d\'amandes', '1 orange'], k: 318, p: 15, c: 30, f: 15, alt: ['150 g de fromage blanc + 1 pomme + 25 g de noix', '1 verre de lben + 2 dattes + 20 g d\'amandes'] },
  dej: { t: 'Déjeuner', h: '13h', items: ['200 g de poulet ou poisson (cru)', '100 g de riz sec (≈ 300 g cuit)', '200 g de légumes', '10 g d\'huile d\'olive'], k: 725, p: 60, c: 85, f: 13, alt: ['Tajine : 200 g de poulet + légumes + 150 g de pain complet', 'Couscous du vendredi : 100 g de semoule + 170 g de viande maigre + légumes', '180 g de sardines au four + 350 g de pommes de terre + salade'] },
  dejL: { t: 'Déjeuner', h: '13h', items: ['200 g de poulet ou poisson (cru)', '60 g de riz sec (≈ 180 g cuit)', '200 g de légumes', '10 g d\'huile d\'olive'], k: 583, p: 56, c: 55, f: 13, alt: ['Tajine poulet-légumes + 90 g de pain complet', 'Poisson au four + légumes + 200 g de pommes de terre'] },
  pre: { t: 'Avant la muscu', h: '16h30', n: '60–90 min avant la séance', pre: 1, items: ['80 g de flocons d\'avoine', '300 ml de lait', '2 dattes', '1 banane'], k: 578, p: 22, c: 95, f: 8, alt: ['100 g de pain complet + 1 c. à c. de miel + 300 ml de lait + 1 banane', 'Sandwich : 100 g de pain complet + 60 g de thon au naturel + 1 banane'] },
  gout: { t: 'Goûter', h: '16h30', items: ['80 g de flocons d\'avoine', '300 ml de lait', '2 dattes', '1 banane'], k: 578, p: 22, c: 95, f: 8, alt: ['100 g de pain complet + jben + 1 fruit + 300 ml de lait'] },
  din: { t: 'Dîner', h: '20h30', n: 'dans l\'heure après la séance', items: ['Harira ou 3des avec 60 g de lentilles sèches', '2 œufs', '200 g de pommes de terre', '200 g de légumes', '60 g de pain complet', '10 g d\'huile d\'olive'], k: 838, p: 41, c: 100, f: 26, alt: ['Loubia (60 g sèches) + 2 œufs + 60 g de pain + salade', 'Omelette 2 œufs + pommes de terre sautées + lentilles en salade'] },
  dinL: { t: 'Dîner', h: '20h30', items: ['Harira ou 3des avec 60 g de lentilles sèches', '2 œufs', '200 g de légumes', '60 g de pain complet', '10 g d\'huile d\'olive'], k: 678, p: 37, c: 66, f: 26, alt: ['Loubia + 2 œufs + petit morceau de pain'] },
};

export const NT = {
  entrainement: { lbl: 'Jour d\'entraînement', days: 'Lundi → samedi', meals: ['fajr', 'pdj', 'col', 'dej', 'pre', 'din'], target: '≈ 2 950 kcal · 160 g de protéines' },
  repos: { lbl: 'Repos', days: 'Dimanche', meals: ['pdj', 'col', 'dejL', 'gout', 'dinL'], target: '≈ 2 600 kcal · 155 g de protéines' },
};

export const EQUIV = [
  ['200 g de poulet', '200 g de dinde, de merlan ou de thon frais = 180 g de sardines fraîches = 170 g de kefta de bœuf maigre'],
  ['100 g de riz sec', '100 g de semoule (couscous) ou de pâtes = 350 g de pommes de terre = 150 g de pain complet'],
  ['2 œufs', '60 g de thon au naturel = 200 g de fromage blanc (≈ 15 g de protéines)'],
  ['80 g de flocons d\'avoine', '100 g de pain complet + 1 c. à c. de miel'],
];

export const NO_ADDITIVES = [
  'Pas de whey, de créatine, de gainer ni de « pre-workout » : ces quantités atteignent les objectifs sans eux.',
  'Raïbi et yaourts nature, sans sucre ni arôme ajoutés. Pain de boulangerie complet plutôt qu\'industriel.',
  'Évite la charcuterie (cachir), les sauces toutes prêtes, les sodas, les jus en brique et les biscuits.',
  'Sucre : 2 morceaux par jour maximum, thé compris. L\'énergie vient des dattes, des fruits et des féculents.',
  'Eau : 2,5 à 3 L par jour, plus les jours de course.',
];
