import type { Metadata } from 'next';
import Link from 'next/link';
import { Node } from '@/components/Node';
import { fmtDate, getPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes from Ezekiel Efemena Atevafo on AI automation, voice agents, integrations and AI video production: what he builds, how, and what he learns.',
  alternates: { types: { 'application/rss+xml': '/blog/rss.xml' } },
};

export default function Blog() {
  const posts = getPosts();
  return (
    <section className="blog wrap" aria-labelledby="blog-title">
      <div className="sec-head">
        <Node type="Logs" name={`Blog · ${posts.length} ${posts.length === 1 ? 'entry' : 'entries'}`} ms="0.2s" />
        <h1 id="blog-title" className="h2 voice-auto"><span className="mask"><span className="rise">Notes from the workflow.</span></span></h1>
        <p className="lede muted enter" style={{ animationDelay: '0.2s' }}>What I build with AI automation and AI video, how I build it, and what I learn along the way.</p>
      </div>
      {posts.length === 0 ? (
        <p className="note mono">No posts yet.</p>
      ) : (
        <ul className="posts">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link className="post-row" href={`/blog/${p.slug}/`} data-title={p.title}>
                <time className="mono muted" dateTime={p.date}>{fmtDate(p.date)}</time>
                <span className="post-row__main">
                  <span className="post-row__t voice-auto">{p.title}</span>
                  <span className="post-row__d muted">{p.description}</span>
                </span>
                <span className="post-row__meta mono muted">{p.tags.slice(0, 2).join(', ')}{p.tags.length ? ' · ' : ''}{p.minutes} min read</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mono muted blog__rss"><a className="link" href="/blog/rss.xml" data-no-transition>RSS feed</a></p>
    </section>
  );
}
