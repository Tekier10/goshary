// pages/index.tsx – domovská stránka GoShary MVP

import Head from 'next/head';
import { useState } from 'react';

const sampleOffers = [
  {
    id: 1,
    title: 'Volná kapacita CNC frézy',
    category: 'Stroje',
    location: 'Brno',
    description: 'Nabízíme 2 dny týdně volnou frézu v přesnosti 0.01mm.',
  },
  {
    id: 2,
    title: 'Pronajmu část skladu',
    category: 'Prostor',
    location: 'Praha 5',
    description: 'Suchý, zabezpečený sklad 20 m2 u Rozvadovské spojky.',
  },
];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const filtered = sampleOffers.filter(
    (offer) =>
      offer.title.toLowerCase().includes(search.toLowerCase()) ||
      offer.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>GoShary – Sdílej co máš navíc</title>
        <meta name="description" content="Platforma pro sdílení firemních kapacit" />
      </Head>

      <main className="min-h-screen bg-white px-6 py-8 text-gray-800">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary">GoShary</h1>
          <p className="text-gray-500">Sdílej volné kapacity. Ušetři. Rozvíjej byznys.</p>
        </header>

        <input
          type="text"
          placeholder="Hledat nabídky..."
          className="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((offer) => (
            <div
              key={offer.id}
              className="rounded-xl border p-4 shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-dark">{offer.title}</h2>
              <p className="text-sm text-gray-600">
                {offer.category} – {offer.location}
              </p>
              <p className="mt-2 text-sm">{offer.description}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-400">Žádné výsledky pro "{search}".</p>
          )}
        </section>

        <footer className="mt-12 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GoShary.cz – sdílej, co máš navíc
        </footer>
      </main>
    </>
  );
}
