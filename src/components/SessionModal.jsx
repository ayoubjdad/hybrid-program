import { useEffect } from 'react';
import { DN, weekSessions } from '../lib/plan.js';
import MuscuSession from './MuscuSession.jsx';
import Paced from './Paced.jsx';

export default function SessionModal({ open, onClose, s, update, P, startTimer }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!open) return null;
  const w = s.week, x = weekSessions(w, P)[open.day].find((y) => y.id === open.id), key = w + ':' + open.id;
  const color = x.type === 'lift' ? 'lift' : x.type === 'run' ? 'run' : 'rest';
  const isDone = !!s.done[key];
  return (
    <div className="modal on" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet">
        <div className="top">
          <div>
            <div className="eyebrow" style={{ color: `var(--${color})` }}>{DN[open.day]} · Semaine {w} · {x.when}</div>
            <h2>{x.t}</h2>
          </div>
          <button className="x" onClick={onClose}>✕</button>
        </div>
        {x.type === 'lift' ? (
          <MuscuSession k={x.m} w={w} s={s} update={update} startTimer={startTimer} inModal />
        ) : (
          <>
            {x.body.map((b) => (
              <div key={b[0]} className="block" style={{ '--c': `var(--${color})` }}>
                <div className="k">{b[0]}</div>
                <div className="v"><Paced text={b[1]} P={P} /></div>
              </div>
            ))}
            {x.type === 'run' && (
              <div className="meta" style={{ marginTop: 12 }}>
                {[['E', 'Facile'], ['T', 'Seuil'], ['I', 'VMA'], ['O10', 'Allure 10 km obj.']].map(([z, l]) => (
                  <span key={z} className="pill g">{l} : {P[z]}</span>
                ))}
              </div>
            )}
          </>
        )}
        {(x.type !== 'rest' || open.id === 'run-opt') && (
          <button className={'done-btn' + (isDone ? ' is' : '')} onClick={() => update((prev) => ({ done: { ...prev.done, [key]: !prev.done[key] } }))}>
            {isDone ? '✓ Séance faite — annuler' : 'Marquer comme faite'}
          </button>
        )}
      </div>
    </div>
  );
}
