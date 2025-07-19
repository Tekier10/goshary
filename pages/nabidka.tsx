import { useState } from 'react';
import Link from 'next/link';
import nabidkyData from '../data/nabidky.json';

const mockNabidky = nabidkyData;

export default function Nabidka() {
  const [search, setSearch] = useState('');

  const filtered = mockNabidky.filter(
    (item) =>
      item.typ.toLowerCase().includes(search.toLowerCase()) ||
      item.popis.toLowerCase().includes(search.toLowerCase()) ||
      item.lokalita.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Nabídky</h1>

      <input
        type="text"
        placeholder="Vyhledat…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <ul className="space-y-4">
        {filtered.map((item) => (
          <li
            key={item.id}
            className="border border-gray-200 p-4 rounded hover:bg-gray-50 transition"
          >
            <Link href={`/nabidka/${item.id}`} className="block">
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
