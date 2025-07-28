// components/FulltextSearch.tsx – fulltextové vyhledávání v inzerátech

import { useState } from 'react';

type Props = { placeholder?: string; onSearch: (query: string) => void; };

export default function FulltextSearch({ placeholder = 'Hledat…', onSearch }: Props) { const [query, setQuery] = useState('');

function handleChange(e: React.ChangeEvent<HTMLInputElement>) { const value = e.target.value; setQuery(value); onSearch(value); }

return ( <div className="mb-4"> <input
type="text"
value={query}
onChange={handleChange}
placeholder={placeholder}
className="w-full p-2 border border-gray-300 rounded"
/> </div> ); }
