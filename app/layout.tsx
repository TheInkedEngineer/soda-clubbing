import './globals.css';
import { ReactNode, Suspense } from 'react';
import { Header } from './components/Header';
import { LanguageProvider } from './context/LanguageContext';

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
            <div className="max-w-screen-lg mx-auto">{children}</div>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
