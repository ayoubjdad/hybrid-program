import { useState } from 'react';
import { todayStr } from '../lib/plan.js';

export default function WeightTracker({ s, update }) {
  const [d, setD] = useState(todayStr()), [w, setW] = useState(''), [t, setT] = useState('');
  const track = [...s.track].sort((a, b) => a.d.localeCompare(b.d));
  const ws = track.filter((e) => e.w);

  const add = () => {
    const wv = parseFloat(w.replace(',', '.')), tv = parseFloat(t.replace(',', '.'));
    if (!d || (isNaN(wv) && isNaN(tv))) return;
    update((prev) => ({ track: [...prev.track.filter((x) => x.d !== d), { d, w: isNaN(wv) ? null : wv, t: isNaN(tv) ? null : tv }] }));
    setW(''); setT('');
  };
  const del = (date) => update((prev) => ({ track: prev.track.filter((x) => x.d !== date) }));

  let advice = null;
  if (ws.length >= 3) {
    const a = ws[ws.length - 3], b = ws[ws.length - 1];
    const days = (new Date(b.d) - new Date(a.d)) / 86400000, dw = b.w - a.w;
    const ta = track.filter((e) => e.t), dt = ta.length >= 2 ? ta[ta.length - 1].t - ta[0].t : 0;
    advice = days >= 12 && dw <= 0.1 ? <><b>Poids stable depuis 2 semaines</b> : ajoute ~150 kcal (½ khobz ou un bol d'avoine en plus).</>
      : dt >= 2 ? <><b>Tour de taille en hausse</b> : retire ~150 kcal (moins de pain, thé moins sucré).</>
      : <><b>Bonne trajectoire</b> : garde les mêmes quantités.</>;
  }

  const W2 = 640, H = 160, pd = 30;
  let chart = <p style={{ color: 'var(--dim)', fontSize: 13 }}>{ws.length ? 'Ajoute une 2ᵉ mesure pour voir la courbe.' : "Aucune mesure pour l'instant."}</p>;
  if (ws.length >= 2) {
    const vals = ws.map((e) => +e.w), mn = Math.min(...vals) - 0.5, mx = Math.max(...vals) + 0.5;
    const x = (i) => pd + (i * (W2 - 2 * pd)) / (ws.length - 1);
    const y = (v) => H - pd + 5 - ((v - mn) / (mx - mn)) * (H - 2 * pd);
    chart = (
      <svg viewBox={`0 0 ${W2} ${H}`} style={{ width: '100%', height: 'auto' }}>
        <polyline points={ws.map((e, i) => `${x(i)},${y(+e.w)}`).join(' ')} fill="none" stroke="#ffcf4a" strokeWidth="2.5" strokeLinejoin="round" />
        {ws.map((e, i) => (
          <g key={e.d}>
            <circle cx={x(i)} cy={y(+e.w)} r="4" fill="#ffcf4a" />
            <text x={x(i)} y={y(+e.w) - 10} fill="#eef1f4" fontSize="12" textAnchor="middle">{e.w}</text>
            <text x={x(i)} y={H - 4} fill="#8b94a1" fontSize="11" textAnchor="middle">{e.d.slice(8)}/{e.d.slice(5, 7)}</text>
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div className="card" style={{ marginTop: 14 }}>
      <h3>📈 Suivi poids & tour de taille</h3>
      <p style={{ color: 'var(--mut)', fontSize: 13.5, marginBottom: 12 }}>Une mesure par semaine, le matin à jeun. Tour de taille au niveau du nombril. Cible : +0,3 à 0,5 kg par mois avec un tour de taille stable.</p>
      <div className="calc">
        <div className="field"><label>Date</label><input type="date" value={d} onChange={(e) => setD(e.target.value)} style={{ colorScheme: 'dark' }} /></div>
        <div className="field"><label>Poids (kg)</label><input inputMode="decimal" placeholder="71" value={w} onChange={(e) => setW(e.target.value)} /></div>
        <div className="field"><label>Taille (cm)</label><input inputMode="decimal" placeholder="80" value={t} onChange={(e) => setT(e.target.value)} /></div>
        <button className="btn" onClick={add}>Ajouter</button>
      </div>
      <div style={{ marginTop: 16 }}>{chart}</div>
      {advice && <div className="insight">{advice}</div>}
      {track.length > 0 && (
        <table className="pred" style={{ marginTop: 10 }}><tbody>
          <tr><th>Date</th><th>Poids</th><th>Taille</th><th /></tr>
          {track.slice().reverse().map((e) => (
            <tr key={e.d}>
              <td>{e.d.split('-').reverse().join('/')}</td>
              <td className="num">{e.w ? e.w + ' kg' : '—'}</td>
              <td className="num">{e.t ? e.t + ' cm' : '—'}</td>
              <td style={{ textAlign: 'right' }}><button className="del" onClick={() => del(e.d)}>✕</button></td>
            </tr>
          ))}
        </tbody></table>
      )}
    </div>
  );
}
