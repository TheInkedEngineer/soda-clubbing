"use client";
import { Title } from '@/components/title';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import contentIt from '@/translations/review-page/it.json';
import contentEn from '@/translations/review-page/en.json';
import Image from 'next/image';

export default function ReviewsClient({ images }: { images: string[] }) {
  const { language } = useLanguage();
  const content = language === 'en' ? (contentEn as any) : (contentIt as any);
  return (
    <div>
      <Title text={content.pageTitle} />
      <div className="masonry">
        {images.map((image, index) => (
          <div key={index} className="masonry-item">
            <Image
              src={image}
              alt={`Review Image ${index + 1}`}
              width={1024}
              height={768}
              className="w-full h-auto object-cover rounded-lg shadow-lg border-4 border-black dark:border-white"
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
