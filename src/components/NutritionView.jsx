import { useState } from 'react';
import { MEALS, NT, DAILY, EQUIV, NO_ADDITIVES } from '../data/nutrition.js';
import { todayStr, autoDayType } from '../lib/plan.js';
import WeightTracker from './WeightTracker.jsx';

export default function NutritionView({ s, update }) {
  const [type, setType] = useState(autoDayType());
  const ms = NT[type].meals.map((id) => [id, MEALS[id]]);
  const sum = (k) => ms.reduce((a, [, m]) => a + m[k], 0);
  const K = sum('k');
  const day = todayStr();
  const eaten = ms.reduce((a, [id, m]) => a + (s.meals[day + ':' + type + ':' + id] ? m.k : 0), 0);
  const toggle = (key) => update((prev) => ({ meals: { ...prev.meals, [key]: !prev.meals[key] } }));
  const dTot = DAILY.reduce((a, r) => [a[0] + r[2], a[1] + r[3]], [0, 0]);

  return (
    <section className="view on">
      <h2 className="sectitle">Nutrition sans compléments</h2>
      <p className="secsub">Environ 3 000 kcal et 160 g de protéines par jour, uniquement avec de vrais aliments : environ 300 kcal au-dessus de ta dépense, le bon écart pour prendre du muscle sans trop de gras. Choisis le type de journée, coche tes repas, et ouvre « Alternatives » pour varier.</p>
      <div className="mtabs">
        {Object.entries(NT).map(([k, v]) => (
          <button key={k} className={'mtab' + (k === type ? ' on' : '')} onClick={() => setType(k)}>
            {v.lbl}{k === autoDayType() ? " · aujourd'hui" : ''}<small>{v.days} · {v.target}</small>
          </button>
        ))}
      </div>
      <div className="macros">
        {[[K, 'kcal', 'Calories', 'var(--gold)'], [sum('p'), 'g', 'Protéines', 'var(--lift)'], [sum('c'), 'g', 'Glucides', 'var(--run)'], [sum('f'), 'g', 'Lipides', '#58b4ff']].map((m) => (
          <div key={m[2]} className="mac" style={{ '--c': m[3] }}><b>≈ {m[0]} <small>{m[1]}</small></b><span>{m[2]}</span></div>
        ))}
      </div>
      <div className="nprog"><div className="bar"><i style={{ width: Math.min(100, (eaten / K) * 100) + '%' }} /></div><span>Aujourd'hui : {eaten} / {K} kcal</span></div>
      <div className="meals">
        {ms.map(([id, m]) => {
          const key = day + ':' + type + ':' + id, on = !!s.meals[key];
          return (
            <div key={id} className={'meal' + (m.pre ? ' pre' : '') + (on ? ' ok' : '')}>
              <div className="hr">{m.h}</div>
              <div className="mb">
                <h4>{m.t}{m.n && <small>{m.n}</small>}</h4>
                <ul>{m.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <div className="meta"><span className="pill">{m.k} kcal</span><span className="pill o">{m.p} g prot.</span></div>
                {m.alt.length > 0 && (
                  <details className="alts"><summary>Alternatives ({m.alt.length})</summary>
                    <div>{m.alt.map((a) => <span key={a}>↔ {a}</span>)}</div>
                  </details>
                )}
              </div>
              <button className={'chk' + (on ? ' on' : '')} onClick={() => toggle(key)} aria-label="Repas pris">{on ? '✓' : ''}</button>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>🛒 Les quantités pour une journée d'entraînement</h3>
        <p style={{ color: 'var(--mut)', fontSize: 13.5, marginBottom: 8 }}>Poids des aliments, valeurs moyennes des tables nutritionnelles. Dimanche : riz réduit à 60 g et pas de pommes de terre.</p>
        <table className="pred"><tbody>
          <tr><th>Aliment</th><th>Quantité</th><th>kcal</th><th>Protéines</th></tr>
          {DAILY.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td className="num">{r[2]}</td><td className="num">{r[3]} g</td></tr>)}
          <tr><td><b>Total</b></td><td /><td className="num" style={{ color: 'var(--gold)' }}>≈ {dTot[0]}</td><td className="num" style={{ color: 'var(--gold)' }}>≈ {dTot[1]} g</td></tr>
        </tbody></table>
      </div>

      <div className="grid2" style={{ marginTop: 14 }}>
        <div className="card"><h3>🔁 Équivalences</h3>
          <ul>{EQUIV.map(([a, b]) => <li key={a}><b>{a}</b> = {b}</li>)}</ul>
          <p style={{ color: 'var(--mut)', fontSize: 13, marginTop: 10 }}>Pour varier sans recalculer.</p>
        </div>
        <div className="card"><h3>🌿 Sans additifs, concrètement</h3>
          <ul>{NO_ADDITIVES.map((l) => <li key={l}>{l}</li>)}</ul>
        </div>
      </div>
      <WeightTracker s={s} update={update} />
    </section>
  );
}
