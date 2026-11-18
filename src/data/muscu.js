// Séances adaptées à la machine multi-postes (tirage vertical, rowing bas, poulie réglable, poste à rouleaux)
// s = séries, r = reps, rest = repos, rir = reps en réserve, prio = +1 série en semaines 8–11, legs = exercice jambes
export const M = {
  A: {
    name: 'Poitrine / Triceps / Épaules', day: 'Mardi', ex: [
      { n: 'Pompes lestées (sac à dos chargé)', s: 4, r: '8–12', rest: '2′30', rir: '1–2', poste: 'Poids du corps', alt: 'Développé couché haltères si dispo', tip: 'Mains un peu plus larges que les épaules, corps gainé, descends jusqu\'à frôler le sol.' },
      { n: 'Développé poulie unilatéral debout', s: 3, r: '10–12 / bras', rest: '2′', rir: '1–2', poste: 'Poulie réglable', alt: 'Développé incliné haltères', tip: 'Poulie à hauteur de poitrine, dos à la machine, pousse vers l\'avant et vers le centre.', prio: 1 },
      { n: 'Écarté poulie bas → haut', s: 3, r: '12–15 / bras', rest: '1′30', rir: '0–1', poste: 'Poulie réglable', alt: 'Écarté haltères incliné', tip: 'Poulie en bas, main vers le menton : haut des pectoraux.' },
      { n: 'Dips (barres ou banc)', s: 3, r: '8–12', rest: '2′', rir: '1–2', poste: 'Poids du corps', alt: 'Pompes serrées', tip: 'Buste penché vers l\'avant pour cibler la poitrine.' },
      { n: 'Élévations latérales poulie basse', s: 3, r: '12–15 / bras', rest: '1′30', rir: '0–1', poste: 'Poulie réglable', alt: 'Élévations haltères', tip: 'Monte jusqu\'à l\'horizontale : c\'est la largeur des épaules.', prio: 1 },
      { n: 'Extension triceps poulie haute (corde)', s: 3, r: '10–15', rest: '1′30', rir: '0–1', poste: 'Poste tirage vertical', alt: 'Barre droite', tip: 'Coudes collés au corps, écarte la corde en bas.' },
      { n: 'Extension triceps au-dessus de la tête', s: 3, r: '10–12', rest: '1′30', rir: '0–1', poste: 'Poulie réglable', alt: '—', tip: 'Dos à la poulie, tends les bras vers l\'avant : étire le triceps.' },
    ],
  },
  B: {
    name: 'Dos / Biceps / Trapèzes', day: 'Jeudi', ex: [
      { n: 'Tirage vertical prise large', s: 4, r: '8–10', rest: '2′30', rir: '1–2', poste: 'Poste tirage vertical', alt: 'Tractions dès que possible', tip: 'Barre vers le haut de la poitrine, coudes vers les hanches.', prio: 1 },
      { n: 'Tirage horizontal assis', s: 4, r: '8–12', rest: '2′', rir: '1–2', poste: 'Poste rowing bas', alt: 'Rowing haltère', tip: 'Dos droit, tire vers le nombril, serre les omoplates 1 s.' },
      { n: 'Tirage vertical prise serrée (V)', s: 3, r: '10–12', rest: '2′', rir: '1–2', poste: 'Poste tirage vertical', alt: '—', tip: 'Poignée en V : bas du grand dorsal.' },
      { n: 'Shrugs à la poulie basse', s: 3, r: '12–15', rest: '1′30', rir: '0–1', poste: 'Poulie basse', alt: 'Shrugs haltères', tip: 'Trapèzes : le « cou de boxeur ». Pause 1 s en haut.' },
      { n: 'Face pull (corde)', s: 3, r: '15', rest: '1′', rir: '0–1', poste: 'Poulie réglable', alt: 'Oiseau haltères', tip: 'Poulie à hauteur du visage, tire vers les yeux en écartant les mains.' },
      { n: 'Curl poulie basse (barre)', s: 3, r: '8–12', rest: '1′30', rir: '0–1', poste: 'Poste rowing bas', alt: 'Curl haltères', tip: 'Coudes fixes, descente en 2 s.' },
      { n: 'Curl marteau à la corde', s: 3, r: '10–12', rest: '1′30', rir: '0–1', poste: 'Poulie basse', alt: 'Curl marteau haltères', tip: 'Prise neutre : biceps + avant-bras.' },
    ],
  },
  C: {
    name: 'Jambes / Épaules / Explosivité', day: 'Samedi', ex: [
      { n: 'Sauts en longueur sans élan', s: 4, r: '4', rest: '1′30', rir: '—', poste: 'Sol', alt: 'Squat sautés', tip: 'Explosivité façon boxeur : à faire frais, en début de séance. Réception souple.', legs: 1, noKg: 1 },
      { n: 'Fentes bulgares', s: 3, r: '8–10 / jambe', rest: '2′', rir: '1–2', poste: 'Banc + poulie basse', alt: 'Fentes marchées', tip: 'Pied arrière sur le banc, poignée de poulie basse en main pour charger.', legs: 1 },
      { n: 'Leg extension', s: 3, r: '10–15', rest: '1′30', rir: '0–1', poste: 'Poste à rouleaux', alt: 'Squat au poids du corps', tip: 'Pause 1 s en haut, descente contrôlée.', legs: 1 },
      { n: 'Leg curl', s: 3, r: '10–15', rest: '1′30', rir: '0–1', poste: 'Poste à rouleaux', alt: 'Pont fessier unilatéral', tip: 'Ischios forts = moins de blessures en course.', legs: 1 },
      { n: 'Développé épaules', s: 4, r: '8–10', rest: '2′30', rir: '1–2', poste: 'Haltères ou poulie unilatérale', alt: 'Poulie basse, un genou au sol', tip: 'Gaine les abdos, ne cambre pas.' },
      { n: 'Élévations latérales poulie basse', s: 3, r: '12–15 / bras', rest: '1′30', rir: '0–1', poste: 'Poulie réglable', alt: 'Élévations haltères', tip: 'Deuxième passage de la semaine sur la largeur d\'épaules.', prio: 1 },
      { n: 'Mollets debout', s: 4, r: '12–15', rest: '1′', rir: '0–1', poste: 'Marche ou repose-pieds', alt: '—', tip: 'Descente lente en 3 s : protège le tendon d\'Achille.', legs: 1 },
      { n: 'Pallof press à la poulie', s: 3, r: '10 / côté', rest: '1′', rir: '—', poste: 'Poulie réglable', alt: '—', tip: 'Gainage anti-rotation : la base du coup de poing.', noKg: 0 },
    ],
  },
};
