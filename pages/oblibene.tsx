// pages/oblibene.tsx 
import { useEffect, useState } from 'react'; import Head from 'next/head'; import Link from 'next/link'; import useFavourites from '../utils/useFavourites'; import nabidkyData from '../data/nabidky.json'; import poptavkyData from '../data/poptavky.json';

export default function OblibenePage() { const { getFavourites } = useFavourites(); const [oblibene, setOblibene] = useState<any[]>([]);

useEffect(() => { const favIds = getFavourites(); const matched = [...nabidkyData, ...poptavkyData].filter((item) => favIds.includes(item.id)); setOblibene(matched); }, [getFavourites]);

return ( <> <Head> <title>Oblíbené | GoShary</title> </Head> <main className="max-w-4xl mx-auto p-6"> <h1 className="text-2xl font-bold mb-6">Oblíbené inzeráty</h1> {oblibene.length === 0 ? ( <p className="text-gray-500">Zatím nemáte žádné oblíbené inzeráty.</p> ) : ( <ul className="space-y-4"> {oblibene.map((item) => ( <li key={item.id} className="border border-gray-200 rounded p-4 hover:shadow-md transition"> <div className="flex justify-between items-center"> <div> <Link href={/${item.typ === 'poptavka' ? 'poptavka' : 'nabidka'}/${item.id}} className="text-lg font-semibold text-teal-700 hover:underline" > {item.titulek} </Link> <p className="text-sm text-gray-500">{item.lokalita}</p> </div> </div> <p className="mt-2 text-sm text-gray-700 line-clamp-2">{item.popis}</p> </li> ))} </ul> )} </main> </> ); }

