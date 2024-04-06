"use client";
import { useState } from 'react';
import Title from '../../src/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '../../src/translations/rules-page/it.json';
import contentEn from '../../src/translations/rules-page/en.json';
import { Accordion } from '../../src/components/accordion';

export default function RulesPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleAccordion = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <div>
      <Title text={content.pageTitle} />
      {(content.rules ?? []).map((rule: { title: string; body: string }, idx: number) => (
        <Accordion
          key={idx}
          title={rule.title}
          content={rule.body}
          activeId={activeId}
          toggleAccordion={toggleAccordion}
        />
      ))}
      <Footer />
    </div>
  );
}
