"use client";
import { useState } from 'react';
import Title from '../../src/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '../../src/translations/faq-page/it.json';
import contentEn from '../../src/translations/faq-page/en.json';
import { Accordion } from '../../src/components/accordion';

export default function FAQPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleAccordion = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Title text={content.pageTitle} />
      </div>

      <div>
        {(content.content ?? []).map((category: any, index: number) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mb-4 title">{category.categoryName}</h2>
            {(category.qna ?? []).map((qa: any, qIndex: number) => (
              <Accordion
                key={qIndex}
                title={qa.question}
                content={qa.answer}
                activeId={activeId}
                toggleAccordion={toggleAccordion}
              />
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
