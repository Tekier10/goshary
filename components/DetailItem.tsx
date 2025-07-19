// components/DetailItem.tsx – sdílená komponenta pro zobrazení detailu nabídky/poptávky

import Link from 'next/link';
import OvereniBadge from '../components/OvereniBadge'
type Item = { id: string; typ: string; popis: string; lokalita: string; kontakt: string; };

type Props = { data: Item; typStranky: 'nabidka' | 'poptavka'; };

export default function DetailItem({ data, typStranky }: Props) { return ( <main className="max-w-3xl mx-auto p-6 text-gray-800 space-y-4"> <h1 className="text-2xl font-bold">{data.typ}</h1> <p className="text-sm text-gray-500">Lokalita: {data.lokalita}</p> <p className="text-base mt-4">{data.popis}</p>

<div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded">
    <h2 className="font-semibold">Kontakt</h2>
    <p>{data.kontakt}</p>
  </div>

  <Link href={`/${typStranky}`} className="text-teal-600 underline inline-block mt-4">
    ← Zpět na {typStranky === 'nabidka' ? 'nabídky' : 'poptávky'}
  </Link>
</main>

); }
