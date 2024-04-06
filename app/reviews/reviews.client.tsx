"use client";
import Title from '../../src/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '../../src/translations/review-page/it.json';
import contentEn from '../../src/translations/review-page/en.json';
import Image from 'next/image';

export default function ReviewsClient({ images }: { images: string[] }) {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <>
      <Title text={content.pageTitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="flex items-center justify-center w-full h-full">
            <Image src={image} alt={`Review Image ${index + 1}`} width={1024} height={768} className="w-full h-auto object-contain rounded-lg shadow-lg" />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
