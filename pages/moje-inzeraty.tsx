// pages/moje-inzeraty.tsx
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import nabidkyData from '../data/nabidky.json';
import poptavkyData from '../data/poptavky.json';
import { useUser } from '../utils/useUser';

export default function MojeInzeraty() {
  const { user } = useUser();
  const [moje, setMoje] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const mojeInzeraty = [...nabidkyData, ...poptavkyData].filter(
      (item) => item.autor === user.jmeno || item.email === user.email
    );
    setMoje(mojeInzeraty);
  }, [user]);

  return (
    <>
      <Head>
        <title>Moje inzeráty | GoShary</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Moje inzeráty</h1>
        {moje.length === 0 ? (
          <p className="text-gray-500">Zatím jste nepřidali žádný inzerát.</p>
        ) : (
          <ul className="space-y-4">
            {moje.map((item) => (
              <li
                key={item.id}
                className="border border-gray-200 rounded p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Link
                      href={`/${item.typ === 'poptavka' ? 'poptavka' : 'nabidka'}/${item.id}`}
                      className="text-lg font-semibold text-teal-700 hover:underline"
                    >
                      {item.titulek || item.typ}
                    </Link>
                    <p className="text-sm text-gray-500">{item.lokalita}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-sm text-blue-600 hover:underline">Upravit</button>
                    <button className="text-sm text-red-600 hover:underline">Smazat</button>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-700 line-clamp-2">{item.popis}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
