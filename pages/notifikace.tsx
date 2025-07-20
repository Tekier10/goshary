// pages/notifikace.tsx

import { useState } from 'react';
import Head from 'next/head';

type Notifikace = {
  id: string;
  zprava: string;
  datum: string;
  precteno: boolean;
};

const mockNotifikace: Notifikace[] = [
  {
    id: '1',
    zprava: 'Vaše nabídka "Volná CNC fréza" byla označena jako oblíbená.',
    datum: '2025-07-21',
    precteno: false,
  },
  {
    id: '2',
    zprava: 'Máte novou poptávku na váš produkt.',
    datum: '2025-07-20',
    precteno: true,
  },
  {
    id: '3',
    zprava: 'Váš účet byl ověřen administrátorem.',
    datum: '2025-07-19',
    precteno: false,
  },
];

export default function NotifikacePage() {
  const [notifikace, setNotifikace] = useState<Notifikace[]>(mockNotifikace);

  const oznacitJakoPrectene = (id: string) => {
    setNotifikace((prev) =>
      prev.map((n) => (n.id === id ? { ...n, precteno: true } : n))
    );
  };

  return (
    <>
      <Head>
        <title>Notifikace | GoShary</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Vaše notifikace</h1>

        {notifikace.length === 0 ? (
          <p className="text-gray-500">Zatím nemáte žádné notifikace.</p>
        ) : (
          <ul className="space-y-4">
            {notifikace.map((n) => (
              <li
                key={n.id}
                className={`border rounded p-4 ${
                  n.precteno ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className={n.precteno ? 'text-gray-500' : 'font-semibold'}>
                    {n.zprava}
                  </p>
                  {!n.precteno && (
                    <button
                      onClick={() => oznacitJakoPrectene(n.id)}
                      className="text-sm text-blue-600 underline"
                    >
                      Označit jako přečtené
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{n.datum}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
