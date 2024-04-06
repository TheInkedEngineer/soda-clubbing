"use client";
import { useMemo } from 'react';
import { useLanguage } from './context/LanguageContext';
import homeyPageContentIt from '../src/translations/home-page/it.json';
import homePageContentEn from '../src/translations/home-page/en.json';
import Image from 'next/image';
import futuraLogo from '../src/assets/logo-futura-bianco.png';
import wovoLogo from '../src/assets/logo-wovo.png';

interface Props {
  partyText: string;
  showBuyTicketsButton: boolean;
}

export default function HomeClient({ partyText, showBuyTicketsButton }: Props) {
  const { language } = useLanguage();
  const content = useMemo(() => (language === 'en' ? (homePageContentEn as any) : (homeyPageContentIt as any)), [language]);

  const bg = '/remote-images/home/background.jpg';

  return (
    <div
      className="absolute top-0 left-0 w-full h-dvh bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex items-end justify-start px-8 py-4 w-full absolute bottom-40 home-bg bg-white dark:bg-black">
        <div className="flex flex-col">
          <p className="whitespace-pre-line text-3xl title inline-block">{partyText}</p>
          {showBuyTicketsButton && (
            <a href="/party-admission">
              <button className="mt-4 rounded">{(content as any).buttonTitle}</button>
            </a>
          )}
        </div>
      </div>

      <div className="flex absolute bottom-8 left-1/2 transform -translate-x-1/2 mb-4">
        <a href="https://www.instagram.com/futura.educazione/" target="_blank" className="flex items-center">
          <Image src={futuraLogo} alt="Logo" className="h-12 w-auto" />
        </a>
        <a href="https://wovostore.com" target="_blank" className="flex items-center ml-2">
          <Image src={wovoLogo} alt="Second Logo" className="h-12 w-auto" />
        </a>
      </div>
    </div>
  );
}
