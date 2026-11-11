import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

let actx = null;
function getCtx() {
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); actx.resume?.(); } catch { /* audio indisponible */ }
  return actx;
}
function beep() {
  const c = getCtx(); if (!c) return;
  [0, 0.25, 0.5].forEach((o) => {
    const os = c.createOscillator(), g = c.createGain();
    os.frequency.value = 880; os.connect(g); g.connect(c.destination);
    g.gain.setValueAtTime(0.25, c.currentTime + o);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + o + 0.2);
    os.start(c.currentTime + o); os.stop(c.currentTime + o + 0.2);
  });
}

// Minuteur de repos flottant. start(secondes) exposé via ref.
const RestTimer = forwardRef(function RestTimer(_, ref) {
  const [end, setEnd] = useState(0), [now, setNow] = useState(Date.now());
  const fired = useRef(true);
  const start = (s) => { getCtx(); fired.current = false; setEnd(Date.now() + s * 1000); setNow(Date.now()); };
  useImperativeHandle(ref, () => ({ start }));
  useEffect(() => {
    if (!end) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [end]);
  const r = Math.max(0, Math.ceil((end - now) / 1000));
  useEffect(() => {
    if (end && r === 0 && !fired.current) { fired.current = true; beep(); setEnd(0); }
  }, [r, end]);
  return (
    <div className="timer">
      <span className="lbl">Repos</span>
      <span className={'tv' + (r > 0 ? ' go' : '')}>{Math.floor(r / 60)}:{String(r % 60).padStart(2, '0')}</span>
      {[[60, "1'"], [90, "1'30"], [120, "2'"], [180, "3'"]].map(([s, l]) => (
        <button key={s} className="tb" onClick={() => start(s)}>{l}</button>
      ))}
      {r > 0 && <button className="tb stop" onClick={() => { fired.current = true; setEnd(0); }}>Stop</button>}
    </div>
  );
});
export default RestTimer;
