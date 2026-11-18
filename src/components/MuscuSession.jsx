import { M } from '../data/muscu.js';
import { mParams, restSeconds } from '../lib/plan.js';
import ExerciseFigure from './ExerciseFigure.jsx';

export default function MuscuSession({ k, w, s, update, startTimer, inModal }) {
  const m = M[k], mp = mParams(w);
  // semaine 12 : pas de jambes lourdes avant le test (on garde mollets et sauts légers hors séance)
  const ex = w === 12 && k === 'C' ? m.ex.filter((x) => !x.legs) : m.ex;

  const toggleSet = (sk, j, rest) => {
    const arr = [...(s.sets[sk] || [])];
    arr[j] = !arr[j];
    update((prev) => ({ sets: { ...prev.sets, [sk]: arr } }));
    if (arr[j]) startTimer(rest);
  };
  const setKg = (kid, v) => update((prev) => ({ kg: { ...prev.kg, [w]: { ...(prev.kg[w] || {}), [kid]: v } } }));

  return (
    <>
      <div className="mhead"><div className="meta">
        <span className="pill o">{m.day} · après le travail</span>
        <span className="pill">{mp.lbl}</span>
        <span className="pill">{mp.rir}</span>
        {!inModal && <span className="pill">Semaine {w}</span>}
      </div></div>
      <div className="block" style={{ '--c': 'var(--gold)' }}>
        <div className="k">⚡ Avant la séance (16 h 30, 60–90′ avant)</div>
        <div className="v">80 g de flocons d'avoine dans 300 ml de lait, 2 dattes, 1 banane. 500 ml d'eau dans l'heure qui précède.</div>
      </div>
      <div className="block" style={{ '--c': 'var(--lift)' }}>
        <div className="k">Échauffement (8′)</div>
        <div className="v">5′ de cardio léger · rotations d'épaules · 2 séries de montée en charge sur le premier exercice.</div>
      </div>
      {ex.map((x, i) => {
        const extra = mp.prio && x.prio ? 1 : 0;
        const sets = Math.max(1, x.s + mp.adj + extra), kid = k + i, sk = w + ':' + kid;
        const st = s.sets[sk] || [], kg = (s.kg[w] || {})[kid] || '';
        let prev = '';
        for (let pw = w - 1; pw >= 1; pw--) { const v = (s.kg[pw] || {})[kid]; if (v) { prev = 'S' + pw + ' : ' + v; break; } }
        const noKg = x.noKg || x.r.includes('s ') ;
        const rest = restSeconds(x.rest);
        return (
          <div key={kid} className={'ex' + (x.legs ? ' legs' : '')}>
            <div className="exh">
              <div className="exn">{i + 1}</div>
              {x.fig && <div className="figbox"><ExerciseFigure id={x.fig} /></div>}
              <div className="exb">
                <h4>{x.n}{x.prio ? <span title="Exercice prioritaire" style={{ color: 'var(--gold)', marginLeft: 6 }}>★</span> : null}</h4>
                <div className="meta">
                  <span className="pill o">{sets} × {x.r}</span>
                  <span className="pill">Repos {x.rest}</span>
                  {x.rir !== '—' && <span className="pill">RIR {w <= 2 ? '2–3' : w === 7 || w === 12 ? '3' : x.rir}</span>}
                  <span className="pill">📍 {x.poste}</span>
                  {extra ? <span className="pill g">+1 série</span> : null}
                </div>
                <div className="tip">{x.tip}{x.alt !== '—' && <em> · Alternative : {x.alt}</em>}</div>
                <div className="sets">
                  {Array.from({ length: sets }, (_, j) => (
                    <button key={j} className={'set' + (st[j] ? ' on' : '')} onClick={() => toggleSet(sk, j, rest)}>{j + 1}</button>
                  ))}
                  {!noKg && (
                    <div className="kg">
                      <input inputMode="decimal" placeholder="0" value={kg} onChange={(e) => setKg(kid, e.target.value)} />
                      <label>kg {prev && <span className="prev">({prev})</span>}</label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="block" style={{ '--c': 'var(--run)' }}>
        <div className="k">✅ Après la séance</div>
        <div className="v">5′ d'étirements doux. Dîner dans l'heure : harira ou 3des, 2 œufs, pommes de terre, légumes, pain complet.</div>
      </div>
    </>
  );
}
