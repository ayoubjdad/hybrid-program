import { M } from '../data/muscu.js';
import { mParams, restSeconds } from '../lib/plan.js';

export default function MuscuSession({ k, w, s, update, startTimer, inModal }) {
  const m = M[k], mp = mParams(w);
  const ex = w === 12 && k === 'C' ? m.ex.filter((x) => !x[6]) : m.ex;

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
        <div className="k">⚡ Pré-séance (16 h 30, 60–90′ avant)</div>
        <div className="v">60 g flocons d'avoine + 250 ml lait + miel ou 2 dattes · ou sandwich thon + banane. 500 ml d'eau dans l'heure qui précède. Café : seulement si la séance finit avant 19 h (tu te lèves pour Al Fajr).</div>
      </div>
      <div className="block" style={{ '--c': 'var(--lift)' }}>
        <div className="k">Échauffement (8′)</div>
        <div className="v">5′ tapis, vélo ou corde · rotations d'épaules + face pull très léger · 2 séries de montée en charge sur le 1er exercice.</div>
      </div>
      {ex.map((x, i) => {
        const sets = Math.max(1, x[1] + mp.adj), kid = k + i, sk = w + ':' + kid;
        const st = s.sets[sk] || [], kg = (s.kg[w] || {})[kid] || '';
        let prev = '';
        for (let pw = w - 1; pw >= 1; pw--) { const v = (s.kg[pw] || {})[kid]; if (v) { prev = 'S' + pw + ' : ' + v; break; } }
        const timed = x[2].includes('s') && !x[2].includes('/');
        const rest = restSeconds(x[3]);
        return (
          <div key={kid} className={'ex' + (x[6] ? ' legs' : '')}>
            <div className="exh">
              <div className="exn">{i + 1}</div>
              <div className="exb">
                <h4>{x[0]}</h4>
                <div className="meta">
                  <span className="pill o">{sets} × {x[2]}</span>
                  <span className="pill">Repos {x[3]}</span>
                  {x[7] && <span className="pill">📍 {x[7]}</span>}
                  {x[6] ? <span className="pill g">Jambes légères</span> : null}
                </div>
                <div className="tip">{x[5]}{x[4] !== '—' && <em> · Alternative : {x[4]}</em>}</div>
                <div className="sets">
                  {Array.from({ length: sets }, (_, j) => (
                    <button key={j} className={'set' + (st[j] ? ' on' : '')} onClick={() => toggleSet(sk, j, rest)}>{j + 1}</button>
                  ))}
                  {!timed && (
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
        <div className="k">✅ Post-séance</div>
        <div className="v">5′ d'étirements doux · dîner dans l'heure : harira ou 3des + 150 g sardines/poulet ou 2–3 œufs + ¼ khobz. Créatine 5 g si tu en prends.</div>
      </div>
    </>
  );
}
