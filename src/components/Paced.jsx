// Remplace {E}, {T}, {I}... par l'allure calculée, en vert
export default function Paced({ text, P, plain }) {
  const parts = String(text).split(/(\{\w+\})/g);
  return parts.map((p, i) => {
    const m = p.match(/^\{(\w+)\}$/);
    if (!m) return p;
    const v = (P[m[1]] || m[1]) + (m[1] === 'R200' ? '' : '/km');
    return plain ? v : <b key={i} style={{ color: 'var(--run)' }}>{v}</b>;
  });
}
