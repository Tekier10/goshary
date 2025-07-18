// components/Header.tsx – hlavní navigace s hamburger menu a ikonami s tooltipy

import { useState } from 'react'; import Link from 'next/link'; import { Menu, X, Search, Heart, User } from 'lucide-react';

export default function Header() { const [isOpen, setIsOpen] = useState(false);

return ( <header className="bg-teal-500 text-white shadow"> <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"> <Link href="/"> <span className="text-white text-xl font-bold">GoShary</span> </Link>

<nav className="hidden md:flex items-center gap-6">
      <Link href="/search" className="hover:text-gray-200" title="Vyhledávání">
        <Search size={20} />
      </Link>
      <Link href="/favorites" className="hover:text-gray-200" title="Oblíbené">
        <Heart size={20} />
      </Link>
      <Link href="/login" className="hover:text-gray-200" title="Přihlášení">
        <User size={20} />
      </Link>
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

  {isOpen && (
    <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-teal-600 text-white">
      <Link href="/search">🔍 Vyhledávání</Link>
      <Link href="/favorites">❤️ Oblíbené</Link>
      <Link href="/login">👤 Přihlášení</Link>
      <Link href="/nabidky">Nabídky</Link>
      <Link href="/pridat">Přidat</Link>
      <Link href="/jak-to-funguje">Jak to funguje</Link>
      <Link href="/kontakt">Kontakt</Link>
    </div>
  )}
</header>

); }


