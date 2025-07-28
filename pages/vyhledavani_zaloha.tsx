import { useState } from 'react';
import Head from 'next/head';
import nabidkyData from '../data/nabidky.json';
import poptavkyData from '../data/poptavky.json';
import Link from 'next/link';

export default function VyhledavaniPage() {
  const [search, setSearch] = useState('');

  const filtruj = (text: string) =>
    (nabidkyData as any[])
      .concat(poptavkyData as any[])
      .filter((item) =>
        `${item.titulek} ${item.popis} ${item.lokalita}`
          .toLowerCase()
          .includes(text.toLowerCase())
      );

  const vysledky = filtruj(search);

  return (
    <>
      <Head>
        <title>Vyhledávání | GoShary</title>
      </Head>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Vyhledávání</h1>

        <input
          type="text"
          placeholder="Hledat inzerát, lokalitu..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Nalezeno: {vysledky.length} záznamů
            </p>
            <ul className="space-y-4">
              {vysledky.map((item) => (
                <li
                  key={item.id}
                  className="border p-4 rounded shadow-sm hover:shadow-md transition"
                >
                  <Link
                    href={`/${item.typ === 'poptavka' ? 'poptavka' : 'nabidka'}/${item.id}`}
                    className="text-lg font-semibold text-teal-700 hover:underline"
                  >
                    {item.titulek}
                  </Link>
                  <p className="text-sm text-gray-500">{item.lokalita}</p>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {item.popis}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
}
