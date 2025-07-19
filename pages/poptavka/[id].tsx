// pages/poptavka/[id].tsx – detail poptávky pomocí sdílené komponenty

import { useRouter } from 'next/router'; import { useEffect, useState } from 'react'; import DetailItem from '../../components/DetailItem';

const mockPoptavky = [ { id: '1', typ: 'Pronájem manipulační techniky', popis: 'Hledáme VZV na 3 týdny v okolí Olomouce.', lokalita: 'Olomouc', kontakt: 'logistika@firma.cz', }, { id: '2', typ: 'Sdílení serverové kapacity', popis: 'Potřebujeme dočasně cloudové prostředky pro výpočty v AI projektu.', lokalita: 'Online / remote', kontakt: 'it@inovace.cz', }, ];

export default function DetailPoptavky() { const { query } = useRouter(); const [data, setData] = useState<any>(null);

useEffect(() => { if (query.id) { const found = mockPoptavky.find((item) => item.id === query.id); setData(found); } }, [query.id]);

if (!data) return <p className="p-6 text-center">Načítám...</p>; return <DetailItem data={data} typStranky="poptavka" />; }

