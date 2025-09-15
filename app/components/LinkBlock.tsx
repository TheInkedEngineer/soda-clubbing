"use client";
import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

const base = "title text-xl md:text-3xl underline block";

export const LinkBlock: React.FC<Props> = ({ href, children, className, target, rel }) => {
  const classes = [base, className].filter(Boolean).join(' ');
  const isExternal = /^https?:\/\//i.test(href) || href.startsWith('mailto:');
  if (isExternal) {
    return (
      <a href={href} target={target ?? (href.startsWith('http') ? '_blank' : undefined)} rel={rel ?? (href.startsWith('http') ? 'noopener noreferrer' : undefined)} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};

export default LinkBlock;

