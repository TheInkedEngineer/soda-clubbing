import './globals.css';
import { ReactNode, Suspense } from 'react';
import { Header } from './components/Header';
import { LanguageProvider } from './context/LanguageContext';
import { spacing } from '@/lib/design-system';

export const metadata = {
  title: 'Soda',
  description: 'Soda Clubbing',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Suspense fallback={null}>
          <LanguageProvider>
            <Header />
            <div className={spacing.container}>{children}</div>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
