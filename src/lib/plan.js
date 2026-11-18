import { W } from '../data/running.js';
import { predict, fmtT } from './vdot.js';

export const DN = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function mParams(w) {
  if (w === 7) return { lbl: 'Allègement', adj: -1, prio: 0, rir: 'RIR 3 · mêmes charges, 1 série en moins' };
  if (w === 12) return { lbl: 'Allègement + test', adj: -1, prio: 0, rir: 'RIR 3 · pas de jambes lourdes avant le test 10 km' };
  if (w <= 2) return { lbl: 'Apprentissage', adj: 0, prio: 0, rir: 'RIR 2–3 partout · note tes charges' };
  if (w <= 6) return { lbl: 'Charge', adj: 0, prio: 0, rir: 'RIR indiqué par exercice · monte d\'une plaque au haut de la fourchette' };
  return { lbl: 'Volume +', adj: 0, prio: 1, rir: '+1 série sur les exercices ★ · RIR indiqué par exercice' };
}

export function weekSessions(w, P) {
  const d = W[w - 1], mp = mParams(w);
  const lds = d.lds ? ' + ' + d.lds + ' lignes droites de 20″' : '';
  const test = d.sl === 'TEST';
  return [
    [{ id: 'run-e', type: 'run', when: 'Après Al Fajr', t: 'Footing facile ' + d.e + '′', d: 'Allure {E}' + lds,
      body: [['Contenu', d.e + '′ en endurance fondamentale à {E}' + lds], ['Repère', 'Tu dois pouvoir parler en phrases complètes. Avec la prise de poids, ralentir de 5–10 s/km est normal.']] }],
    [{ id: 'lift-A', type: 'lift', when: 'Après le travail', t: 'Poitrine / Triceps / Épaules', d: mp.lbl, m: 'A' }],
    [{ id: 'run-q', type: 'run', when: 'Après Al Fajr', t: d.q[0], d: 'Séance qualité',
      body: [['Séance', d.q[1]], ['Avant', '2–3 dattes + un verre d\'eau 20–30′ avant. Échauffement complet obligatoire.']] }],
    [{ id: 'lift-B', type: 'lift', when: 'Après le travail', t: 'Dos / Biceps / Trapèzes', d: mp.lbl, m: 'B' }],
    [test
      ? { id: 'run-l', type: 'run', when: 'Après Al Fajr', t: '🏁 TEST 10 km', d: 'Objectif ~' + fmtT(predict(P.vd, 10000)),
          body: [['Échauffement', '15′ facile + 4 lignes droites'], ['Course', '10 km : pars à {O10} les 3 premiers km, puis accélère si tu te sens bien.'], ['Après', 'Entre ton nouveau chrono dans l\'onglet Course pour recalculer tes allures.']] }
      : { id: 'run-l', type: 'run', when: 'Après Al Fajr', t: 'Sortie longue ' + d.sl + '′', d: 'Allure {E}',
          body: [['Contenu', d.sl + '′ à {E}'], ['Hydratation', 'Au-delà de 60′, emporte de l\'eau et 2 dattes.'], ['Pourquoi le vendredi', 'Les jambes travaillées le samedi ont ainsi 5 jours pour récupérer avant la prochaine sortie dure.']] }],
    [{ id: 'lift-C', type: 'lift', when: 'Après le travail', t: 'Jambes / Épaules / Explosivité', d: mp.lbl, m: 'C' }],
    [{ id: 'rest', type: 'rest', when: 'Repos', t: 'Repos complet', d: 'Marche libre, mobilité',
      body: [['Repos', 'Aucun entraînement. Marche libre et 10–15′ de mobilité si tu veux (hanches, chevilles, épaules).'], ['Nutrition', 'Journée « Repos » : ≈ 2 600 kcal, toujours 155 g de protéines.']] }],
  ];
}

export function weekProgress(w, P, done) {
  const s = weekSessions(w, P).flat().filter((x) => x.type !== 'rest');
  return { n: s.filter((x) => done[w + ':' + x.id]).length, t: s.length };
}

export const restSeconds = (r) => (r.includes('′') ? parseInt(r) * 60 + (parseInt(r.split('′')[1]) || 0) : parseInt(r));

export function currentWeekDay(start) {
  const st = new Date(start + 'T00:00:00');
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const diff = Math.floor((now - st) / 86400000);
  if (isNaN(diff)) return { w: 1, d: -1 };
  if (diff < 0) return { w: 1, d: -1, before: -diff };
  return { w: Math.min(Math.floor(diff / 7) + 1, 13), d: diff % 7 };
}

export const todayStr = () => {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};
export const autoDayType = () => (new Date().getDay() === 0 ? 'repos' : 'entrainement');
