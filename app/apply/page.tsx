"use client";
import Title from '../../src/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '../../src/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '../../src/translations/apply-page/it.json';
import contentEn from '../../src/translations/apply-page/en.json';

export default function ApplyPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <div>
      <Title text={content.pageTitle} />
      <FormattedText text={content.pageContent} className="mb-48 sm:mb-96" />
      <Footer />
    </div>
  );
}
