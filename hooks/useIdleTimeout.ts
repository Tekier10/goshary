import { useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Tento hook se stará o sledování nečinnosti a následné odhlášení
export function useIdleTimeout(timeoutInMinutes: number = 15) {
  const { status } = useSession();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // Funkce, která provede odhlášení
  const goInactive = () => {
    // Odhlásíme uživatele pouze pokud je přihlášený
    if (status === 'authenticated') {
      // Můžeme přidat důvod odhlášení do URL pro zobrazení zprávy
      signOut({ callbackUrl: '/prihlasit?reason=inactivity' });
    }
  };

  // Funkce pro resetování časovače
  const resetTimer = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(goInactive, timeoutInMinutes * 60 * 1000);
  };

  useEffect(() => {
    // Sledujeme pouze pokud je uživatel přihlášený
    if (status === 'authenticated') {
      // Seznam událostí, které považujeme za aktivitu
      const events = [
        'mousedown',
        'mousemove',
        'keydown',
        'scroll',
        'touchstart',
      ];

      // Při první aktivaci hooku spustíme časovač
      resetTimer();

      // Při každé události resetujeme časovač
      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });

      // Funkce pro úklid při odmontování komponenty
      return () => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        events.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [status]); // Znovu spustíme efekt, pokud se změní stav přihlášení
}
