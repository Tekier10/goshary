// pages/nabidka.tsx 
import { useState, useEffect } from 'react'; import Link from 'next/link'; import Head from 'next/head'; import FavouriteButton from '../components/FavouriteButton'; import nabidkyData from '../data/nabidky.json';

export default function NabidkaPage() { const [search, setSearch] = useState(''); const [nabidky, setNabidky] = useState(nabidkyData);

useEffect(() => { const filtered = nabidkyData.filter((n) => n.titulek.toLowerCase().includes(search.toLowerCase()) || n.popis.toLowerCase().includes(search.toLowerCase()) || n.lokalita.toLowerCase().includes(search.toLowerCase()) ); setNabidky(filtered); }, [search]);

return ( <> <Head> <title>Nabídky | GoShary</title> </Head> <main className="max-w-4xl mx-auto p-6"> <div className="flex justify-between items-center mb-4"> <h1 className="text-2xl font-bold">Nabídky</h1> <Link
href="/pridat?typ=nabidka"
className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
> ➕ Přidat nabídku </Link> </div>

<input
      type="text"
      placeholder="Hledat..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
    />

    <ul className="space-y-4">
      {nabidky.map((n) => (
        <li key={n.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition">
          <div className="flex justify-between items-center">
            <div>
              <Link href={`/nabidka/${n.id}`} className="text-lg font-semibold text-teal-700 hover:underline">
                {n.titulek}
              </Link>
              <p className="text-sm text-gray-500">{n.lokalita}</p>
            </div>
            <FavouriteButton id={n.id} />
          </div>
          <p className="mt-2 text-sm text-gray-700 line-clamp-2">{n.popis}</p>
        </li>
      ))}
    </ul>
  </main>
</>

); }

