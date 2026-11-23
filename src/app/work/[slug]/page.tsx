import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Node } from '@/components/Node';
import { projects } from '@/data/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary, images: ['/og.png'] } } : {};
}

export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const creative = p.branch === 'Creative';
  const voice = creative ? 'voice-create' : 'voice-auto';
  return (
    <article className={`case wrap${creative ? ' lane-create' : ''}`}>
      <header className="case__head">
        <Node type={`Execution ${p.n}`} name={p.category} ms="1.0s" lane={creative ? 'create' : undefined} />
        <h1 className={`case__title ${voice}`}><span className="mask"><span className="rise">{p.title}</span></span></h1>
        <p className="lede enter" style={{ animationDelay: '0.25s' }}>{p.summary}</p>
        <dl className="case__meta mono enter" style={{ animationDelay: '0.35s' }}>
          <div><dt>Category</dt><dd>{p.category}</dd></div>
          <div><dt>Branch</dt><dd style={{ color: 'var(--lane)' }}>{p.branch}</dd></div>
          <div><dt>Stack</dt><dd>{p.stack.join(', ')}</dd></div>
        </dl>
      </header>

      <figure className="case__hero open">
        {p.cover ? (
          <div className="shot__frame">
            <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.w} height={p.cover.h} sizes="95vw" loading="eager" fetchPriority="high" unoptimized />
          </div>
        ) : (
          <div className="typecover" role="img" aria-label={`${p.title}: title card`}>
            <span className={`typecover__t ${voice}`}>{p.short}</span>
            <span className="typecover__n mono">Execution {p.n}</span>
          </div>
        )}
      </figure>

      <div className="grid case__body">
        <section className="case__block"><h2 className="mono">Context</h2><p data-reveal="up">{p.context}</p></section>
        <section className="case__block"><h2 className="mono">The idea</h2><p data-reveal="up">{p.idea}</p></section>
        <section className="case__chain" aria-label="How it runs">
          {p.chain.map((c, k) => (
            <span key={c} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {k > 0 && <span className="link-line" aria-hidden="true" />}
              <span className="node mono node--free is-run" style={{ whiteSpace: 'nowrap' }}>
                <span className="node__dot" aria-hidden="true" /><span className="node__name">{c}</span>
              </span>
            </span>
          ))}
        </section>
        <section className="case__block"><h2 className="mono">What shipped</h2><p data-reveal="up">{p.shipped}</p></section>
        {p.placeholderMedia && (
          <p className="case__block note mono">Media coming soon: finished videos and demo recordings for this project will be added here.</p>
        )}
      </div>

      {p.gallery.length > 0 && (
        <div className="case__gallery">
          {p.gallery.map((s) => (
            <figure className="shot" key={s.src} data-reveal="up">
              <div className="shot__frame"><Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="90vw" unoptimized /></div>
              {s.caption && <figcaption className="mono">{s.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <nav className={`next${next.branch === 'Creative' ? ' lane-create' : ''}`} aria-label="Next project">
        <span className="mono muted">Next execution · {next.n}</span>
        <Link className={`next__link ${next.branch === 'Creative' ? 'voice-create' : 'voice-auto'}`} href={`/work/${next.slug}/`}>
          <span className="nt">{next.title}</span><span className="arr" aria-hidden="true">→</span>
        </Link>
      </nav>
    </article>
  );
}
