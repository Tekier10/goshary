// pages/pridat.tsx – přidání fotek k inzerátu
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

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);

      // generate previews
      const previewsArray = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(previewsArray);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nový inzerát:', form);
    console.log('Fotky:', images);
    alert('Inzerát byl úspěšně přidán (zatím jen do konzole)');
    router.push(`/${form.typStranky}`);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Přidat inzerát</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="typStranky" value={form.typStranky} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="nabidka">Nabídka</option>
          <option value="poptavka">Poptávka</option>
        </select>

        <input type="text" name="typ" placeholder="Kategorie (např. Doprava)" value={form.typ} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="text" name="titulek" placeholder="Titulek inzerátu" value={form.titulek} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="popis" placeholder="Popis" value={form.popis} onChange={handleChange} className="w-full border p-2 rounded" rows={5} required />
        <input type="text" name="lokalita" placeholder="Lokalita" value={form.lokalita} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="email" name="kontakt" placeholder="Kontakt (e-mail)" value={form.kontakt} onChange={handleChange} className="w-full border p-2 rounded" required />

        <div>
          <label className="block mb-1 font-semibold">Přiložit fotky</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          <div className="mt-2 flex flex-wrap gap-2">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt={`náhled ${idx + 1}`} className="h-24 w-auto rounded border" />
            ))}
          </div>
        </div>

        <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
          Odeslat
        </button>
      </form>
    </main>
  );
}
