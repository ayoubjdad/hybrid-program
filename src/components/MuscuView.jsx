import { M } from '../data/muscu.js';
import MuscuSession from './MuscuSession.jsx';

export default function MuscuView({ s, update, startTimer }) {
  return (
    <section className="view on">
      <h2 className="sectitle">Séances de musculation</h2>
      <p className="secsub">Trois séances de 65–75 min pour ta machine multi-postes et le poids du corps. Le volume vise 12–14 séries par semaine sur pectoraux, dos et épaules, les zones qui font la silhouette « Joshua ». Coche tes séries, note ta charge (kg ou n° de plaque) : quand tu atteins le haut de la fourchette sur toutes les séries, monte d'une plaque. ★ = exercice prioritaire (+1 série en semaines 8 à 11).</p>
      <div className="mtabs">
        {Object.entries(M).map(([k, m]) => (
          <button key={k} className={'mtab' + (s.mtab === k ? ' on' : '')} onClick={() => update({ mtab: k })}>
            {m.name}<small>{m.day} · semaine {s.week}</small>
          </button>
        ))}
      </div>
      <MuscuSession k={s.mtab} w={s.week} s={s} update={update} startTimer={startTimer} />
    </section>
  );
}
