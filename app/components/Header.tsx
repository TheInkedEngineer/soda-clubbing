"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import headerContentIt from '../../src/translations/header/it.json';
import headerContentEn from '../../src/translations/header/en.json';
import { useLanguage } from '../context/LanguageContext';
import logo from '../../src/assets/logo-soda.png';

interface MenuEntry {
  name: string;
  url: string;
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [menuEntries, setMenuEntries] = useState<MenuEntry[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((v) => !v);

  useEffect(() => {
    const content = language === 'en' ? headerContentEn : headerContentIt;
    setMenuEntries(content.menuEntries);
  }, [language]);


  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('lang', lang);
    router.replace(`${pathname}?${sp.toString()}`);
  };

  return (
    <header className="w-full text-lg font-semibold z-10 relative">
      <div className="flex items-center justify-between w-full md:px-8">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" className="h-12 w-auto" priority />
        </Link>

        <ul className="hidden md:flex justify-start items-center ml-8 bg-white bg-opacity-50 p-4 dark:bg-black dark:bg-opacity-50 ">
          {menuEntries.map((entry, index) => (
            <li key={index} className={`mr-4 ${index !== 0 ? 'ml-2' : ''} text-2xl`}>
              {entry.url.startsWith('http') ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline nav-link"
                >
                  {entry.name.toUpperCase()}
                </a>
              ) : (
                <Link href={`/${entry.url}`} className="hover:underline nav-link">
                  {entry.name.toUpperCase()}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center ml-auto bg-white bg-opacity-50 p-4 dark:bg-black dark:bg-opacity-50">
          <a
            className={`title text-xl mx-2 hover:underline cursor-pointer select-none ${language === 'it' ? 'underline font-bold' : ''}`}
            onClick={() => handleLanguageChange('it')}
          >
            IT
          </a>
          |
          <a
            className={`title text-xl mx-2 hover:underline cursor-pointer select-none ${language === 'en' ? 'underline font-bold' : ''}`}
            onClick={() => handleLanguageChange('en')}
          >
            EN
          </a>
        </div>

        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {isOpen ? (
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black z-20 overflow-y-auto md:hidden">
          <div className="flex items-center justify-between w-full px-8 py-8">
            <Link href="/">
              <Image src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" />
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col items-start space-y-8 px-10">
            {menuEntries.map((entry, index) => (
              <li key={index}>
                {entry.url.startsWith('http') ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl hover:underline nav-link"
                  >
                    {entry.name.toUpperCase()}
                  </a>
                ) : (
                  <Link href={`/${entry.url}`} className="text-3xl hover:underline nav-link">
                    {entry.name.toUpperCase()}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex justify-end w-full px-8 mt-8">
            <a
              className={`title text-3xl mx-2 hover:underline cursor-pointer select-none ${language === 'it' ? 'underline font-bold' : ''}`}
              onClick={() => handleLanguageChange('it')}
            >
              IT
            </a>
            <span className="text-3xl"> | </span>
            <a
              className={`title text-3xl mx-2 hover:underline cursor-pointer select-none ${language === 'en' ? 'underline font-bold' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
