"use client";
import { useState } from 'react';
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '@/translations/faq-page/it.json';
import contentEn from '@/translations/faq-page/en.json';
import { Accordion } from '@/components/accordion';
import { spacing } from '@/lib/design-system';
import Button from '@/components/Button';

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
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Title text={content.pageTitle} />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 my-6">
        {categories.map((c, idx) => (
          <Button
            key={`${c.name}-${idx}`}
            variant="ghost"
            size="sm"
            selected={isSelected(c.name)}
            onClick={() => toggleCategory(c.name)}
          >
            {c.name}
          </Button>
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
