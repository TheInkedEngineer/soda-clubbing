"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window === 'undefined') return 'it';
    return localStorage.getItem('soda-language') || 'it';
  });

  // Initialize from URL on mount
  useEffect(() => {
    const lang = searchParams?.get('lang');
    if (lang) {
      setLanguageState(lang);
      if (typeof window !== 'undefined') localStorage.setItem('soda-language', lang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang: string) => {
    const newLang = lang === 'en' ? 'en' : 'it';
    setLanguageState(newLang);
    if (typeof window !== 'undefined') localStorage.setItem('soda-language', newLang);
    // Update query param while staying on same path
    const sp = new URLSearchParams(searchParams?.toString());
    sp.set('lang', newLang);
    router.replace(`${pathname}?${sp.toString()}`);
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

