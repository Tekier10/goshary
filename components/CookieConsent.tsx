// components/CookieConsent.tsx

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-6 py-4 z-50 flex flex-col sm:flex-row items-center justify-between">
      <p className="text-sm mb-2 sm:mb-0">
        Tento web používá cookies pro analýzu a zajištění správné funkce. <a href="/ochrana-osobnich-udaju" className="underline">Více informací</a>.
      </p>
      <button onClick={acceptCookies} className="bg-teal-500 text-white px-4 py-2 rounded text-sm hover:bg-teal-600 transition">
        Rozumím
      </button>
    </div>
  );
}
