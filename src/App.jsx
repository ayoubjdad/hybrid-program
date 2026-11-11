import { useMemo, useRef, useState, useEffect } from 'react';
import { useStore } from './hooks/useStore.js';
import { computePaces } from './lib/vdot.js';
import { currentWeekDay } from './lib/plan.js';
import Hero from './components/Hero.jsx';
import WeekView from './components/WeekView.jsx';
import MuscuView from './components/MuscuView.jsx';
import PacesView from './components/PacesView.jsx';
import NutritionView from './components/NutritionView.jsx';
import TipsView from './components/TipsView.jsx';
import SessionModal from './components/SessionModal.jsx';
import RestTimer from './components/RestTimer.jsx';

const TABS = [
  ['semaine', '📅 Semaine'], ['muscu', '🏋️ Muscu'], ['allures', '⏱️ Allures'],
  ['nutrition', '🍽️ Nutrition'], ['conseils', '💡 Conseils'],
];

export default function App() {
  const [s, update] = useStore();
  const [tab, setTab] = useState(() => (TABS.some(([k]) => '#' + k === location.hash) ? location.hash.slice(1) : 'semaine'));
  const [open, setOpen] = useState(null);
  const timer = useRef(null);
  const P = useMemo(() => computePaces(s.r10, s.r21), [s.r10, s.r21]);

  useEffect(() => { if (!s.week) update({ week: Math.min(currentWeekDay(s.start).w, 12) }); }, []); // eslint-disable-line
  if (!s.week) return null;

  const startTimer = (sec) => timer.current?.start(sec || 90);
  const go = (k) => {
    setTab(k); history.replaceState(null, '', '#' + k);
    const nav = document.querySelector('.tabs');
    if (nav && window.scrollY > nav.offsetTop) window.scrollTo({ top: nav.offsetTop, behavior: 'smooth' });
  };
  const props = { s, update, P, startTimer };

  return (
    <>
      <Hero {...props} />
      <nav className="tabs"><div className="wrap">
        {TABS.map(([k, l]) => <button key={k} className={'tab' + (tab === k ? ' on' : '')} onClick={() => go(k)}>{l}</button>)}
      </div></nav>
      <main className="wrap">
        {tab === 'semaine' && <WeekView {...props} onOpen={(day, id) => setOpen({ day, id })} />}
        {tab === 'muscu' && <MuscuView {...props} />}
        {tab === 'allures' && <PacesView {...props} />}
        {tab === 'nutrition' && <NutritionView {...props} />}
        {tab === 'conseils' && <TipsView />}
        <footer>Programme indicatif. En cas de douleur articulaire ou tendineuse qui dure plus de 3 jours, lève le pied et consulte un professionnel de santé.</footer>
      </main>
      <SessionModal open={open} onClose={() => setOpen(null)} {...props} />
      <RestTimer ref={timer} />
    </>
  );
}
