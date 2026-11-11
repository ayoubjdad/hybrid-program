import { useState, useEffect } from 'react';
import { predict, fmtT, fmtP, parseT } from '../lib/vdot.js';

const RACES = [['5 km', 5000], ['10 km', 10000], ['Semi', 21097.5], ['Marathon', 42195]];

export default function PacesView({ s, update, P }) {
  const [a, setA] = useState(s.r10), [b, setB] = useState(s.r21), [err, setErr] = useState('');
  useEffect(() => { setA(s.r10); setB(s.r21); }, [s.r10, s.r21]);
  const zones = [
    ['Facile (E)', P.E, 'Footings, sortie longue, échauffements. ~75 % de ton volume.', 'var(--run)'],
    ['Marathon (M)', P.M, 'Fin de sorties longues en phase de développement.', '#58b4ff'],
    ['Seuil (T)', P.T, '« Confortablement dur » : tenable ~50–60′ en course.', 'var(--gold)'],
    ['VMA (I)', P.I, 'Fractionné 800–1000 m. Dur mais contrôlé.', 'var(--lift)'],
    ['Allure 10 km objectif', P.O10, 'Pour les séances spécifiques des semaines 9–12.', '#ff5c8a'],
    ['Allure semi objectif', P.SEMI, 'Blocs dans les sorties longues des semaines 9–11.', '#b48cff'],
  ];
  const g10 = predict(P.goal10, 10000), gh = predict(P.goalHalf, 21097.5);
  const gap = P.v10 - P.v21, halfFrom10 = predict(P.v10, 21097.5);
  const recalc = () => {
    if (!parseT(a) || !parseT(b)) return setErr('Format attendu : 54:00 pour le 10 km, 2:09:00 pour le semi.');
    setErr(''); update({ r10: a, r21: b });
  };
  return (
    <section className="view on">
      <h2 className="sectitle">Tes allures d'entraînement</h2>
      <p className="secsub">Calculées à partir de tes records (méthode VDOT de Jack Daniels). Mets à jour tes chronos après un test : toutes les séances du programme s'adaptent automatiquement.</p>
      <div className="card">
        <div className="calc">
          <div className="field"><label>Record 10 km</label><input value={a} onChange={(e) => setA(e.target.value)} placeholder="54:00" /></div>
          <div className="field"><label>Record semi</label><input value={b} onChange={(e) => setB(e.target.value)} placeholder="2:09:00" /></div>
          <button className="btn" onClick={recalc}>Recalculer</button>
          <button className="btn ghost" onClick={() => update({ r10: '54:00', r21: '2:09:00' })}>Réinitialiser</button>
        </div>
        <div className="zones">
          {zones.map((z) => (
            <div key={z[0]} className="zone" style={{ '--c': z[3] }}>
              <div className="k">{z[0]}</div><div className="v">{z[1]} <small>/km</small></div><p>{z[2]}</p>
            </div>
          ))}
        </div>
        <div className="insight">
          {err ? err : gap > 1.5 ? (
            <><b>Ce que disent tes chronos :</b> ton 10 km (VDOT {P.v10.toFixed(1)}) « vaut » un semi en {fmtT(halfFrom10)}, mais ton record est {fmtT(parseT(s.r21))} (VDOT {P.v21.toFixed(1)}). Tu as de la vitesse, c'est l'<b>endurance</b> qui manque : sorties longues progressives jusqu'à 95′ et beaucoup de course lente.</>
          ) : (
            <><b>Ce que disent tes chronos :</b> ton 10 km et ton semi sont cohérents (VDOT {P.v10.toFixed(1)} / {P.v21.toFixed(1)}).</>
          )}
        </div>
      </div>
      <div className="grid2" style={{ marginTop: 14 }}>
        <div className="card"><h3>Prédictions actuelles</h3>
          <table className="pred"><tbody>
            <tr><th>Distance</th><th>Temps</th><th>Allure</th></tr>
            {RACES.map(([n, d]) => { const t = predict(P.vd, d); return <tr key={n}><td>{n}</td><td className="num">{fmtT(t)}</td><td style={{ color: 'var(--mut)' }}>{fmtP(t / (d / 1000))}/km</td></tr>; })}
          </tbody></table>
        </div>
        <div className="card"><h3>Objectifs semaine 12</h3>
          <table className="pred"><tbody>
            <tr><th>Course</th><th>Objectif</th><th>Allure</th></tr>
            <tr><td>10 km</td><td className="num">{fmtT(g10)}</td><td style={{ color: 'var(--mut)' }}>{fmtP(g10 / 10)}/km</td></tr>
            <tr><td>Semi</td><td className="num">{fmtT(gh)}</td><td style={{ color: 'var(--mut)' }}>{fmtP(gh / 21.0975)}/km</td></tr>
            <tr><td colSpan={3} style={{ color: 'var(--mut)', fontSize: 12.5 }}>Objectifs réalistes après 12 semaines régulières. Test 10 km en semaine 12 ; le semi peut se tenter 2–3 semaines plus tard.</td></tr>
          </tbody></table>
        </div>
      </div>
    </section>
  );
}
