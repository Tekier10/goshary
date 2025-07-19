// pages/pridat.tsx – stránka pro přidání inzerátu
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PridatInzerat() {
  const router = useRouter();
  const [form, setForm] = useState({
    typStranky: 'nabidka',
    typ: '',
    titulek: '',
    popis: '',
    lokalita: '',
    kontakt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nový inzerát:', form);
    alert('Inzerát byl úspěšně přidán (zatím jen do konzole)');
    router.push(`/${form.typStranky}`);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Přidat inzerát</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="typStranky"
          value={form.typStranky}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="nabidka">Nabídka</option>
          <option value="poptavka">Poptávka</option>
        </select>

        <input
          type="text"
          name="typ"
          placeholder="Kategorie (např. Doprava)"
          value={form.typ}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="titulek"
          placeholder="Titulek inzerátu"
          value={form.titulek}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="popis"
          placeholder="Popis"
          value={form.popis}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={5}
          required
        />

        <input
          type="text"
          name="lokalita"
          placeholder="Lokalita"
          value={form.lokalita}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="email"
          name="kontakt"
          placeholder="Kontakt (e-mail)"
          value={form.kontakt}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
        >
          Odeslat
        </button>
      </form>
    </main>
  );
}
