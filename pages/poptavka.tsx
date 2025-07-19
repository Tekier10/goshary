import { useState } from 'react';
import Link from 'next/link';
import FulltextSearch from '../components/FulltextSearch';
import SortSelect from '../components/SortSelect';

const mockPoptavky = [
  {
    id: '1',
    typ: 'Pronájem manipulační techniky',
    titulek: 'Hledáme VZV do provozu',
    popis: 'Hledáme VZV na 3 týdny v okolí Olomouce.',
    lokalita: 'Olomouc',
    kontakt: 'logistika@firma.cz',
  },
  {
    id: '2',
    typ: 'Sdílení serverové kapacity',
    titulek: 'Výpočetní výkon pro AI',
    popis: 'Potřebujeme dočasně cloudové prostředky pro výpočty v AI projektu.',
    lokalita: 'Online / remote',
    kontakt: 'it@inovace.cz',
  },
];

export default function PoptavkaPage() {
  const [typFiltr, setTypFiltr] = useState('');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const typy = [...new Set(mockPoptavky.map((p) => p.typ))];

  let filtered = mockPoptavky.filter((p) => {
    const matchesTyp = typFiltr ? p.typ === typFiltr : true;
    const matchesQuery =
      query === '' ||
      p.typ.toLowerCase().includes(query.toLowerCase()) ||
      p.titulek.toLowerCase().includes(query.toLowerCase()) ||
      p.popis.toLowerCase().includes(query.toLowerCase()) ||
      p.lokalita.toLowerCase().includes(query.toLowerCase());
    return matchesTyp && matchesQuery;
  });

  if (sortBy === 'titulek') {
    filtered = [...filtered].sort((a, b) => a.titulek.localeCompare(b.titulek));
  } else if (sortBy === 'lokalita') {
    filtered = [...filtered].sort((a, b) => a.lokalita.localeCompare(b.lokalita));
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Poptávky</h1>

      <FulltextSearch
        onSearch={(q) => setQuery(q)}
        placeholder="Hledat podle typu, titulku, popisu nebo lokality…"
      />

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

      <SortSelect value={sortBy} onChange={setSortBy} />

      <div className="grid gap-4">
        {filtered.map((poptavka) => (
          <Link key={poptavka.id} href={`/poptavka/${poptavka.id}`}>
            <div className="border rounded p-4 shadow-sm hover:bg-gray-50 hover:shadow-md transition cursor-pointer">
              <h2 className="text-lg font-semibold">{poptavka.titulek}</h2>
              <p className="text-sm text-gray-600">
                {poptavka.typ} – {poptavka.lokalita}
              </p>
              <p className="mt-2 text-sm text-gray-800">
                {poptavka.popis.slice(0, 100)}…
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
