"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logoFuturaLight from '@/assets/logo-futura-bianco.png';
import logoFuturaDark from '@/assets/logo-futura-nero.png';

export const Footer = () => {
  const [logo, setLogo] = useState(logoFuturaLight as unknown as string);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateLogo = () => setLogo((darkModeMediaQuery.matches ? logoFuturaLight : logoFuturaDark) as unknown as string);
    updateLogo();
    darkModeMediaQuery.addEventListener('change', updateLogo);
    return () => darkModeMediaQuery.removeEventListener('change', updateLogo);
  }, []);

  return (
    <footer className="w-full text-center py-8 bottom-0 left-0">
      <Image src={logo as unknown as any} alt="logo Futura" className="inline-block h-6 w-auto" />
      <a
        href="https://www.instagram.com/theinkedengineer"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-black dark:text-white hover:text-pink-500 hover:underline ml-8 sm:ml-16"
      >
        made by TheInkedEngineer
      </a>
    </footer>
  );
};
