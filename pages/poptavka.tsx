// pages/poptavka.tsx

import { useState } from 'react';

type Poptavka = {
  id: number;
  typ: string;
  zadavatel: string;
  zprava: string;
};

const fakePoptavky: Poptavka[] = [
  { id: 1, typ: 'prostor', zadavatel: 'LogiTrans s.r.o.', zprava: 'Hledáme sklad na 2 měsíce v Brně.' },
  { id: 2, typ: 'vybaveni', zadavatel: 'TechnikPro', zprava: 'Sdílíme CNC frézu na 14 dní.' },
  { id: 3, typ: 'doprava', zadavatel: 'Doprava CZ', zprava: 'Poptáváme dodávku na 1 den, Praha.' },
  { id: 4, typ: 'sluzby', zadavatel: 'KancelářeX', zprava: 'Hledáme IT specialistu na výpomoc.' },
];

export default function Poptavka() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const zobrazenePoptavky = filterType
    ? fakePoptavky.filter((p) => p.typ === filterType)
    : fakePoptavky;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Zadej poptávku</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow space-y-4 mb-10">
          <div>
            <label className="block font-medium mb-1">Jméno / Název firmy</label>
            <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">E-mail</label>
            <input type="email" required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">Typ poptávky</label>
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
            >
              <option value="">Vyber typ…</option>
              <option value="prostor">Sdílení prostoru</option>
              <option value="doprava">Sdílení dopravy</option>
              <option value="vybaveni">Vybavení</option>
              <option value="sluzby">Služby</option>
              <option value="jine">Jiné</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Detail poptávky</label>
            <textarea required className="w-full border border-gray-300 rounded px-3 py-2" rows={5}></textarea>
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
          >
            Odeslat poptávku
          </button>
        </form>
      ) : (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded shadow mb-10">
          Děkujeme! Tvoje poptávka byla přijata.
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">📋 Poptávky ostatních</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">Filtruj podle typu</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
        >
          <option value="">Zobrazit vše</option>
          <option value="prostor">Prostor</option>
          <option value="doprava">Doprava</option>
          <option value="vybaveni">Vybavení</option>
          <option value="sluzby">Služby</option>
        </select>
      </div>

      <ul className="space-y-4">
        {zobrazenePoptavky.map((p) => (
          <li key={p.id} className="border border-gray-300 rounded p-4 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Typ: <strong>{p.typ}</strong></p>
            <p className="font-semibold">{p.zadavatel}</p>
            <p>{p.zprava}</p>
          </li>
        ))}
        {zobrazenePoptavky.length === 0 && (
          <p className="text-gray-500 italic">Žádné poptávky tohoto typu.</p>
        )}
      </ul>
    </main>
  );
}
