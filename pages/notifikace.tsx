// pages/notifikace.tsx – přehled notifikací uživatele

import Head from 'next/head';
import { useEffect, useState } from 'react';

type Notifikace = {
  id: string;
  zprava: string;
  datum: string;
  precisteno: boolean;
};

export default function Notifikace() {
  const [notifikace, setNotifikace] = useState<Notifikace[]>([]);

  useEffect(() => {
    // Mock data – později nahradit voláním API
    const data: Notifikace[] = [
      {
        id: '1',
        zprava: 'Vaše poptávka byla úspěšně zveřejněna.',
        datum: '2025-07-20 08:24',
        precisteno: false,
      },
      {
        id: '2',
        zprava: 'Máte novou odpověď na nabídku.',
        datum: '2025-07-19 16:40',
        precisteno: true,
      },
    ];
    setNotifikace(data);
  }, []);

  return (
    <>
      <Head>
        <title>Notifikace | GoShary</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Notifikace</h1>

        {notifikace.length === 0 ? (
          <p className="text-gray-500">Zatím nemáte žádné notifikace.</p>
        ) : (
          <ul className="space-y-4">
            {notifikace.map((n) => (
              <li
                key={n.id}
                className={`border rounded p-4 ${
                  n.precisteno ? 'bg-gray-100' : 'bg-teal-50'
                }`}
              >
                <p className="font-medium">{n.zprava}</p>
                <p className="text-sm text-gray-500">{n.datum}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
