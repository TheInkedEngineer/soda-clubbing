"use client";
import React from 'react';
import { borders, colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'ghost';
  size?: 'sm' | 'md';
  selected?: boolean;
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'solid',
  size = 'md',
  selected = false,
  fullWidth = false,
  ...props
}) => {
  const base = cn(
    'uppercase font-bold transition-colors duration-150',
    borders.thick,
    size === 'sm' ? 'px-4 py-2 text-base' : 'px-6 py-3 text-lg',
    fullWidth && 'w-full'
  );

  const solid = selected
    ? cn(colors.bgInverse, colors.textDefault)
    : cn(colors.bgInverse, colors.textDefault);

  const ghost = selected
    ? cn('bg-black text-white dark:bg-white dark:text-black')
    : cn(
        'bg-transparent',
        'hover:bg-black hover:text-white',
        'dark:hover:bg-white dark:hover:text-black'
      );

  const style = variant === 'solid' ? solid : ghost;

  return <button className={cn(base, style, className)} {...props} />;
};

export default Button;

