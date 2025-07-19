import { useState } from 'react';
import Link from 'next/link';
import FulltextSearch from '../components/FulltextSearch';

const nabidky = [
  {
    id: '1',
    typ: 'Stroje',
    titulek: 'Volná CNC fréza k dispozici',
    popis: 'Naše dílna má k dispozici volnou kapacitu 3osé CNC frézy. Rádi nabídneme výrobu menších sérií.',
  },
  {
    id: '2',
    typ: 'Prostory',
    titulek: 'Sdílený sklad k pronájmu',
    popis: 'Nabízíme 50 m² skladu v centru Brna za zvýhodněnou cenu. Vhodné pro menší e-shop.',
  },
  {
    id: '3',
    typ: 'Know-how',
    titulek: 'Mentoring v oblasti automatizace',
    popis: 'Náš specialista nabízí konzultace v oblasti průmyslové automatizace a IoT.',
  },
];

export default function NabidkaPage() {
  const [typFiltr, setTypFiltr] = useState('');
  const [query, setQuery] = useState('');

  const typy = [...new Set(nabidky.map((n) => n.typ))];

  const filtered = nabidky.filter((n) => {
    const matchesTyp = typFiltr ? n.typ === typFiltr : true;
    const matchesQuery =
      query === '' ||
      n.typ.toLowerCase().includes(query.toLowerCase()) ||
      n.titulek.toLowerCase().includes(query.toLowerCase()) ||
      n.popis.toLowerCase().includes(query.toLowerCase());
    return matchesTyp && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Nabídky</h1>

      <FulltextSearch onSearch={(q) => setQuery(q)} placeholder="Hledat podle typu, titulku nebo popisu…" />

      <div className="mb-6">
        <label className="block mb-2 font-medium">Filtrovat podle typu:</label>
        <select
          value={typFiltr}
          onChange={(e) => setTypFiltr(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Všechny</option>
          {typy.map((typ) => (
            <option key={typ} value={typ}>
              {typ}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filtered.map((nabidka) => (
          <Link
            key={nabidka.id}
            href={`/nabidka/${nabidka.id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <p className="text-sm text-teal-600 font-medium mb-1">{nabidka.typ}</p>
            <h2 className="text-xl font-bold mb-2">{nabidka.titulek}</h2>
            <p className="text-gray-700">{nabidka.popis}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
