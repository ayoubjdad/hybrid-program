import { fmtT, parseT, predict } from '../lib/vdot.js';
import { currentWeekDay } from '../lib/plan.js';

export default function Hero({ s, update, P }) {
  const bmi = (71 / (1.81 * 1.81)).toFixed(1);
  const items = [
    ['71 kg', 'Poids'], ['181 cm', 'Taille'], [bmi, 'IMC'],
    [fmtT(parseT(s.r10) || 54), 'Record 10 km'], [fmtT(parseT(s.r21) || 129), 'Record semi'],
    [P.vd.toFixed(1), 'VDOT', 1], [fmtT(predict(P.goal10, 10000)), 'Objectif 10 km', 1],
  ];
  const c = currentWeekDay(s.start);
  const info = c.before ? `· démarre dans ${c.before} jour${c.before > 1 ? 's' : ''}` : c.w > 12 ? '· programme terminé 🎉' : `· tu es en semaine ${c.w}`;
  return (
    <header className="hero">
      <div className="wrap">
        <div className="eyebrow">Programme hybride · 12 semaines · Casablanca</div>
        <h1><span className="a">Muscu</span> × <span className="b">Course</span></h1>
        <p className="sub">3 séances de musculation (mar · jeu · sam, après le travail) et 3 sorties de course (lundi et dimanche après Al Fajr, mercredi au choix). Objectif : prendre du muscle sans freiner la course, et faire tomber tes chronos.</p>
        <div className="stats">
          {items.map((i) => (
            <div key={i[1]} className={'stat' + (i[2] ? ' hl' : '')}><b>{i[0]}</b><span>{i[1]}</span></div>
          ))}
        </div>
        <div className="startrow">
          Début du programme :
          <input type="date" value={s.start} onChange={(e) => {
            if (!e.target.value) return;
            const w = Math.min(currentWeekDay(e.target.value).w, 12);
            update({ start: e.target.value, week: w });
          }} />
          <span>{info}</span>
        </div>
      </div>
    </header>
  );
}
