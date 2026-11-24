import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Eyebrow } from '@/components/Eyebrow';
import { fmtDate, getPost, getPosts } from '@/lib/blog';
import { site } from '@/data/site';

export const dynamicParams = false;
export function generateStaticParams() {
  const posts = getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: 'none' }];
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    openGraph: { type: 'article', title: p.title, description: p.description, publishedTime: p.date, images: [p.cover || '/og.png'] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = posts[i];
  const older = posts[i + 1];
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
    datePublished: p.date, author: { '@type': 'Person', name: site.name, url: site.url }, url: `${site.url}/blog/${p.slug}/`,
  };
  return (
    <article className="post wrap">
      <header className="post__head">
        <Eyebrow>{fmtDate(p.date)} · {p.minutes} min read</Eyebrow>
        <h1 className="post__title voice-auto"><span className="mask"><span className="rise">{p.title}</span></span></h1>
        <p className="lede enter" style={{ animationDelay: '0.2s' }}>{p.description}</p>
        <p className="mono muted enter" style={{ animationDelay: '0.3s' }}>
          <time dateTime={p.date}>{fmtDate(p.date)}</time> · {p.minutes} min read{p.tags.length ? ` · ${p.tags.join(', ')}` : ''}
        </p>
      </header>
      {p.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="post__cover" src={p.cover} alt="" />
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
      <nav className="next" aria-label="More posts">
        {older ? (
          <>
            <span className="mono muted">Previous post</span>
            <Link className="next__link voice-auto" href={`/blog/${older.slug}/`}><span className="nt">{older.title}</span><span className="arr" aria-hidden="true">→</span></Link>
          </>
        ) : (
          <>
            <span className="mono muted">All posts</span>
            <Link className="next__link voice-auto" href="/blog/"><span className="nt">Back to the blog</span><span className="arr" aria-hidden="true">→</span></Link>
          </>
        )}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </article>
  );
}
