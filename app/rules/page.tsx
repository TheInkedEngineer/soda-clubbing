"use client";
import { useState } from 'react';
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '@/translations/rules-page/it.json';
import contentEn from '@/translations/rules-page/en.json';
import { Accordion } from '@/components/accordion';

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
