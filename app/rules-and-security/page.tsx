"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import rulesIt from '@/translations/rules-page/it.json';
import rulesEn from '@/translations/rules-page/en.json';
import securityIt from '@/translations/security-page/it.json';
import securityEn from '@/translations/security-page/en.json';
import pageIt from '@/translations/rules-security-page/it.json';
import pageEn from '@/translations/rules-security-page/en.json';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Accordion } from '@/components/accordion';
import { spacing } from '@/lib/design-system';

export default function RulesAndSecurityPage() {
  const { language } = useLanguage();
  const content = useMemo(() => (language === 'en' ? (pageEn as any) : (pageIt as any)), [language]);
  const rules = language === 'en' ? (rulesEn as any) : (rulesIt as any);
  const security = language === 'en' ? (securityEn as any) : (securityIt as any);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleAccordion = (id: string) => setActiveId((prev) => (prev === id ? null : id));
  const angelsTitle = language === 'en' ? 'Angels' : 'Angeli';

  return (
    <div>
      <Title text={content.pageTitle} />

      <section className={spacing.section}>
        <Title as="h2" text={angelsTitle} />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-full md:w-1/2">
            <FormattedText text={security.pageContent} />
          </div>
          <div className="w-full md:w-1/2">
            <Image src="/remote-images/sicurezza/team.png" alt="Team" width={1600} height={1067} className="w-full h-auto rounded" />
          </div>
        </div>
      </section>

      <section className={spacing.section}>
        <Title as="h2" text={rules.pageTitle} />
        {(rules.rules ?? []).map((rule: { title: string; body: string }, idx: number) => (
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
