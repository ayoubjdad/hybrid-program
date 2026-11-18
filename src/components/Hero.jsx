import { fmtT, parseT } from '../lib/vdot.js';
import { currentWeekDay } from '../lib/plan.js';

export default function Hero({ s, update, P }) {
  const items = [
    ['71 kg', 'Poids actuel'], ['181 cm', 'Taille'], ['77–80 kg', 'Objectif 12 mois', 1],
    ['≈ 2 950', 'kcal / jour', 1], ['160 g', 'Protéines / jour', 1],
    [fmtT(parseT(s.r10) || 54), 'Record 10 km'], [fmtT(parseT(s.r21) || 129), 'Record semi'],
  ];
  const c = currentWeekDay(s.start);
  const info = c.before ? `· démarre dans ${c.before} jour${c.before > 1 ? 's' : ''}` : c.w > 12 ? '· cycle terminé : relance un cycle de 12 semaines' : `· tu es en semaine ${c.w}`;
  return (
    <header className="hero">
      <div className="wrap">
        <div className="eyebrow">Programme hybride · Objectif physique type Anthony Joshua · Casablanca</div>
        <h1><span className="a">Muscle</span> × <span className="b">Cardio</span></h1>
        <p className="sub">Priorité au muscle pendant 12 mois : 3 séances de muscu à fort volume (mar · jeu · sam soir), 3 sorties de course modérées après Al Fajr (lun · mer · ven), et environ 3 000 kcal par jour avec de vrais aliments, sans compléments.</p>
        <div className="stats">
          {items.map((i) => (
            <div key={i[1]} className={'stat' + (i[2] ? ' hl' : '')}><b>{i[0]}</b><span>{i[1]}</span></div>
          ))}
        </div>
        <div className="startrow">
          Début du cycle :
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
