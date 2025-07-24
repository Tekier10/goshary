// pages/poptavka.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import FavouriteButton from '../components/FavouriteButton';

export default function PoptavkaPage() {
  const [search, setSearch] = useState('');
  const [filterTyp, setFilterTyp] = useState('');
  const [seraditPodle, setSeraditPodle] = useState('');
  const [poptavky, setPoptavky] = useState([]);
  const [zobrazeno, setZobrazeno] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/inzeraty?typStranky=poptavka');
        const data = await res.json();
        setPoptavky(data);
        setZobrazeno(data);
      } catch (error) {
        console.error('Chyba při načítání poptávek:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = poptavky.filter((p) =>
      p.titulek.toLowerCase().includes(search.toLowerCase()) ||
      p.popis.toLowerCase().includes(search.toLowerCase()) ||
      p.lokalita.toLowerCase().includes(search.toLowerCase())
    );

    if (filterTyp) {
      filtered = filtered.filter((p) => p.typ === filterTyp);
    }

    if (seraditPodle === 'lokalita') {
      filtered.sort((a, b) => a.lokalita.localeCompare(b.lokalita));
    } else if (seraditPodle === 'nazev') {
      filtered.sort((a, b) => a.titulek.localeCompare(b.titulek));
    }

    setZobrazeno(filtered);
  }, [search, filterTyp, seraditPodle, poptavky]);

  return (
    <>
      <Head>
        <title>Poptávky | GoShary</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Poptávky</h1>
          <Link
            href="/pridat?typ=poptavka"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            ➕ Přidat poptávku
          </Link>
        </div>

        <input
          type="text"
          placeholder="Hledat..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filterTyp}
            onChange={(e) => setFilterTyp(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Všechny typy</option>
            <option value="Stroje">Stroje</option>
            <option value="Prostory">Prostory</option>
            <option value="Služby">Služby</option>
            <option value="Materiál">Materiál</option>
            <option value="Jiné">Jiné</option>
          </select>

          <select
            value={seraditPodle}
            onChange={(e) => setSeraditPodle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Seřadit podle</option>
            <option value="nazev">Název</option>
            <option value="lokalita">Lokalita</option>
          </select>
        </div>

        <ul className="space-y-4">
          {zobrazeno.map((p) => (
            <li key={p.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <Link href={`/poptavka/${p.id}`} className="text-lg font-semibold text-teal-700 hover:underline">
                    {p.titulek}
                  </Link>
                  <p className="text-sm text-gray-500">{p.lokalita}</p>
                </div>
                <FavouriteButton id={p.id} />
              </div>
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">{p.popis}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
