// components/Header.tsx – navigace s responsivním chováním

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { FaSearch, FaHeart, FaUser } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-teal-500 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo vlevo */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-xl font-bold text-black">Go Shary</span>
          </Link>
        </div>

        {/* Ikony + hamburger vpravo (mobil) */}
        <div className="flex items-center space-x-4 sm:hidden">
          <Link href="/search" title="Vyhledávání">
            <FaSearch className="w-5 h-5 text-white" />
          </Link>
          <Link href="/favorites" title="Oblíbené">
            <FaHeart className="w-5 h-5 text-white" />
          </Link>
          <Link href="/login" title="Přihlášení">
            <FaUser className="w-5 h-5 text-white" />
          </Link>
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop ikony + menu (v tomto pořadí) */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Ikony vlevo */}
          <Link href="/search" title="Vyhledávání">
            <FaSearch className="w-5 h-5 text-white" />
          </Link>
          <Link href="/favorites" title="Oblíbené">
            <FaHeart className="w-5 h-5 text-white" />
          </Link>
          <Link href="/login" title="Přihlášení">
            <FaUser className="w-5 h-5 text-white" />
          </Link>

          {/* Menu napravo */}
          <Link href="/nabidky" className="hover:underline">Nabídky</Link>
          <Link href="/pridat" className="hover:underline">Přidat</Link>
          <Link href="/jak-to-funguje" className="hover:underline">Jak to funguje</Link>
          <Link href="/kontakt" className="hover:underline">Kontakt</Link>
        </div>
      </div>

      {/* Rozbalené menu v mobilu */}
      {isOpen && (
        <nav className="sm:hidden px-4 pt-2 pb-4">
          <Link href="/nabidky" className="block py-1">Nabídky</Link>
          <Link href="/pridat" className="block py-1">Přidat</Link>
          <Link href="/jak-to-funguje" className="block py-1">Jak to funguje</Link>
          <Link href="/kontakt" className="block py-1">Kontakt</Link>
        </nav>
      )}
    </header>
  );
}
