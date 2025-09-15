"use client";
import { Title } from '@/components/title';
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
      <Title text={content.pageTitle} />
      <FormattedText
        text={content.pageContent}
        className="font-bold text-xl md:text-2xl mb-48 sm:mb-96"
        linkClassName="underline uppercase font-bold text-xl md:text-2xl text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
      />
      <Footer />
    </div>
  );
}
