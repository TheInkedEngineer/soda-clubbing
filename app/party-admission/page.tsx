"use client";
import { Title } from '../../src/components/title';
import { Footer } from '../components/Footer';
import { FormattedText } from '../../src/components/formattedText';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '../../src/translations/party-admission-page/it.json';
import contentEn from '../../src/translations/party-admission-page/en.json';

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
