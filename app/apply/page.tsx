"use client";
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '@/translations/apply-page/it.json';
import contentEn from '@/translations/apply-page/en.json';

export default function ApplyPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <div>
      <FormattedText text={content.pageTitle} variant="h1"/>
      <FormattedText text={content.pageContent} blockLinks variant="text" /> 
      <Footer />
    </div>
  );
}
