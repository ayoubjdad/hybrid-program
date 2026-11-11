import { W } from '../data/running.js';
import { predict, fmtT } from './vdot.js';

export const DN = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export function mParams(w) {
  if (w === 12) return { lbl: 'Affûtage', adj: -1, rir: 'RIR 3 · charges −10 % · pas de jambes ce samedi (test demain)' };
  if (w === 4 || w === 8) return { lbl: 'Allègement', adj: -1, rir: 'RIR 3–4 · même charge, 1 série en moins' };
  const r = { 1: 'RIR 3', 2: 'RIR 2–3', 3: 'RIR 2', 5: 'RIR 2', 6: 'RIR 1–2', 7: 'RIR 1', 9: 'RIR 2', 10: 'RIR 1–2', 11: 'RIR 2' }[w];
  return { lbl: w < 4 ? 'Base' : w < 8 ? 'Développement' : 'Maintien', adj: 0, rir: r + ' (reps en réserve avant l\'échec)' };
}

const shortRir = (w) => mParams(w).rir.split(' (')[0].split(' ·')[0];

export function weekSessions(w, P) {
  const d = W[w - 1];
  const lds = d.lds ? ' + ' + d.lds + ' lignes droites de 20″' : '';
  return [
    [{ id: 'run-e', type: 'run', when: 'Après Al Fajr', t: 'Footing facile ' + d.e + '′', d: 'Allure {E}' + lds,
      body: [['Contenu', d.e + '′ en endurance fondamentale à {E}' + lds], ['Repère', 'Tu dois pouvoir parler en phrases complètes. Si le cardio monte, ralentis ou marche 30″.']] }],
    [{ id: 'lift-A', type: 'lift', when: 'Après le travail', t: 'Poitrine / Triceps', d: shortRir(w), m: 'A' }],
    [{ id: 'run-q', type: 'run', when: 'Fajr ou après le travail', t: d.q[0], d: 'Séance qualité',
      body: [['Séance', d.q[1]], ['Conseil', 'Si tu la fais le matin : 2–3 dattes + un verre d\'eau 20–30′ avant. Échauffement complet obligatoire.']] }],
    [{ id: 'lift-B', type: 'lift', when: 'Après le travail', t: 'Dos / Biceps', d: shortRir(w), m: 'B' }],
    [w >= 5 && !d.dl && w !== 12
      ? { id: 'run-opt', type: 'rest', when: 'Optionnel', t: 'Footing récup 25–30′', d: 'ou repos + mobilité',
          body: [['Option A', '25–30′ très lent à {E}, sur terrain souple si possible.'], ['Option B', 'Repos complet + 15′ de mobilité (hanches, chevilles, dos).']] }
      : { id: 'rest', type: 'rest', when: 'Repos', t: 'Repos / mobilité 15′', d: 'Hanches · chevilles · dos',
          body: [['Mobilité', 'Fente avec étirement psoas 2×30″ · ouverture de hanches 90/90 · mobilité cheville au mur 2×10 · chat-vache 10.']] }],
    [{ id: 'lift-C', type: 'lift', when: 'Après le travail', t: w === 12 ? 'Épaules (sans jambes)' : 'Épaules + jambes légères',
      d: w === 12 ? 'Pas de jambes · test demain' : 'Jambes à RIR 3', m: 'C' }],
    [d.sl[1] === 'TEST'
      ? { id: 'run-l', type: 'run', when: 'Après Al Fajr', t: '🏁 TEST 10 km', d: 'Objectif ~' + fmtT(predict(P.goal10, 10000)),
          body: [['Échauffement', '15′ facile + 4 lignes droites'], ['Course', '10 km : pars à {O10} les 3 premiers km, puis accélère si tu te sens bien sur les 3 derniers.'], ['Après', 'Entre ton nouveau chrono dans l\'onglet Allures pour recalculer tes zones.']] }
      : { id: 'run-l', type: 'run', when: 'Après Al Fajr', t: 'Sortie longue ' + d.sl[0] + '′', d: d.sl[1] ? d.sl[1] : 'Allure {E}',
          body: [['Contenu', d.sl[0] + '′ à {E}' + (d.sl[1] ? ', ' + d.sl[1] : '')], ['Hydratation', 'Au-delà de 75′, emporte de l\'eau et 2–3 dattes.'], ['Pourquoi', 'C\'est LA séance qui comblera l\'écart entre ton 10 km et ton semi.']] }],
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
export function autoDayType() {
  const g = new Date().getDay();
  return g === 5 ? 'repos' : [2, 4, 6].includes(g) ? 'muscu' : 'course';
}
