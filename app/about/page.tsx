"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '@/translations/about-page/it.json';
import contentEn from '@/translations/about-page/en.json';

export default function AboutPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <div>
      <Title text={content.pageTitle} />
      {content.showVideo && (
        <iframe src={content.videoURL} className="aspect-video w-full my-8" allowFullScreen />
      )}
      <FormattedText text={content.pageContent} />
      <Footer />
    </div>
  );
}
