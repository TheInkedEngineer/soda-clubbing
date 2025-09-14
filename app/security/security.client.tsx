"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import contentIt from '@/translations/security-page/it.json';
import contentEn from '@/translations/security-page/en.json';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

export default function SecurityClient() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <div>
      <Title text={content.pageTitle} />
      <div className="my-6">
        <Image src="/remote-images/sicurezza/team.png" alt="Team" width={1600} height={1067} className="w-full h-auto rounded" />
      </div>
      <FormattedText text={content.pageContent} />
      <Footer />
    </div>
  );
}
