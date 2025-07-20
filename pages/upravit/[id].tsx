// pages/upravit/[id].tsx 
import { useRouter } from 'next/router'; import { useEffect, useState } from 'react'; import Head from 'next/head'; import dataNabidky from '../../data/nabidky.json'; import dataPoptavky from '../../data/poptavky.json';

export default function UpravitInzerat() { const router = useRouter(); const { id } = router.query; const [formData, setFormData] = useState<any>(null);

useEffect(() => { if (id) { const all = [...dataNabidky, ...dataPoptavky]; const found = all.find((item) => item.id === id); setFormData(found); } }, [id]);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData((prev: any) => ({ ...prev, [name]: value })); };

const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('Inzerát upraven (zatím jen simulace)'); router.push('/moje-inzeraty'); };

if (!formData) return <p className="p-6">Načítání...</p>;

return ( <> <Head> <title>Upravit inzerát | GoShary</title> </Head> <main className="max-w-xl mx-auto p-6 space-y-4"> <h1 className="text-xl font-semibold">Upravit inzerát</h1> <form onSubmit={handleSubmit} className="space-y-4"> <input name="titulek" value={formData.titulek} onChange={handleChange} className="w-full border px-3 py-2 rounded" /> <textarea name="popis" value={formData.popis} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows={4} /> <input name="lokalita" value={formData.lokalita} onChange={handleChange} className="w-full border px-3 py-2 rounded" /> <input name="kontakt" value={formData.kontakt} onChange={handleChange} className="w-full border px-3 py-2 rounded" /> <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Uložit změny</button> </form> </main> </> ); }


