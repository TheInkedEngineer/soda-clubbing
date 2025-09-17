"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import pageIt from '@/translations/rules-security-page/it.json';
import pageEn from '@/translations/rules-security-page/en.json';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Accordion } from '@/components/accordion';
import { spacing } from '@/lib/design-system';

export default function SecurityAndRulesPage() {
  const { language } = useLanguage();
  const content = useMemo(() => (language === 'en' ? (pageEn as any) : (pageIt as any)), [language]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleAccordion = (id: string) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <div>
      <FormattedText text={content.pageTitle} variant='h1'/>

      <section className={spacing.section}>
        <FormattedText text={content.security.pageTitle} variant='h2'/>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-full md:w-1/2">
            <FormattedText text={content.security.pageContent} variant="text" />
          </div>
          <div className="w-full md:w-1/2">
            <Image src="/remote-images/sicurezza/team.png" alt="Team" width={1600} height={1067} className="w-full h-auto rounded" />
          </div>
        </div>
      </section>

      <section className={spacing.section}>
        <FormattedText text={content.rules.pageTitle} variant='h2'/>
        {(content.rules.rules ?? []).map((rule: { title: string; body: string }, idx: number) => (
          <Accordion
            key={idx}
            title={rule.title}
            content={rule.body}
            activeId={activeId}
            toggleAccordion={toggleAccordion}
          />
        ))}
      </section>

      <Footer />
    </div>
  );
}
