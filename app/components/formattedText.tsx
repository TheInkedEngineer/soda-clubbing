import React from 'react';
import { formatText } from '../logic/textFormatter';

interface FormattedTextProps {
  text: string;
  className?: string;
  linkClassName?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className, linkClassName }) => {
  return <p className={className}>{formatText(text, { linkClassName })}</p>;
};
