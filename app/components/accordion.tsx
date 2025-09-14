import React from 'react';
import { FormattedText } from './formattedText';

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
        <h3 className="text-xl subtitle">{title}</h3>
        <h3 className="text-4xl subtitle">{activeId === title ? '-' : '+'}</h3>
      </div>
      {activeId === title && (
        <FormattedText text={content} className="mt-2" />
      )}
      {/* Horizontal line */}
      <div className="w-full h-1 bg-black dark:bg-white mt-2"></div>
    </div>
  );
};
