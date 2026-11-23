import Image from 'next/image';
import { Node } from '@/components/Node';
import { Btn } from '@/components/Btn';
import { ContactForm } from '@/components/ContactForm';
import { Booking } from '@/components/Booking';
import { about, automation, clientWork, creative, handover, process, projects, site, testimonial, tools, workbench } from '@/data/site';

export default function Home() {
  return (
    <>
      {/* HERO: the trigger */}
      <section className="hero wrap" aria-labelledby="hero-title">
        <Node type="Trigger" name="New visitor" ms="0.1s" />
        <div className="grid hero__grid">
          <div className="hero__text">
            <h1 id="hero-title" className="hero__name voice-auto">
              <span className="mask"><span className="rise">Ezekiel Efemena</span></span>{' '}
              <span className="mask"><span className="rise" style={{ animationDelay: '0.08s' }}>Atevafo</span></span>
            </h1>
            <p className="hero__roles mono enter" style={{ animationDelay: '0.3s' }}>
              <span>{site.roleA}</span>
              <span>{site.roleB}</span>
            </p>
            <p className="hero__lede enter" style={{ animationDelay: '0.4s' }}>{site.headline}</p>
            <div className="hero__cta enter" style={{ animationDelay: '0.5s' }}>
              <Btn href="#work">Explore my work</Btn>
              <Btn href="#contact" ghost>Let’s work together</Btn>
            </div>
          </div>
          <figure className="hero__portrait out open">
            <figcaption className="out__bar mono"><span>Output</span><span>1 item</span></figcaption>
            <div className="out__frame">
              <Image src="/img/portrait.webp" alt="Portrait of Ezekiel Efemena Atevafo in a navy three-piece suit" width={960} height={1200}
                sizes="(max-width: 900px) 90vw, 30vw" loading="eager" fetchPriority="high" data-critical unoptimized />
            </div>
          </figure>
        </div>
        <div className="hero__meta mono">
          <span>{site.location}</span>
          <span>Freelancing since {site.since}</span>
        </div>
      </section>

      {/* TAGLINE: one family, two personalities */}
      <section className="wrap" aria-label="Tagline">
        <Node type="Set" name="Approach" ms="0.2s" />
        <p className="tagline">
          <span className="t1" data-split="lines">{site.tagline[0]}</span>
          <span className="t2" data-split="lines" data-delay="0.08">{site.tagline[1]}</span>
          <span className="t3" data-split="lines" data-delay="0.16">{site.tagline[2]}</span>
        </p>
        <p className="lede body-copy" data-reveal="up">{site.intro}</p>
      </section>

      {/* ABOUT */}
      <section id="about" className="about wrap" aria-labelledby="about-title">
        <div className="sec-head"><Node type="Agent" name="About me" ms="0.4s" /></div>
        <div className="grid">
          <div className="about__img" data-reveal="clip">
            <Image src="/img/portrait-street.webp" alt="Ezekiel Efemena Atevafo standing in an office, hand in pocket, in a navy suit" width={960} height={1200}
              sizes="(max-width: 900px) 92vw, 38vw" unoptimized data-parallax="0.06" />
          </div>
          <div className="about__text">
            <h2 id="about-title" className="h2 voice-auto" data-split="lines">{about.title}</h2>
            <div className="body-copy" data-reveal="up">{about.body.map((p) => <p key={p.slice(0, 12)}>{p}</p>)}</div>
            <dl className="facts mono" data-reveal="fade">
              <dt>Focus</dt><dd>AI automation, system integration, conversational AI, AI creative production</dd>
              <dt>Based in</dt><dd>{site.location}</dd>
              <dt>Freelancing</dt><dd>Since {site.since}</dd>
              <dt>Education</dt><dd>{site.education}</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* SERVICES: router into two lanes */}
      <section id="services" className="services wrap" aria-labelledby="services-title">
        <div className="sec-head">
          <Node type="Router" name="What I do · 2 branches" ms="0.1s" />
          <h2 id="services-title" className="h2 voice-auto" data-split="lines">Two branches, one practice.</h2>
        </div>
        <div className="lanes">
          <div className="lane">
            <div className="lane__head">
              <Node type="Branch 1" name="Automation and business systems" ms="1.2s" free />
              <h3 className="lane__title voice-auto">AI automation and business systems</h3>
              <p className="muted body-copy">Intelligent automation that cuts manual work, keeps operations moving and makes teams more productive.</p>
            </div>
            {automation.map((s) => (
              <details className="svc" key={s.title}>
                <summary><span className="svc__t">{s.title}</span><span className="svc__plus" aria-hidden="true" /></summary>
                <div className="svc__body">
                  <p>{s.text}</p>
                  <ul className="svc__items">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                  <p className="mono">Tools: <span className="svc__tools">{s.tools}</span></p>
                </div>
              </details>
            ))}
          </div>
          <div className="lane lane-create">
            <div className="lane__head">
              <Node type="Branch 2" name="Creative production" ms="2.4s" lane="create" free />
              <h3 className="lane__title voice-create">AI creative production</h3>
              <p className="muted body-copy">AI-powered video that turns ideas, products and stories into something people watch.</p>
            </div>
            {creative.map((s) => (
              <div className="svc-c" key={s.title}>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK: execution log */}
      <section id="work" className="work wrap" aria-labelledby="work-title">
        <div className="sec-head">
          <Node type="Merge" name={`Selected work · ${projects.length} executions`} ms="0.3s" />
          <h2 id="work-title" className="h2 voice-auto" data-split="lines">Turning ideas into working solutions.</h2>
          <p className="lede muted" data-reveal="up">Automation systems, AI-powered business tools and creative production, each one a real build.</p>
        </div>
        <div className="log" data-index>
          <div className="log__head mono" aria-hidden="true"><span>#</span><span>Project</span><span>Branch</span><span>Stack</span><span>Status</span></div>
          <ul style={{ padding: 0 }}>
            {projects.map((p) => (
              <li key={p.slug} style={{ listStyle: 'none' }} className={p.branch === 'Creative' ? 'lane-create' : undefined}>
                <a className="row" href={`/work/${p.slug}/`} data-title={p.short} data-branch={p.branch}
                  data-preview={p.cover?.src} data-chain={p.chain.join(' → ')}>
                  <span className="mono muted">{p.n}</span>
                  <span className={`row__t ${p.branch === 'Creative' ? 'voice-create' : 'voice-auto'}`}>{p.title}</span>
                  <span className="row__branch mono" style={{ color: 'var(--lane)' }}>{p.branch}</span>
                  <span className="row__stack mono muted">{p.stack.slice(0, 3).join(', ')}</span>
                  <span className="row__status mono"><i aria-hidden="true" />Success</span>
                  <span className="row__thumb" aria-hidden="true">
                    {p.cover ? <Image src={p.cover.src} alt="" width={p.cover.w} height={p.cover.h} sizes="90vw" unoptimized />
                      : <span className={`tc ${p.branch === 'Creative' ? 'voice-create' : 'voice-auto'}`} style={{ color: 'var(--lane)' }}>{p.short}</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="preview" aria-hidden="true">
          <div className="preview__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" width={640} height={400} hidden />
            <span className="preview__type voice-create" />
          </div>
          <span className="preview__cap mono" />
        </div>
      </section>

      {/* TESTIMONIAL: a client, on camera */}
      <section className="voice wrap" aria-labelledby="voice-title">
        <div className="sec-head">
          <Node type="Webhook" name="Client feedback received" ms="0.4s" />
          <h2 id="voice-title" className="h2 voice-auto" data-split="lines">What clients say.</h2>
        </div>
        <div className="grid voice__grid">
          <figure className="voice__video" data-reveal="up">
            <div className="video-frame">
              <video src={testimonial.video} poster={testimonial.poster} width={testimonial.w} height={testimonial.h}
                controls playsInline preload="none" aria-label="Video testimonial from a client about working with Ezekiel" />
            </div>
            <figcaption className="mono muted">
              {testimonial.name ? `${testimonial.name}${testimonial.role ? ', ' + testimonial.role : ''}` : 'A client'} · video testimonial · {testimonial.minutes}
            </figcaption>
          </figure>
          <div className="voice__text" data-reveal="up" data-delay="0.1">
            <p className="lede">The most useful thing I can show you is a client talking about the work in their own words, unedited.</p>
            <p className="muted body-copy">Press play for sound. If you want to hear how a project like yours would go, the quickest way is to ask me directly.</p>
            <div><a className="btn btn--ghost" href="#contact" data-fill><span className="btn__fill" aria-hidden="true" />Let’s work together<span className="btn__arrow" aria-hidden="true">→</span></a></div>
          </div>
        </div>

        <div className="cw">
          <h3 className="mono muted cw__label">Client work</h3>
          <ul className="cw__grid">
            {clientWork.map((c, i) => (
              <li className="cw__card" key={c.client} data-reveal="up" data-delay={String(i * 0.08)}>
                <div className="cw__head">
                  <span className="cw__stars" aria-label="5 out of 5 stars">★★★★★</span>
                  <h4 className="cw__client voice-auto">{c.client}</h4>
                  <p className="mono muted">{c.industry} · {c.services}</p>
                </div>
                <ul className="cw__results">{c.results.map((r) => <li key={r}>{r}</li>)}</ul>
                <blockquote className="cw__quote">
                  <p>“{c.quote}”</p>
                  <footer className="mono"><span>{c.author}</span>, {c.role}</footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORKBENCH: real screens */}
      <section className="bench wrap" aria-labelledby="bench-title">
        <div className="sec-head">
          <Node type="Code" name="From the workbench" ms="0.6s" />
          <h2 id="bench-title" className="h2 voice-auto" data-split="lines">More builds, straight from the canvas.</h2>
        </div>
        <div className="bench__wall">
          {workbench.map((s) => (
            <figure className="shot" key={s.src} data-reveal="up">
              <div className="shot__frame"><Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(max-width: 900px) 92vw, 55vw" unoptimized /></div>
              <figcaption className="mono">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="process wrap" aria-labelledby="process-title">
        <div className="sec-head">
          <Node type="Loop" name="How I work · 4 steps" ms="0.8s" />
          <h2 id="process-title" className="h2 voice-auto" data-split="lines">From business challenge to working solution.</h2>
        </div>
        <ol className="chain" style={{ padding: 0 }}>
          {process.map((s, i) => (
            <li className="step" key={s.title} style={{ listStyle: 'none' }} data-reveal="up" data-delay={String(i * 0.08)}>
              <span className="step__dot" aria-hidden="true" />
              <span className="mono muted">Step {i + 1}</span>
              <h3 className="voice-auto">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="handover">
          <h3 className="mono muted handover__label">What you get at handover</h3>
          <ul className="handover__grid">
            {handover.map((h, i) => (
              <li key={h.title} data-reveal="up" data-delay={String(i * 0.08)}>
                <h4 className="voice-auto">{h.title}</h4>
                <p className="muted">{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TOOLS */}
      <section className="tools wrap" aria-labelledby="tools-title">
        <div className="sec-head">
          <Node type="Credentials" name="Tools connected" ms="0.1s" />
          <h2 id="tools-title" className="h2 voice-auto" data-split="lines">The technology behind the work.</h2>
        </div>
        <div className="tools__grid" data-reveal="up">
          {tools.map((g) => (
            <div key={g.group}>
              <h3 className="mono">{g.group}</h3>
              <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT: send email */}
      <section id="contact" className="contact wrap" aria-labelledby="contact-title">
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <Node type="Send email" name="To Ezekiel" ms="0.3s" />
          <h2 id="contact-title" className="contact__q voice-auto" data-split="lines">Have a process to automate or an idea to bring to life?</h2>
        </div>
        <div className="grid contact__grid">
          <div className="contact__direct">
            <p className="lede">An AI assistant, an automated workflow, a connected CRM or AI video: tell me what you need and let’s see what’s possible.</p>
            {site.bookingUrl && <div><a className="btn btn--solid" href="#booking-cal" data-fill data-no-transition><span className="btn__fill" aria-hidden="true" />Book a free 15-minute audit<span className="btn__arrow" aria-hidden="true">→</span></a></div>}
            <a className="contact__email link" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="mono"><a className="link tap" href={site.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a></p>
          </div>
          <ContactForm email={site.email} webhook={site.formWebhook || undefined} />
        </div>
        {site.bookingUrl && <Booking url={site.bookingUrl} />}
        <footer className="footer mono">
          <span>Workflow finished · status success</span>
          <span>© 2026 {site.name}</span>
          <span>{site.location}</span>
        </footer>
      </section>
    </>
  );
}
