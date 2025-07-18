// components/Header.tsx – hlavní navigace s ikonami viditelnými i v mobilu vlevo od hamburgeru

import { useState } from 'react'; import Link from 'next/link'; import { Menu, X, Search, Heart, User } from 'lucide-react';

export default function Header() { const [isOpen, setIsOpen] = useState(false);

return ( <header className="bg-teal-500 text-white shadow"> <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"> <div className="flex items-center gap-4"> <Link href="/search" title="Vyhledávání" className="hover:text-gray-200"> <Search size={20} /> </Link> <Link href="/favorites" title="Oblíbené" className="hover:text-gray-200"> <Heart size={20} /> </Link> <Link href="/login" title="Přihlášení" className="hover:text-gray-200"> <User size={20} /> </Link> </div>

<Link href="/">
      <span className="text-white text-xl font-bold">GoShary</span>
    </Link>

    <div className="flex items-center gap-4">
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/nabidky" className="hover:text-gray-200">Nabídky</Link>
        <Link href="/pridat" className="hover:text-gray-200">Přidat</Link>
        <Link href="/jak-to-funguje" className="hover:text-gray-200">Jak to funguje</Link>
        <Link href="/kontakt" className="hover:text-gray-200">Kontakt</Link>
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {isOpen && (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-teal-600 text-white">
      <Link href="/nabidky">Nabídky</Link>
      <Link href="/pridat">Přidat</Link>
      <Link href="/jak-to-funguje">Jak to funguje</Link>
      <Link href="/kontakt">Kontakt</Link>
    </div>
  )}
</header>

); }


