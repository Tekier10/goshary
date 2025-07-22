// pages/pridat.tsx – přidání fotek k inzerátu
import { useState, useEffect } from 'react'; import { useRouter } from 'next/router';

export default function PridatInzerat() { const router = useRouter(); const [form, setForm] = useState({ typStranky: 'nabidka', typ: '', titulek: '', popis: '', lokalita: '', kontakt: '', autorId: '', });

const [images, setImages] = useState<File[]>([]); const [previews, setPreviews] = useState<string[]>([]); const [uzivatele, setUzivatele] = useState<{ id: string; jmeno: string }[]>([]);

useEffect(() => { fetch('/api/uzivatele') .then((res) => res.json()) .then((data) => setUzivatele(data)) .catch((err) => console.error('Chyba při načítání uživatelů:', err)); }, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => { const files = e.target.files; if (files) { const fileArray = Array.from(files); setImages(fileArray);

const previewsArray = fileArray.map((file) => URL.createObjectURL(file));
  setPreviews(previewsArray);
}

};

const uploadToCloudinary = async (file: File): Promise<string> => { const formData = new FormData(); formData.append('file', file); formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

const res = await fetch(url, {
  method: 'POST',
  body: formData,
});

const data = await res.json();
return data.secure_url;

};

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();

try {
  // Upload all images and get URLs
  const uploadedUrls = await Promise.all(images.map((img) => uploadToCloudinary(img)));

  const payload = {
    typStranky: form.typStranky,
    typ: form.typ,
    titulek: form.titulek,
    popis: form.popis,
    lokalita: form.lokalita,
    kontakt: form.kontakt,
    autorId: form.autorId,
    fotky: uploadedUrls,
  };

  const res = await fetch('/api/inzeraty', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Chyba při odesílání inzerátu');

  const data = await res.json();
  console.log('✅ Uložený inzerát:', data);

  router.push(`/${form.typStranky}`);
} catch (err) {
  console.error(err);
  alert('Nepodařilo se uložit inzerát.');
}

};

return ( <main className="max-w-2xl mx-auto p-6 space-y-4"> <h1 className="text-2xl font-bold">Přidat inzerát</h1> <form onSubmit={handleSubmit} className="space-y-4"> <select name="typStranky" value={form.typStranky} onChange={handleChange} className="w-full border p-2 rounded"> <option value="nabidka">Nabídka</option> <option value="poptavka">Poptávka</option> </select>

<input type="text" name="typ" placeholder="Kategorie (např. Doprava)" value={form.typ} onChange={handleChange} className="w-full border p-2 rounded" required />
    <input type="text" name="titulek" placeholder="Titulek inzerátu" value={form.titulek} onChange={handleChange} className="w-full border p-2 rounded" required />
    <textarea name="popis" placeholder="Popis" value={form.popis} onChange={handleChange} className="w-full border p-2 rounded" rows={5} required />
    <input type="text" name="lokalita" placeholder="Lokalita" value={form.lokalita} onChange={handleChange} className="w-full border p-2 rounded" required />
    <input type="email" name="kontakt" placeholder="Kontakt (e-mail)" value={form.kontakt} onChange={handleChange} className="w-full border p-2 rounded" required />

    <select name="autorId" value={form.autorId} onChange={handleChange} className="w-full border p-2 rounded" required>
      <option value="">Vyber uživatele</option>
      {uzivatele.map((u) => (
        <option key={u.id} value={u.id}>{u.jmeno}</option>
      ))}
    </select>

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

); }
