import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const PridatInzerat = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    typStranky: '',
    typ: '',
    titulek: '',
    popis: '',
    lokalita: '',
    kontakt: '',
    autorId: '',
  });
  const [uzivatele, setUzivatele] = useState<any[]>([]);
  const [fotky, setFotky] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (router.query.typ === 'nabidka' || router.query.typ === 'poptavka') {
      setForm((prev) => ({ ...prev, typStranky: router.query.typ as string }));
    }
  }, [router.query.typ]);

  useEffect(() => {
    const fetchUzivatele = async () => {
      const res = await fetch('/api/uzivatele');
      const data = await res.json();
      setUzivatele(data);
    };
    fetchUzivatele();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const uploads = await Promise.all(
      acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'inzeraty_unsigned');

        const res = await fetch(`https://api.cloudinary.com/v1_1/dfhudvpvd/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        return data.secure_url;
      })
    );

    setFotky((prev) => [...prev, ...uploads]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...form,
      fotky,
    };

    try {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Přidat inzerát</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="typStranky" value={form.typStranky} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Vyber typ inzerátu</option>
          <option value="nabidka">Nabídka</option>
          <option value="poptavka">Poptávka</option>
        </select>

        <select name="typ" value={form.typ} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Vyber kategorii</option>
          <option value="Služby">Služby</option>
          <option value="Materiál">Materiál</option>
          <option value="Stroje">Stroje</option>
        </select>

        <input name="titulek" value={form.titulek} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Titulek inzerátu" />
        <textarea name="popis" value={form.popis} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Popis" />
        <input name="lokalita" value={form.lokalita} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Lokalita" />
        <input name="kontakt" type="email" value={form.kontakt} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Kontakt (e-mail)" />

        <select name="autorId" value={form.autorId} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Vyber uživatele</option>
          {uzivatele.map((u) => (
            <option key={u.id} value={u.id}>{u.jmeno}</option>
          ))}
        </select>

        <div {...getRootProps()} className="w-full p-4 border border-dashed rounded cursor-pointer text-center">
          <input {...getInputProps()} />
          <p>Klikni nebo přetáhni fotky sem</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {fotky.map((url, idx) => (
            <Image key={idx} src={url} alt="náhled" width={100} height={100} className="rounded" />
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Odesílám…' : 'Odeslat'}
        </button>
      </form>
    </div>
  );
};

export default PridatInzerat;
