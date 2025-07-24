import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useFavourites from '../utils/useFavourites';
import Image from 'next/image';

interface Inzerat {
  id: string;
  titulek: string;
  popis: string;
  lokalita: string;
  typStranky: 'nabidka' | 'poptavka';
  fotky: { url: string }[];
}

export default function Oblibene() {
  const { getFavourites } = useFavourites();
  const [oblibene, setOblibene] = useState<Inzerat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ids = getFavourites();
      if (ids.length === 0) return;

      try {
        const res = await fetch('/api/inzeraty');
        const data: Inzerat[] = await res.json();
        const filtered = data.filter((i) => ids.includes(i.id));
        setOblibene(filtered);
      } catch (error) {
        console.error('Chyba při načítání oblíbených inzerátů:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Oblíbené | GoShary</title>
      </Head>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Oblíbené inzeráty</h1>

        {oblibene.length === 0 ? (
          <p className="text-gray-500">Zatím nemáte žádné oblíbené inzeráty.</p>
        ) : (
          <ul className="space-y-4">
            {oblibene.map((item) => (
              <li key={item.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
                <Link
                  href={`/${item.typStranky}/${item.id}`}
                  className="flex items-start gap-4"
                >
                  {item.fotky?.[0]?.url && (
                    <Image
                      src={item.fotky[0].url}
                      alt={item.titulek}
                      width={80}
                      height={80}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-teal-700">{item.titulek}</h2>
                    <p className="text-sm text-gray-600">{item.lokalita}</p>
                    <p className="mt-1 text-sm text-gray-700 line-clamp-2">{item.popis}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
