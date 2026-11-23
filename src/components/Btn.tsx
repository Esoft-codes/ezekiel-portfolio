export function Btn({ href, children, ghost, external }: { href: string; children: React.ReactNode; ghost?: boolean; external?: boolean }) {
  return (
    <a className={`btn ${ghost ? 'btn--ghost' : 'btn--solid'}`} href={href} data-fill {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
      <span className="btn__fill" aria-hidden="true" />
      {children}
      <span className="btn__arrow" aria-hidden="true">→</span>
    </a>
  );
}
