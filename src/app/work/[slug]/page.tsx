import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Eyebrow } from '@/components/Eyebrow';
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
        <Eyebrow>Project {p.n} · {p.category}</Eyebrow>
        <h1 className={`case__title ${voice}`}><span className="mask"><span className="rise">{p.title}</span></span></h1>
        <p className="lede enter" style={{ animationDelay: '0.25s' }}>{p.summary}</p>
        <dl className="case__meta mono enter" style={{ animationDelay: '0.35s' }}>
          <div><dt>Category</dt><dd>{p.category}</dd></div>
          <div><dt>Discipline</dt><dd style={{ color: 'var(--lane)' }}>{p.branch === 'Creative' ? 'AI creative production' : 'AI automation'}</dd></div>
          <div><dt>Tools</dt><dd>{p.stack.join(', ')}</dd></div>
        </dl>
      </header>

      <figure className="case__hero open">
        {p.cover ? (
          p.cover.video ? (
            <div className="shot__frame video-frame">
              <video src={p.cover.video} poster={p.cover.src} width={p.cover.w} height={p.cover.h} controls playsInline preload="metadata" aria-label={p.cover.alt} />
            </div>
          ) : (
          <div className="shot__frame">
            <Image src={p.cover.src} alt={p.cover.alt} width={p.cover.w} height={p.cover.h} sizes="95vw" loading="eager" fetchPriority="high" unoptimized />
          </div>
          )
        ) : (
          <div className="typecover" role="img" aria-label={`${p.title}: title card`}>
            <span className={`typecover__t ${voice}`}>{p.short}</span>
            <span className="typecover__n mono">Project {p.n}</span>
          </div>
        )}
      </figure>

      <div className="grid case__body">
        <section className="case__block"><h2 className="mono">The problem</h2><p data-reveal="up">{p.context}</p></section>
        <section className="case__block"><h2 className="mono">The approach</h2><p data-reveal="up">{p.idea}</p></section>
        <section className="case__block"><h2 className="mono">How it works</h2>
          <ol className="case__steps" data-reveal="up">{p.chain.map((c) => <li key={c}>{c}</li>)}</ol>
        </section>
        <section className="case__block"><h2 className="mono">What I built</h2><p data-reveal="up">{p.shipped}</p></section>
        <section className="case__block case__result"><h2 className="mono">The result</h2><p data-reveal="up">{p.result}</p></section>
        {p.placeholderMedia && (
          <p className="case__block note mono">Media coming soon: finished videos and demo recordings for this project will be added here.</p>
        )}
      </div>

      {p.gallery.length > 0 && (
        <div className="case__gallery">
          {p.gallery.map((s) => (
            <figure className="shot" key={s.src} data-reveal="up">
              <div className={`shot__frame${s.video ? ' video-frame' : ''}`}>
                {s.video ? <video src={s.video} poster={s.src} width={s.w} height={s.h} controls playsInline preload="none" aria-label={s.alt} />
                  : <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="90vw" unoptimized />}
              </div>
              {s.caption && <figcaption className="mono">{s.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <aside className="ask" aria-labelledby="ask-title">
        <h2 id="ask-title" className={`ask__t ${voice}`}>Want something like this for your business?</h2>
        <p className="muted">Book a free 15-minute call. We’ll look at one process and whether it can run on its own.</p>
        <div className="ask__cta">
          <a className="btn btn--solid" href="/#contact" data-fill><span className="btn__fill" aria-hidden="true" />Book a free 15-minute audit<span className="btn__arrow" aria-hidden="true">→</span></a>
          <a className="btn btn--ghost" href="/#work" data-fill><span className="btn__fill" aria-hidden="true" />See all projects<span className="btn__arrow" aria-hidden="true">→</span></a>
        </div>
      </aside>

      <nav className={`next${next.branch === 'Creative' ? ' lane-create' : ''}`} aria-label="Next project">
        <span className="mono muted">Next project</span>
        <Link className={`next__link ${next.branch === 'Creative' ? 'voice-create' : 'voice-auto'}`} href={`/work/${next.slug}/`}>
          <span className="nt">{next.title}</span><span className="arr" aria-hidden="true">→</span>
        </Link>
      </nav>
    </article>
  );
}
