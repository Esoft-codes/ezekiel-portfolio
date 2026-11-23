# Ezekiel Efemena Atevafo: portfolio

A Next.js site built around one idea: the portfolio runs like one of your workflows. You are the
trigger, each section is a node, and as visitors scroll an item travels down the wire on the left
and each node reports success. The services split into two lanes (automation in blue, creative
in violet), and the 404 page is an n8n-style node error.

## Run it

```bash
npm install
npm run dev        # local preview at http://localhost:3000
npm run build      # static site in out/
```

## Edit the content

Every word, project and image path lives in `src/data/site.ts`. Images are in `public/img/`.

To replace a placeholder project cover (projects 02, 05 and 06), add an image to `public/img/`
and give the project a `cover` and `gallery` entries the same way project 01 does, then remove
`placeholderMedia: true`.

## Post to the blog (from your phone or browser, no setup)

1. Open github.com/Esoft-codes/ezekiel-portfolio and go into `content/blog`.
2. Open `_TEMPLATE.md`, click the copy button, then go back and click **Add file → Create new file**.
3. Name it with the date and a short title, like `2026-11-24-my-first-n8n-build.md`. The part after the date becomes the post's web address.
4. Paste the template, change the title, date, description and tags, and write the post below the `---` line.
5. Click **Commit changes**. The post is live on /blog about a minute later.

Pictures: upload them to `public/blog/` (Add file → Upload files), then use `![what it shows](/blog/picture.jpg)` in the post.
To hold a post back, add `draft: true` under the date. To delete a post, delete its file.

## Deploy

The build is a plain static site (`out/`), so any static host works:

- Vercel: `npx vercel --prod`
- Netlify: drag the `out/` folder into app.netlify.com/drop, or `npx netlify deploy --prod --dir out`

When you have the real domain, change `url` in `src/data/site.ts` and rebuild, so canonical
links, the sitemap and social previews point to it.

## Contact form

The form opens the visitor's email app with the message filled in. To receive messages without
that step, connect a form service (for example Formspree) in `src/components/ContactForm.tsx`.

## Stack

Next.js 16 (static export), GSAP + Lenis for motion, Archivo (variable width) and Martian Mono,
self-hosted. Design notes are in `DESIGN.md`.
