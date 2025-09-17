"use client";
import React from 'react';
import { divider } from '@/lib/design-system';
import { cn } from '@/lib/utils';

type Props = { className?: string };

export const Divider: React.FC<Props> = ({ className }) => (
  <div className={cn(divider.base, className)} />
);

export default Divider;

