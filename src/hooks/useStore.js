import { useEffect, useState } from 'react';

const KEY = 'hybride-ayoub-v1';
const DEFAULTS = { week: null, done: {}, sets: {}, kg: {}, r10: '54:00', r21: '2:09:00', start: '2026-11-09', mtab: 'A', meals: {}, track: [] };

// État global persisté dans localStorage (même clé que la version HTML)
export function useStore() {
  const [s, setS] = useState(() => {
    try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY)) || {}) }; } catch { return DEFAULTS; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* stockage indisponible */ } }, [s]);
  const update = (patch) => setS((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }));
  return [s, update];
}
