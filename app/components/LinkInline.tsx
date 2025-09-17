"use client";
import Link from 'next/link';
import React from 'react';
import { links } from '@/lib/design-system';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const LinkInline: React.FC<Props> = ({ href, className, children }) => {
  const cls = cn(links.inline, className);
  const isExternal = /^https?:\/\//i.test(href) || href.startsWith('mailto:');
  if (isExternal) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
};

export default LinkInline;

