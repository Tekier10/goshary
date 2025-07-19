import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DetailItem from '../../components/DetailItem';
import poptavkyData from '../../data/poptavky.json';

export default function DetailPoptavky() {
  const { query } = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (query.id) {
      const found = poptavkyData.find((item) => item.id === query.id);
      setData(found);
    }
  }, [query.id]);

  if (!data) return <p className="p-6 text-center">Načítám...</p>;
  return <DetailItem data={data} typStranky="poptavka" />;
}
