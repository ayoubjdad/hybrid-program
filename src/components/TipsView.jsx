import { TIPS } from '../data/tips.js';

export default function TipsView() {
  return (
    <section className="view on">
      <h2 className="sectitle">Pour que ça marche</h2>
      <p className="secsub">Récupération, Ramadan, et la suite après 12 mois.</p>
      <div className="grid2">
        {TIPS.map(([title, lines]) => (
          <div key={title} className="card"><h3>{title}</h3><ul>{lines.map((l) => <li key={l}>{l}</li>)}</ul></div>
        ))}
      </div>
    </section>
  );
}
