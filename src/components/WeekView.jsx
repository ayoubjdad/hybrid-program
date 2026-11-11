import { W, PH } from '../data/running.js';
import { DN, weekSessions, weekProgress, currentWeekDay } from '../lib/plan.js';
import Paced from './Paced.jsx';

export default function WeekView({ s, update, P, onOpen }) {
  const c = currentWeekDay(s.start);
  const w = s.week, d = W[w - 1], p = weekProgress(w, P, s.done);
  const kms = Math.round((d.e + (d.sl[0] || 60) + 45) / 6.4);
  const ss = weekSessions(w, P);
  return (
    <section className="view on">
      <div className="weekbar">
        {W.map((wd, i) => {
          const n = i + 1, pr = weekProgress(n, P, s.done);
          return (
            <button key={n} className={'wk' + (n === w ? ' on' : '') + (n === c.w && !c.before ? ' now' : '')} onClick={() => update({ week: n })}>
              <div className="n">S{n}</div>
              <div className="p">{wd.dl ? 'Allèg.' : wd.ph.slice(0, 5)}</div>
              <div className="bar"><i style={{ width: (pr.n / pr.t) * 100 + '%' }} /></div>
            </button>
          );
        })}
      </div>
      <div className="phase">
        <div><span className="tag">{d.dl ? 'Semaine allégée' : d.ph}</span><h2 style={{ marginTop: 6 }}>Semaine {w}</h2></div>
        <p>{d.dl ? 'Récupération active : on réduit le volume pour assimiler le travail des 3 semaines précédentes. ' : ''}{PH[d.ph]}</p>
        <div className="prog"><b>{p.n}/{p.t}</b><span>séances faites · ~{kms} km</span></div>
      </div>
      <div className="days">
        {DN.map((name, i) => {
          const today = w === c.w && i === c.d && !c.before;
          return (
            <div key={name} className={'day' + (today ? ' today' : '')}>
              <div className="dh"><b>{name.slice(0, 3)}</b><span>{today ? "Aujourd'hui" : name}</span></div>
              {ss[i].map((x) => (
                <button key={x.id} className={`sess ${x.type}${s.done[w + ':' + x.id] ? ' done' : ''}`} onClick={() => onOpen(i, x.id)}>
                  <div className="when">{x.when}</div>
                  <div className="t">{x.t}</div>
                  <div className="d"><Paced text={x.d} P={P} plain /></div>
                </button>
              ))}
            </div>
          );
        })}
      </div>
      <div className="legend">
        <span><i style={{ background: 'var(--lift)' }} />Musculation</span>
        <span><i style={{ background: 'var(--run)' }} />Course</span>
        <span><i style={{ background: 'var(--rest)' }} />Repos / optionnel</span>
        <span>Touche une séance pour le détail et la cocher.</span>
      </div>
    </section>
  );
}
