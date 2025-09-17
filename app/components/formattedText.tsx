"use client";
import React from 'react';
import { formatText } from '../logic/textFormatter';
import LinkBlock from './LinkBlock';
import Text from './Text';
import { Title } from './title';
import { typography, colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface FormattedTextProps {
  text: string;
  className?: string;
  linkClassName?: string;
  blockLinks?: boolean;
  variant?: 'h1' | 'h2' | 'h3' | 'text';
  uppercase?: boolean;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className, linkClassName, blockLinks, variant = 'text', uppercase = false }) => {
  const content = formatText(text, {
    linkClassName,
    renderLink: blockLinks
      ? ({ text: t, url, key }) => (
          <LinkBlock href={url} key={key}>
            {t}
          </LinkBlock>
        )
      : undefined,
  });
  if (variant === 'h1') {
    return (
      <Title as="h1" className={className}>
        {content}
      </Title>
    );
  }
  if (variant === 'h2') {
    return (
      <Title as="h2" className={className}>
        {content}
      </Title>
    );
  }
  if (variant === 'h3') {
    return (
      <Title as="h3" className={className}>
        {content}
      </Title>
    );
  }
  // Text variant defaults to bold body text
  if (blockLinks) {
    return <div className={cn(typography.bodyLg, colors.textDefault, 'font-bold', uppercase && 'uppercase', className)}>{content}</div>;
  }
  return (
    <Text variant="md" weight="bold" uppercase={uppercase} className={className}>
      {content}
    </Text>
  );
};
