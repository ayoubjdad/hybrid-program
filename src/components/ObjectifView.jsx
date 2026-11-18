import { GOAL_STEPS, RESEARCH, TRACKING, SOURCES } from '../data/tips.js';

export default function ObjectifView() {
  return (
    <section className="view on">
      <h2 className="sectitle">Objectif & science</h2>
      <p className="secsub">Priorité au muscle pendant 12 mois. Objectif réaliste : passer de 71 kg à 77–80 kg, dont 5 à 7 kg de muscle.</p>

      <div className="card">
        <h3>🥊 Le physique d'Anthony Joshua, en chiffres</h3>
        <p>Il mesure 1,98 m et combat autour de 110–115 kg (approximatif). Rapporté à ta taille de 1,81 m, la même densité musculaire correspond à environ 88–90 kg avec 12 % de gras, soit près de 19 kg de muscle en plus par rapport à aujourd'hui.</p>
        <ul style={{ marginTop: 10 }}>
          <li>Ce niveau est proche du plafond naturel humain (indice de masse maigre autour de 24–25). La plupart des pratiquants sans produits ne l'atteignent jamais ; ceux qui y arrivent mettent 5 ans ou plus.</li>
          <li>La première année est la plus rentable : environ 0,5 à 1 kg de muscle par mois pour un débutant bien entraîné et bien nourri. Ensuite, le rythme ralentit nettement.</li>
          <li>Joshua s'entraîne à plein temps avec une équipe, sur une morphologie exceptionnelle.</li>
        </ul>
        <table className="pred" style={{ marginTop: 12 }}><tbody>
          <tr><th>Échéance</th><th>Poids visé</th><th>Ce qui change visiblement</th></tr>
          {GOAL_STEPS.map((r) => <tr key={r[0]}><td>{r[0]}</td><td className="num">{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody></table>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>🔬 Ce que dit la recherche</h3>
        <p style={{ marginBottom: 10 }}>Courir et faire de la muscu en même temps n'empêche pas de prendre du muscle, à condition de bien doser la course et de séparer les séances.</p>
        <div className="research">
          {RESEARCH.map((r) => (
            <div key={r.q} className="rq">
              <h4>{r.q}</h4>
              <p>{r.f} <a href={r.src[1]} target="_blank" rel="noreferrer">{r.src[0]}</a></p>
              <p className="ra">→ {r.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>📏 Suivi et ajustements</h3>
        <table className="pred"><tbody>
          <tr><th>Mesure</th><th>Quand</th><th>Cible</th><th>Si ça dévie</th></tr>
          {TRACKING.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
        </tbody></table>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <h3>📚 Sources</h3>
        <ul>{SOURCES.map(([t, u]) => <li key={u}><a href={u} target="_blank" rel="noreferrer">{t}</a></li>)}</ul>
      </div>
    </section>
  );
}
