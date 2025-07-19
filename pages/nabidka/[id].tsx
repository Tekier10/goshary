// pages/nabidka/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DetailItem from '../../components/DetailItem';

const mockNabidky = [
  {
    id: '1',
    typ: 'Stroje',
    titulek: 'Volná CNC fréza',
    popis: 'Naše dílna nabízí volnou CNC frézu k využití.',
    overeno: true,
    hodnoceni: 4.3,
  },
  {
    id: '2',
    typ: 'Software',
    titulek: 'Sdílený ERP systém',
    popis: 'Možnost využití našeho ERP systému pro menší firmy.',
    overeno: false,
   hodnoceni: 4.7, 
  },
  // další nabídky…
];

export default function DetailNabidky() {
  const { query } = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (query.id) {
      const found = mockNabidky.find((item) => item.id === query.id);
      setData(found);
    }
  }, [query.id]);

  if (!data) return <p className="p-6 text-center">Načítám...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl font-semibold">{data.titulek}</h1>
      </div>
      <DetailItem data={data} typStranky="nabidka" />
    </div>
  );
}
