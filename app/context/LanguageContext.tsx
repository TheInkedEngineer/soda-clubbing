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

  // Initialize deterministically to avoid hydration mismatch.
  // Actual value is loaded after mount from URL/localStorage.
  const [language, setLanguageState] = useState<string>('it');

  // Initialize from URL or localStorage on mount
  useEffect(() => {
    const urlLang = searchParams?.get('lang');
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('soda-language') : null;
    const initial = (urlLang || storedLang) === 'en' ? 'en' : 'it';
    setLanguageState(initial);
    if (typeof window !== 'undefined') localStorage.setItem('soda-language', initial);
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
