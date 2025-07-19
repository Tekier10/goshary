import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DetailItem from '../../components/DetailItem';
import nabidkyData from '../../data/nabidky.json';

export default function DetailNabidky() {
  const { query } = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (query.id) {
      const found = nabidkyData.find((item) => item.id === query.id);
      setData(found);
    }
  }, [query.id]);

  if (!data) return <p className="p-6 text-center">Načítám...</p>;
  return <DetailItem data={data} typStranky="nabidka" />;
}
