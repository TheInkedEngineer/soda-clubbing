"use client";
import { useState } from 'react';
import { Title } from '../../src/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '../../src/translations/faq-page/it.json';
import contentEn from '../../src/translations/faq-page/en.json';
import { Accordion } from '../../src/components/accordion';
import { spacing } from '@/lib/design-system';

export default function FAQPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const toggleAccordion = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  const categories: Array<{ name: string }> = (content.content ?? []).map((c: any) => ({ name: c.categoryName }));
  const toggleCategory = (name: string) =>
    setSelectedCategories((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  const isSelected = (name: string) => selectedCategories.includes(name);
  const filteredContent = (content.content ?? []).filter(
    (c: any) => selectedCategories.length === 0 || selectedCategories.includes(c.categoryName)
  );

  return (
    <div className={spacing.container}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Title text={content.pageTitle} />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 my-6">
        {categories.map((c, idx) => (
          <button
            key={`${c.name}-${idx}`}
            type="button"
            onClick={() => toggleCategory(c.name)}
            className={`title text-base px-4 py-2 border-4 border-black rounded-none transition-colors duration-150 ${
              isSelected(c.name)
                ? 'bg-black !text-white'
                : 'bg-transparent !text-black hover:bg-black hover:!text-white'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div>
        {filteredContent.map((category: any, index: number) => (
          <section key={index} className={spacing.section}>
            <Title as="h2" text={category.categoryName} />
            {(category.qna ?? []).map((qa: any, qIndex: number) => (
              <Accordion
                key={qIndex}
                title={qa.question}
                content={qa.answer}
                activeId={activeId}
                toggleAccordion={toggleAccordion}
              />
            ))}
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
}
