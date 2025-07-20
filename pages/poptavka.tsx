import { useState } from 'react';
import Link from 'next/link';
import poptavkyData from '../data/poptavky.json';

const uniqueTypes = Array.from(new Set(poptavkyData.map((item) => item.typ)));

export default function Poptavka() {
  const [search, setSearch] = useState('');
  const [typFilter, setTypFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filtered = poptavkyData
    .filter(
      (item) =>
        (item.typ.toLowerCase().includes(search.toLowerCase()) ||
          item.popis.toLowerCase().includes(search.toLowerCase()) ||
          item.lokalita.toLowerCase().includes(search.toLowerCase())) &&
        (!typFilter || item.typ === typFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'lokalita') return a.lokalita.localeCompare(b.lokalita);
      if (sortBy === 'hodnoceni') return (b.hodnoceni || 0) - (a.hodnoceni || 0);
      if (sortBy === 'overeno') return (b.overeno === true ? 1 : 0) - (a.overeno === true ? 1 : 0);
      return 0;
    });

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Poptávky</h1>
      <Link
        href="/pridat"
        className="inline-block mt-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
      >
        ➕ Přidat poptávku
      </Link>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Vyhledat…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          value={typFilter}
          onChange={(e) => setTypFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Všechny typy</option>
          {uniqueTypes.map((typ) => (
            <option key={typ} value={typ}>
              {typ}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Řadit podle</option>
          <option value="lokalita">Lokalita</option>
          <option value="hodnoceni">Hodnocení</option>
          <option value="overeno">Ověření</option>
        </select>
      </div>

      <ul className="space-y-4">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="border border-gray-200 p-4 rounded hover:bg-gray-50 transition"
          >
            <Link href={`/poptavka/${item.id}`} className="block">
              <h2 className="text-lg font-semibold">{item.titulek}</h2>
              <p className="text-sm text-gray-500">{item.lokalita}</p>
              <p className="mt-2 text-gray-700">{item.popis.slice(0, 100)}...</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
