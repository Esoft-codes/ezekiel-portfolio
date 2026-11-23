// Blog posts are Markdown files in content/blog. Files starting with "_" are ignored (templates, drafts).
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  tags: string[];
  cover?: string;
  minutes: number;
  html: string;
};

const dir = path.join(process.cwd(), 'content/blog');

function read(file: string): Post | null {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data, content } = matter(raw);
  if (data.draft) return null;
  const slug = file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date || file.slice(0, 10));
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: String(data.title || slug),
    date,
    description: String(data.description || content.replace(/[#*_>`\[\]()!-]/g, '').trim().slice(0, 155)),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : data.tags ? String(data.tags).split(',').map((t) => t.trim()) : [],
    cover: data.cover ? String(data.cover) : undefined,
    minutes: Math.max(1, Math.round(words / 220)),
    html: marked.parse(content, { async: false }) as string,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map(read)
    .filter((p): p is Post => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const fmtDate = (d: string) =>
  new Date(d + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
