// pages/nabidka.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import FavouriteButton from '../components/FavouriteButton';

export default function NabidkaPage() {
  const [search, setSearch] = useState('');
  const [filterTyp, setFilterTyp] = useState('');
  const [seraditPodle, setSeraditPodle] = useState('');
  const [nabidky, setNabidky] = useState<any[]>([]);
  const [zobrazeno, setZobrazeno] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/inzeraty?typStranky=nabidka');
        const data = await res.json();
        console.log('📦 Data z API:', data);
        setNabidky(Array.isArray(data) ? data : []);
        setZobrazeno(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Chyba při načítání nabídek:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = nabidky.filter((n) =>
      n.titulek.toLowerCase().includes(search.toLowerCase()) ||
      n.popis.toLowerCase().includes(search.toLowerCase()) ||
      n.lokalita.toLowerCase().includes(search.toLowerCase())
    );

    if (filterTyp) {
      filtered = filtered.filter((n) => n.typ === filterTyp);
    }

    if (seraditPodle === 'lokalita') {
      filtered.sort((a, b) => a.lokalita.localeCompare(b.lokalita));
    } else if (seraditPodle === 'nazev') {
      filtered.sort((a, b) => a.titulek.localeCompare(b.titulek));
    }

    setZobrazeno(filtered);
  }, [search, filterTyp, seraditPodle, nabidky]);

  return (
    <>
      <Head>
        <title>Nabídky | GoShary</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Nabídky</h1>
          <Link
            href="/pridat?typ=nabidka"
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            ➕ Přidat nabídku
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
          {zobrazeno.map((n) => (
            <li key={n.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
              <div className="flex justify-between items-center">
                <div>
                  <Link href={`/nabidka/${n.id}`} className="text-lg font-semibold text-teal-700 hover:underline">
                    {n.titulek}
                  </Link>
                  <p className="text-sm text-gray-500">{n.lokalita}</p>
                </div>
                <FavouriteButton id={n.id} />
              </div>
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">{n.popis}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
