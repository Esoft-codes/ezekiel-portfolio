'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site';

export function Header() {
  const path = usePathname() || '/';
  const onWork = path.startsWith('/work');
  return (
    <header className="header">
      <Link href="/" className="brand" data-title="Home">
        <span className="brand__mark" aria-hidden="true">{site.initials}</span>
        <span className="brand__name">{site.short}</span>
      </Link>
      <nav className="nav" aria-label="Main">
        <a className="draw" href="/#work" aria-current={onWork ? 'page' : undefined}>Work</a>
        <a className="draw" href="/#about">About</a>
        <a className="draw" href="/#contact">Contact</a>
      </nav>
    </header>
  );
}
