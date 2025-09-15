"use client";
import React from 'react';
import { formatText } from '../logic/textFormatter';
import LinkBlock from './LinkBlock';

interface FormattedTextProps {
  text: string;
  className?: string;
  linkClassName?: string;
  blockLinks?: boolean;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className, linkClassName, blockLinks }) => {
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
  if (blockLinks) {
    return <div className={className}>{content}</div>;
  }
  return <p className={className}>{content}</p>;
};
