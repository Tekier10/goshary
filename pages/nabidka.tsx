import { useState } from 'react'; import Link from 'next/link';

const mockNabidky = [ { id: '1', typ: 'Skladovací prostory', popis: 'Nabízíme volný sklad v Brně, 300 m², suchý, zabezpečený.', lokalita: 'Brno', kontakt: 'firma@example.cz', }, { id: '2', typ: 'Strojní vybavení', popis: 'K dispozici CNC fréza s operátorem. Praha 4.', lokalita: 'Praha', kontakt: 'cnc@firma.cz', }, ];

export default function NabidkaPage() { const [typFiltr, setTypFiltr] = useState('');

const typy = [...new Set(mockNabidky.map((p) => p.typ))]; const filteredNabidky = typFiltr ? mockNabidky.filter((p) => p.typ === typFiltr) : mockNabidky;

return ( <main className="max-w-4xl mx-auto p-6"> <h1 className="text-2xl font-bold mb-4">Nabídky</h1>

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
    {filteredNabidky.map((nabidka) => (
      <Link key={nabidka.id} href={`/nabidka/${nabidka.id}`}>
        <div className="border rounded p-4 shadow-sm hover:bg-gray-50 hover:shadow-md transition cursor-pointer">
          <h2 className="text-lg font-semibold">{nabidka.typ}</h2>
          <p className="text-sm text-gray-600">{nabidka.lokalita}</p>
          <p className="mt-2 text-sm text-gray-800">{nabidka.popis.slice(0, 100)}…</p>
        </div>
      </Link>
    ))}
  </div>
</main>

); }
