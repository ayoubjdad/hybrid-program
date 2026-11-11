import { useState } from 'react';
import { MEALS, NT } from '../data/nutrition.js';
import { todayStr, autoDayType } from '../lib/plan.js';
import WeightTracker from './WeightTracker.jsx';

const PREPOST = [
  ['Muscu après le travail', 'Collation pré-séance à 16 h 30 (avoine + lait + miel, ou sandwich thon + banane). 500 ml d\'eau avant, une gourde pendant. Dîner protéiné dans l\'heure après.', '--lift'],
  ['Footing après Al Fajr', 'Grand verre d\'eau. À jeun possible si c\'est facile et moins de 50′.', '--run'],
  ['Fractionné ou seuil', '2–3 dattes + eau 20–30′ avant. Si c\'est le soir : le goûter de 16 h 30 fait office de pré-run.', '--run'],
  ['Sortie longue (dimanche)', '3 dattes avant, eau + 3–4 dattes à emporter au-delà de 75′. Petit-déjeuner complet en rentrant.', '--run'],
  ['Après chaque séance', 'Protéines + glucides dans l\'heure : œufs + pain, ou harira + poisson, ou shaker + banane.', '--gold'],
];

export default function NutritionView({ s, update }) {
  const [type, setType] = useState(autoDayType());
  const ms = NT[type].meals.map((id) => [id, MEALS[id]]);
  const sum = (k) => ms.reduce((a, [, m]) => a + m[k], 0);
  const K = sum('k');
  const day = todayStr();
  const eaten = ms.reduce((a, [id, m]) => a + (s.meals[day + ':' + type + ':' + id] ? m.k : 0), 0);
  const toggle = (key) => update((prev) => ({ meals: { ...prev.meals, [key]: !prev.meals[key] } }));

  return (
    <section className="view on">
      <h2 className="sectitle">Nutrition — prise de muscle propre</h2>
      <p className="secsub">Objectif : +200 à 300 kcal au-dessus de ta dépense pour construire du muscle sans prendre de ventre. Pas de régime : à 71 kg, tu dois d'abord construire. Choisis le type de journée, coche tes repas, et touche « Alternatives » pour varier.</p>
      <div className="mtabs">
        {Object.entries(NT).map(([k, v]) => (
          <button key={k} className={'mtab' + (k === type ? ' on' : '')} onClick={() => setType(k)}>
            {v.lbl}{k === autoDayType() ? " · aujourd'hui" : ''}<small>{v.days}</small>
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
      <div className="grid2" style={{ marginTop: 14 }}>
        <div className="card"><h3>⚡ Pré-workout & post-workout</h3>
          {PREPOST.map((b) => (
            <div key={b[0]} className="block" style={{ '--c': `var(${b[2]})` }}><div className="k">{b[0]}</div><div className="v" style={{ fontSize: 14 }}>{b[1]}</div></div>
          ))}
        </div>
        <div className="card"><h3>💊 Compléments</h3><ul>
          <li><b>Créatine monohydrate</b> : 5 g par jour, tous les jours, à n'importe quel moment.</li>
          <li><b>Whey</b> (optionnel) : pratique si tu n'atteins pas 140 g de protéines. 1 dose = 25 g de protéines.</li>
          <li><b>Caféine</b> : 1 café 30–45′ avant une séance difficile. Pas après 16 h–17 h, ton sommeil avant Al Fajr compte plus.</li>
          <li>Pas besoin de « pre-workout » en poudre : la collation de 16 h 30 et un café font le même travail.</li>
        </ul></div>
      </div>
      <WeightTracker s={s} update={update} />
    </section>
  );
}
