import { useEffect, useRef, useState } from 'react';
import { FIG } from '../data/figures.js';

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const ease = (t) => 0.5 - Math.cos(Math.PI * t) / 2;
const SEG = 1100, HOLD = 350; // ms par mouvement, pause en fin de mouvement

function poseAt(ks, mode, ms) {
  ms = Math.max(0, ms || 0);
  const n = ks.length - 1;
  const step = SEG + HOLD;
  if (mode === 'restart') {
    const total = n * step + 500;
    const t = ms % total;
    const i = Math.min(Math.floor(t / step), n);
    if (i >= n) return ks[n];
    const u = Math.min((t - i * step) / SEG, 1);
    return blend(ks[i], ks[i + 1], ease(u));
  }
  const total = 2 * n * step;
  let t = ms % total;
  const forward = t < n * step;
  if (!forward) t -= n * step;
  const i = Math.min(Math.floor(t / step), n - 1);
  const u = ease(Math.min((t - i * step) / SEG, 1));
  return forward ? blend(ks[i], ks[i + 1], u) : blend(ks[n - i], ks[n - i - 1], u);
}
function blend(a, b, t) {
  const o = {};
  for (const key of Object.keys(a)) o[key] = b[key] ? lerp(a[key], b[key], t) : a[key];
  return o;
}

function Equipment({ eq }) {
  const st = { fill: 'none', stroke: '#5d6672', strokeWidth: 3, strokeLinecap: 'round' };
  if (eq.t === 'col') return <><line x1={eq.x} y1={eq.y1} x2={eq.x} y2={eq.y2} {...st} strokeWidth={5} /></>;
  if (eq.t === 'bench') return <g {...st}><line x1={eq.x} y1={eq.y} x2={eq.x + eq.w} y2={eq.y} strokeWidth={6} /><line x1={eq.x + 6} y1={eq.y} x2={eq.x + 6} y2={145} /><line x1={eq.x + eq.w - 6} y1={eq.y} x2={eq.x + eq.w - 6} y2={145} /></g>;
  if (eq.t === 'box' || eq.t === 'step') return <rect x={eq.x} y={eq.y} width={eq.w} height={145 - eq.y} rx={3} fill="#2a3038" stroke="#5d6672" strokeWidth={2} />;
  if (eq.t === 'pad') return <rect x={eq.x - 6} y={eq.y} width={14} height={9} rx={4} fill="#5d6672" />;
  if (eq.t === 'plate') return <line x1={eq.x} y1={eq.y1} x2={eq.x} y2={eq.y2} {...st} strokeWidth={5} />;
  if (eq.t === 'dipbars') return <g {...st}><line x1={eq.x1} y1={eq.y} x2={eq.x2} y2={eq.y} strokeWidth={5} /><line x1={eq.x1 + 4} y1={eq.y} x2={eq.x1 + 4} y2={145} /><line x1={eq.x2 - 4} y1={eq.y} x2={eq.x2 - 4} y2={145} /></g>;
  return null;
}

function Grip({ type, at }) {
  const [x, y] = at;
  const g = { stroke: '#ffcf4a', strokeWidth: 3, strokeLinecap: 'round', fill: 'none' };
  if (type === 'bar') return <line x1={x - 11} y1={y} x2={x + 11} y2={y} {...g} />;
  if (type === 'widebar') return <line x1={x - 26} y1={y} x2={x + 26} y2={y} {...g} />;
  if (type === 'rope') return <g {...g}><line x1={x} y1={y} x2={x - 4} y2={y + 8} /><line x1={x} y1={y} x2={x + 4} y2={y + 8} /></g>;
  if (type === 'vgrip') return <path d={`M${x - 6} ${y + 4} L${x} ${y - 3} L${x + 6} ${y + 4}`} {...g} />;
  if (type === 'db') return <g><rect x={x - 9} y={y - 3} width={18} height={6} rx={2} fill="#ffcf4a" /><rect x={x - 11} y={y - 6} width={4} height={12} rx={1} fill="#ffcf4a" /><rect x={x + 7} y={y - 6} width={4} height={12} rx={1} fill="#ffcf4a" /></g>;
  return <circle cx={x} cy={y} r={3.5} fill="#ffcf4a" />;
}

export default function ExerciseFigure({ id }) {
  const fig = FIG[id];
  const [ms, setMs] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!fig) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setMs(SEG); return; }
    let raf, start = performance.now(), visible = true;
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([en]) => { visible = en.isIntersecting; }) : null;
    if (io && ref.current) io.observe(ref.current);
    const loop = (now) => { if (visible) setMs(Math.max(0, now - start)); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, [fig]);
  if (!fig) return null;

  const p = poseAt(fig.k, fig.mode, ms);
  const dir = [p.n[0] - p.h[0], p.n[1] - p.h[1]];
  const L = Math.hypot(...dir) || 1;
  const head = [p.n[0] + (dir[0] / L) * 11, p.n[1] + (dir[1] / L) * 11];
  const s = p.s || p.n, s2 = p.s2 || p.n;
  const body = '#eef1f4', far = 'rgba(238,241,244,.35)';
  const hlArm = fig.hl === 'arm' ? '#ff7a3d' : body;
  const hlLeg = fig.hl === 'leg' ? '#3ddc97' : body;
  const seg = (pts, color, w = 6) => <polyline points={pts.map((q) => q.join(',')).join(' ')} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />;

  return (
    <svg ref={ref} viewBox="0 0 200 150" className="exfig" role="img" aria-label="Illustration animée de l'exercice">
      <line x1="4" y1="146" x2="196" y2="146" stroke="#2a3038" strokeWidth="2" />
      {(fig.eq || []).map((e, i) => <Equipment key={i} eq={e} />)}
      {fig.c && <><line x1={fig.c[0]} y1={fig.c[1]} x2={p.w[0]} y2={p.w[1]} stroke="#ffcf4a" strokeWidth="1.6" strokeDasharray="4 3" /><circle cx={fig.c[0]} cy={fig.c[1]} r="5" fill="#14171c" stroke="#ffcf4a" strokeWidth="2" /></>}
      {p.k2 && seg([p.h, p.k2, p.f2], far)}
      {p.e2 && seg([s2, p.e2, p.w2], far)}
      {seg([p.n, p.h], body, 9)}
      {fig.pack && (() => { const m = lerp(p.n, p.h, 0.45); return <rect x={m[0] - 9} y={m[1] - 12} width="18" height="10" rx="3" fill="#7c8aa0" transform={`rotate(${(Math.atan2(dir[1], dir[0]) * 180) / Math.PI + 180} ${m[0]} ${m[1] - 7})`} />; })()}
      {seg([p.h, p.k, p.f], hlLeg)}
      {p.heel && seg([p.heel, p.toe], hlLeg, 5)}
      {fig.roll && <circle cx={p.f[0]} cy={p.f[1]} r="6" fill="#5d6672" />}
      {seg([s, p.e, p.w], hlArm)}
      {fig.front && <line x1={s2[0]} y1={s2[1]} x2={s[0]} y2={s[1]} stroke={body} strokeWidth="6" strokeLinecap="round" />}
      <circle cx={head[0]} cy={head[1]} r="9" fill={body} />
      {fig.grip && <Grip type={fig.grip} at={p.w} />}
    </svg>
  );
}
