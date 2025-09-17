"use client";
import React from 'react';
import { typography, colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';

type Variant = 'lg' | 'md' | 'sm';
type Weight = 'regular' | 'bold';

type Props = {
  variant?: Variant;
  weight?: Weight;
  uppercase?: boolean;
  className?: string;
  children: React.ReactNode;
};

const mapVariant = (v: Variant) =>
  v === 'lg' ? typography.bodyLg : v === 'md' ? typography.bodyMd : typography.bodySm;

export const Text: React.FC<Props> = ({ variant = 'md', weight = 'regular', uppercase = false, className, children }) => {
  return (
    <p className={cn(mapVariant(variant), colors.textDefault, weight === 'bold' && 'font-bold', uppercase && 'uppercase', className)}>
      {children}
    </p>
  );
};

export default Text;

