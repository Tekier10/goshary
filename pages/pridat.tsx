import { useRouter } from 'next/router';
import { useEffect, useState, FormEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Head from 'next/head';

const PridatInzerat = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    typStranky: 'nabidka',
    typ: 'Stroje',
    titulek: '',
    popis: '',
    lokalita: '',
    kontakt: '',
  });
  const [fotky, setFotky] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.typ === 'nabidka' || router.query.typ === 'poptavka') {
      setForm((prev) => ({ ...prev, typStranky: router.query.typ as string }));
    }
  }, [router.query.typ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const uploads = await Promise.all(
      acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        // Ujistěte se, že používáte "unsigned" preset pro nahrávání z frontendu
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME!}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        return data.secure_url;
      })
    );

    setFotky((prev) => [...prev, ...uploads]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Chyba při odesílání inzerátu');
      }

      router.push(`/${form.typStranky}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Přidat inzerát – GoShary</title>
      </Head>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Přidat inzerát</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="typStranky" value={form.typStranky} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="nabidka">Nabídka</option>
            <option value="poptavka">Poptávka</option>
          </select>

          <select name="typ" value={form.typ} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="Stroje">Stroje</option>
            <option value="Prostory">Prostory</option>
            <option value="Služby">Služby</option>
            <option value="Materiál">Materiál</option>
            <option value="Jiné">Jiné</option>
          </select>

          <input name="titulek" value={form.titulek} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Titulek inzerátu" />
          <textarea name="popis" value={form.popis} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Popis" />
          <input name="lokalita" value={form.lokalita} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Lokalita" />
          <input name="kontakt" type="text" value={form.kontakt} onChange={handleChange} required className="w-full p-2 border rounded" placeholder="Kontakt (e-mail nebo telefon)" />
          
          {/* Výběr autora byl odstraněn */}

          <div {...getRootProps()} className="w-full p-4 border border-dashed rounded cursor-pointer text-center hover:bg-gray-50">
            <input {...getInputProps()} />
            <p>Klikni nebo přetáhni fotky sem</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {fotky.map((url, idx) => (
              <Image key={idx} src={url} alt="náhled" width={100} height={100} className="rounded object-cover" />
            ))}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Odesílám…' : 'Odeslat inzerát'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PridatInzerat;