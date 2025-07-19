// pages/nabidka.tsx

import { useState } from 'react';

type Nabidka = {
  id: number;
  typ: string;
  firma: string;
  popis: string;
};

const fakeNabidky: Nabidka[] = [
  { id: 1, typ: 'prostor', firma: 'Skladujeme.cz', popis: 'Nabízíme volný sklad v Plzni 50 m² na 3 měsíce.' },
  { id: 2, typ: 'doprava', firma: 'ExpresLog', popis: 'Volná dodávka každý pátek v Praze a okolí.' },
  { id: 3, typ: 'vybaveni', firma: 'Stroje a nářadí s.r.o.', popis: 'Možnost zapůjčení stavebního lešení.' },
  { id: 4, typ: 'sluzby', firma: 'Flexi Office', popis: 'Nabízíme administrativní výpomoc na dálku.' },
];

export default function Nabidka() {
  const [submitted, setSubmitted] = useState(false);
  const [typ, setTyp] = useState('');
  const [filtr, setFiltr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const zobrazeneNabidky = filtr
    ? fakeNabidky.filter((n) => n.typ === filtr)
    : fakeNabidky;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Nabídni volné kapacity</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded shadow space-y-4 mb-10">
          <div>
            <label className="block font-medium mb-1">Název firmy</label>
            <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">E-mail</label>
            <input type="email" required className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block font-medium mb-1">Typ nabídky</label>
            <select
              required
              value={typ}
              onChange={(e) => setTyp(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
            >
              <option value="">Vyber typ…</option>
              <option value="prostor">Prostor</option>
              <option value="doprava">Doprava</option>
              <option value="vybaveni">Vybavení</option>
              <option value="sluzby">Služby</option>
              <option value="jine">Jiné</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Popis nabídky</label>
            <textarea required className="w-full border border-gray-300 rounded px-3 py-2" rows={5}></textarea>
          </div>

          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
          >
            Odeslat nabídku
          </button>
        </form>
      ) : (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded shadow mb-10">
          Děkujeme! Tvoje nabídka byla zaznamenána.
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">📦 Nabídky ostatních firem</h2>

      <div className="mb-6">
        <label className="block font-medium mb-1">Filtruj podle typu</label>
        <select
          value={filtr}
          onChange={(e) => setFiltr(e.target.value)}
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
        {zobrazeneNabidky.map((n) => (
          <li key={n.id} className="border border-gray-300 rounded p-4 bg-white shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Typ: <strong>{n.typ}</strong></p>
            <p className="font-semibold">{n.firma}</p>
            <p>{n.popis}</p>
          </li>
        ))}
        {zobrazeneNabidky.length === 0 && (
          <p className="text-gray-500 italic">Žádné nabídky tohoto typu.</p>
        )}
      </ul>
    </main>
  );
}
