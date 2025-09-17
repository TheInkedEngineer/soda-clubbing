import React from 'react';
import { FormattedText } from './formattedText';
import { Title } from './title';
import Divider from './Divider';

interface AccordionProps {
  title: string;
  content: string;
  activeId: string | null;
  toggleAccordion: (id: string) => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  content,
  activeId,
  toggleAccordion,
}) => {
  return (
    <div className="cursor-pointer mb-4">
      <div
        onClick={() => toggleAccordion(title)}
        className="flex justify-between items-center"
      >
        <FormattedText text={title} variant='h3'/>
        <span className="text-4xl subtitle">{activeId === title ? '-' : '+'}</span>
      </div>
      {activeId === title && (
        <FormattedText text={content} className="mt-2" />
      )}
      {/* Horizontal line */}
      <Divider className="mt-2" />
    </div>
  );
};
