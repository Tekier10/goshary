// components/DetailItem.tsx – sdílená komponenta pro zobrazení detailu nabídky/poptávky

import Link from 'next/link';
import OvereniBadge from './OvereniBadge';
import Hodnoceni from './Hodnoceni';

type Item = {
  id: string;
  typ: string;
  titulek?: string;
  popis: string;
  lokalita: string;
  kontakt: string;
  overeno?: boolean;
  hodnoceni?: number;
  datumPridani?: string;
  zobrazeni?: number;
  stitky?: string[];
};

type Props = {
  data: Item;
  typStranky: 'nabidka' | 'poptavka';
};

export default function DetailItem({ data, typStranky }: Props) {
  return (
    <main className="max-w-3xl mx-auto p-6 text-gray-800 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{data.typ}</h1>
        {data.overeno !== undefined && <OvereniBadge overeno={data.overeno} />}
      </div>

      {data.hodnoceni !== undefined && (
        <div className="mt-2">
          <Hodnoceni hodnoceni={data.hodnoceni} />
        </div>
      )}

      <p className="text-sm text-gray-500">Lokalita: {data.lokalita}</p>
      <p className="text-base mt-4 whitespace-pre-line">{data.popis}</p>

      <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded">
        <h2 className="font-semibold">Kontakt</h2>
        <p>{data.kontakt}</p>
      </div>

      <Link
        href={`/${typStranky}`}
        className="text-teal-600 underline inline-block mt-4"
      >
        ← Zpět na {typStranky === 'nabidka' ? 'nabídky' : 'poptávky'}
      </Link>
    </main>
  );
}
