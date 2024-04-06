import React from 'react';
import { formatText } from '../logic/textFormatter';

interface FormattedTextProps {
  text: string;
  className?: string; // Optional className prop
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
  return <p className={className}>{formatText(text)}</p>;
};