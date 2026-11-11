// Formules VDOT (Jack Daniels)
const vo2 = (v) => -4.6 + 0.182258 * v + 0.000104 * v * v; // v en m/min
const pctMax = (t) => 0.8 + 0.1894393 * Math.exp(-0.012778 * t) + 0.2989558 * Math.exp(-0.1932605 * t); // t en min
export const vdotOf = (d, t) => vo2(d / t) / pctMax(t);

function velAt(vo) {
  const a = 0.000104, b = 0.182258, c = -4.6 - vo;
  return (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
}
export const paceAtPct = (vd, p) => 1000 / velAt(vd * p); // min/km

export function predict(vd, d) {
  let lo = 3, hi = 600;
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2;
    vdotOf(d, m) > vd ? (lo = m) : (hi = m);
  }
  return (lo + hi) / 2;
}

export function parseT(s) {
  const p = String(s).trim().split(':').map(Number);
  if (!p.length || p.some(isNaN)) return null;
  if (p.length === 3) return p[0] * 60 + p[1] + p[2] / 60;
  if (p.length === 2) return p[0] + p[1] / 60;
  return p[0];
}
export function fmtP(m) {
  const s = Math.round(m * 60);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}
export function fmtT(m) {
  let s = Math.round(m * 60);
  const h = Math.floor(s / 3600); s -= h * 3600;
  const mm = Math.floor(s / 60), ss = s % 60;
  return (h ? h + ':' + String(mm).padStart(2, '0') : mm) + ':' + String(ss).padStart(2, '0');
}

export function computePaces(r10, r21) {
  const t10 = parseT(r10) || 54, t21 = parseT(r21) || 129;
  const v10 = vdotOf(10000, t10), v21 = vdotOf(21097.5, t21);
  const vd = v10;
  const goal10 = v10 + 2, goalHalf = Math.min(v21 + 3, v10 + 1);
  return {
    v10, v21, vd, goal10, goalHalf,
    E: fmtP(paceAtPct(vd, 0.7)) + '–' + fmtP(paceAtPct(vd, 0.62)),
    M: fmtP(paceAtPct(vd, 0.8)),
    T: fmtP(paceAtPct(vd, 0.86)),
    I: fmtP(paceAtPct(vd, 0.95)),
    R: fmtP(paceAtPct(vd, 1.04)),
    O10: fmtP(predict(goal10, 10000) / 10),
    SEMI: fmtP(predict(goalHalf, 21097.5) / 21.0975),
    R200: fmtP(paceAtPct(vd, 1.04) / 5).replace(/^0:/, '') + '″',
  };
}
