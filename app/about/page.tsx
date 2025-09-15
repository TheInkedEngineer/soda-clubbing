"use client";
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import { typography } from '@/lib/design-system';
import contentIt from '@/translations/about-page/it.json';
import contentEn from '@/translations/about-page/en.json';

export default function AboutPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  const [introBlock, ...restBlocks] = (content.pageContent as string).split('\n\n');
  const restContent = restBlocks.join('\n\n');
  // Render remaining content as a single bold block
  return (
    <div>
      {/* Hero intro text extracted from the first paragraph */}
      <FormattedText text={introBlock} className={typography.title} />

      {content.showVideo && (
        <iframe src={content.videoURL} className="aspect-video w-full my-8 max-w-3xl rounded" allowFullScreen />
      )}

      <FormattedText text={restContent} className="font-bold text-xl md:text-2xl my-12" />
      <Footer />
    </div>
  );
}
