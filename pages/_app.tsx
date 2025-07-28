import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/global.css'; // Vaše globální styly
import Header from '../components/Header';
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import { FavoritesProvider } from '../contexts/FavoritesContext'; // <-- 1. Import

// Pomocná komponenta, která bude obsahovat logiku nečinnosti
const IdleHandler = () => {
  // Zavoláme náš hook a nastavíme časovač
  useIdleTimeout(15); // Doporučuji vrátit na vyšší hodnotu, např. 15 minut
  return null; // Tato komponenta nic nerenderuje
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* 2. Obalíme aplikaci naším novým Providerem */}
      <FavoritesProvider>
        <IdleHandler />
        <Header />
        <Component {...pageProps} />
      </FavoritesProvider>
    </SessionProvider>
  );
}