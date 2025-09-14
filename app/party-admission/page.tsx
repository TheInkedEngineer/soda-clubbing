"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '@/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '@/translations/party-admission-page/it.json';
import contentEn from '@/translations/party-admission-page/en.json';

export default function PartyAdmissionPage() {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <div>
      <Title text={content.pageTitle} />
      <p className="mt-4">
        <FormattedText text={(content as any).passwordPageTitle} />
      </p>
      <Footer />
    </div>
  );
}
