import { M } from '../data/muscu.js';
import MuscuSession from './MuscuSession.jsx';

export default function MuscuView({ s, update, startTimer }) {
  return (
    <section className="view on">
      <h2 className="sectitle">Séances de musculation</h2>
      <p className="secsub">Séances adaptées à ta salle : machine multi-postes (tirage vertical, rowing bas, poulie réglable, poste à rouleaux) + poids du corps. Si la salle a aussi des haltères, l'alternative est indiquée. Coche tes séries et note ta charge (en kg ou en n° de plaque) : la page garde tes valeurs d'une semaine sur l'autre. Quand tu atteins le haut de la fourchette de reps sur toutes les séries, monte d'une plaque.</p>
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
